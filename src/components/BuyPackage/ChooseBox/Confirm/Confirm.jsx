import React, { useEffect } from "react";
import "./Confirm.css";
import { useDispatch, useSelector } from "react-redux";
import { getKidProfile } from "../../../../redux/actions/kid.action";
import { getDataPackage } from "../../../../redux/actions/package.action";
import { getThemes } from "../../../../redux/actions/theme.action";
import { useParams } from "react-router-dom";

const Confirm = ({ selectedRowKey, selectedThemeId, setDataConfirm }) => {
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

  useEffect(() => {
    if (kid && packageChoose && themeChoose) {
      const confirmData = {
        kidId: kid?.id,
        totalPrice: packageChoose?.price,
        nameOfAdult: kid.adult?.fullName,
        nameOfKid: kid?.fullName,
        phone: kid.adult?.phone,
        email: kid.adult?.email,
        address: kid.adult?.address,
      };
      setDataConfirm(confirmData);
    }
  }, [kid, packageChoose, themeChoose]);
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
          <strong>Parent's name: </strong> {kid?.adult?.fullName}
        </p>
        <p>
          <strong>Phone number: </strong> {kid?.adult?.phone}
        </p>
        <p>
          <strong>Email: </strong> {kid?.adult?.email}
        </p>
        <p>
          <strong>Address: </strong> {kid?.adult?.address}
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
