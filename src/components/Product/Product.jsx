import React, { useEffect, useState } from "react";
import "./Product.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { Input, Pagination, Select, Space } from "antd";
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

import toy from "/assets/toy.jpg";
import not_found from "/assets/not-found.png";
import { getProduct } from "../../apis/product.request";

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
  useEffect(() => {
    const fetchDataProduct = async () => {
      const response = await getProduct("", "", "", "", "", "", "", "");
      setProducts(response.data?.products);
    };
    fetchDataProduct();
  }, []);

  const onSearch = (value, _e, info) => {
    setSearchTerm(value);
    setThemeValue(null);
    setAgeValue(null);
    setGenderValue(null);
    setColorValue(null);
    setTypeValue(null);
    setMaterialValue(null);
    setOriginValue(null);
    setCurrentPage(1);
  };

  const pageSize = 21;

  const filteredProducts = products.filter((product) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (!themeValue || product.theme === themeValue) &&
      (!ageValue || product.age === ageValue) &&
      (!genderValue || product.gender.toLowerCase() === genderValue) &&
      (!colorValue || product.color === colorValue) &&
      (!typeValue || product.type === typeValue) &&
      (!materialValue || product.material === materialValue) &&
      (!originValue || product.origin === originValue) &&
      (!searchTerm ||
        product.theme.toLowerCase().includes(searchTermLower) ||
        product.code.toLowerCase().includes(searchTermLower) ||
        product.name.toLowerCase().includes(searchTermLower) ||
        product.description.toLowerCase().includes(searchTermLower) ||
        product.age.toLowerCase().includes(searchTermLower) ||
        product.gender.toLowerCase().includes(searchTermLower) ||
        product.color.toLowerCase().includes(searchTermLower) ||
        product.type.toLowerCase().includes(searchTermLower) ||
        product.material.toLowerCase().includes(searchTermLower) ||
        product.origin.toLowerCase().includes(searchTermLower))
    );
  });

  // const paginatedProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);
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
              // enterButton="Search"
              enterButton
              size="large"
              style={{
                width: "59%",
              }}
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
              options={[
                { value: "Superheroes", label: "Superheroes" },
                { value: "Fantasy", label: "Fantasy" },
                { value: "Animals", label: "Animals" },
                { value: "Vehicles", label: "Vehicles" },
                { value: "Music", label: "Music" },
                { value: "Space", label: "Space" },
                { value: "Robots", label: "Robots" },
                { value: "Sports", label: "Sports" },
              ]}
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
              options={[
                { value: "3-6", label: "3-6" },
                { value: "6-9", label: "6-9" },
                { value: "9-12", label: "9-12" },
                { value: "12-15", label: "12-15" },
              ]}
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
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "unisex", label: "Unisex" },
              ]}
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
              options={[
                { value: "Red", label: "Red" },
                { value: "Orange", label: "Orange" },
                { value: "Black", label: "Black" },
                { value: "Green", label: "Green" },
                { value: "Blue", label: "Blue" },
                { value: "Yellow", label: "Yellow" },
              ]}
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
              options={[
                { value: "Toys", label: "Toys" },
                { value: "Robot", label: "Robot" },
                { value: "Doll", label: "Doll" },
                { value: "Drum", label: "Drum" },
                { value: "Car", label: "Car" },
                { value: "Balloon", label: "Balloon" },
                { value: "Train", label: "Train" },
              ]}
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
              options={[
                { value: "Wood", label: "Wood" },
                { value: "Glass", label: "Glass" },
                { value: "Plastic", label: "Plastic" },
                { value: "Aluminium", label: "Aluminium" },
                { value: "Copper", label: "Copper" },
                { value: "Steel", label: "Steel" },
                { value: "Cloth", label: "Cloth" },
                { value: "Rubber", label: "Rubber" },
              ]}
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
              options={[
                { value: "China", label: "China" },
                { value: "Korea", label: "Korea" },
                { value: "US", label: "US" },
                { value: "Taiwan", label: "Taiwan" },
                { value: "Vietnam", label: "Vietnam" },
                { value: "Thailand", label: "Thailand" },
                { value: "Singapore", label: "Singapore" },
              ]}
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
