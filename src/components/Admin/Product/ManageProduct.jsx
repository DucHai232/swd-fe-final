import React, { useEffect, useState } from "react";
import { Space, Table, Tag, message } from "antd";
import { FaFilter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import ModalViewProduct from "./ModalViewProduct";
import "./ManageProduct.css";
import ModalConfirm from "../../Modal-Confirm/ModalConfirm";
import ModalFilter from "./ModalFilter";
import ModalCreateProduct from "./ModalCreateProduct";
import { deleteProductById } from "../../../apis/product.request";
import { getProducts } from "../../../redux/actions/product.action";
import ModalEditProduct from "./ModalEditProduct";
const ManageProduct = () => {
  const columns = [
    {
      title: "Tên sản phẩm",
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
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price.toLocaleString("vi-VN")}</span>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Hình ảnh",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <img
          src={images && images[0]}
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      ),
    },

    {
      title: "Action",
      key: "record",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="action view"
            onClick={() => showModalView(record.id)}
          >
            <FaEye />
          </button>
          <button className="action edit" onClick={() => showModalEdit(record)}>
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

  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [productIdDelete, setProductIdDelete] = useState("");
  const [callback, setCallback] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [dataFilter, setDataFilter] = useState({
    fromPrice: "",
    toPrice: "",
    colorQuery: "",
    originQuery: "",
    boxIdQuery: "",
    themeIdQuery: "",
  });
  const [productToEdit, setProductToEdit] = useState(null);
  // Modal confirm
  const showModalConfirm = (productId) => {
    setIsModalConfirmOpen(true);
    setProductIdDelete(productId);
  };

  const handleConfirmOk = () => {
    const deleteData = async () => {
      try {
        const response = await deleteProductById(productIdDelete);
        if (response.data.success) {
          message.success(response.data.message);
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    deleteData();
    setCallback((prev) => !prev);
    setIsModalConfirmOpen(false);
  };
  const handleConfirmCancel = () => {
    setIsModalConfirmOpen(false);
  };

  // ModalView
  const showModalView = (productId) => {
    setIsModalViewOpen(true);
    setProductId(productId);
  };
  const handleViewOk = () => {
    setIsModalViewOpen(false);
  };
  const handleViewCancel = () => {
    setIsModalViewOpen(false);
  };
  const showModalEdit = (product) => {
    setIsOpenModalEdit(true);
    setProductToEdit(product);
  };
  const handleEditCancel = () => {
    setIsOpenModalEdit(false);
  };

  const showModalCreate = () => {
    setIsOpenModalCreate(true);
  };
  useEffect(() => {
    dispatch(
      getProducts(
        dataFilter.boxIdQuery,
        dataFilter.themeIdQuery,
        dataFilter.originQuery,
        dataFilter.colorQuery,
        dataFilter.fromPrice,
        dataFilter.toPrice,
        searchProduct,
        1
      )
    );
  }, [callback, searchProduct]);
  const dataProducts = useSelector((state) => state.productReducer.products);
  return (
    <>
      <div>
        <h1>Quản lý Sản Phẩm</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên..."
            className="input-search"
            onChange={(e) => setSearchProduct(e.target.value)}
          />
          <button
            className="btn-filter"
            onClick={() => setIsModalFilterOpen(true)}
          >
            <FaFilter />
            <span>Filter</span>
          </button>
          <button className="create" onClick={() => setIsOpenModalCreate(true)}>
            <IoAddCircleOutline />
            <span>Tạo sản phẩm</span>
          </button>
        </div>

        <div className="table">
          <Table
            columns={columns}
            dataSource={dataProducts}
            pagination={{
              pageSize: 4,
            }}
          />
        </div>
      </div>
      <ModalViewProduct
        productId={productId}
        isModalOpen={isModalViewOpen}
        handleOk={handleViewOk}
        handleCancel={handleViewCancel}
      />
      <ModalConfirm
        isModalOpen={isModalConfirmOpen}
        handleOk={handleConfirmOk}
        handleCancel={handleConfirmCancel}
        message="Bạn có chắc chắn muốn xóa sản phẩm này không?"
      />
      <ModalFilter
        isModalOpen={isModalFilterOpen}
        setIsModalFilterOpen={setIsModalFilterOpen}
        handleCancel={() => setIsModalFilterOpen(false)}
        setCallback={setCallback}
        setDataFilter={setDataFilter}
        dataFilter={dataFilter}
      />
      <ModalCreateProduct
        open={isOpenModalCreate}
        setOpen={setIsOpenModalCreate}
        setCallback={setCallback}
      />
      <ModalEditProduct
        isOpenEdit={isOpenModalEdit}
        handleCancelEdit={handleEditCancel}
        initialValues={productToEdit}
        setCallback={setCallback}
      />
      {/* <ModalImage /> */}
    </>
  );
};

export default ManageProduct;
