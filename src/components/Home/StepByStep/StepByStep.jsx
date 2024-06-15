import React from 'react'
import './StepByStep.css'

import step_1 from '/assets/step-1.png'
import step_2 from '/assets/step-2.png'
import step_3 from '/assets/step-3.png'
import step_4 from '/assets/step-4.png'

import number_1 from '/assets/Number-1.png'
import number_2 from '/assets/Number-2.png'
import number_3 from '/assets/Number-3.png'
import number_4 from '/assets/Number-4.png'

const StepByStep = () => {
  return (
    <div className='step_by_step-container'>
      <p className='title'>
        Journey to Receive Magical Gifts <br />
        with Mystery Box 🎁✨
      </p>

      <div className="content">

        <div className="step">
          <img src={step_1} className='step-img-1' />
          <img src={number_1} className='number-img number-img-1' />
          <div className="sub-content">
            <p>Register or Sign In to our website</p>
            <p>👉 The first step to start your magical journey with Mystery Box is to register or log in to <br />
              your account.  Just a few simple steps for you to access a world of surprise gifts just for your <br />
              baby!
            </p>
          </div>
        </div>

        <div className="step">
          <img src={step_2} className='step-img-1 step-img-2' />
          <img src={number_2} className='number-img number-img-2' />
          <div className="sub-content">
            <p>Complete your kid's profile</p>
            <p>📝 Take some time to fill out your baby's profile information, including  <br />
              year of birth, gender and favorite topics. This information will help us  <br />
              choose the right gifts and make your baby happier than ever!
            </p>
          </div>
        </div>

        <div className="step">
          <img src={step_3} className='step-img-1' />
          <img src={number_3} className='number-img number-img-3' />
          <div className="sub-content">
            <p>Buy package</p>
            <p>💝 Choose a gift package that suits your needs and budget. Each gift package is designed  <br />
              with the number of times sent and the average value of the gift, ensuring your child will <br />
              always receive wonderful and surprising gifts!
            </p>
          </div>
        </div>

        <div className="step">
          <img src={step_4} className='step-img-1 step-img-2' />
          <img src={number_4} className='number-img number-img-4' />
          <div className="sub-content">
            <p>Waiting for the gift to arrive</p>
            <p>📦 Relax and wait for the magical gift boxes to be delivered to your  <br />
              baby. Each gift box is a special surprise, containing fun and useful items, <br /> 
              carefully selected by our team!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepByStep