import React, { useEffect, useState } from "react";
import "./Product.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Input, Pagination, Select, Space } from "antd";
const { Search } = Input;
import not_found from "/assets/not-found.png";
import { getProduct } from "../../apis/product.request";
import optionGender from "../../data/optionGender.json";
import optionColors from "../../data/optionColors.json";
import optionOrigins from "../../data/optionOrigins.json";
import optionMaterials from "../../data/optionMaterials.json";
import optionTypes from "../../data/optionTypes.json";
import optionAges from "../../data/optionAges.json";
import { getThemes } from "../../apis/theme.request";
const Product = () => {
  const [themeValue, setThemeValue] = useState(null);
  const [ageValue, setAgeValue] = useState(null);
  const [genderValue, setGenderValue] = useState(null);
  const [colorValue, setColorValue] = useState(null);
  const [typeValue, setTypeValue] = useState(null);
  const [materialValue, setMaterialValue] = useState(null);
  const [originValue, setOriginValue] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    const fetchDataProduct = async () => {
      const response = await getProduct("", "", "", "", "", "", "", "");
      setProducts(response.data?.products || []);
    };
    const fetchTheme = async () => {
      const response = await getThemes("", 1);
      setThemes(response.data?.themes);
    };
    fetchDataProduct();
    fetchTheme();
  }, []);

  const onSearch = (value) => {
    setSearchTerm(value.trim().toLowerCase());
  };

  const pageSize = 21;

  const filteredProducts = products.filter((product) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (!themeValue || product.themeId === themeValue) &&
      (!ageValue || product.age === ageValue) &&
      (!genderValue || product.gender === genderValue) &&
      (!colorValue || product.color === colorValue) &&
      (!typeValue || product.type === typeValue) &&
      (!materialValue || product.material === materialValue) &&
      (!originValue || product.origin === originValue) &&
      (!searchTerm ||
        product.theme?.toLowerCase().includes(searchTermLower) ||
        product.code?.toLowerCase().includes(searchTermLower) ||
        product.name?.toLowerCase().includes(searchTermLower) ||
        product.description?.toLowerCase().includes(searchTermLower) ||
        product.age?.toLowerCase().includes(searchTermLower) ||
        product.gender?.toLowerCase().includes(searchTermLower) ||
        product.color?.toLowerCase().includes(searchTermLower) ||
        product.type?.toLowerCase().includes(searchTermLower) ||
        product.material?.toLowerCase().includes(searchTermLower) ||
        product.origin?.toLowerCase().includes(searchTermLower))
    );
  });

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleChangePage = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <Header />

      <div className="product-whole-container">
        <div className="product-container">
          <div className="find-product">
            <Search
              placeholder="Search Product"
              allowClear
              enterButton
              size="large"
              style={{ width: "59%" }}
              onSearch={onSearch}
            />

            <Select
              className="select-product"
              showSearch
              placeholder="All Themes"
              value={themeValue}
              onChange={(value) => {
                setThemeValue(value);
                setCurrentPage(1);
              }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              size="large"
              allowClear
              style={{
                width: "18%",
              }}
              options={themes.map((theme) => ({
                value: theme.id,
                label: theme.name,
              }))}
            />

            <Select
              className="select-product"
              showSearch
              placeholder="All Ages"
              value={ageValue}
              onChange={(value) => {
                setAgeValue(value);
                setCurrentPage(1);
              }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              size="large"
              allowClear
              style={{
                width: "18%",
              }}
              options={optionAges}
            />

            <Select
              className="select-product"
              showSearch
              placeholder="All Genders"
              value={genderValue}
              onChange={(value) => {
                setGenderValue(value);
                setCurrentPage(1);
              }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              size="large"
              allowClear
              style={{
                width: "18%",
                marginTop: "20px",
              }}
              options={optionGender}
            />
            <Select
              className="select-product"
              showSearch
              placeholder="All Colors"
              value={colorValue}
              onChange={(value) => {
                setColorValue(value);
                setCurrentPage(1);
              }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              size="large"
              allowClear
              style={{
                width: "18%",
                marginTop: "20px",
              }}
              options={optionColors}
            />

            <Select
              className="select-product"
              showSearch
              placeholder="All Types"
              value={typeValue}
              onChange={(value) => {
                setTypeValue(value);
                setCurrentPage(1);
              }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              size="large"
              allowClear
              style={{
                width: "18%",
                marginTop: "20px",
              }}
              options={optionTypes}
            />

            <Select
              className="select-product"
              showSearch
              placeholder="All Materials"
              value={materialValue}
              onChange={(value) => {
                setMaterialValue(value);
                setCurrentPage(1);
              }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              size="large"
              allowClear
              style={{
                width: "18%",
                marginTop: "20px",
              }}
              options={optionMaterials}
            />

            <Select
              className="select-product"
              showSearch
              placeholder="All Origins"
              value={originValue}
              onChange={(value) => {
                setOriginValue(value);
                setCurrentPage(1);
              }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              size="large"
              allowClear
              style={{
                width: "18%",
                marginTop: "20px",
              }}
              options={optionOrigins}
            />
          </div>

          <div className="product-list">
            {paginatedProducts.length === 0 ? (
              <div className="not-found">
                <img src={not_found} />
                <p className="no-product">
                  The product you are looking for is currently not available.
                </p>
              </div>
            ) : (
              paginatedProducts.map((product) => (
                <div className="product-item" key={product.id}>
                  <img src={product.images[0]} alt={product.name} />
                  <div className="product-title">
                    <p>{product.theme}</p>
                    <p>{product.productCode}</p>
                  </div>
                  <p className="product-name">{product.name.toUpperCase()}</p>
                  <p className="product-des">{product.description}</p>
                  <div className="product-info">
                    {/* <p className="product-info-item">Age: {product.age}</p> */}
                    <p className="product-info-item">
                      Gender: {product.gender}
                    </p>
                    <p className="product-info-item">Color: {product.color}</p>
                    <p className="product-info-item">Type: {product.type}</p>
                    <p className="product-info-item">
                      Material: {product.material}
                    </p>
                    <p className="product-info-item">
                      Origin: {product.origin}
                    </p>
                  </div>
                </div>
              ))
            )}

            <Pagination
              current={currentPage}
              // total={products.length}
              total={filteredProducts.length}
              pageSize={pageSize}
              showSizeChanger={false}
              showQuickJumper
              // showTotal={(total) => `Total ${total} items`}
              onChange={handleChangePage}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Product;
