import { ConfigProvider, Modal, Space, Table, Select, Tag } from "antd";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../redux/features/order/orderApi";
import { toast } from "sonner";

const Orders = () => {
  const { data: responseData, isLoading } = useGetAllOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const allOrdersData = responseData?.results;

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateOrderStatus] = useUpdateOrderStatusMutation(); // mutation to update status

  // Map orders data into a format suitable for the table
  const dataSource = allOrdersData?.map((order, index) => ({
    key: index + 1,
    orderId: order?._id,
    boxName: order?.items[0]?.name, // Assuming a single item per order
    orderDate: new Date(order?.createdAt).toLocaleString(),
    status: order?.orderStatus,
    amount: `$${order?.totalAmount}`,
    customerName: order?.userId?.fullName,
    customerEmail: order?.userId?.email,
    shippingAddress: order?.shippingAddress,
    totalItems: order?.items?.reduce((acc, item) => acc + item.quantity, 0),
    items: order?.items, // Include items array for modal
  }));

  // Open the modal and set the selected order data
  const handleView = (record) => {
    setSelectedOrder(record);
    setIsModalOpen(true);
  };

  // Handle status change from the dropdown (direct API call)
  const handleStatusChange = async (value, orderId) => {
    try {
      const res = await updateOrderStatus({
        id: orderId,
        data: { status: value },
      }).unwrap();
      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const getAvailableStatusOptions = (currentStatus) => {
    const statusOptions = ["pending", "processing", "shipped", "delivered"];
    let disabledOptions = [];

    // Handling different status conditions
    if (currentStatus === "pending") {
      disabledOptions = [];
    } else if (currentStatus === "processing") {
      disabledOptions = ["pending", "delivered"];
    } else if (currentStatus === "shipped") {
      disabledOptions = ["pending", "processing"];
    } else if (currentStatus === "delivered") {
      disabledOptions = statusOptions.filter(
        (status) => status !== "delivered"
      );
    }
    return statusOptions.map((status) => ({
      label: status,
      value: status,
      disabled: disabledOptions.includes(status),
    }));
  };

  // Table columns definition
  const columns = [
    {
      title: "#SI",
      dataIndex: "key",
      key: "key",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Customer Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "pending"
              ? "cyan"
              : status === "processing"
              ? "yellow"
              : status === "shipped"
              ? "orange"
              : status === "delivered"
              ? "green"
              : "red"
          }
          className="text-white px-2 py-1 rounded-lg uppercase"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Total Items",
      dataIndex: "totalItems",
      key: "totalItems",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Select
          value={record.status}
          onChange={(value) => handleStatusChange(value, record?.orderId)}
          options={getAvailableStatusOptions(record.status)}
          style={{ width: 160 }}
        />
      ),
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
      render: (_, record) => (
        <div className="flex justify-center items-center gap-2">
          <Space size="middle">
            <AiFillEye
              onClick={() => handleView(record)}
              className="text-primary cursor-pointer size-6"
            />
          </Space>
        </div>
      ),
    },
  ];

  return (
    <section>
      <div className="flex justify-between items-center py-6 border-b-2 border-gray-400 mb-4">
        <h1 className="text-2xl font-semibold">All Orders</h1>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#42B244",
              headerColor: "",
              headerBorderRadius: 5,
            },
          },
        }}
      >
        <Table
          loading={isLoading}
          pagination={{
            position: ["bottomCenter"],
            pageSize: 8,
            current: currentPage,
            onChange: setCurrentPage,
          }}
          columns={columns}
          dataSource={dataSource}
          rowKey="orderId"
          scroll={{ x: "max-content" }}
        />
      </ConfigProvider>

      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={800}
      >
        <div>
          <h1 className="text-center text-2xl font-semibold my-2">
            Order Details
          </h1>
          <div className="p-5">
            <Table
              columns={[
                {
                  title: "Item",
                  dataIndex: "name",
                  key: "name",
                  render: (_, record) => (
                    <div className="flex gap-2 items-center">
                      <img
                        src={record.image}
                        alt="item"
                        className="size-10 rounded-lg"
                      />
                      <h1>{record.name}</h1>
                    </div>
                  ),
                },
                {
                  title: "Size",
                  dataIndex: "size",
                  key: "size",
                },
                {
                  title: "Color",
                  dataIndex: "color",
                  key: "color",
                  render: (color) => (
                    <div
                      style={{
                        backgroundColor: color,
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                      }}
                    />
                  ),
                },
                {
                  title: "Quantity",
                  dataIndex: "quantity",
                  key: "quantity",
                },
                {
                  title: "Price",
                  dataIndex: "price",
                  key: "price",
                  render: (price) => `$${price}`,
                },
                {
                  title: "Total Amount",
                  dataIndex: "totalPrice",
                  key: "totalPrice",
                  render: (totalPrice) => `$${totalPrice}`,
                },
              ]}
              dataSource={selectedOrder?.items || []}
              rowKey="id"
              pagination={false}
              bordered
              scroll={{ x: "max-content" }}
            />

            {/* Shipping Address */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold">Shipping Address:</h2>
              {selectedOrder?.shippingAddress?.address && (
                <div className="space-y-2 mt-2 ">
                  <p>
                    Country : {selectedOrder?.shippingAddress.address?.country}
                  </p>
                  <p>City : {selectedOrder?.shippingAddress?.address?.city}</p>
                  <p>
                    Address 1 : {selectedOrder?.shippingAddress?.address?.line1}
                  </p>
                  <p>
                    Address 2 : {selectedOrder?.shippingAddress?.address?.line2}
                  </p>
                  <p>
                    Postal Code :{" "}
                    {selectedOrder?.shippingAddress?.address?.postal_code}
                  </p>
                  {selectedOrder?.shippingAddress?.address?.state && (
                    <p>
                      State : {selectedOrder?.shippingAddress?.address?.state}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Orders;
