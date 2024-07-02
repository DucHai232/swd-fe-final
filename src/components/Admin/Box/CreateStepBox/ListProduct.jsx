import React, { useEffect, useState } from "react";
import { getProduct } from "../../../../apis/product.request";
import { CheckSquareOutlined } from "@ant-design/icons";
import { Card } from "antd";
const ListProduct = ({
  selectedProductsId,
  setSelectedProductsId,
  selectedThemeId,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
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
  console.log(products);
  const conatinerStyle = {
    padding: "12px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 2fr)",
    gap: "12px",
    margin: "0 auto",
    alignItems: "center",
    justifyItems: "center",
  };
  const toggleSelectProduct = (productId) => {
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
            onClick={() => toggleSelectProduct(product.id)}
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
