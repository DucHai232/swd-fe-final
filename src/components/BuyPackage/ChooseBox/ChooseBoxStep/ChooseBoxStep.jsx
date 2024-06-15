import React, { useEffect, useState } from "react";
import "./ChooseBoxStep.css";

import box from "/assets/MysteryBox.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getBox } from "../../../../redux/actions/box.action";

const ChooseBoxStep = ({ selectedId, setSelectedId }) => {
  const dispatch = useDispatch();

  const handleButtonClick = (id) => {
    setSelectedId(id);
  };
  useEffect(() => {
    dispatch(getBox());
  }, []);
  const boxs = useSelector((state) => state.boxReducer?.boxs);
  return (
    <div className="choose_box_step-container">
      {boxs.map((item) => (
        <div
          className="choose_box-item"
          key={item.id}
          style={{
            border:
              selectedId === item.id
                ? "8px solid #ce85ff"
                : "8px solid #44D2FF",
          }}
        >
          <img src={item.image} style={{ objectFit: "cover" }} />
          <p
            className="box-item-title"
            style={{ color: selectedId === item.id ? "#ce85ff" : "#44D2FF" }}
          >
            {item.name}
          </p>
          <p className="box-item-content">{item.description}</p>
          <div className="box-item-btn">
            <button
              onClick={() => handleButtonClick(item.id)}
              className={selectedId === item.id ? "chosen" : ""} // viết dòng này để chỉnh màu khi hover box đã đc chọn
              style={{
                backgroundColor: selectedId === item.id ? "#ce85ff" : "#44D2FF",
              }}
            >
              Choose
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChooseBoxStep;
