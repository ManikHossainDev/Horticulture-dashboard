import { useEffect, useState } from "react";
import { ConfigProvider, Form, Input, Modal, Space, Table, Tag } from "antd";
import moment from "moment";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useGetAllBusinessmanQuery } from "../../../redux/features/businessman/businessmanApi";
import { toast } from "sonner";
import { IoSearch } from "react-icons/io5";
import Swal from "sweetalert2";
import { useUserDeleteMutation } from "../../../redux/features/user/userApi";

const AllBusinesses = () => {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [params, setParams] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const [allUser, setAllUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, isFetching, isError, error } = useGetAllBusinessmanQuery({
    page: currentPage,
    limit: 10,
    filters: params,
  });
  const [deleteUser] = useUserDeleteMutation();

  const handleView = (record) => {
    setSelectedUser(record); // Use selectedUser to handle data for the modal
    setIsModalOpen(true);
  };

  const dataSource = allUser?.map((user, index) => ({
    key: user._id,
    si: index + 1,
    name: user?.fullName || "N/A",
    email: user?.email || "N/A",
    address: user?.shippingAddress?.address || "N/A",
    city: user?.shippingAddress?.city || "N/A",
    createdAt: user?.createdAt,
    isSubscribed: user?.isSubscribed,
    isBlocked: user?.isBlocked,
    imageUrl: user?.image,
    status: user?.status,
  }));

  const handleDeleteBusiness = async (id) => {
    let data = {
      action: "delete", // Check `isBlocked` directly from the record
    };
    try {
      await deleteUser({ id, data }).unwrap();
      toast.success(`User Delete Successfully`);
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
    },
    {
      title: "Business Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center">
          <img
            src={`${imageBaseUrl}${record.imageUrl}`}
            alt="Profile"
            className="size-10 rounded-full mr-2"
          />
          <span>{record.name}</span>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("DD MMM YYYY"),
    },
    {
      title: "Subscription",
      dataIndex: "isSubscribed",
      key: "isSubscribed",
      render: (isSubscribed) => (
        <Tag
          className="px-2 py-1 rounded-lg"
          color={isSubscribed ? "green" : "red"}
        >
          {" "}
          {isSubscribed ? "Active" : "Inactive"}{" "}
        </Tag>
      ),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <div className="flex gap-4 items-center">
    //       <Space size="middle">
    //         <span
    //           onClick={() => handleBlockUnblock(record?.key, record?.isBlocked)}
    //           className="bg-white px-5 py-2 rounded-md cursor-pointer text-primary border border-primary"
    //         >
    //           {record?.isBlocked ? "Unblocked" : "Blocked"}
    //         </span>
    //       </Space>
    //     </div>
    //   ),
    // },
    {
      title: "View",
      key: "view",
      render: (_, record) => (
        <div className="flex gap-4 items-center">
          <Space size="middle">
            <span
              onClick={() => handleView(record)}
              className="bg-primary px-5 py-2 rounded-md cursor-pointer text-white border border-primary"
            >
              View
            </span>
          </Space>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (isError && error) {
      setAllUser([]);
    } else if (data) {
      setAllUser(data?.attributes?.results);
      setTotalResult(data?.attributes?.totalResults);
    }
  }, [data, isError, error]);

  const handleFinish = (values) => {
    const { name, email } = values;
    const newParams = [];
    if (name) {
      newParams.push({ name: "fullName", value: name });
    }
    if (email) {
      newParams.push({ name: "email", value: email });
    }
    setParams(newParams);
    form.resetFields();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <section>
      <div className="flex justify-between items-center py-6 border-b-2 border-gray-400 mb-4">
        <h1 className="text-2xl font-semibold">All Businesses</h1>
        <Form form={form} onFinish={handleFinish} layout="inline" name="basic">
          <Form.Item name="name">
            <Input placeholder="Search by Name" />
          </Form.Item>
          <Form.Item name="email">
            <Input placeholder="Search by Email" />
          </Form.Item>
          <Form.Item>
            <button className="size-8 bg-primary text-white rounded-full justify-center flex items-center">
              <IoSearch className="size-5" />
            </button>
          </Form.Item>
        </Form>
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
          loading={isFetching}
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
            total: totalResult,
            onChange: handlePageChange,
          }}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          scroll={{ x: "max-content" }}
        />
      </ConfigProvider>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <div>
          <img
            className="size-16 mx-auto rounded-full"
            src={`${imageBaseUrl}${selectedUser?.imageUrl}`}
            alt=""
          />
          <h1 className="text-center text-2xl font-semibold my-2">
            Business Details
          </h1>
          <div className="p-5">
            <div className="flex justify-between py-3 border-b">
              <p>User Name : </p>
              <p>{selectedUser?.name || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Email : </p>
              <p>{selectedUser?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Phone Number : </p>
              <p>{selectedUser?.phone || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Address : </p>
              <p>{selectedUser?.address || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Subscribe : </p>
              <p>{selectedUser?.isSubscribed ? "Yes" : "No"}</p>
            </div>
            <div className="flex justify-between py-3">
              <p>Joining Date :</p>
              <p>
                {selectedUser?.createdAt
                  ? moment(selectedUser.createdAt).format("DD MMM YYYY")
                  : "N/A"}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "This action will permanently delete the business record!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#42B244",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDeleteBusiness(selectedUser?.key);
                    setIsModalOpen(false); // Close modal on successful delete
                  }
                });
              }}
              className="bg-primary text-white px-5 py-2 rounded-md"
            >
              Delete Business
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default AllBusinesses;
