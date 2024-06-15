import React, { useEffect, useState } from "react";
import { Space, Table, Tag, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import ModalConfirm from "../../Modal-Confirm/ModalConfirm";
import { deleteSoftPackage } from "../../../apis/package.request";
import ModalCreatePackage from "./ModalCreatePackage";
import { getDataPackage } from "../../../redux/actions/package.action";
const ManagePackage = () => {
  const columns = [
    {
      title: "Tên package",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Miêu tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Giá thành",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lần gửi quà",
      dataIndex: "numberOfSend",
      key: "numberOfSend",
    },

    // {
    //   title: "Hình ảnh",
    //   dataIndex: "image",
    //   key: "image",
    //   render: (image) => (
    //     <img
    //       src={image}
    //       style={{ width: "100px", height: "100px", objectFit: "cover" }}
    //     />
    //   ),
    // },

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
            onClick={() => showModalConfirm(record.id)}
          >
            <MdDelete />
          </button>
        </Space>
      ),
    },
  ];
  const dispatch = useDispatch();
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [packageId, setPackageId] = useState("");
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [callback, setCallback] = useState(false);
  const [search, setSearch] = useState("");

  const showModalConfirm = (id) => {
    setIsModalConfirmOpen(true);
    setPackageId(id);
  };

  const handleConfirmOk = async () => {
    try {
      const response = await deleteSoftPackage(packageId);
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
    setCallback((prev) => !prev);
    setIsModalConfirmOpen(false);
  };

  const handleConfirmCancel = () => {
    setIsModalConfirmOpen(false);
  };

  const showModalCreate = () => {
    setIsOpenCreate(true);
  };
  const handleCancelCreate = () => {
    setIsOpenCreate(false);
  };
  const handleCreatePackage = () => {
    alert("ss");
  };

  useEffect(() => {
    dispatch(getDataPackage(search, 1));
  }, [callback, search]);

  const dataPackage = useSelector((state) => state.packageReducer?.packages);
  return (
    <>
      <div>
        <h1>Quản lý Package</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên..."
            className="input-search"
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="create" onClick={showModalCreate}>
            <IoAddCircleOutline />
            <span>Tạo package</span>
          </button>
        </div>
        <div className="table">
          <Table
            columns={columns}
            dataSource={dataPackage}
            pagination={{
              pageSize: 4,
            }}
          />
        </div>
      </div>
      <ModalConfirm
        handleOk={handleConfirmOk}
        handleCancel={handleConfirmCancel}
        isModalOpen={isModalConfirmOpen}
        message={"Bạn chắc chắn muốn xóa package này không?"}
      />
      <ModalCreatePackage
        isModalOpen={isOpenCreate}
        handleCancel={handleCancelCreate}
        handleOk={handleCreatePackage}
      />
    </>
  );
};

export default ManagePackage;
