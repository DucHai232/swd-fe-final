import React, { useEffect, useState } from "react";
import "./UserMenu.css";

import logo from "/assets/Logo.png";
import user_profile_icon from "/assets/user_profile-icon.png";
import baby_profile_icon from "/assets/baby.png";
import order_icon from "/assets/checkout.png";
import { useLocation, useNavigate } from "react-router-dom";

const UserMenu = () => {
  const navigate = useNavigate();

  const listBtn = [
    {
      id: 1,
      img: user_profile_icon,
      title: "User's profile",
    },
    {
      id: 2,
      img: baby_profile_icon,
      title: "Kid's profile",
    },
    {
      id: 3,
      img: order_icon,
      title: "Orders",
    },
  ];

  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonIndex) => {
    if (buttonIndex === 2) {
      navigate("/user/kid-profile");
    } else {
    }
    setActiveButton(buttonIndex);

    if (buttonIndex === 1) {
      navigate("/user/user-profile");
    } else {
    }

    if (buttonIndex === 3) {
      navigate("/user/order");
    }
  };

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/user/user-profile") {
      setActiveButton(1);
    }
    if (location.pathname === "/user/kid-profile") {
      setActiveButton(2);
    }
    if (location.pathname === "/user/order") {
      setActiveButton(3);
    }
  }, [location]);

  return (
    <div className="user_menu-container">
      <div className="image">
        <img src={logo} />
      </div>

      <div className="list-btn">
        {listBtn.map((item) => (
          <div key={item.id} className="btn">
            <div
              className={`btn-item ${activeButton === item.id ? "choose" : ""}`}
              onClick={() => handleButtonClick(item.id)}
            >
              <div className="image-icon">
                <img src={item.img} />
              </div>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMenu;
