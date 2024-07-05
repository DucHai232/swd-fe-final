import { Button, Select, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPackageInPeriodStatus } from "../../../apis/packageInPeriods.request";
import ModalUpdateOrders from "./ModalUpdateOrders";

const ManageBoxPeriod = () => {
  const [callback, setCallback] = useState(false);
  const [packageInPeriodData, setPackageInPeriodData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageInPeriod, setPackageInPeriod] = useState({});
  const [select, setSelect] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getPackageInPeriod = (packageInPeriodId) => {
    const data = packageInPeriodData.find((el) => el.id == packageInPeriodId);
    showModal();
    setPackageInPeriod(data);
  };

  useEffect(() => {
    const fetchStatusBox = async () => {
      const response = await getPackageInPeriodStatus("");
      setPackageInPeriodData(response.data.packageInPeriods);
    };
    fetchStatusBox();
  }, [callback]);

  const handleFilter = async () => {
    const response = await getPackageInPeriodStatus(select);
    setPackageInPeriodData(response.data.packageInPeriods);
  };
  const columns = [
    {
      title: "Tên Box",
      dataIndex: "boxDetail",
      key: "boxDetail",
      render: (boxDetail) => <p>{boxDetail.name}</p>,
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
      render: (status, record) => (
        <div>
          {record.confirmDate ? (
            <Tag color="green">Hoàn thành</Tag>
          ) : (
            <Tag
              color={
                status === "PACK"
                  ? "magenta"
                  : status === "DELIVERY"
                  ? "orange"
                  : status === "CONFIRM"
                  ? "cyan"
                  : ""
              }
            >
              {status === "PACK"
                ? "Gói hàng"
                : status === "DELIVERY"
                ? "Vận chuyển"
                : status === "CONFIRM"
                ? "Xác nhận"
                : ""}
            </Tag>
          )}
        </div>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => getPackageInPeriod(record.id)}>
          {record.confirmDate ? "Xem" : "Cập nhật đơn hàng"}
        </Button>
      ),
    },
  ];

  return (
    <>
      <div>
        <h1>Quản lý box</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên..."
            className="input-search"
            // onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            showSearch
            placeholder="Choose status"
            size="large"
            allowClear
            value={select}
            style={{
              width: "18%",
              marginLeft: "12px",
              height: "35px",
            }}
            onChange={(value) => setSelect(value)}
            options={[
              { value: "DELIVERY", label: "Đơn hàng vận chuyển" },
              { value: "PACK", label: "Đơn hàng đóng gói" },
              { value: "CONFIRM", label: "Đơn hàng xác nhận" },
              { value: "", label: "Tất cả" },
            ]}
          />
          <Button
            style={{ marginLeft: "12px", height: "35px" }}
            onClick={() => handleFilter()}
          >
            Lọc
          </Button>
        </div>
        <div className="table">
          <Table
            columns={columns}
            dataSource={packageInPeriodData}
            pagination={{
              pageSize: 4,
            }}
          />
          <ModalUpdateOrders
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
            handleOk={handleOk}
            setCallback={setCallback}
            packageInPeriod={packageInPeriod}
          />
        </div>
      </div>
    </>
  );
};

export default ManageBoxPeriod;
