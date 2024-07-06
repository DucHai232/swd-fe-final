import React, { useEffect, useState } from "react";
import { getProduct } from "../../../../apis/product.request";
import { CheckSquareOutlined } from "@ant-design/icons";
import { Card, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { loadFromLocalstorage } from "../../../../utils/LocalstorageMySteryBox";
const ListProduct = ({
  selectedProductsId,
  setSelectedProductsId,
  selectedThemeId,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [maximunChoosseProduct, setMaximumChooseProduct] = useState(4);
  useEffect(() => {
    const loadData = loadFromLocalstorage("data-box");
    setMaximumChooseProduct(loadData?.quantityProInBox);
    const fetchData = async () => {
      const response = await getProduct("", "", "", "", "", "", "", 1);
      const filterProducts = response.data?.products?.filter(
        (el) => el.themeId === selectedThemeId
      );
      setProducts(filterProducts);
      setLoading(true);
    };
    fetchData();
  }, []);
  const conatinerStyle = {
    padding: "12px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 2fr)",
    gap: "12px",
    margin: "0 auto",
    alignItems: "center",
    justifyItems: "center",
  };
  const toggleSelectProduct = (productId, quantity) => {
    if (
      selectedProductsId.length >= maximunChoosseProduct &&
      !selectedProductsId.includes(productId)
    ) {
      Modal.warning({
        title: "Maximum product selection reached",
        content: `You can select up to ${maximunChoosseProduct} products.`,
      });
    } else if (quantity === 0) {
      Modal.confirm({
        title: "This product is out of stock",
        content: "Please add more products",
        okText: "Ok",
      });
    } else {
      handleSelectProduct(productId);
    }
  };

  const handleSelectProduct = (productId) => {
    if (selectedProductsId.includes(productId)) {
      setSelectedProductsId(
        selectedProductsId.filter((id) => id !== productId)
      );
    } else {
      setSelectedProductsId([...selectedProductsId, productId]);
    }
  };

  return (
    <div style={conatinerStyle}>
      {products.length > 0 ? (
        products.map((product) => (
          <Card
            onClick={() => toggleSelectProduct(product.id, product.quantity)}
            style={{
              width: 300,
              border: selectedProductsId.includes(product.id)
                ? "3px solid blue"
                : "",
            }}
            cover={
              <img
                alt="example"
                style={{ height: "300px", objectFit: "cover" }}
                src={product?.images[0]}
              />
            }
            actions={[
              <CheckSquareOutlined
                style={{
                  color: selectedProductsId.includes(product.id)
                    ? "blue"
                    : "gray",
                }}
              />,
            ]}
          >
            <ul>
              <li>
                <strong>Tên:</strong> {product?.name}
              </li>
              <li>
                <strong>Mã sản phẩm:</strong> {product?.productCode}
              </li>
              <li>
                <strong>Màu sắc:</strong> {product?.color}
              </li>
              <li>
                <strong>Giới tính:</strong> {product?.gender}
              </li>
              <li>
                <strong>Chất liệu:</strong> {product?.material}
              </li>
              <li>
                <strong>Giá:</strong> {product?.price}
              </li>
            </ul>
          </Card>
        ))
      ) : (
        <div>abc</div>
      )}
    </div>
  );
};

export default ListProduct;
