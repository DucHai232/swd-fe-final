import React, { useState } from "react";
import { Input, InputNumber, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import optionAges from "../../../../data/optionAges.json";
const FillInformation = ({ formik, handleChangeImage, previewUrl }) => {
  const containerStyle = {
    padding: "12px",
  };
  return (
    <div style={containerStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "12px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "calc(50% - 8px)",
          }}
        >
          {" "}
          <Input
            placeholder="Tên box"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            style={{
              marginBottom: "14px",
              width: "100%",
            }}
          />
          {formik.errors.name && formik.touched.name && (
            <p
              style={{
                color: "red",
                marginBottom: "15px",
                marginTop: "-12px",
                fontSize: "12px",
              }}
            >
              {formik.errors.name}{" "}
            </p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "calc(50% - 8px)",
          }}
        >
          <Select
            name="age"
            onChange={(value) => formik.setFieldValue("age", value)}
            onBlur={formik.handleBlur}
            value={formik.values.age}
            placeholder="Chọn độ tuổi"
            style={{
              marginBottom: "4px",
              width: "100%",
            }}
            options={optionAges}
          />
          {formik.errors.age && formik.touched.age && (
            <p
              style={{
                color: "red",
                marginBottom: "15px",
                marginTop: "0px",
                fontSize: "12px",
              }}
            >
              {formik.errors.age}{" "}
            </p>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "12px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "calc(50% - 8px)",
          }}
        >
          <label style={{ fontSize: "12px" }}>Giá trung bình hộp quà</label>
          <InputNumber
            prefix="$"
            style={{
              width: "100%",
            }}
            name="priceAvarage"
            onChange={(value) => formik.setFieldValue("priceAvarage", value)}
            onBlur={formik.handleBlur}
            value={formik.values.priceAvarage}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
          {formik.errors.priceAvarage && formik.touched.priceAvarage && (
            <p
              style={{
                color: "red",
                marginBottom: "15px",
                marginTop: "0px",
                fontSize: "12px",
              }}
            >
              {formik.errors.priceAvarage}{" "}
            </p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "calc(50% - 8px)",
          }}
        >
          <label style={{ fontSize: "12px" }}>Số sản phẩm trong hộp quà</label>
          <InputNumber
            style={{
              width: "100%",
            }}
            name="quantityProInBox"
            onChange={(value) =>
              formik.setFieldValue("quantityProInBox", value)
            }
            onBlur={formik.handleBlur}
            value={formik.values.quantityProInBox}
          />
          {formik.errors.quantityProInBox &&
            formik.touched.quantityProInBox && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.quantityProInBox}{" "}
              </p>
            )}
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        <label style={{ fontSize: "12px" }}>Miêu tả hộp quà</label>
        <TextArea
          rows={4}
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.errors.description && formik.touched.description && (
          <p
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "-12px",
              fontSize: "12px",
            }}
          >
            {formik.errors.description}{" "}
          </p>
        )}
      </div>
      <label
        htmlFor="package-image"
        style={{
          border: "1px solid lightgray",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          minHeight: "300px",
        }}
      >
        <input
          type="file"
          hidden
          id="package-image"
          onChange={handleChangeImage}
        />
        <div className="choose-image">
          {previewUrl ? (
            <img
              src={previewUrl}
              style={{
                width: "300px",
                height: "300px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          ) : (
            <span style={{ cursor: "pointer" }}>
              Chọn ảnh dưới dạng jpg, jpeg, png
            </span>
          )}
        </div>
      </label>
    </div>
  );
};

export default FillInformation;
