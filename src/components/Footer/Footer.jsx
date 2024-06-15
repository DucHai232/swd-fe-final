import React from 'react'
import './Footer.css'

import logo from "/assets/Logo.png"
import facebook from "/assets/facebook_footer.png"
import youtube from "/assets/youtube_footer.png"
import instagram from "/assets/instagram_footer.png"
import tiktok from "/assets/tik-tok_footer.png"
import { useNavigate } from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    }

    return (
        <div className="footer-whole-container">
            <div className='footer-container'>
                <div className="footer-left">

                    <img src={logo} className='logo' onClick={handleLogoClick} />

                    <div className="contact">
                        <p><strong>Contact: </strong> 0703631541</p>
                        <p><strong>Address: </strong> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức</p>
                        <p><strong>Contact: </strong> mysterybox@gmail.com</p>
                    </div>

                    <div className="social-icon">
                        <img src={facebook} className='image' />
                        <img src={youtube} className='image' />
                        <img src={instagram} className='image' />
                        <img src={tiktok} className='image' />

                    </div>

                </div>

                <div className="footer-middle">
                    <div className="border">
                        <div className="content">
                            <p>Policy and Terms</p>
                            <ul>
                                <li>Delivery policy</li>
                                <li>Terms and conditions</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-right">
                    <div className="border">
                        <div className="content">
                            <p>Customer support</p>
                            <ul>
                                <li>Privacy Policy</li>
                                <li>Goods return policy</li>
                                <li>Payment policy</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer