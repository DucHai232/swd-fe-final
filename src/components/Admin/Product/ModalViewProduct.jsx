import { Carousel, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { getProductById } from "../../../apis/product.request";

const ModalViewProduct = ({
  productId,
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const [dataProduct, setDataProduct] = useState({});
  const [currentImage, setCurrentImage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductById(productId);
      setCurrentImage(response?.data.product?.images[0]);
      setDataProduct(response.data);
    };
    fetchData();
  }, [productId]);
  const handleThumbnailClick = (img) => {
    setCurrentImage(img);
  };
  return (
    <Modal
      title="Chi tiết sản phẩm"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      className="modal-custom-width"
    >
      <div className="view-container">
        <div className="images">
          <img src={currentImage} className="image-view" />
          <div className="list-images">
            <ul>
              {dataProduct?.product?.images?.map((item) => (
                <li key={item.id}>
                  <img
                    src={item}
                    className="image"
                    alt={`Slide ${item.id}`}
                    onClick={() => handleThumbnailClick(item)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="view-infomation">
          <h4>Thông tin sản phẩm</h4>
          <ul>
            <li>
              <b>Tên sản phẩm: </b>
              {dataProduct?.product?.name}
            </li>
            <li>
              <b>Giá sản phẩm: </b>
              {dataProduct?.product?.price.toLocaleString("vi-VN")} vnđ
            </li>
            <li>
              <b>Thuộc Box: </b>
              {dataProduct?.product?.box?.name}
            </li>
            <li>
              <b>Thuôc theme: </b>
              {dataProduct?.product?.theme?.name}
            </li>
            <li>
              <b>Miêu tả: </b>
              {dataProduct?.product?.description}
            </li>
            <li>
              <b>Số lượng: </b>
              {dataProduct?.product?.quantity}
            </li>
            <li>
              <b>Giới tính: </b>
              {dataProduct?.product?.gender}
            </li>
            <li>
              <b>Màu sắc: </b>
              {dataProduct?.product?.color}
            </li>
            <li>
              <b>Loại đồ chơi: </b>
              {dataProduct?.product?.type}
            </li>
            <li>
              <b>Nguồn gốc: </b>
              {dataProduct?.product?.origin}
            </li>
            <li>
              <b>Vật liệu: </b>
              {dataProduct?.product?.material}
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default ModalViewProduct;
