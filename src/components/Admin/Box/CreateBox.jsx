import { Input, InputNumber, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { uploadImage } from "../../../apis/upload-image.request";
import { useDispatch } from "react-redux";
import { createBox } from "../../../redux/actions/box.action";
import store from "../../../store/ReduxStore";

const CreateBox = ({
  isModalOpen,
  setIsModalCreateBox,
  handleCancel,
  setCallback,
}) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      priceAvarage: "",
      description: "",
      qrCode: "1234567890",
      quantityProInBox: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên box"),
      description: Yup.string().required("Vui lòng nhập miêu tả box"),
      priceAvarage: Yup.number().required("Vui lòng nhập giá trung bình"),
      quantityProInBox: Yup.number()
        .required("Vui lòng số sản phẩm trong box")
        .max(4, "Số lượng sản phẩm trong box không được vượt quá 4"),
    }),
    onSubmit: async (values) => {
      if (!selectedFile) {
        return message.warning("Vui lòng chọn ảnh");
      }

      const imageData = new FormData();
      imageData.append("img", selectedFile);
      try {
        const response = await uploadImage(imageData);
        const imageUrl = response.data.path;
        const updatedValue = {
          ...values,
          image: imageUrl,
        };
        await dispatch(createBox(updatedValue));
        const result = store.getState().boxReducer?.res;
        if (result.success) {
          message.success(result.message);
          setCallback((prev) => !prev);
          setIsModalCreateBox(false);
          formik.handleReset();
          setPreviewUrl(null);
        } else {
          message.error(result.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  });
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setPreviewUrl(URL.createObjectURL(file));
    setSelectedFile(file);
  };
  return (
    <div>
      <Modal
        title="Tạo hộp quà"
        open={isModalOpen}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        okText={"Tạo box"}
        cancelText={"Hủy"}
      >
        <Input
          placeholder="Tên box"
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            <label style={{ fontSize: "12px" }}>
              Số sản phẩm trong hộp quà
            </label>
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
      </Modal>
    </div>
  );
};

export default CreateBox;
