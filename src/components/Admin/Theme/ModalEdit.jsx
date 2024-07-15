import React, { useEffect, useState } from "react";
import { Modal, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
// import { updateTheme } from "../../../redux/actions/theme.action";
import store from "../../../store/ReduxStore";
import { updateTheme } from "../../../apis/theme.request";

const ModalEdit = ({
  isOpenEdit,
  handleCancelEdit,
  themeData,
  setCallback,
}) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: themeData?.name || "",
      image: themeData?.image || "",
      description: themeData?.description || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên của theme"),
      description: Yup.string().required("Vui lòng nhập miêu tả của theme"),
    }),
    onSubmit: async (values) => {
      if (selectedFile) {
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
          values.image = imageUrl;
        } catch (error) {
          console.error("Error uploading file:", error);
          return;
        }
      }
      const responseUpdate = await updateTheme(themeData.id, values);
      if (responseUpdate.data.success) {
        message.success(responseUpdate.data.message);
        setCallback((prev) => !prev);
        handleCancelEdit();
      } else {
        message.error(responseUpdate.data.message);
      }
    },
  });

  useEffect(() => {
    if (themeData) {
      formik.setValues({
        name: themeData.name,
        description: themeData.description,
        image: themeData.image,
      });
      if (themeData.image) {
        setPreviewUrl(themeData.image);
      }
    }
  }, [themeData]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <Modal
      title="Chỉnh sửa Theme"
      open={isOpenEdit}
      onOk={formik.handleSubmit}
      onCancel={handleCancelEdit}
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
        id="imageThemeEditId"
        type="file"
        onChange={handleFileChange}
        hidden
      />
      <label htmlFor="imageThemeEditId">
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
  );
};

export default ModalEdit;
