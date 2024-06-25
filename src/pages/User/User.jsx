import React, { useEffect, useState } from 'react'
import './User.css'
import UserMenu from '../../components/User/UserMenu/UserMenu'
import blueHome from "/assets/home_blue.png"
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import UserProfile from '../../components/User/UserProfile/UserProfile'
import KidProfile from '../../components/User/KidProfile/KidProfile'
import Order from '../../components/User/Order/Order'
import getUserLocalstorage from '../../utils/UserCurrent'

const User = () => {

  const navigate = useNavigate()

  /* // ** Cách này vẫn gọi được component UserProfile, KidProfile nhưng không thể thay đổi đường dẫn
  // Khi bấm nút User's Profile bên UserMenu
  const [showUserProfile, setShowUserProfile] = useState(true); // đặt true để khi lần đầu vào http://localhost:5173/user thì trang UserProfile này sẽ hiển thị đầu tiên 

  const handleShowUserProfile = () => {
    setShowUserProfile(true);
  };
  const handleHideUserProfile = () => {
    setShowUserProfile(false);
  };

  // Khi bấm nút Kid's Profile bên UserMenu
  const [showKidProfile, setShowKidProfile] = useState(false);

  const handleShowKidProfile = () => {
    setShowKidProfile(true)
  }
  const handleHideKidProfile = () => {
    setShowKidProfile(false)
  }
  */

  // chỉ cần vào /user là tự động chuyển hướng sang /user/user-profile
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/user') {
      navigate('/user/user-profile')
    }
  }, [location, navigate])

  const userCurrent = getUserLocalstorage();

  return (
    <div className="user-whole-container">
      <div className="user-container">

        {/* truyền như này vẫn gọi được component UserProfile, KidProfile nhưng không thể thay đổi đường dẫn */}
        <UserMenu
        // onShowUserProfile={handleShowUserProfile}
        // onHideUserProfile={handleHideUserProfile}
        // onShowKidProfile={handleShowKidProfile}
        // onHideKidProfile={handleHideKidProfile}
        />

        <div className='user-right-container'>
          <img src={blueHome} className='logo-home' onClick={() => navigate("/")} />
          <p className='welcome-user'>Hi, {userCurrent?.username}</p>

          <div className="info">
            {/* vẫn gọi được component UserProfile, KidProfile nhưng không thể thay đổi đường dẫn */}
            {/* {showUserProfile && <UserProfile/>}
            {showKidProfile && <KidProfile/>} */}

            {/* <Routes>
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/kid-profile" element={<KidProfile />} />
              <Route path="/order" element = {<Order/>}/>
            </Routes> */}

            {/*  
              Thay vì khai báo route như trên thì khai báo bên app.jsx như sau:
              <Route path="/user" element={<User/>}>
                <Route path='user-profile' element={<UserProfile/>}/>
                <Route path='kid-profile' element={<KidProfile/>}/>
                <Route path='order' element={<Order/>}/>
              </Route>
              sau đó vào nơi chứa cha và gọi Outlet (của thư viện react-router-dom)
              tùy thuộc vào đường dẫn mình truyền nó sẽ gọi ra những component có trong cha
            */}
            <Outlet />
          </div>

        </div>
      </div>
    </div>
  )
}

export default User