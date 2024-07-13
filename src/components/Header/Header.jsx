import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "/assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { Avatar, message } from "antd";
import { logout } from "../../redux/actions/auth.action";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [modalHide, setModalHide] = useState(false);

  const controlHeader = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY < lastScrollY) {
        setShowHeader(true);
      } else if (window.scrollY < 10) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlHeader);

      return () => {
        window.removeEventListener("scroll", controlHeader);
      };
    }
  }, [lastScrollY]);

  const handleClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };
  const handleLogout = () => {
    dispatch(logout());
    message.success("Đã đăng xuất");
    navigate("/");
    setModalHide(false);
  };
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className={`header-whole-container ${showHeader ? "show" : ""}`}>
      {modalHide && (
        <div className="overlay" onClick={() => setModalHide(false)}></div>
      )}

      <div className={`header-container ${showHeader ? "show-down" : ""}`}>
        <div className="header-left">
          <img src={logo} className="logo" onClick={handleClick} />
        </div>

        <div className="header-right">
          <ul>
            <li onClick={handleClick}>Home</li>
            {/* <li>About Us</li> */}
            <li onClick={() => navigate("/buy-package")}>Buy Package</li>
            <li onClick={() => navigate('/product')}>Product</li>
            {user ? (
              <Avatar
                style={{ cursor: "pointer" }}
                onClick={() => setModalHide((prev) => !prev)}
                src={
                  "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
                }
              />
            ) : (
              <li onClick={() => navigate("/login")}>Sign In/Sign Up</li>
            )}
          </ul>
        </div>
        {modalHide && (
          <div className="modal-up">
            <ul>
              <li onClick={() => navigate("/user/user-profile")}>
                Personal information
              </li>
              <li onClick={() => navigate("/user/kid-profile")}>
                Kids management
              </li>
              <li onClick={handleLogout}>Sign out</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
