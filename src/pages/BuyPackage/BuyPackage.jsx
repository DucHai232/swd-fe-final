import React, { useEffect } from 'react'
import './BuyPackage.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ChoosePackage from '../../components/BuyPackage/ChoosePackage/ChoosePackage'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const BuyPackage = () => {

  const navigate = useNavigate()

  const location = useLocation()

  // chỉ cần vào /buy-package là tự động chuyển hướng sang /buy-package/choose-package
  useEffect(() => {
    if (location.pathname === '/buy-package') {
      navigate('/buy-package/choose-package')
    }
  }, [location, navigate])

  return (
    <div className='buy_package-whole-container'>
      <Header />
      <div className="buy_package-container">
        <Outlet/>
      </div>
      <Footer />
    </div>
  )
}

export default BuyPackage