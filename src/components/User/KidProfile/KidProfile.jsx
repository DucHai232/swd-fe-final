import React, { useState } from "react";
import "./KidProfile.css";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TableKid from "./TableKid";
import CreateKid from "./CreateKid";

const KidProfile = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="kid_profile-container">
      <Box
        sx={{ width: "100%", typography: "body1" }}
        className="box-container"
      >
        <TabContext value={value}>
          <Box className="box">
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Profile" value="1" className="title" />
              <Tab label="Create" value="2" className="title" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TableKid />
          </TabPanel>
          <TabPanel value="2" className="content">
            <CreateKid setValue={setValue} />
          </TabPanel>
          {/* <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel> */}
        </TabContext>
      </Box>
    </div>
  );
};

export default KidProfile;
