import React, { useEffect, useState } from "react";
import "./ManageOrder.css";
import { Space, Table, Tag, message } from "antd";
import {
  addPackInPeriod,
  getAllOrder,
} from "../../../apis/package-order.request";
import { randomProduct } from "../../../apis/product.request";
import {
  EyeOutlined,
  EllipsisOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import {
  chooseProductInPeriods,
  getAllPackageInPeriods,
} from "../../../apis/packageInPeriods.request";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const ManageOrder = () => {
  const [dataSource, setDataSource] = useState([]);
  const [openChooseProduct, setOpenChooseProduct] = useState(false);
  const [randomProducts, setRandomProducts] = useState([]);
  const [packageInPeriods, setPackageInPeriods] = useState([]);
  const [dataParams, setDataParams] = useState({
    packageId: "",
    kidId: "",
    packageOrderId: "",
  });
  const [callback, setCallback] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllOrder();
      setDataSource(response.data.orders);
    };
    fetchData();
  }, [callback]);
  useEffect(() => {
    const fetchDataRandomProduct = async () => {
      const response = await randomProduct(
        dataParams.packageId,
        dataParams.kidId
      );
      setRandomProducts(response.data?.renderProducts);
    };
    const fetchPackageInPeriod = async () => {
      const response = await getAllPackageInPeriods();
      setPackageInPeriods(response.data?.packageInPeriods);
    };
    fetchDataRandomProduct();
    fetchPackageInPeriod();
  }, [callback]);
  const countPackageOrderInPeriod = (packageOrderId) => {
    let count = 0;
    packageInPeriods.map((el) => {
      if (el.packageOrderId === packageOrderId) {
        count++;
      }
    });
    return count;
  };
  const handleViewChooseProduct = (packageId, kidId, packageOrderId) => {
    setDataParams({
      packageId,
      kidId,
      packageOrderId,
    });
    setOpenChooseProduct(true);
    setCallback((prev) => !prev);
  };

  const handleChoose = async (productId) => {
    const result = window.confirm("Bạn chọn phần quà này!");
    if (result) {
      const response = await chooseProductInPeriods(
        productId,
        dataParams.packageOrderId
      );
      if (response.data.success) {
        await addPackInPeriod(dataParams.packageOrderId);
        message.success(response.data.message);
        setOpenChooseProduct(false);
        setCallback((prev) => !prev);
      } else {
        message.error(response.data.message);
      }
    }
  };
  const renderProduct = (data) => {
    return (
      <li>
        <Card
          style={{
            width: 300,
          }}
          cover={
            <img
              style={{ height: "250px", objectFit: "cover" }}
              alt="example"
              src={data?.images[0]}
            />
          }
          actions={[
            <EyeOutlined key="view" />,
            <CheckSquareOutlined
              key="choose"
              onClick={() => handleChoose(data.id)}
            />,
          ]}
        >
          <Meta
            title={data?.name}
            description={data?.description}
            style={{ maxHeight: "60px" }}
          />
        </Card>
      </li>
    );
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
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "price",
      render: (price) => <span>{price.toLocaleString("vi-VN")}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Pending"
              ? "volcano"
              : status === "Finished"
              ? "green"
              : "geekblue"
          }
          key={status}
        >
          {(status === "Pending"
            ? "Đang hoạt động"
            : status === "Finished"
            ? "Đã hoàn thành"
            : "Hủy"
          ).toUpperCase()}
        </Tag>
      ),
    },

    {
      title: "Action",
      key: "record",
      render: (_, record) => (
        <Space size="middle">
          <button
            style={{
              border: "none",
              backgroundColor: "tomato",
              padding: "6px",
              color: "white",
              borderRadius: "4px",
              cursor:
                countPackageOrderInPeriod(record.id) ===
                record.packageInPeriodIds.length
                  ? "not-allowed"
                  : "pointer",
            }}
            onClick={() => {
              countPackageOrderInPeriod(record.id) !==
                record.packageInPeriodIds.length &&
                handleViewChooseProduct(
                  record.packageId,
                  record.kidId,
                  record.id
                );
            }}
          >
            {countPackageOrderInPeriod(record.id) ===
            record.packageInPeriodIds.length
              ? "Chờ lần tiếp theo"
              : `Chọn lần ${record.packageInPeriodIds.length + 1}`}
          </button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <h1>Quản lý Order</h1>
      {openChooseProduct ? (
        <div>
          <button
            className="btn-back"
            onClick={() => setOpenChooseProduct(false)}
          >
            back
          </button>
          <div className="random-products">
            <ul>{randomProducts.map((item) => renderProduct(item))}</ul>
          </div>
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 4,
          }}
        />
      )}
    </div>
  );
};

export default ManageOrder;
