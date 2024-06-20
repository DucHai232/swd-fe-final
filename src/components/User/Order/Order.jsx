import React, { useEffect, useState } from "react";
import "./Order.css";
import { getPackageOrderByUserId } from "../../../apis/package-order.request";
import { formatDateSplitT } from "../../../utils/FormatDate";
import { getPackage } from "../../../apis/package.request";
import { Breadcrumb } from "antd";
import { FaEye } from "react-icons/fa";

const Order = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [packages, setPackages] = useState([]);
  const [showDetail, setShowDetail] = useState(true);
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
  const handleShowDetail = (id) => {
    setShowDetail(true);
  };
  const handleBreadcrumb = () => {
    setKeyMenu(null);
    setShowDetail(false);
  };
  const renderProduct = () => {
    return (
      <ul>
        <li>
          <strong>Tên sản phẩm: </strong>Đồ chơi vui vẻ
        </li>
        <li>
          <strong>Miêu tả: </strong>Xe đạp cho trẻ em, giúp trẻ rèn luyện sức
          khỏe và kỹ năng cân bằng
        </li>
        <li>
          <strong>Màu sắc: </strong>xanh dương
        </li>
        <li>
          <strong>Xuất xứ: </strong>Trung quốc
        </li>
        <li>
          <strong>Chất liệu: </strong>Kim loại
        </li>
        <li>
          <strong>Loại đồ chơi: </strong>Đồ chơi ngoài trời
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

  const renderPackage = () => {
    return (
      <ul>
        <li>
          <strong>Tên package: </strong>Package 1
        </li>
        <li>
          <strong>Miêu tả: </strong>Bộ đồ chơi xây dựng giúp trẻ em phát triển
          kỹ năng sáng tạo và logic.
        </li>
        <li>
          <strong>Giá thành: </strong>350.000 VND
        </li>
      </ul>
    );
  };

  const renderStatus = () => {
    return (
      <ul>
        <li>
          <strong>Thời gian mở: </strong>22/02/2024
        </li>
        <li>
          <strong>Thời gian đóng gói: </strong>23/02/2024
        </li>
        <li>
          <strong>Thời gian vận chuyển: </strong> 24/02/2024
        </li>
        <li>
          <strong>Xác nhận giao hàng: </strong> Đang thực hiện
        </li>
      </ul>
    );
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
        <div className="detail-container">
          <div className="nav">
            <Breadcrumb
              style={{
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
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
            <div className="product">
              <div className="left">
                <ul>
                  <li>
                    <strong>Đơn hàng:</strong> Đơn hàng 1{" "}
                  </li>
                  <li className={keyMenu === "product" ? "active" : ""}>
                    <strong>Thông tin sản phẩm:</strong> Đồ chơi trẻ em{" "}
                    <FaEye
                      style={{ cursor: "pointer" }}
                      onClick={() => setKeyMenu("product")}
                    />
                  </li>
                  <li className={keyMenu === "package" ? "active" : ""}>
                    <strong>Package:</strong> Package 1{" "}
                    <FaEye
                      style={{ cursor: "pointer" }}
                      onClick={() => setKeyMenu("package")}
                    />
                  </li>
                  <li className={keyMenu === "status" ? "active" : ""}>
                    <strong>Trạng thái:</strong> Đang vận chuyển{" "}
                    <FaEye
                      style={{ cursor: "pointer" }}
                      onClick={() => setKeyMenu("status")}
                    />
                  </li>
                </ul>
              </div>
              <div className="right">
                {keyMenu === "product" && renderProduct()}
                {keyMenu === "package" && renderPackage()}
                {keyMenu === "status" && renderStatus()}
              </div>
            </div>
          </div>
        </div>
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
