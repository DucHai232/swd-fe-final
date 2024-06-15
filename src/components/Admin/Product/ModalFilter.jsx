import { InputNumber, Modal, Select, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBox } from "../../../redux/actions/box.action";
import { getThemes } from "../../../redux/actions/theme.action";
import optionColors from "../../../data/optionColors.json";
import optionOrigin from "../../../data/optionOrigins.json";
const ModalFilter = ({
  isModalOpen,
  setIsModalFilterOpen,
  handleCancel,
  setCallback,
  setDataFilter,
  dataFilter,
}) => {
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
  const onChangeComplete = (value) => {
    console.log("onChangeComplete: ", value);
  };
  const onChange = (name, value) => {
    setDataFilter((prevData) => ({ ...prevData, [name]: String(value) }));
  };
  const handleChange = (name, value) => {
    setDataFilter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFilter = () => {
    // dispatch(getProducts(dataFilter.fromPrice, dataFilter.toPrice, "", 1));
    setIsModalFilterOpen(false);
    setCallback((prev) => !prev);
  };
  const handleClear = () => {
    setDataFilter({
      fromPrice: "",
      toPrice: "",
      colorQuery: "",
      originQuery: "",
      boxIdQuery: "",
      themeIdQuery: "",
    });
    setIsModalFilterOpen(false);
    setCallback((prev) => !prev);
  };

  const changeStringToArray = (dataFilter) => {
    if (dataFilter) {
      return dataFilter.split(",").map((item) => item.trim());
    }
    return [];
  };

  return (
    <div>
      <Modal
        title="Bộ lọc sản phẩm"
        open={isModalOpen}
        onOk={handleFilter}
        onCancel={handleClear}
        okText="Lọc trạng thái"
        cancelText="Clear"
      >
        <div className="filter-container">
          <Select
            mode="tags"
            placeholder="Chọn theo box"
            onChange={(value) => onChange("boxIdQuery", value)}
            value={changeStringToArray(dataFilter.boxIdQuery)}
            options={boxOptions}
            className="filter-child"
          />
          <Select
            mode="tags"
            placeholder="Chọn theo theme"
            onChange={(value) => onChange("themeIdQuery", value)}
            value={changeStringToArray(dataFilter.themeIdQuery)}
            options={themeOptions}
            className="filter-child"
          />

          <Select
            mode="tags"
            placeholder="Màu sắc"
            onChange={(value) => onChange("colorQuery", value)}
            options={optionColors}
            value={changeStringToArray(dataFilter.colorQuery)}
            className="filter-child"
          />
          <Select
            mode="tags"
            placeholder="Nguồn gốc"
            onChange={(value) => onChange("originQuery", value)}
            options={optionOrigin}
            value={changeStringToArray(dataFilter.originQuery)}
            className="filter-child"
          />
          <div className="filter-price">
            <div className="from-price">
              <label>Từ giá</label>
              <InputNumber
                prefix="$"
                style={{
                  width: "100%",
                }}
                value={dataFilter.fromPrice}
                name="fromPrice"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={(value) => handleChange("fromPrice", value)}
              />
            </div>
            <div className="to-price">
              <label>Đến giá</label>
              <InputNumber
                prefix="$"
                style={{
                  width: "100%",
                }}
                value={dataFilter.toPrice}
                name="toPrice"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={(value) => handleChange("toPrice", value)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalFilter;
