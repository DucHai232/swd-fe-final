import React, { useEffect, useState } from "react";
import "./Order.css";
import { getPackageOrderByUserId } from "../../../apis/package-order.request";
import { formatDateSplitT } from "../../../utils/FormatDate";
import { getPackage } from "../../../apis/package.request";
import { Breadcrumb } from "antd";
import { FaEye } from "react-icons/fa";
import ChooseProduct from "./ChooseProduct";
import { getDataPackagePeriodOfPackageOrder } from "../../../apis/packageInPeriods.request";

const Order = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [packages, setPackages] = useState([]);
  const [openChooseProduct, setOpenChooseProduct] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [dataPackagePeriods, setDataPackagePeriods] = useState(null);
  const [keyMenu, setKeyMenu] = useState(null);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getPackageOrderByUserId();
        setDataOrder(response.data?.packageOrders);
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPackage = async () => {
      try {
        const response = await getPackage("", 1);
        setPackages(response.data?.packages);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPackage();
    fetchOrder();
  }, []);
  const getPackageNameById = (packageId) => {
    const packageItem = packages?.find((pkg) => pkg.id == packageId);
    return packageItem ? packageItem.name : "Unknown Package";
  };
  const handleShowDetail = async (packageOrderId) => {
    const response = await getDataPackagePeriodOfPackageOrder(packageOrderId);
    setDataPackagePeriods(response.data?.data);
    setShowDetail(true);
  };
  const handleBreadcrumb = () => {
    setKeyMenu(null);
    setShowDetail(false);
  };
  const renderProduct = (data) => {
    return (
      <ul className="list-data">
        <li>
          <strong>Tên sản phẩm: </strong>
          {data?.name}
        </li>
        <li>
          <strong>Miêu tả: </strong>
          {data?.description}
        </li>
        <li>
          <strong>Màu sắc: </strong>
          {data?.color}
        </li>
        <li>
          <strong>Xuất xứ: </strong>
          {data?.origin}
        </li>
        <li>
          <strong>Chất liệu: </strong>
          {data?.material}
        </li>
        <li>
          <strong>Loại đồ chơi: </strong>
          {data?.type}
        </li>
        <li
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "5px",
          }}
        >
          <strong>Hình ảnh: </strong> <FaEye />
        </li>
      </ul>
    );
  };

  const renderPackage = (data) => {
    return (
      <ul className="list-data">
        <li>
          <strong>Tên package: </strong>
          {data?.name}
        </li>
        <li>
          <strong>Miêu tả: </strong> giảm {data?.description}
        </li>
        <li>
          <strong>Giá thành: </strong>
          {Number(data?.price).toLocaleString()} VND
        </li>
      </ul>
    );
  };

  const renderStatus = (data) => {
    return (
      <ul className="list-data">
        <li>
          <strong>Thời gian mở: </strong>
          {formatDateSplitT(data?.openingDate) || "Đang thực hiện"}
        </li>
        <li>
          <strong>Thời gian đóng gói: </strong>
          {formatDateSplitT(data?.packagingDate) || "Đang thực hiện"}
        </li>
        <li>
          <strong>Thời gian vận chuyển: </strong>{" "}
          {formatDateSplitT(data?.deliveryDate) || "Đang thực hiện"}
        </li>
        <li>
          <strong>Xác nhận giao hàng: </strong>{" "}
          {formatDateSplitT(data?.confirmDate) || "Đang thực hiện"}
        </li>
      </ul>
    );
  };

  const renderTextStatus = (status) => {
    switch (status) {
      case "OPEN":
        return "Đang mở quà";
      case "PACK":
        return "Đang mở quả";
      case "DELIVERY":
        return "Đang vận chuyển";
      case "CONFIRM":
        return "Giao hàng thành công";
      default:
        return "";
    }
  };
  return (
    <div className="order-container">
      <div className="title">
        <div className="underline">
          <p className="order-title">{showDetail ? "Detail" : "Orders"}</p>
          {!showDetail && (
            <div className="sort">
              <p>Sort by: </p>
              <select className="select-field">
                <option value="default">Default</option>
                <option value="number">Number</option>
                <option value="package">Package</option>
                <option value="kidName">Name of kid</option>
                <option value="price">Price</option>
                <option value="status">Status</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {showDetail ? (
        !openChooseProduct ? (
          <div className="detail-container">
            <div className="nav">
              <Breadcrumb
                style={{
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  fontFamily: "Josefin Sans, sans-serif",
                }}
                items={[
                  {
                    title: (
                      <p
                        onClick={() => handleBreadcrumb()}
                        style={{ cursor: "pointer" }}
                      >
                        Orders
                      </p>
                    ),
                  },
                  {
                    title: <p>Detail</p>,
                  },
                ]}
              />
            </div>
            <div className="list-product">
              {dataPackagePeriods.map((el) => (
                <div className="product">
                  <div className="left">
                    <ul>
                      <li>
                        <strong>Đơn hàng:</strong> Đơn hàng 1{" "}
                      </li>
                      {el.dates.confirmDate && (
                        <li className={keyMenu === "product" ? "active" : ""}>
                          <strong>Thông tin sản phẩm:</strong> Đồ chơi trẻ em{" "}
                          <FaEye
                            style={{ cursor: "pointer" }}
                            onClick={() => setKeyMenu("product")}
                          />
                        </li>
                      )}

                      <li className={keyMenu === "package" ? "active" : ""}>
                        <strong>Package:</strong> Package 1{" "}
                        <FaEye
                          style={{ cursor: "pointer" }}
                          onClick={() => setKeyMenu("package")}
                        />
                      </li>
                      <li className={keyMenu === "status" ? "active" : ""}>
                        <strong>Trạng thái:</strong>{" "}
                        {renderTextStatus(el.status)}
                        <FaEye
                          style={{ cursor: "pointer" }}
                          onClick={() => setKeyMenu("status")}
                        />
                      </li>
                    </ul>
                  </div>
                  <div className="right">
                    {keyMenu === "product" && renderProduct(el.product)}
                    {keyMenu === "package" && renderPackage(el.packages)}
                    {keyMenu === "status" && renderStatus(el.dates)}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="btn-product-next"
              onClick={() => setOpenChooseProduct(true)}
            >
              Chọn sản phẩm tiếp theo
            </button>
          </div>
        ) : (
          <ChooseProduct
            handleBreadcrumb={handleBreadcrumb}
            setOpenChooseProduct={setOpenChooseProduct}
          />
        )
      ) : (
        <div className="content">
          <table>
            <tbody>
              <tr>
                <td>No.</td>
                <td>Package</td>
                <td>Name of kid</td>
                <td>Price</td>
                <td>Purchase Date</td>
                <td>Status</td>
              </tr>
              {dataOrder.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{getPackageNameById(item.packageId)}</td>
                  <td>{item.nameOfKid}</td>
                  <td>{Number(item.totalPrice).toLocaleString()} VNĐ</td>
                  <td>{formatDateSplitT(item.createdAt)}</td>
                  <td>{item.status}</td>
                  <td className="detail">
                    <button onClick={() => handleShowDetail(item.id)}>
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Order;
