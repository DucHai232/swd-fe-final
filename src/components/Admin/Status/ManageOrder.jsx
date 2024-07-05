import React, { useEffect, useState } from "react";
import "./ManageOrder.css";
import { Space, Table, message } from "antd";
import {
  getPackageInPeriodNotConfirm,
  updateStatusPackageInPeriod,
} from "../../../apis/packageInPeriods.request";
import { addPackInPeriod } from "../../../apis/package-order.request";

const ManageOrder = () => {
  const [dataSource, setDataSource] = useState([]);
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getPackageInPeriodNotConfirm();
      const packageInPeriods = response.data.packageInPeriods;
      const newData = packageInPeriods.map((item) => ({
        id: item.id,
        nameOfAdult: item.packageDetail.nameOfAdult,
        nameOfKid: item.packageDetail.nameOfKid,
        phone: item.packageDetail.phone,
        email: item.packageDetail.email,
        address: item.packageDetail.address,
        packageOrderId: item.packageDetail.id,
      }));
      setDataSource(newData);
    };
    fetchData();
  }, [callback]);

  const handleConfirmOrder = async (orderId, packageOrderId) => {
    const body = {
      status: "openingDate",
      updateStatus: "DELIVERY",
    };
    await updateStatusPackageInPeriod(orderId, body);
    await addPackInPeriod(packageOrderId);
    setCallback((prev) => !prev);
    message.success("Xác nhận gói hàng thành công");
  };
  const columns = [
    {
      title: "Tên người mua",
      dataIndex: "nameOfAdult",
      key: "nameOfAdult",
    },
    {
      title: "Tên trẻ em",
      dataIndex: "nameOfKid",
      key: "description",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "record",
      render: (_, record) => (
        <Space size="middle">
          <button
            style={{
              border: "none",
              backgroundColor: "green",
              padding: "6px",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => handleConfirmOrder(record.id, record.packageOrderId)}
          >
            Xác nhận đơn hàng
          </button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <h1>Quản lý Order</h1>

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 4,
        }}
      />
    </div>
  );
};

export default ManageOrder;
