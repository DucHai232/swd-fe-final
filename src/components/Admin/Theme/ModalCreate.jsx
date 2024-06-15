import { Input, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { createTheme } from "../../../redux/actions/theme.action";
import { useDispatch } from "react-redux";
import store from "../../../store/ReduxStore";

const ModalCreate = ({
  isOpenCreate,
  handleCancelCreate,
  setIsOpenCreate,
  setCallback,
}) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên của theme"),
      description: Yup.string().required("Vui lòng nhập miêu tả của theme"),
    }),
    onSubmit: async (values) => {
      if (!selectedFile) {
        message.warning("Vui lòng chọn ảnh");
        return;
      }
      const imageData = new FormData();
      imageData.append("img", selectedFile);
      try {
        const response = await axios.post(
          "https://mysterybox-swd-be.onrender.com/upload-image",
          imageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const imageUrl = response.data.path;
        const updatedValues = {
          ...values,
          image: imageUrl,
        };

        await dispatch(createTheme(updatedValues));
        const responseCreateTheme = store.getState().themeReducer.res;
        if (responseCreateTheme.success) {
          message.success(responseCreateTheme.message);
          setCallback((prev) => !prev);
          setIsOpenCreate(false);
          formik.handleReset();
          setPreviewUrl(null);
        } else {
          message.error(responseCreateTheme.message);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  return (
    <>
      <Modal
        title="Tạo theme"
        open={isOpenCreate}
        onOk={formik.handleSubmit}
        onCancel={handleCancelCreate}
      >
        <Input
          placeholder="Tên theme"
          name="name"
          style={{ marginBottom: "15px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "-10px",
              fontSize: "12px",
            }}
          >
            {formik.errors.name}{" "}
          </div>
        )}
        <TextArea
          rows={4}
          name="description"
          placeholder="Miêu tả"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.errors.description && formik.touched.description && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "5px",
              fontSize: "12px",
            }}
          >
            {formik.errors.description}{" "}
          </div>
        )}
        <input
          id="imageThemeId"
          type="file"
          onChange={handleFileChange}
          hidden
        />
        <label htmlFor="imageThemeId">
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
    </>
  );
};
export default ModalCreate;
