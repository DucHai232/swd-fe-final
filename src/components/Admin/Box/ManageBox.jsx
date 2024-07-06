import { Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getBox } from "../../../redux/actions/box.action";
import CreateBox from "./CreateBox";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "Tên Box",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Miêu tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Độ tuổi",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Giá trung bình",
    dataIndex: "priceAvarage",
    key: "priceAvarage",
    render: (priceAvarage) => (
      <span>{Number(priceAvarage).toLocaleString("vi-VN")} VNĐ</span>
    ),
  },
  {
    title: "Số sản phẩm trong box",
    dataIndex: "quantityProInBox",
    key: "quantityProInBox",
  },

  {
    title: "Hình ảnh",
    dataIndex: "image",
    key: "image",
    render: (image) => (
      <img
        src={image}
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
    ),
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <button className="action edit">
          <FaRegEdit />
        </button>
        <button
          className="action delete"
          // onClick={() => showModalConfirm(record.id)}
        >
          <MdDelete />
        </button>
      </Space>
    ),
  },
];
const ManageBox = () => {
  const dispatch = useDispatch();
  const [isModalCreateBox, setIsModalCreateBox] = useState(false);
  const [callback, setCallback] = useState(false);
  const navigate = useNavigate();
  const showModalCreateBox = () => {
    setIsModalCreateBox(true);
  };

  const handleCreateBoxOk = () => {
    setIsModalCreateBox(false);
  };

  const handleCancelBox = () => {
    setIsModalCreateBox(false);
  };
  useEffect(() => {
    dispatch(getBox());
  }, [callback]);
  const dataBox = useSelector((state) => state.boxReducer?.boxs);
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

          <button
            className="create"
            onClick={() => navigate("/admin/create-box")}
          >
            <IoAddCircleOutline />
            <span>Tạo box</span>
          </button>
        </div>
        <div className="table">
          <Table
            columns={columns}
            dataSource={dataBox}
            pagination={{
              pageSize: 4,
            }}
          />
        </div>
      </div>
      <CreateBox
        isModalOpen={isModalCreateBox}
        setIsModalCreateBox={setIsModalCreateBox}
        handleCancel={handleCancelBox}
        setCallback={setCallback}
      />
    </>
  );
};

export default ManageBox;
