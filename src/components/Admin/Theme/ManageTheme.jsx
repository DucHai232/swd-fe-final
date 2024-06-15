import React, { useEffect, useState } from "react";
import "./ManageTheme.css";
import { Space, Table, Tag, message } from "antd";
import { FaFilter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { deleteTheme, getThemes } from "../../../redux/actions/theme.action";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import ModalCreate from "./ModalCreate";
import ModalConfirm from "../../Modal-Confirm/ModalConfirm";
const ManageTheme = () => {
  const columns = [
    {
      title: "Tên theme",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Miêu tả",
      dataIndex: "description",
      key: "description",
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
  const [themeId, setThemeId] = useState("");
  const showModalConfirm = (id) => {
    setIsModalConfirmOpen(true);
    setThemeId(id);
  };
  const handleConfirmOk = () => {
    dispatch(deleteTheme(themeId, { status: 0 }));
    setCallback((prev) => !prev);
    setIsModalConfirmOpen(false);
    message.success("Xóa thành công");
  };
  const handleConfirmCancel = () => {
    setIsModalConfirmOpen(false);
  };

  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [callback, setCallback] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getThemes(search, 1));
  }, [callback, search]);

  const showModalCreate = () => {
    setIsOpenCreate(true);
  };
  const handleCancelCreate = () => {
    setIsOpenCreate(false);
  };

  const dataThemes = useSelector((state) => state.themeReducer.themes);
  return (
    <div>
      <h1>Quản lý Theme</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          className="input-search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-filter">
          <FaFilter />
          <span>Filter</span>
        </button>
        <button className="create" onClick={showModalCreate}>
          <IoAddCircleOutline />
          <span>Tạo theme</span>
        </button>
        <ModalCreate
          isOpenCreate={isOpenCreate}
          handleCancelCreate={handleCancelCreate}
          setIsOpenCreate={setIsOpenCreate}
          setCallback={setCallback}
        />
        <ModalConfirm
          isModalOpen={isModalConfirmOpen}
          handleOk={handleConfirmOk}
          handleCancel={handleConfirmCancel}
          message="Bạn có chắc chắn muốn xóa không?"
        />
      </div>
      <div className="table">
        <Table
          columns={columns}
          dataSource={dataThemes}
          pagination={{
            pageSize: 4,
          }}
        />
      </div>
    </div>
  );
};

export default ManageTheme;
