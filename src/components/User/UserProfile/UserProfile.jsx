import React, { useState } from "react";
import "./UserProfile.css";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import getUserLocalstorage from "../../../utils/UserCurrent";
import { useSelector } from "react-redux";
import { updateUser } from "../../../apis/user.request";
import { message } from "antd";

const UserProfile = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const userCurrent = getUserLocalstorage();
  const [profile, setProfile] = useState({
    username: userCurrent?.username,
    fullName: userCurrent?.fullName,
    email: userCurrent?.email,
    phone: userCurrent?.phone,
    address: userCurrent?.address,
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const [isEditable, setIsEditTable] = useState(false);

  const toggleEdit = async () => {
    const response = await updateUser(userCurrent.id, profile);
    if (response.data.success) {
      message.success(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data?.userProfile));
      setIsEditTable(!isEditable);
    } else {
      message.error(response.data.message);
    }
  };

  return (
    <div className="user_profile-container">
      <Box
        sx={{ width: "100%", typography: "body1" }}
        className="box-container"
      >
        <TabContext value={value}>
          <Box className="box">
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Profile" value="1" className="title" />
              {/* <Tab label="Item Two" value="2" className='title'/>
            <Tab label="Item Three" value="3" /> className='title'*/}
            </TabList>
          </Box>
          <TabPanel value="1" className="content">
            <div className="field">
              <p>Username: </p>
              <input
                type="text"
                name="username"
                value={profile?.username}
                readOnly
              />
            </div>

            <div className="field">
              <p>Fullname: </p>
              <input
                type="text"
                name="fullName"
                value={profile?.fullName}
                readOnly={!isEditable}
                onChange={handleInputChange}
                style={{ color: isEditable ? "#000000" : "#a8a8a8" }}
              />
            </div>

            <div className="field">
              <p>Email: </p>
              <input
                type="text"
                name="email"
                value={profile?.email}
                readOnly={!isEditable}
                onChange={handleInputChange}
                style={{ color: isEditable ? "#000000" : "#a8a8a8" }}
              />
            </div>

            <div className="field">
              <p>Phone: </p>
              <input
                type="text"
                name="phone"
                value={profile?.phone}
                readOnly={!isEditable}
                onChange={handleInputChange}
                style={{ color: isEditable ? "#000000" : "#a8a8a8" }}
              />
            </div>

            <div className="field">
              <p>Address: </p>
              <input
                type="text"
                name="address"
                value={profile?.address}
                readOnly={!isEditable}
                onChange={handleInputChange}
                style={{ color: isEditable ? "#000000" : "#a8a8a8" }}
              />
            </div>

            <div className="btn">
              {isEditable ? (
                <button onClick={toggleEdit}>Save Profile</button>
              ) : (
                <button onClick={() => setIsEditTable(true)}>
                  Update Profile
                </button>
              )}
            </div>
          </TabPanel>

          {/* <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel> */}
        </TabContext>
      </Box>
    </div>
  );
};

export default UserProfile;
