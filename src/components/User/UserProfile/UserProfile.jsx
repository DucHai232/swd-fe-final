import React, { useState } from 'react'
import './UserProfile.css'
import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const UserProfile = () => {

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  // làm chức năng Update Profile
  const [profile, setProfile] = useState({
    username: 'lanngocdao',
    fullname: 'Đào Lan Ngọc',
    email: 'ngocdl@gmail.com',
    phone: '0931520366',
    address: 'Vinhomes'
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const [isEditable, setIsEditTable] = useState(false)

  const toggleEdit = () => {
    setIsEditTable(!isEditable)
  }

  return (
    <div className='user_profile-container'>
      <Box sx={{ width: '100%', typography: 'body1' }} className="box-container">
        <TabContext value={value}>
          <Box className="box">
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Profile" value="1" className='title'/>
              {/* <Tab label="Item Two" value="2" className='title'/>
            <Tab label="Item Three" value="3" /> className='title'*/}
            </TabList>
          </Box>
          <TabPanel value="1" className='content'>

            <div className="field">
              <p>Username: </p>
              <input
                type="text"
                name="username"
                value={profile.username}
                readOnly
              />
            </div>

            <div className="field">
              <p>Fullname: </p>
              <input
                type="text"
                name="fullname"
                value={profile.fullname}
                readOnly={!isEditable}
                onChange={handleInputChange}
                style = {{color: isEditable ? '#000000' : '#a8a8a8'}}
              />
            </div>

            <div className="field">
              <p>Email: </p>
              <input
                type="text"
                name="email"
                value={profile.email}
                readOnly={!isEditable}
                onChange={handleInputChange}
                style = {{color: isEditable ? '#000000' : '#a8a8a8'}}
              />
            </div>

            <div className="field">
              <p>Phone: </p>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                readOnly={!isEditable}
                onChange={handleInputChange}
                style = {{color: isEditable ? '#000000' : '#a8a8a8'}}
              />
            </div>

            <div className="field">
              <p>Address: </p>
              <input
                type="text"
                name="address"
                value={profile.address}
                readOnly={!isEditable}
                onChange={handleInputChange}
                style = {{color: isEditable ? '#000000' : '#a8a8a8'}}
              />
            </div>

            <div className="btn">
              <button onClick={toggleEdit}>
                {isEditable ? "Save Profile" : "Update Profile"}
              </button>
            </div>

          </TabPanel>

          {/* <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel> */}
        </TabContext>
      </Box>
    </div>
  )
}

export default UserProfile