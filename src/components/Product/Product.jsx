import React, { useState } from 'react'
import './Product.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import { Input, Pagination, Select, Space } from 'antd';
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

import toy from "/assets/toy.jpg"
import not_found from "/assets/not-found.png"

const Product = () => {
  const [themeValue, setThemeValue] = useState(null);
  const [ageValue, setAgeValue] = useState(null);
  const [genderValue, setGenderValue] = useState(null);
  const [colorValue, setColorValue] = useState(null);
  const [typeValue, setTypeValue] = useState(null);
  const [materialValue, setMaterialValue] = useState(null);
  const [originValue, setOriginValue] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const onSearch = (value, _e, info) => {
    // console.log(info?.source, value);
    setSearchTerm(value);
    setThemeValue(null);
    setAgeValue(null);
    setGenderValue(null);
    setColorValue(null);
    setTypeValue(null)
    setMaterialValue(null)
    setOriginValue(null)
    setCurrentPage(1);
  };

  const products = [
    { id: 1, image: toy, theme: 'Superheroes', code: 'SP-001', name: 'Superman', description: 'A powerful superhero action figure.', age: '3-6', gender: 'Unisex', color: 'Red', type: 'Robot', material: 'Plastic', origin: 'China' },
    { id: 2, image: toy, theme: 'Superheroes', code: 'SP-002', name: 'Batman', description: 'A dark knight superhero figure.', age: '6-9', gender: 'Male', color: 'Black', type: 'Robot', material: 'Plastic', origin: 'US' },
    { id: 3, image: toy, theme: 'Fantasy', code: 'FT-003', name: 'Elsa', description: 'Frozen queen with magical powers.', age: '9-12', gender: 'Female', color: 'Blue', type: 'Doll', material: 'Plastic', origin: 'Korea' },
    { id: 4, image: toy, theme: 'Animals', code: 'AN-004', name: 'Lion', description: 'King of the jungle plush toy.', age: '3-6', gender: 'Unisex', color: 'Yellow', type: 'Toys', material: 'Cloth', origin: 'Vietnam' },
    { id: 5, image: toy, theme: 'Fantasy', code: 'FT-005', name: 'Mermaid', description: 'A beautiful mermaid doll.', age: '6-9', gender: 'Female', color: 'Green', type: 'Doll', material: 'Plastic', origin: 'China' },
    { id: 6, image: toy, theme: 'Vehicles', code: 'VE-006', name: 'Race Car', description: 'High-speed toy race car.', age: '9-12', gender: 'Male', color: 'Red', type: 'Car', material: 'Plastic', origin: 'Thailand' },
    { id: 7, image: toy, theme: 'Music', code: 'MU-007', name: 'Drum Set', description: 'Miniature drum set for kids.', age: '12-15', gender: 'Unisex', color: 'Black', type: 'Drum', material: 'Plastic', origin: 'US' },
    { id: 8, image: toy, theme: 'Space', code: 'SP-008', name: 'Astronaut', description: 'A brave astronaut action figure.', age: '3-6', gender: 'Male', color: 'White', type: 'Robot', material: 'Plastic', origin: 'China' },
    { id: 9, image: toy, theme: 'Superheroes', code: 'SP-009', name: 'Wonder Woman', description: 'A strong and powerful heroine.', age: '6-9', gender: 'Female', color: 'Red', type: 'Robot', material: 'Plastic', origin: 'Korea' },
    { id: 10, image: toy, theme: 'Robots', code: 'RB-010', name: 'Robot X', description: 'A smart and friendly robot.', age: '9-12', gender: 'Unisex', color: 'Blue', type: 'Robot', material: 'Plastic', origin: 'Taiwan' },
    { id: 11, image: toy, theme: 'Sports', code: 'SP-011', name: 'Soccer Ball', description: 'A fun and durable soccer ball.', age: '12-15', gender: 'Unisex', color: 'Black', type: 'Balloon', material: 'Rubber', origin: 'Vietnam' },
    { id: 12, image: toy, theme: 'Animals', code: 'AN-012', name: 'Elephant', description: 'A cute and cuddly elephant plush.', age: '3-6', gender: 'Unisex', color: 'Gray', type: 'Toys', material: 'Cloth', origin: 'China' },
    { id: 13, image: toy, theme: 'Vehicles', code: 'VE-013', name: 'Train', description: 'A colorful toy train.', age: '6-9', gender: 'Unisex', color: 'Blue', type: 'Train', material: 'Plastic', origin: 'Singapore' },
    { id: 14, image: toy, theme: 'Superheroes', code: 'SP-014', name: 'Spiderman', description: 'A web-slinging superhero figure.', age: '9-12', gender: 'Male', color: 'Red', type: 'Robot', material: 'Plastic', origin: 'China' },
    { id: 15, image: toy, theme: 'Fantasy', code: 'FT-015', name: 'Fairy', description: 'A magical fairy doll.', age: '3-6', gender: 'Female', color: 'Pink', type: 'Doll', material: 'Plastic', origin: 'Thailand' },
    { id: 16, image: toy, theme: 'Animals', code: 'AN-016', name: 'Dinosaur', description: 'A realistic dinosaur toy.', age: '6-9', gender: 'Unisex', color: 'Green', type: 'Toys', material: 'Plastic', origin: 'Vietnam' },
    { id: 17, image: toy, theme: 'Vehicles', code: 'VE-017', name: 'Fire Truck', description: 'A toy fire truck with lights.', age: '9-12', gender: 'Male', color: 'Red', type: 'Car', material: 'Plastic', origin: 'US' },
    { id: 18, image: toy, theme: 'Music', code: 'MU-018', name: 'Guitar', description: 'A small toy guitar.', age: '12-15', gender: 'Unisex', color: 'Brown', type: 'Toys', material: 'Wood', origin: 'China' },
    { id: 19, image: toy, theme: 'Space', code: 'SP-019', name: 'Rocket', description: 'A colorful toy rocket.', age: '3-6', gender: 'Unisex', color: 'White', type: 'Toys', material: 'Plastic', origin: 'Korea' },
    { id: 20, image: toy, theme: 'Fantasy', code: 'FT-020', name: 'Dragon', description: 'A fierce dragon toy.', age: '6-9', gender: 'Unisex', color: 'Green', type: 'Toys', material: 'Plastic', origin: 'Taiwan' },
    { id: 21, image: toy, theme: 'Animals', code: 'AN-021', name: 'Panda', description: 'A cute panda plush toy.', age: '9-12', gender: 'Unisex', color: 'Black', type: 'Toys', material: 'Cloth', origin: 'Vietnam' },
    { id: 22, image: toy, theme: 'Superheroes', code: 'SP-022', name: 'Iron Man', description: 'A genius billionaire playboy philanthropist.', age: '12-15', gender: 'Male', color: 'Red', type: 'Robot', material: 'Plastic', origin: 'US' },
  ];

  const pageSize = 21;

  const filteredProducts = products.filter(product => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (!themeValue || product.theme === themeValue) &&
      (!ageValue || product.age === ageValue) &&
      (!genderValue || product.gender.toLowerCase() === genderValue) &&
      (!colorValue || product.color === colorValue) &&
      (!typeValue || product.type === typeValue) &&
      (!materialValue || product.material === materialValue) &&
      (!originValue || product.origin === originValue) &&
      (
        !searchTerm ||
        product.theme.toLowerCase().includes(searchTermLower) ||
        product.code.toLowerCase().includes(searchTermLower) ||
        product.name.toLowerCase().includes(searchTermLower) ||
        product.description.toLowerCase().includes(searchTermLower) ||
        product.age.toLowerCase().includes(searchTermLower) ||
        product.gender.toLowerCase().includes(searchTermLower) ||
        product.color.toLowerCase().includes(searchTermLower) ||
        product.type.toLowerCase().includes(searchTermLower) ||
        product.material.toLowerCase().includes(searchTermLower) ||
        product.origin.toLowerCase().includes(searchTermLower)
      )
    );
  });

  // const paginatedProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleChangePage = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }

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
                width: '59%',
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
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              size="large"
              allowClear
              style={{
                width: '18%',
              }}
              options={[
                { value: 'Superheroes', label: 'Superheroes' },
                { value: 'Fantasy', label: 'Fantasy' },
                { value: 'Animals', label: 'Animals' },
                { value: 'Vehicles', label: 'Vehicles' },
                { value: 'Music', label: 'Music' },
                { value: 'Space', label: 'Space' },
                { value: 'Robots', label: 'Robots' },
                { value: 'Sports', label: 'Sports' },
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
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              size="large"
              allowClear
              style={{
                width: '18%',
              }}
              options={[
                { value: '3-6', label: '3-6' },
                { value: '6-9', label: '6-9' },
                { value: '9-12', label: '9-12' },
                { value: '12-15', label: '12-15' },
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
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              size="large"
              allowClear
              style={{
                width: '18%',
                marginTop: '20px'
              }}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'unisex', label: 'Unisex' },
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
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              size="large"
              allowClear
              style={{
                width: '18%',
                marginTop: '20px'
              }}
              options={[
                { value: 'Red', label: 'Red' },
                { value: 'Orange', label: 'Orange' },
                { value: 'Black', label: 'Black' },
                { value: 'Green', label: 'Green' },
                { value: 'Blue', label: 'Blue' },
                { value: 'Yellow', label: 'Yellow' },
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
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              size="large"
              allowClear
              style={{
                width: '18%',
                marginTop: '20px'
              }}
              options={[
                { value: 'Toys', label: 'Toys' },
                { value: 'Robot', label: 'Robot' },
                { value: 'Doll', label: 'Doll' },
                { value: 'Drum', label: 'Drum' },
                { value: 'Car', label: 'Car' },
                { value: 'Balloon', label: 'Balloon' },
                { value: 'Train', label: 'Train' },
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
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              size="large"
              allowClear
              style={{
                width: '18%',
                marginTop: '20px'
              }}
              options={[
                { value: 'Wood', label: 'Wood' },
                { value: 'Glass', label: 'Glass' },
                { value: 'Plastic', label: 'Plastic' },
                { value: 'Aluminium', label: 'Aluminium' },
                { value: 'Copper', label: 'Copper' },
                { value: 'Steel', label: 'Steel' },
                { value: 'Cloth', label: 'Cloth' },
                { value: 'Rubber', label: 'Rubber' },
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
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              size="large"
              allowClear
              style={{
                width: '18%',
                marginTop: '20px'
              }}
              options={[
                { value: 'China', label: 'China' },
                { value: 'Korea', label: 'Korea' },
                { value: 'US', label: 'US' },
                { value: 'Taiwan', label: 'Taiwan' },
                { value: 'Vietnam', label: 'Vietnam' },
                { value: 'Thailand', label: 'Thailand' },
                { value: 'Singapore', label: 'Singapore' },
              ]}
            />
          </div>

          <div className="product-list">
            {paginatedProducts.length === 0 ? (
              <div className="not-found">
                <img src={not_found} />
                <p className="no-product">The product you are looking for is currently not available.</p>
              </div>
            ) : (
              paginatedProducts.map(product => (
                <div className="product-item" key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <div className="product-title">
                    <p>{product.theme}</p>
                    <p>{product.code}</p>
                  </div>
                  <p className="product-name">{product.name.toUpperCase()} {product.code}</p>
                  <p className="product-des">{product.description}</p>
                  <div className="product-info">
                    <p className="product-info-item">Age: {product.age}</p>
                    <p className="product-info-item">Gender: {product.gender}</p>
                    <p className="product-info-item">Color: {product.color}</p>
                    <p className="product-info-item">Type: {product.type}</p>
                    <p className="product-info-item">Material: {product.material}</p>
                    <p className="product-info-item">Origin: {product.origin}</p>
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
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Product