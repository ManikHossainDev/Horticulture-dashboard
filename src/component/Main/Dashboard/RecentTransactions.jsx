/* eslint-disable no-unused-vars */
import { InfoCircleOutlined } from "@ant-design/icons";
import { ConfigProvider, Modal, Table, Tag } from "antd";
import moment from "moment";
import { useState } from "react";
import { useGetAllEarningsQuery } from "../../../redux/features/earning/earningApi";

const RecentTransactions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  // Fetch data from the API
  const { data: responseData } = useGetAllEarningsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const earningsData = responseData?.results;

  const dataSource =
    earningsData?.map((record, index) => ({
      key: index + 1,
      trxId: record?._id,
      userName: record?.userId?.fullName,
      userEmail: record?.userId?.email,
      earningType: record?.paymentType,
      date: moment(record?.createdAt).format("DD MMM, YYYY"),
      amount: `$${record?.totalAmount}`,
      user: {
        name: record.userId.fullName,
        email: record.userId.email,
      },
    })) || [];

  const columns = [
    {
      title: "#Trx ID",
      dataIndex: "trxId",
      key: "trxId",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "User Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Earning Type",
      dataIndex: "earningType",
      key: "earningType",
      render: (text, record) => {
        return (
          <Tag
            color={record.earningType === "subscription" ? "orange" : "green"}
            className="px-2 py-1 rounded-lg uppercase"
          >
            {record.earningType}
          </Tag>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <InfoCircleOutlined
          className="cursor-pointer text-xl"
          onClick={() => showModal(record)}
        />
      ),
    },
  ];

  const showModal = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <section>
      <div>
        <div className="flex justify-between items-center py-6 border-b-2 border-gray-400 mb-4">
          <h1 className="text-2xl font-semibold">Recent Transactions</h1>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#42B244",
                headerColor: "white",
                headerBorderRadius: 5,
              },
            },
          }}
        >
          <Table
            className="shadow-sm"
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          />
        </ConfigProvider>
      </div>
      {/* User Details Modal */}
      <Modal
        open={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div>
          <h1 className="text-center text-2xl font-semibold my-2">
            Transaction Details
          </h1>
          <div className="p-5">
            <div className="flex justify-between py-3 border-b">
              <p>User Name :</p>
              <p>{selectedRecord?.user?.name || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Email :</p>
              <p>{selectedRecord?.user?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Trx ID :</p>
              <p>{selectedRecord?.trxId || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Amount :</p>
              <p>{selectedRecord?.amount || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Date :</p>
              <p>{selectedRecord?.date || "N/A"}</p>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default RecentTransactions;
