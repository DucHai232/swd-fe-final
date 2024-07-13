import React, { useEffect, useState } from "react";
import "./CreateKid.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Breadcrumb, message } from "antd";
import { formatDate } from "../../../utils/FormatDate";
import dayjs from "dayjs";
import { createInfoProfileKid } from "../../../apis/kid.request";
import { useDispatch } from "react-redux";
import { updateProfileKid } from "../../../redux/actions/kid.action";
import store from "../../../store/ReduxStore";
import optionColors from "../../../data/optionColors.json";
import optionMaterials from "../../../data/optionMaterials.json";
import optionTypes from "../../../data/optionTypes.json";
import optionOrigins from "../../../data/optionOrigins.json";
export default function CreateKid({
  kidId,
  kid,
  showTable,
  isDisable,
  setValue,
}) {
  // làm chức năng Update Profile
  const [profile, setProfile] = useState({
    // themeId: "5",
    fullName: "",
    yob: null,
    gender: "",
    descriptionHobby: "",
    type: "",
    color: "",
    material: "",
    toyOrigin: "",
  });

  const [hasSelectedColor, setHasSelectedColor] = useState(false);
  const [hasSelectedGender, setHasSelectedGender] = useState(false);
  const [hasSelectedMaterial, setHasSelectedMaterial] = useState(false);
  const [hasSelectedType, setHasSelectedType] = useState(false);
  const [hasSelectedMadeIn, setHasSelectedMadeIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Nếu kid có giá trị thì gán giá trị profile
    if (kid) {
      setProfile({
        fullName: kid.fullName || "",
        yob: kid.yob || null,
        gender: kid.gender || "",
        descriptionHobby: kid.descriptionHobby || "",
        type: kid.type || "",
        color: kid.color || "",
        material: kid.material || "",
        toyOrigin: kid.toyOrigin || "",
      });

      setHasSelectedColor(kid.color !== "");
      setHasSelectedGender(kid.gender !== "");
      setHasSelectedMaterial(kid.material !== "");
      setHasSelectedType(kid.type !== "");
      setHasSelectedMadeIn(kid.toyOrigin !== "");
    }
  }, [kid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value,
    });

    if (name === "color" && value !== "") {
      setHasSelectedColor(true);
    }
    if (name === "gender" && value !== "") {
      setHasSelectedGender(true);
    }
    if (name === "material" && value !== "") {
      setHasSelectedMaterial(true);
    }
    if (name === "type" && value !== "") {
      setHasSelectedType(true);
    }
    if (name === "toyOrigin" && value !== "") {
      setHasSelectedMadeIn(true);
    }
  };

  const handleDateChange = (date) => {
    if (date && dayjs(date).isValid()) {
      const formatDateData = formatDate(date.toDate());
      setProfile({
        ...profile,
        yob: formatDateData,
      });
    } else {
      console.error("error date");
    }
  };

  const handleUpdateKidProfile = async () => {
    await dispatch(updateProfileKid(kidId, profile));
    const response = store.getState().kidReducer.res;
    if (response.success) {
      message.success(response.message);
      showTable();
    } else {
      message.error(response.message);
    }
  };

  const handleCreateKidProfile = async () => {
    const response = await createInfoProfileKid(profile);
    if (response.data.success) {
      setValue("1");
      setProfile({
        themeId: "5",
        fullName: "",
        yob: null,
        gender: "",
        descriptionHobby: "",
        type: "",
        color: "",
        material: "",
        toyOrigin: "",
      });
      message.success(response.data.message);
    } else {
      message.error(response.data.message);
    }
  };

  const maxDate = dayjs().subtract(3, 'year')
  const minDate = dayjs().subtract(15, 'year');

  return (
    <div className="create_kid-container">
      {kid && (
        <div className="breadcrumb-wrapper">
          <Breadcrumb
            items={[
              // {
              //     title: "Kid's profile",
              // },
              {
                title: (
                  <span
                    onClick={showTable}
                    style={{
                      cursor: "pointer",
                      padding: "3px",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#f0f0f0";
                      e.target.style.borderRadius = "20px";
                      e.target.style.padding = "10px 15px";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                    }}
                  >
                    Kids list
                  </span>
                ),
              },
              {
                title: `${kid.fullName}`,
              },
            ]}
          />
        </div>
      )}
      <div className="field">
        <p>Fullname: </p>
        <input
          type="text"
          name="fullName"
          placeholder="Input kid's name"
          value={profile.fullName}
          // readOnly={!isEditable}
          readOnly={isDisable}
          onChange={handleInputChange}
          // style={{ color: isEditable ? '#000000' : '#a8a8a8' }}
          style={{ color: isDisable ? "#a8a8a8" : "#000000" }}
        />
      </div>

      <div className="field">
        <p>Hobby: </p>
        <input
          type="text"
          name="descriptionHobby"
          placeholder="Input kid's hobby"
          value={profile.descriptionHobby}
          // readOnly={!isEditable}
          readOnly={isDisable}
          onChange={handleInputChange}
          // style={{ color: isEditable ? '#000000' : '#a8a8a8' }}
          style={{ color: isDisable ? "#a8a8a8" : "#000000" }}
        />
      </div>

      <div className="two-field">
        <div className="field-to-select">
          <p>Birth: </p>
          <div className="field">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  views={["year", "month", "day"]}
                  className="custom-datepicker"
                  value={profile.yob ? dayjs(profile.yob) : null}
                  readOnly={isDisable}
                  maxDate={maxDate}
                  minDate={minDate}
                  onChange={handleDateChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent",
                      },
                      "& input": {
                        color: isDisable ? "#a8a8a8" : "#000000",
                      },
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>

        <div className="field-to-select">
          <p>Color: </p>

          <select
            className="select-field"
            name="color"
            value={profile.color}
            onChange={handleInputChange}
            // disabled={!isEditable}
            // style={{ color: isEditable ? '#000000' : '#a8a8a8' }}
            disabled={isDisable}
            style={{ color: isDisable ? "#a8a8a8" : "#000000" }}
          >
            {/* vì nếu ko có dòng này thì value đầu tiên nó hiện ra sẽ ko lưu đc pink, nó ra "", mà khi chọn lại nó mới chịu */}
            {!hasSelectedColor && <option value="">Choose color</option>}
            {optionColors.map((color) => (
              <option value={color.value}>{color.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="two-field">
        <div className="field-to-select">
          <p>Gender: </p>

          <select
            className="select-field"
            name="gender"
            value={profile.gender}
            onChange={handleInputChange}
            disabled={isDisable}
            style={{ color: isDisable ? "#a8a8a8" : "#000000" }}
          >
            {!hasSelectedGender && <option value="">Choose gender</option>}
            <option value="MALE">Boy</option>
            <option value="FEMALE">Girl</option>
            <option value="OTHER">Unisex</option>
          </select>
        </div>

        <div className="field-to-select">
          <p>Material: </p>

          <select
            className="select-field"
            name="material"
            value={profile.material}
            onChange={handleInputChange}
            disabled={isDisable}
            style={{ color: isDisable ? "#a8a8a8" : "#000000" }}
          >
            {!hasSelectedMaterial && <option value="">Choose material</option>}
            {optionMaterials.map((material) => (
              <option value={material.value}>{material.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="two-field">
        <div className="field-to-select">
          <p>Type: </p>

          <select
            className="select-field"
            name="type"
            value={profile.type}
            onChange={handleInputChange}
            disabled={isDisable}
            style={{ color: isDisable ? "#a8a8a8" : "#000000" }}
          >
            {!hasSelectedType && <option value="">Choose type</option>}
            {optionTypes.map((type) => (
              <option value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div className="field-to-select">
          <p>Made In: </p>

          <select
            className="select-field"
            name="toyOrigin"
            value={profile.toyOrigin}
            onChange={handleInputChange}
            disabled={isDisable}
            style={{ color: isDisable ? "#a8a8a8" : "#000000" }}
          >
            {!hasSelectedMadeIn && <option value="">Choose origin</option>}
            {optionOrigins.map((origin) => (
              <option value={origin.value}>{origin.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="btn">
        {!isDisable &&
          (kid ? (
            <button onClick={handleUpdateKidProfile}>Update Profile</button>
          ) : (
            <button onClick={handleCreateKidProfile}>Create Profile</button>
          ))}
      </div>
    </div>
  );
}
