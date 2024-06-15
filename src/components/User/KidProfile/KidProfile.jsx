import React, { useState } from 'react'
import "./KidProfile.css"

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TableKid from './TableKid';

const KidProfile = () => {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // làm chức năng Update Profile
  const [profile, setProfile] = useState({
    fullname: 'Zizi',
    hobby: 'Barbie',
    birth: null,
    color: '',
    gender: '',
    material: '',
    type: '',
    madeIn: ''
  });

  const [hasSelectedColor, setHasSelectedColor] = useState(false);
  const [hasSelectedGender, setHasSelectedGender] = useState(false);
  const [hasSelectedMaterial, setHasSelectedMaterial] = useState(false);
  const [hasSelectedType, setHasSelectedType] = useState(false);
  const [hasSelectedMadeIn, setHasSelectedMadeIn] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value
    });

    if (name === 'color' && value !== '') {
      setHasSelectedColor(true)
    }
    if (name === 'gender' && value !== '') {
      setHasSelectedGender(true)
    }
    if (name === 'material' && value !== '') {
      setHasSelectedMaterial(true)
    }
    if (name === 'type' && value !== '') {
      setHasSelectedType(true)
    }
    if (name === 'madeIn' && value !== '') {
      setHasSelectedMadeIn(true)
    }
  };

  const handleDateChange = (date) => {
    setProfile({
      ...profile,
      birth: date,
    })
  }

  const [isEditable, setIsEditTable] = useState(false)

  const toggleEdit = () => {
    setIsEditTable(!isEditable)
  }


  return (
    <div className="kid_profile-container">
      <Box sx={{ width: '100%', typography: 'body1' }} className="box-container">
        <TabContext value={value}>
          <Box className="box">
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Profile" value="1" className='title' />
              <Tab label="Create" value="2" className='title' />
              {/* <Tab label="Item Three" value="3" className='title'/> */}
            </TabList>
          </Box>
          <TabPanel value="1">
            <TableKid/>
          </TabPanel>
          <TabPanel value="2" className='content'>
            <div className="field">
              <p>Fullname: </p>
              <input
                type="text"
                name="fullname"
                value={profile.fullname}
                readOnly={!isEditable}
                onChange={handleInputChange}
                style={{ color: isEditable ? '#000000' : '#a8a8a8' }}
              />
            </div>

            <div className="field">
              <p>Hobby: </p>
              <input
                type="text"
                name="hobby"
                value={profile.hobby}
                readOnly={!isEditable}
                onChange={handleInputChange}
                style={{ color: isEditable ? '#000000' : '#a8a8a8' }}
              />
            </div>

            <div className="two-field">
              <div className="field-to-select">
                <p>Birth: </p>
                <div className="birth-field">
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        // label={'"year", "month" and "day"'}
                        views={['year', 'month', 'day']}
                        className="custom-datepicker"
                        value={profile.birth}
                        readOnly={!isEditable}
                        onChange={handleDateChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'transparent',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'transparent',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'transparent',
                            },
                            '& input': {
                              color: isEditable ? '#000000' : '#a8a8a8'
                            }
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
                  className='select-field'
                  name="color"
                  value={profile.color}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  style={{ color: isEditable ? '#000000' : '#a8a8a8' }}
                >
                  {/* vì nếu ko có dòng này thì value đầu tiên nó hiện ra sẽ ko lưu đc pink, nó ra "", mà khi chọn lại nó mới chịu */}
                  {!hasSelectedColor && <option value="">Choose color</option>}
                  <option value="pink">Pink</option>
                  <option value="orange">Orange</option>
                </select>
              </div>
            </div>

            <div className="two-field">
              <div className="field-to-select">
                <p>Gender: </p>

                <select
                  className='select-field'
                  name="gender"
                  value={profile.gender}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  style={{ color: isEditable ? '#000000' : '#a8a8a8' }}
                >
                  {!hasSelectedGender && <option value="">Choose gender</option>}
                  <option value="boy">Boy</option>
                  <option value="girl">Girl</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>

              <div className="field-to-select">
                <p>Material: </p>

                <select
                  className='select-field'
                  name="material"
                  value={profile.material}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  style={{ color: isEditable ? '#000000' : '#a8a8a8' }}
                >
                  {!hasSelectedMaterial && <option value="">Choose material</option>}
                  <option value="wood">Wood</option>
                  <option value="plastic">Plastic</option>
                </select>
              </div>
            </div>

            <div className="two-field">
              <div className="field-to-select">
                <p>Type: </p>

                <select
                  className='select-field'
                  name="type"
                  value={profile.type}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  style={{ color: isEditable ? '#000000' : '#a8a8a8' }}
                >
                  {!hasSelectedType && <option value="">Choose type</option>}
                  <option value="lego">Lego</option>
                  <option value="puzzle">Puzzle</option>
                  <option value="doll">Doll</option>
                </select>
              </div>

              <div className="field-to-select">
                <p>Made In: </p>

                <select
                  className='select-field'
                  name="madeIn"
                  value={profile.madeIn}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  style={{ color: isEditable ? '#000000' : '#a8a8a8' }}
                >
                  {!hasSelectedMadeIn && <option value="">Choose origin</option>}
                  <option value="china">China</option>
                  <option value="canada">Canada</option>
                  <option value="usa">USA</option>
                  <option value="france">France</option>
                  <option value="vietnam">Vietnam</option>
                  <option value="japan">Japan</option>
                  <option value="russia">Russia</option>
                  <option value="thai">Thai</option>
                  <option value="korea">Korea</option>
                  <option value="england">England</option>
                </select>
              </div>
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

export default KidProfile