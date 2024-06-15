import React from 'react'
import './WhyChooseUs.css'

import star from "/assets/star.png"
import correct from "/assets/verify.png"
import education from "/assets/light-bulb.png"
import gift from "/assets/surprise.png"
import heart from "/assets/heart.png"
import rocket from "/assets/rocket.png"

const WhyChooseUs = () => {
    const listContent = [
        {
            id: 1,
            img: star,
            title: <p className='sub-title'>🌈 Diverse and rich 🌈</p>,
            content:
                <p className='sub-content'>
                    We provide many different types of <br /> 
                    gift boxes with diverse themes and <br /> 
                    suitable for each age of children. <br /> 
                    Each box is carefully selected to <br /> 
                    ensure it brings surprise and <br /> 
                    excitement to children.
                </p>
        },
        {
            id: 2,
            img: correct,
            title: <p className='sub-title'>🛡️ Guaranteed quality 🛡️</p>,
            content:
                <p className='sub-content'>
                    The products in the gift box are <br /> 
                    genuine, high quality and safe for <br /> 
                    children. We always check thoroughly <br /> 
                    before packaging to ensure customer <br /> 
                    safety and satisfaction.
                </p>
        },
        {
            id: 3,
            img: education,
            title: <p className='sub-title'>📝 High educational value 📝</p>,
            content:
                <p className='sub-content'>
                    Not just gifts, our gift boxes also <br /> 
                    contain educational toys and books, <br />
                    helping children develop thinking, <br />
                    creativity and social skills.
                </p>
        },
        {
            id: 4,
            img: gift,
            title: <p className='sub-title'>🎉 New and attractive experience 🎉</p>,
            content:
                <p className='sub-content'>
                    Mysterious gift boxes give children a <br />
                    feeling of thrill and anticipation when <br />
                    opening gifts, creating fun and <br />
                    memorable memories. This is also a <br />
                    great way to stimulate children's <br />
                    curiosity and exploration.
                </p>
        },
        {
            id: 5,
            img: heart,
            title: <p className='sub-title'>🤝 Dedicated customer service 🤝</p>,
            content:
                <p className='sub-content'>
                    We always listen and support <br />
                    customers quickly and thoughtfully. <br />
                    Our staff is ready to advise and <br />
                    answer all questions so you can have <br />
                    the best shopping experience.
                </p>
        },
        {
            id: 6,
            img: rocket,
            title: <p className='sub-title'>🔍 Continuous <br/> creativity  and innovation 🔍</p>,
            content:
                <p className='sub-content'>
                    We constantly seek and develop new <br />
                    ideas to bring customers the most <br />
                    unique and interesting products. Each <br />
                    gift box is a delicate combination of <br />
                    creativity and quality, guaranteed to <br />
                    bring wonderful experiences to <br />
                    children.
                </p>
        },

    ]
    return (
        <div className='why_choose_us-container'>
            <p className='title'>🌟 Choose Us 🌟 <br /> ✨ Where Gift Boxes Bring Smiles to Your Kids! ✨</p>
            {listContent.map((item) => (
                <div className="content" key={item.id}>
                    <img src={item.img} />
                    {item.title}
                    {item.content}
                </div>
            ))}
            <p className='slogan'>✨ With Mystery Box, every time your kids receives a gift is a journey of discovery full of joy and happiness! ✨</p>
        </div>
    )
}

export default WhyChooseUs