import React, { useEffect, useState } from "react";
import "./ChooseTheme.css";

import frozen from "/assets/frozen.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getThemes } from "../../../../redux/actions/theme.action";

const ChooseTheme = ({ setNextEnabled, selectedId, setSelectedId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedId !== null) {
      setNextEnabled(true);
    }
    dispatch(getThemes("", 1));
  }, [selectedId, setNextEnabled]);

  const handleButtonClick = (id) => {
    setSelectedId(id);
  };
  const themes = useSelector((state) => state.themeReducer?.themes);

  return (
    <div className="choose_theme-container">
      {themes?.map((item) => (
        <div
          className="choose_theme-item"
          key={item.id}
          style={{
            border:
              selectedId === item.id
                ? "8px solid #ce85ff"
                : "8px solid #44D2FF",
          }}
        >
          <img src={item.image} />
          <p
            className="theme-item-title"
            style={{ color: selectedId === item.id ? "#ce85ff" : "#44D2FF" }}
          >
            {item.name}
          </p>
          <p className="theme-item-content">{item.description}</p>
          <div className="theme-item-btn">
            <button
              onClick={() => handleButtonClick(item.id)}
              className={selectedId === item.id ? "chosen" : ""}
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

export default ChooseTheme;
