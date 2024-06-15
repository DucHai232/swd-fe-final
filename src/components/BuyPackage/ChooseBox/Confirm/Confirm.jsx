import React, { useEffect } from "react";
import "./Confirm.css";
import { useDispatch, useSelector } from "react-redux";
import { getKidProfile } from "../../../../redux/actions/kid.action";
import { getDataPackage } from "../../../../redux/actions/package.action";
import { getThemes } from "../../../../redux/actions/theme.action";
import { useParams } from "react-router-dom";

const Confirm = ({ selectedRowKey, selectedThemeId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getKidProfile());
    dispatch(getDataPackage("", 1));
    dispatch(getThemes("", 1));
  }, []);
  const kid = useSelector((state) => state.kidReducer?.dataKids).filter(
    (el) => el.id === selectedRowKey
  )[0];
  const packageChoose = useSelector(
    (state) => state.packageReducer?.packages
  ).filter((el) => el.id == id)[0];
  const themeChoose = useSelector((state) => state.themeReducer?.themes).filter(
    (el) => el.id === selectedThemeId
  )[0];
  const user = JSON.parse(localStorage.getItem("user")).user;
  return (
    <div className="confirm-container">
      <p className="confirm-title">
        {" "}
        ❣️ Please confirm the information carefully before going to the next
        step ❣️
      </p>
      <div className="confirm-content">
        <p>
          <strong>Kid's name: </strong> {kid?.fullName}
        </p>
        <p>
          <strong>Parent's name: </strong> {user?.fullName}
        </p>
        <p>
          <strong>Phone number: </strong> {user?.phone}
        </p>
        <p>
          <strong>Email: </strong> {user?.email}
        </p>
        <p>
          <strong>Package: </strong> {packageChoose?.name}
        </p>
        <p>
          <strong>Theme: </strong> {themeChoose?.name}
        </p>
        <p>
          <strong>Total price: </strong>
          {Number(packageChoose?.price).toLocaleString()} VND
        </p>
      </div>
    </div>
  );
};

export default Confirm;
