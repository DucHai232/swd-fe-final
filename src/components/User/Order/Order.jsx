import React, { useEffect, useState } from "react";
import "./Order.css";
import { getPackageOrderByUserId } from "../../../apis/package-order.request";
import { formatDateSplitT } from "../../../utils/FormatDate";
import { getPackage } from "../../../apis/package.request";
import { Breadcrumb, Button, message } from "antd";
import { FaEye } from "react-icons/fa";
import ChooseProduct from "./ChooseProduct";
import {
  getAllPackageInPeriods,
  getDataPackagePeriodOfPackageOrder,
} from "../../../apis/packageInPeriods.request";
import { saveLocalstorage } from "../../../utils/LocalstorageMySteryBox";
import { getProductById } from "../../../apis/product.request";
import { getBoxById } from "../../../apis/box.request";

const Order = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [packages, setPackages] = useState([]);
  const [openChooseProduct, setOpenChooseProduct] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [dataPackagePeriods, setDataPackagePeriods] = useState([]);
  const [keyMenu, setKeyMenu] = useState(null);
  const [currentPackageOrderId, setCurrentPackageOrderId] = useState(null);
  const [currentDetailIndex, setCurrentDetailIndex] = useState({});
  const [packageId, setPackageId] = useState(null);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const [viewProduct, setViewProduct] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
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
    return packageItem ? packageItem.name : "Không có package";
  };
  const getPackageNumberOfSend = (packageId) => {
    const packageItem = packages?.find((pkg) => pkg.id == packageId);
    return packageItem ? parseInt(packageItem.numberOfSend) : 1;
  };

  const renderPackage = (packageId) => {
    const packageItem = packages?.find((pkg) => pkg.id === packageId);
    return (
      <ul className="list-data">
        <li>
          <strong>Tên package: </strong>
          {packageItem?.name}
        </li>
        <li>
          <strong>Giá package: </strong>
          {packageItem?.price}
        </li>
        <li>
          <strong>Số lần gửi: </strong>
          {packageItem?.numberOfSend}
        </li>
      </ul>
    );
  };

  const handleShowDetail = async (packageOrderId, packageId) => {
    setCurrentPackageOrderId(packageOrderId);
    setPackageId(packageId);
    const order = dataOrder.find((el) => el.id === packageOrderId);
    const dataConfirmInfo = {
      kidId: order?.kidId,
      nameOfKid: order?.nameOfKid,
      nameOfAdult: order?.nameOfAdult,
      address: order?.address,
      phone: order?.phone,
    };
    saveLocalstorage("data-confirm", dataConfirmInfo);
    const response = await getDataPackagePeriodOfPackageOrder(packageOrderId);
    setDataPackagePeriods(response.data?.data);
    setShowDetail(true);
  };

  const handleBreadcrumb = () => {
    setKeyMenu(null);
    setShowDetail(false);
    setCurrentDetailIndex({});
    setOpenChooseProduct(false);
  };

  const renderProduct = () => (
    <ul className="list-data">
      <li>
        <strong>Tên sản phẩm: </strong>
        {product?.name}
      </li>
      <li>
        <strong>Miêu tả: </strong>
        {product?.description}
      </li>
      <li>
        <strong>Màu sắc: </strong>
        {product?.color}
      </li>
      <li>
        <strong>Xuất xứ: </strong>
        {product?.origin}
      </li>
      <li>
        <strong>Chất liệu: </strong>
        {product?.material}
      </li>
      <li>
        <strong>Loại đồ chơi: </strong>
        {product?.type}
      </li>
    </ul>
  );

  const handleOpenNextBox = () => {
    const latestPackagePeriod =
      dataPackagePeriods[dataPackagePeriods.length - 1];
    if (latestPackagePeriod && latestPackagePeriod.dates.confirmDate) {
      setOpenChooseProduct(true);
    } else {
      message.warning("Gói hàng nhỏ chưa giao xong vui lòng chờ đợi");
    }
  };

  const renderStatus = (data) => (
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
        <strong>Thời gian vận chuyển: </strong>
        {formatDateSplitT(data?.deliveryDate) || "Đang thực hiện"}
      </li>
      <li>
        <strong>Xác nhận giao hàng: </strong>
        {formatDateSplitT(data?.confirmDate) || "Đang thực hiện"}
      </li>
    </ul>
  );

  const renderTextStatus = (status) => {
    switch (status) {
      case "OPEN":
        return "Đang xác nhận";
      case "PACK":
        return "Đang đóng gói";
      case "DELIVERY":
        return "Đang vận chuyển";
      case "CONFIRM":
        return "Giao hàng thành công";
      default:
        return "";
    }
  };

  const handleDetailClick = (index, type) => {
    setCurrentDetailIndex({ index, type });
  };

  const viewProductInBox = async (packageInPeriodId, index) => {
    const res = await getAllPackageInPeriods();
    const result = res.data?.packageInPeriods?.filter(
      (el) => el.id === packageInPeriodId
    )[0];
    if (result) {
      const responseBox = await getBoxById(result?.boxId);
      setProducts(responseBox.data.box[0].productsId);
      setViewProduct(index);
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
                        onClick={handleBreadcrumb}
                        style={{ cursor: "pointer" }}
                      >
                        Orders
                      </p>
                    ),
                  },
                  { title: <p>Detail</p> },
                ]}
              />
            </div>
            <div className="list-product">
              <header>Thông tin chi tiết</header>
              <div className="general-information">
                <div className="panel-left card">
                  <h2>Gói package</h2>
                  <div>{renderPackage(packageId)}</div>
                </div>
                <div className="panel-right card">
                  <h2>Số gói còn lại</h2>
                  <h3>
                    {getPackageNumberOfSend(packageId) -
                      dataPackagePeriods.length}
                  </h3>
                </div>
              </div>
              {dataPackagePeriods.map((el, index) => (
                <div className="product" key={index}>
                  <div className="left">
                    <ul>
                      <li>
                        <strong>Đơn hàng:</strong> Đơn hàng {index + 1}
                      </li>
                      {el.dates.confirmDate && (
                        <li className={keyMenu === "product" ? "active" : ""}>
                          {el.packageOrder.packageInPeriodIds.map(
                            (item, index) => (
                              <Button
                                onClick={() => viewProductInBox(item, index)}
                              >
                                Sản phẩm {index + 1}
                              </Button>
                            )
                          )}
                        </li>
                      )}

                      <li className={keyMenu === "status" ? "active" : ""}>
                        <strong>Trạng thái:</strong>{" "}
                        {renderTextStatus(el.status)}{" "}
                        <FaEye
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDetailClick(index, "status")}
                        />
                      </li>
                    </ul>
                  </div>
                  <div className="right">
                    {viewProduct === index && renderProduct()}
                    {currentDetailIndex.index === index &&
                      currentDetailIndex.type === "package" &&
                      renderPackage(el.packages)}
                    {currentDetailIndex.index === index &&
                      currentDetailIndex.type === "status" &&
                      renderStatus(el.dates)}
                  </div>
                </div>
              ))}
            </div>
            {getPackageNumberOfSend(packageId) > dataPackagePeriods.length && (
              <button
                className="btn-product-next"
                // onClick={() => setOpenChooseProduct(true)}
                onClick={() => handleOpenNextBox()}
              >
                Chọn sản phẩm tiếp theo
              </button>
            )}
          </div>
        ) : (
          <ChooseProduct
            handleBreadcrumb={handleBreadcrumb}
            setOpenChooseProduct={setOpenChooseProduct}
            packageOrderId={currentPackageOrderId}
            setShowDetail={setShowDetail}
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
                    <button
                      onClick={() => handleShowDetail(item.id, item.packageId)}
                    >
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
