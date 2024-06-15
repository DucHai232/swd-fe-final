import React, { useEffect, useState } from 'react'
import './UserMenu.css'

import logo from "/assets/Logo.png"
import user_profile_icon from "/assets/user_profile-icon.png"
import baby_profile_icon from "/assets/baby.png"
import order_icon from "/assets/checkout.png"
import { useLocation, useNavigate } from 'react-router-dom'

const UserMenu = (/*{ onShowUserProfile, onHideUserProfile, onShowKidProfile, onHideKidProfile }*/) => { // bỏ cách truyền props này vì vẫn gọi được component con nhưng không thể thay đổi đường dẫn
  const navigate = useNavigate();

  const listBtn = [
    {
      id: 1,
      img: user_profile_icon,
      title: "User's profile",
    },
    {
      id: 2,
      img: baby_profile_icon,
      title: "Kid's profile",
    },
    {
      id: 3,
      img: order_icon,
      title: "Orders",
    },
  ]

  const listSubBtn = [
    {
      id: 1,
      title: "Kid 1",
    },
    {
      id: 2,
      title: "Kid 2",
    },
    {
      id: 3,
      title: "Kid 3",
    },
    {
      id: 4,
      title: "Kid 4",
    },
    {
      id: 5,
      title: "Kid 5",
    },
    {
      id: 6,
      title: "Kid 6",
    },
    {
      id: 7,
      title: "Kid 7",
    },
    {
      id: 8,
      title: "Kid 8",
    },
  ]

  const [activeButton, setActiveButton] = useState(null); //  lưu trạng thái của nút chính đang được chọn.
                                                // để "1" để khi mới vào thì nút 1 sẽ sáng lên đầu tiên // Nhưng h mình sẽ giải quyết chuyện đó bằng useLocation()

  const [showSubButtons, setShowSubButtons] = useState(false); // xác định xem có hiển thị các nút con hay không
  const [activeSubButton, setActiveSubButton] = useState(null) //  lưu trạng thái của nút con đang được chọn

  // khi nhấn vào một nút chính, nếu nút chính có id là 2 thì nó sẽ bật/tắt việc hiển thị các nút con. 
  // Nếu không phải, nó sẽ chỉ đặt nút chính là activeButton và ẩn các nút con nếu có
  const handleButtonClick = (buttonIndex) => {
    if (buttonIndex === 2) {
      if (showSubButtons) {
        setActiveSubButton(null); // Reset trạng thái của các nút con khi nút 2 được bấm lần thứ hai
      }
      setShowSubButtons(!showSubButtons);

      // onShowKidProfile()
      navigate('/user/kid-profile');
    } else {
      // onHideKidProfile()
    }
    setActiveButton(buttonIndex);
    setActiveSubButton(null)

    // Gọi hàm onShowUserProfile khi buttonIndex là 1 (User's profile) // Bỏ cách này
    if (buttonIndex === 1) {
      // onShowUserProfile();
      navigate('/user/user-profile');
    } else {
      // onHideUserProfile();
    }

    if (buttonIndex === 3){
      navigate('/user/order')
    }
  }

  // khi nhấn vào một nút con. Nó sẽ đặt nút con là activeSubButton và tắt việc chọn nút chính.
  const handleSubButtonClick = (subButtonIndex) => {
    setActiveSubButton(subButtonIndex);
    // setActiveButton(null) // để khi bấm nút con thì nút cha là nút 2 hay các nút 1, 3 không được chọn
    setActiveButton(2); // Đảm bảo nút cha vẫn phát sáng
  };

  // khi người dùng có reload lại trang thì đang ở component nào thì nút đó sẽ phát sáng
  const location = useLocation()
  
  useEffect(() => {
    if(location.pathname === '/user/user-profile'){
      setActiveButton(1)
    }
    if(location.pathname === '/user/kid-profile'){
      setActiveButton(2)
    }
    if(location.pathname === '/user/order'){
      setActiveButton(3)
    }
  }, [location])

  return (

    <div className="user_menu-container">

      <div className="image">
        <img src={logo} />
      </div>

      <div className="list-btn">
        {listBtn.map((item) => (
          <div key={item.id} className='btn'>
            <div className={`btn-item ${activeButton === item.id ? 'choose' : ''}`}
              onClick={() => handleButtonClick(item.id)}
            >
              <div className="image-icon">
                <img src={item.img} />
              </div>
              <p>{item.title}</p>
            </div>
            {item.id === 2 && showSubButtons && (
              <div className={`sub-btn ${showSubButtons ? 'show' : 'hide'}`}>
                {listSubBtn.map((subItem) => (
                  <div className={`sub-btn-item ${activeSubButton === subItem.id ? 'choose' : ''}`}
                    onClick={() => handleSubButtonClick(subItem.id)}
                    key={subItem.id}
                  >
                    <div className="image-icon">
                      <img src={baby_profile_icon} />
                    </div>
                    <p>{subItem.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserMenu