import React from 'react'
import './Slide.css'
import { Carousel, Col, Row } from 'antd'
import { alignProperty } from '@mui/material/styles/cssUtils';
// import 'antd/es/carousel/style/css';

import slide_1 from "/assets/Slide-1.jpg"
import slide_2 from "/assets/Slide-2.jpg"
import slide_3 from "/assets/Slide-3.jpg"
import slide_4 from "/assets/Slide-4.jpg"

const contentStyle = {
  margin: 0,
  height: '300px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const imgSlide = [
  {
    id: 1,
    img: slide_1,
  },
  {
    id: 2,
    img: slide_2,
  },
  {
    id: 3,
    img: slide_3,
  },
  {
    id: 4,
    img: slide_4,
  },
]

const Slide = () => {

  return (
     <div className="slide-container">
     <Carousel arrows infinite={false}>
       {imgSlide.map((item) => (
         <div className='slide-content' key={item.id}>
           <img src={item.img} />
         </div>
       ))}
     </Carousel>
     {/* <Row>
       <Col span={24} offset={0}>
         
       </Col>
     </Row> */}
   </div>
  )
}

export default Slide