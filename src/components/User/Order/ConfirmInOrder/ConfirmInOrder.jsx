import React, { useEffect, useState } from "react";
import "./ConfirmInOrder.css";
import { loadFromLocalstorage } from "../../../../utils/LocalstorageMySteryBox";
import { getThemes } from "../../../../apis/theme.request";
import { getKidProfile } from "../../../../apis/kid.request";

const ConfirmInOrder = ({ selectedThemeId, setDataConfirm, setCondition }) => {
  const [data, setData] = useState({
    nameOfKid: "",
    nameOfAdult: "",
    address: "",
    phone: "",
    kidId: "",
  });
  const [theme, setTheme] = useState({});

  useEffect(() => {
    const response = loadFromLocalstorage("data-confirm");
    if (response) {
      setData({
        nameOfAdult: response.nameOfAdult || "",
        nameOfKid: response.nameOfKid || "",
        address: response.address || "",
        phone: response.phone || "",
        kidId: response.kidId || "",
      });
    }
  }, []);
  useEffect(() => {
    const fetchDataTheme = async () => {
      const response = await getThemes("", 1);
      const rawData = response.data?.themes.filter(
        (el) => el.id === selectedThemeId
      )[0];
      setTheme(rawData);
    };

    fetchDataTheme();
  }, []);

  useEffect(() => {
    if (data && theme) {
      setDataConfirm(data);
    }
  }, [data, theme]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="confirm-container">
      <p className="confirm-title">
        {" "}
        ❣️ Please confirm the information carefully before going to the next
        step ❣️
      </p>
      <div className="confirm-content">
        <p>
          <strong>Kid's name: </strong> {data?.nameOfKid}
        </p>
        <p>
          <strong>Parent's name: </strong>
          {data?.nameOfAdult}
        </p>
        <p>
          <strong>Phone number: </strong>
          <input
            name="phone"
            value={data?.phone}
            type="tel"
            onChange={(e) => handleChange(e)}
            className="input-confirm"
          />
        </p>

        <p>
          <strong>Address: </strong>{" "}
          <input
            name="address"
            value={data?.address}
            type="text"
            onChange={(e) => handleChange(e)}
            className="input-confirm"
          />
        </p>
        <p>
          <strong>Theme: </strong> {theme?.name}
        </p>
      </div>
    </div>
  );
};

export default ConfirmInOrder;
