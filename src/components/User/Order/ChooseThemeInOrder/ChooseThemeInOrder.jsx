import React, { useEffect, useState } from "react";
import "./ChooseThemeInOrder.css";
import { useDispatch, useSelector } from "react-redux";
import { getThemes } from "../../../../redux/actions/theme.action";
import { loadFromLocalstorage } from "../../../../utils/LocalstorageMySteryBox";
import { getKidProfile } from "../../../../apis/kid.request";

const ChooseThemeInOrder = ({
  setNextEnabled,
  selectedId,
  setSelectedId,
  setCondition,
}) => {
  const dispatch = useDispatch();
  const [kid, setKid] = useState({});
  useEffect(() => {
    if (selectedId !== null) {
      setNextEnabled(true);
    }
    dispatch(getThemes("", 1));

    const fetchDataKid = async () => {
      const responseLocal = loadFromLocalstorage("data-confirm");
      const response = await getKidProfile();
      const rawData = response.data.kidProfiles.filter(
        (el) => el.id == responseLocal.kidId
      )[0];
      setKid(rawData);
    };
    fetchDataKid();
    setCondition({
      themeId: selectedId,
      yob: kid?.yob,
    });
  }, [selectedId, setNextEnabled]);

  const handleButtonClick = (id) => {
    setSelectedId(id);
  };
  const themes = useSelector((state) => state.themeReducer?.themes);

  return (
    <div className="choose_theme_in_order-container">
      {themes?.map((item) => (
        <div
          className="choose_theme_in_order-item"
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
            className="theme_in_order-item-title"
            style={{ color: selectedId === item.id ? "#ce85ff" : "#44D2FF" }}
          >
            {item.name}
          </p>
          <p className="theme_in_order-item-content">{item.description}</p>
          <div className="theme_in_order-item-btn">
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

export default ChooseThemeInOrder;
