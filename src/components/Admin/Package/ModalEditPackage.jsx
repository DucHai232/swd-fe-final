import { Input, InputNumber, Modal, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { updatePackage } from "../../../apis/package.request";
import optionAges from "../../../data/optionAges.json";

const ModalEditPackage = ({
  isModalOpen,
  handleCancel,
  setIsOpenEdit,
  setCallback,
  packageData,
}) => {
  const formik = useFormik({
    initialValues: {
      age: packageData.age || "",
      name: packageData.name || "",
      description: packageData.description || "",
      price: packageData.price || "",
      numberOfSend: packageData.numberOfSend || "",
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
        const response = await updatePackage(packageData.id, values);
        if (response.data.success) {
          message.success(response.data.message);
          setIsOpenEdit(false);
          setCallback((prev) => !prev);
        } else {
          message.success(response.data.message);
        }
      } catch (error) {}
    },
  });

  useEffect(() => {
    formik.setValues({
      age: packageData.age || "",
      name: packageData.name || "",
      description: packageData.description || "",
      price: packageData.price || "",
      numberOfSend: packageData.numberOfSend || "",
    });
  }, [packageData]);

  return (
    <>
      <Modal
        title="Chỉnh sửa package"
        open={isModalOpen}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        okText="Lưu thay đổi"
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
      </Modal>
    </>
  );
};

export default ModalEditPackage;
