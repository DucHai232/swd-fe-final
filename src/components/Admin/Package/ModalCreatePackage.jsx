import { Input, InputNumber, Modal, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { createPackage } from "../../../apis/package.request";
import optionAges from "../../../data/optionAges.json";
const ModalCreatePackage = ({
  isModalOpen,
  handleCancel,
  setIsOpenCreate,
  setCallback,
}) => {
  const formik = useFormik({
    initialValues: {
      age: "",
      name: "",
      description: "",
      price: "",
      numberOfSend: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên package"),
      age: Yup.string().required("Vui lòng chọn độ tuổi phù hợp"),
      description: Yup.string().required("Vui lòng nhập miêu tả package"),
      price: Yup.number().required("Vui lòng nhập giá thành package"),
      numberOfSend: Yup.number().required(
        "Vui lòng nhập số lần gửi quà package"
      ),
    }),
    onSubmit: async (values) => {
      try {
        const response = await createPackage(values);
        if (response.data.success) {
          message.success(response.data.message);
          setIsOpenCreate(false);
          setCallback((prev) => !prev);
        } else {
          message.success(response.data.message);
        }
      } catch (error) {}
    },
  });

  return (
    <>
      <Modal
        title="Tạo package"
        open={isModalOpen}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        okText="Tạo package"
        cancelText="Hủy"
      >
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
            <Input
              placeholder="Tên package"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              style={{ marginBottom: "15px" }}
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

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(50% - 8px)",
            }}
          >
            <label style={{ fontSize: "12px" }}>Giá package</label>
            <InputNumber
              prefix="$"
              style={{
                width: "100%",
              }}
              name="price"
              onChange={(value) => formik.setFieldValue("price", value)}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
            {formik.errors.price && formik.touched.price && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.price}{" "}
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
            <label style={{ fontSize: "12px" }}>Số lần gửi quà</label>
            <InputNumber
              style={{
                width: "100%",
              }}
              name="numberOfSend"
              onChange={(value) => formik.setFieldValue("numberOfSend", value)}
              onBlur={formik.handleBlur}
              value={formik.values.numberOfSend}
            />
            {formik.errors.numberOfSend && formik.touched.numberOfSend && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.numberOfSend}{" "}
              </p>
            )}
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label style={{ fontSize: "12px" }}>Miêu tả</label>
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
                marginTop: "-10px",
                fontSize: "12px",
              }}
            >
              {formik.errors.description}{" "}
            </p>
          )}
        </div>
        {/* <label
          htmlFor="package-image"
          style={{
            border: "1px solid black",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            minHeight: "300px",
          }}
        >
          <input type="file" hidden id="package-image" onChange={handleImage} />
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
        </label> */}
      </Modal>
    </>
  );
};

export default ModalCreatePackage;
