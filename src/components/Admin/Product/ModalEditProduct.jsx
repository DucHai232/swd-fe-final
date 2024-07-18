import { Input, InputNumber, Modal, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import optionColors from "../../../data/optionColors.json";
import optionOrigins from "../../../data/optionOrigins.json";
import optionGenders from "../../../data/optionGender.json";
import optionMaterials from "../../../data/optionMaterials.json";
import optionTypes from "../../../data/optionTypes.json";
import optionAges from "../../../data/optionAges.json";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import store from "../../../store/ReduxStore";
import { updateProduct } from "../../../apis/product.request";
// import { updateProduct } from "../../../redux/actions/product.action";

const ModalEditProduct = ({
  isOpenEdit,
  handleCancelEdit,
  setCallback,
  initialValues,
}) => {
  const formik = useFormik({
    initialValues: {
      productCode: initialValues?.productCode || "",
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      price: initialValues?.price || "",
      quantity: initialValues?.quantity || "",
    },
    validationSchema: Yup.object({
      productCode: Yup.string().required("Vui lòng nhập mã sản phẩm"),
      name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
      description: Yup.string().required("Vui lòng miêu tả sản phẩm"),
      price: Yup.string()
        .required("Vui lòng nhập giá sản phẩm")
        .test(
          "max-price",
          "Giá sản phẩm không được vượt quá 100.000 vnd",
          (value) => parseFloat(value) <= 100000
        ),
      quantity: Yup.number().required("Vui lòng nhập số lượng sản phẩm"),
    }),
    onSubmit: async (values) => {
      try {
        const responseUpdate = await updateProduct(values?.id, values);
        console.log(responseUpdate);
        if (responseUpdate.data.success) {
          message.success(responseUpdate.data.message);
          setCallback((prev) => !prev);
          handleCancelEdit();
        } else {
          message.error(responseUpdate.data.message);
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },
  });

  useEffect(() => {
    if (initialValues) {
      formik.setValues({
        id: initialValues?.id || "",
        productCode: initialValues?.productCode || "",
        name: initialValues?.name || "",
        description: initialValues?.description || "",
        price: initialValues?.price || "",
        quantity: initialValues?.quantity || "",
        age: initialValues?.age || "",
        color: initialValues?.color || "",
        createdAt: initialValues?.createdAt || "",
        gender: initialValues?.gender || "",
        images: initialValues?.images || [],
        material: initialValues?.material || "",
        origin: initialValues?.origin || "",
        status: initialValues?.status || false,
        themeId: initialValues?.themeId || "",
        type: initialValues?.type || "",
      });
    }
  }, [initialValues]);

  return (
    <div>
      <Modal
        title="Chỉnh sửa sản phẩm"
        centered
        open={isOpenEdit}
        onOk={formik.handleSubmit}
        onCancel={handleCancelEdit}
        width={1000}
        okText="Lưu chỉnh sửa"
        cancelText="Hủy"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(50% - 8px)",
            }}
          >
            <label>Tên sản phẩm</label>
            <Input
              placeholder="Tên sản phẩm"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "-10px",
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
            <label>Giá tiền</label>
            <InputNumber
              placeholder="Giá tiền"
              name="price"
              onChange={(value) => formik.setFieldValue("price", value)}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              style={{ width: "100%" }}
            />
            {formik.errors.price && formik.touched.price && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "2px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.price}{" "}
              </p>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(50% - 8px)",
            }}
          >
            <label>Số lượng</label>
            <InputNumber
              placeholder="Số lượng"
              name="quantity"
              onChange={(value) => formik.setFieldValue("quantity", value)}
              onBlur={formik.handleBlur}
              value={formik.values.quantity}
              style={{ width: "100%" }}
            />
            {formik.errors.quantity && formik.touched.quantity && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "2px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.quantity}{" "}
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
            <label>Mã sản phẩm</label>
            <Input
              placeholder="Mã sản phẩm"
              name="productCode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.productCode}
            />
            {formik.errors.productCode && formik.touched.productCode && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "-10px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.productCode}{" "}
              </p>
            )}
          </div>
        </div>

        <div>
          <TextArea
            placeholder="Mô tả sản phẩm"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            style={{ width: "100%" }}
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
    </div>
  );
};

export default ModalEditProduct;
