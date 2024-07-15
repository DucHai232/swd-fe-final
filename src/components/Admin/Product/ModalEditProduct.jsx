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
// import { updateProduct } from "../../../redux/actions/product.action";

const ModalEditProduct = ({
  isOpenEdit,
  handleCancelEdit,
  setCallback,
  initialValues,
}) => {
  const [previewImages, setPreviewImages] = useState(initialValues.images);
  const formik = useFormik({
    initialValues: {
      productCode: initialValues.productCode,
      themeId: initialValues.themeId,
      name: initialValues.name,
      images: [],
      description: initialValues.description,
      price: initialValues.price,
      quantity: initialValues.quantity,
      gender: initialValues.gender,
      color: initialValues.color,
      type: initialValues.type,
      material: initialValues.material,
      origin: initialValues.origin,
      age: initialValues.age,
    },
    validationSchema: Yup.object({
      productCode: Yup.string().required("Vui lòng nhập mã sản phẩm"),
      themeId: Yup.string().required("Vui lòng chọn theme"),
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
      gender: Yup.string().required("Vui lòng chọn giới tính"),
      color: Yup.string().required("Vui lòng chọn màu sắc"),
      type: Yup.string().required("Vui lòng nhập loại sản phẩm"),
      material: Yup.string().required("Vui lòng nhập chất liệu sản phẩm"),
      origin: Yup.string().required("Vui lòng chọn nguồn gốc sản phẩm"),
      age: Yup.string().required("Vui lòng chọn độ tuổi"),
    }),
    onSubmit: async (values) => {
      const imageData = new FormData();
      values.images.forEach((image, index) => {
        imageData.append("images", image);
      });

      try {
        const response = await axios.post(
          "https://mysterybox-swd-be.onrender.com/upload-images",
          imageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const imageUrls = response.data.files;
        const updatedValues = {
          ...values,
          images: imageUrls,
        };
        await dispatch(updateProduct(updatedValues));
        const responseUpdateProduct = store.getState().productReducer.res;
        if (responseUpdateProduct.success) {
          message.success(responseUpdateProduct.message);
          setCallback((prev) => !prev);
          setOpen(false);
          formik.handleReset();
          setPreviewImages([]);
        } else {
          message.error(responseUpdateProduct.message);
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBox());
    dispatch(getThemes("", 1));
  }, []);
  const boxs = useSelector((state) => state.boxReducer?.boxs || []);
  const themes = useSelector((state) => state.themeReducer?.themes || []);
  const boxOptions = boxs.map((box) => ({
    value: box.id,
    label: box.name,
  }));
  const themeOptions = themes.map((theme) => ({
    value: theme.id,
    label: theme.name,
  }));

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    formik.setFieldValue("images", files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewUrls);
  };

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
        <div>
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

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(33% - 8px)",
            }}
          >
            <label>Chất liệu</label>
            <Select
              name="material"
              onChange={(value) => formik.setFieldValue("material", value)}
              onBlur={formik.handleBlur}
              value={formik.values.material}
              style={{
                width: "100%",
              }}
              options={optionMaterials}
            />
            {formik.errors.material && formik.touched.material && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.material}{" "}
              </p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(33% - 8px)",
            }}
          >
            <label>Loại sản phẩm</label>
            <Select
              name="type"
              onChange={(value) => formik.setFieldValue("type", value)}
              onBlur={formik.handleBlur}
              value={formik.values.type}
              style={{
                width: "100%",
              }}
              options={optionTypes}
            />
            {formik.errors.type && formik.touched.type && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.type}{" "}
              </p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(33% - 8px)",
            }}
          >
            <label>Độ tuổi</label>
            <Select
              name="age"
              onChange={(value) => formik.setFieldValue("age", value)}
              onBlur={formik.handleBlur}
              value={formik.values.age}
              style={{
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
              width: "calc(33% - 8px)",
            }}
          >
            <label>Giới tính</label>
            <Select
              name="gender"
              onChange={(value) => formik.setFieldValue("gender", value)}
              onBlur={formik.handleBlur}
              value={formik.values.gender}
              style={{
                width: "100%",
              }}
              options={optionGenders}
            />
            {formik.errors.gender && formik.touched.gender && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.gender}{" "}
              </p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(33% - 8px)",
            }}
          >
            <label>Màu sắc</label>
            <Select
              name="color"
              onChange={(value) => formik.setFieldValue("color", value)}
              onBlur={formik.handleBlur}
              value={formik.values.color}
              style={{
                width: "100%",
              }}
              options={optionColors}
            />
            {formik.errors.color && formik.touched.color && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.color}{" "}
              </p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "calc(33% - 8px)",
            }}
          >
            <label>Nguyên liệu</label>
            <Select
              name="origin"
              onChange={(value) => formik.setFieldValue("origin", value)}
              onBlur={formik.handleBlur}
              value={formik.values.origin}
              style={{
                width: "100%",
              }}
              options={optionOrigins}
            />
            {formik.errors.origin && formik.touched.origin && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  marginTop: "0px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.origin}{" "}
              </p>
            )}
          </div>
        </div>

        <div>
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
                marginTop: "-10px",
                fontSize: "12px",
              }}
            >
              {formik.errors.price}{" "}
            </p>
          )}
        </div>

        <div>
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
                marginTop: "-10px",
                fontSize: "12px",
              }}
            >
              {formik.errors.quantity}{" "}
            </p>
          )}
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

        <div>
          <label>Chọn ảnh sản phẩm</label>
          <Input
            type="file"
            name="images"
            onChange={handleFileChange}
            multiple
          />
          {previewImages.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt="Preview"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          ))}
        </div>

        <div>
          <label>Chọn theme</label>
          <Select
            name="themeId"
            onChange={(value) => formik.setFieldValue("themeId", value)}
            onBlur={formik.handleBlur}
            value={formik.values.themeId}
            style={{ width: "100%" }}
            options={themeOptions}
          />
          {formik.errors.themeId && formik.touched.themeId && (
            <p
              style={{
                color: "red",
                marginBottom: "15px",
                marginTop: "0px",
                fontSize: "12px",
              }}
            >
              {formik.errors.themeId}{" "}
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ModalEditProduct;
