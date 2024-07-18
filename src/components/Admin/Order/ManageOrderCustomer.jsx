import React, { useEffect, useState } from "react";
import { DatePicker, Space, Table, Button } from "antd";
import {
  getOrderByDate,
  updateStatus,
} from "../../../apis/package-order.request";

const { RangePicker } = DatePicker;

const ManageOrderCustomer = () => {
  const [dataSource, setDataSource] = useState([]);
  const [dates, setDates] = useState([null, null]);

  useEffect(() => {
    const fetchDataSource = async () => {
      const response = await getOrderByDate({
        startDate: dates?.[0]?.format("YYYY-MM-DD"),
        endDate: dates?.[1]?.format("YYYY-MM-DD"),
      });
      setDataSource(response.data?.orders);
    };
    fetchDataSource();
  }, [dates]);

  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const handleUpdateStatus = async (orderId) => {
    try {
      const data = { status: "Finished" };
      await updateStatus(orderId, data);
      const response = await getOrderByDate({
        startDate: dates?.[0]?.format("YYYY-MM-DD"),
        endDate: dates?.[1]?.format("YYYY-MM-DD"),
      });
      setDataSource(response.data?.orders);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

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
      render: (packageInPeriodIds, record) => (
        <>
          <span>{packageInPeriodIds.length || 0}</span>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "packageInPeriodIds",
      key: "packageInPeriodIds",
      render: (packageInPeriodIds, record) => {
        const numberOfSend = parseInt(record.package.numberOfSend, 10);
        return packageInPeriodIds.length === numberOfSend &&
          record.status !== "Finished" ? (
          <Button onClick={() => handleUpdateStatus(record.id)}>
            Hoàn thành đơn hàng
          </Button>
        ) : null;
      },
    },
  ];

  return (
    <div>
      <h1>Quản lý đơn hàng</h1>
      <div>
        <div style={{ display: "flex", gap: "12px" }}>
          <RangePicker onChange={handleDateChange} />
          <Button>Tìm kiếm</Button>
        </div>
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
