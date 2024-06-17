import React, { useEffect, useState } from "react";
import "./ChoosePackage.css";

import package1 from "/assets/Package1.jpg";
import package2 from "/assets/Package2.jpg";
import package3 from "/assets/Package3.jpg";
import package4 from "/assets/Package4.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDataPackage } from "../../../redux/actions/package.action";
import getUserLocalstorage from "../../../utils/UserCurrent";
import { message } from "antd";
import { getKidProfile } from "../../../redux/actions/kid.action";

const ChoosePackage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(getDataPackage("", 1));
    dispatch(getKidProfile());
  }, []);
  const packages = useSelector((state) => state.packageReducer?.packages);
  const kidOfUserCurrent = useSelector((state) => state.kidReducer?.dataKids);

  const handleClick = (id) => {
    setSelectedId(id);
  };
  const handleButtonClick = () => {
    const user = getUserLocalstorage();
    if (!user) {
      message.warning("Vui lòng đăng nhập mới mua hàng");
      navigate("/login");
    }
    if (kidOfUserCurrent.length === 0) {
      message.warning("Tạo tài khoản cho con rồi vào mua hàng nhé!");
      navigate("/user/kid-profile");
    }
    if (user && kidOfUserCurrent.length > 0) {
      navigate(`/buy-package/choose-box/${selectedId}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="choose_package-container">
      <p className="choose_package-title">Package price</p>
      {packages.map((item) => (
        <div
          className="choose_package-content"
          key={item.id}
          onClick={() => handleClick(item.id)}
        >
          <img
            src={
              item.name === "Package 1"
                ? package1
                : item.name === "Package 2"
                ? package2
                : item.name === "Package 3"
                ? package3
                : item.name === "Package 4"
                ? package4
                : package1
            }
            onClick={() => handleClick(item.id)}
            style={{
              border: selectedId === item.id ? "5px solid black" : "none",
            }}
          />
          <p className="sub-title">{item.name}</p>
          <ul>
            <li>
              <strong>Duration: </strong> {item.numberOfSend} months
            </li>
            <li>
              <strong>No. of boxes: </strong> {item.numberOfSend}
            </li>
          </ul>
          <p className="price">
            {Number(item.price).toLocaleString("en-US")} vnd
          </p>
        </div>
      ))}

      <p className="explain-content">
        Here, we will sell combo packs, depending on the time you choose to buy,
        we will <br />
        target that time and send you surprise gifts every month. You can choose
        the theme <br />
        and gift box for yourself, but you will not know what products will be
        inside.
      </p>

      <div className="choose_package-btn">
        <button
          onClick={selectedId ? handleButtonClick : ""}
          style={{ cursor: selectedId ? "pointer" : "not-allowed" }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ChoosePackage;
