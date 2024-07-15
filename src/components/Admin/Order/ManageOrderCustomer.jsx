import React, { useEffect, useState } from "react";
import { DatePicker, Space, Table } from "antd";
import { getAllOrder } from "../../../apis/package-order.request";
const { RangePicker } = DatePicker;
const ManageOrderCustomer = () => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    const fetchDataSource = async () => {
      const response = await getAllOrder();
      setDataSource(response.data?.orders);
    };
    fetchDataSource();
  }, []);
  const columns = [
    {
      title: "Mã hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tên người nhận",
      dataIndex: "nameOfAdult",
      key: "nameOfAdult",
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Số quà đã gửi",
      dataIndex: "packageInPeriodIds",
      key: "packageInPeriodIds",
      render: (packageInPeriodIds) => (
        <span>{packageInPeriodIds.length || 0}</span>
      ),
    },
  ];
  return (
    <div>
      <h1>Quản lý đơn hàng</h1>
      <div>
        {" "}
        <RangePicker />
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 4,
          }}
        />
      </div>
    </div>
  );
};

export default ManageOrderCustomer;
