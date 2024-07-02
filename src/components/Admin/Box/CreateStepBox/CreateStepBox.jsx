import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import FillInformation from "./FillInformation";
import * as Yup from "yup";
import { useFormik } from "formik";
import { uploadImage } from "../../../../apis/upload-image.request";
import {
  loadFromLocalstorage,
  removeLocalstorage,
  saveLocalstorage,
} from "../../../../utils/LocalstorageMySteryBox";
import ListTheme from "./ListTheme";
import ListProduct from "./ListProduct";
import { createBox } from "../../../../apis/box.request";
import { useNavigate } from "react-router-dom";
const steps = [
  {
    title: "Điền thông tin box",
    content: "First-content",
  },
  {
    title: "Chọn theme",
    content: "Second-content",
  },
  {
    title: "Chọn sản phẩm",
    content: "Last-content",
  },
];

const CreateStepBox = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedThemeId, setSelectedThemeId] = useState(null);
  const [selectedProductsId, setSelectedProductsId] = useState([]);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      age: "",
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
      age: Yup.string().required("Vui lòng nhập độ tuổi"),
      quantityProInBox: Yup.number().required("Vui lòng số sản phẩm trong box"),
    }),
    onSubmit: async (values) => {
      const imageData = new FormData();
      imageData.append("img", selectedFile);
      try {
        const response = await uploadImage(imageData);
        const imageUrl = response.data.path;
        const dataBox = {
          ...values,
          image: imageUrl,
        };
        await saveLocalstorage("data-box", dataBox);
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
  const next = async () => {
    if (current === 0) {
      await formik.validateForm();
      formik.handleSubmit();
      if (Object.keys(formik.errors).length > 0 || !selectedFile) {
        message.warning("Vui lòng điền đủ thông tin và chọn ảnh");
        return;
      }
    }
    if (current === 1 && !selectedThemeId) {
      message.warning("Vui lòng chọn theme");
      return;
    }
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    minHeight: "200px",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  const handleCreateBox = async () => {
    let data = loadFromLocalstorage("data-box");
    data = {
      ...data,
      productsId: selectedProductsId,
      themeId: selectedThemeId,
    };
    const response = await createBox(data);
    if (response.data.success) {
      message.success(response.data.message);
      navigate("/admin/manage-box");
      removeLocalstorage("data-box");
    } else {
      message.error(response.data.message);
    }
  };

  return (
    <div>
      <h1>Tạo box</h1>
      <Steps current={current} items={items} />
      <div style={contentStyle}>
        {current + 1 === 1 && (
          <FillInformation
            formik={formik}
            handleChangeImage={handleChangeImage}
            previewUrl={previewUrl}
          />
        )}
        {current + 1 === 2 && (
          <ListTheme
            setSelectedThemeId={setSelectedThemeId}
            selectedThemeId={selectedThemeId}
          />
        )}
        {current + 1 === 3 && (
          <ListProduct
            selectedProductsId={selectedProductsId}
            setSelectedProductsId={setSelectedProductsId}
            selectedThemeId={selectedThemeId}
          />
        )}
      </div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => handleCreateBox()}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateStepBox;
