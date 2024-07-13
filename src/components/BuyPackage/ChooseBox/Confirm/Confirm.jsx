import React, { useEffect, useState } from "react";
import "./Confirm.css";
import { useDispatch, useSelector } from "react-redux";
import { getKidProfile } from "../../../../redux/actions/kid.action";
import { getDataPackage } from "../../../../redux/actions/package.action";
import { getThemes } from "../../../../redux/actions/theme.action";
import { useParams } from "react-router-dom";
import { message } from "antd";

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
  const [data, setData] = useState({
    kidId: kid?.id,
    totalPrice: packageChoose?.price,
    nameOfAdult: kid.adult?.fullName,
    nameOfKid: kid?.fullName,
    phone: kid.adult?.phone,
    email: kid.adult?.email,
    address: kid.adult?.address,
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (kid && packageChoose && themeChoose) {
      setDataConfirm(data);
    }
  }, [kid, packageChoose, themeChoose, data]);

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
          <strong>Parent's name: </strong>
          <input
            name="nameOfAdult"
            type="tel"
            value={data?.nameOfAdult}
            className="input-confirm"
            onChange={(e) => handleChange(e)}
          />
        </p>
        <p>
          <strong>Phone number: </strong>{" "}
          <input
            name="phone"
            type="tel"
            value={data?.phone}
            className="input-confirm"
            onChange={(e) => handleChange(e)}
          />
        </p>
        <p>
          <strong>Email: </strong>{" "}
          <input
            name="email"
            type="email"
            value={data?.email}
            className="input-confirm"
            onChange={(e) => handleChange(e)}
          />
        </p>
        <p>
          <strong>Address: </strong>{" "}
          <input
            name="address"
            type="text"
            value={data?.address}
            className="input-confirm"
            onChange={(e) => handleChange(e)}
          />
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
