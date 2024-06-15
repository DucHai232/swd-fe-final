import React from 'react'
import './JoinUs.css'

import join_img from '/assets/Instruction for joining.png'
import { useNavigate } from 'react-router-dom'

const JoinUs = () => {

    const navigate = useNavigate()

    return (
        <div className="join_us-container">
            <div className="img-join">
                <img src={join_img} />
            </div>
            <div className="content">
                <p className='title'>Instruction for joining</p>
                <div className="info">
                    <p>Buy the package to get a surprise every month!!!</p>
                    <p>
                        Are you looking for a perfect service to enhance <br />
                        your experience? Come to Mystery Box - a place that <br />
                        provides comprehensive and high quality solutions <br />
                        for you! We are proud to bring you unique services, <br />
                        specifically designed to meet all your needs.<br />
                        <br />
                        Here, we will sell combo packages, depending on <br />
                        the time you choose to buy, we will target that time <br />
                        and send you cute surprises. <br />
                        <br />
                        Let us accompany you on the path to conquering and <br />
                        developing your children's childhood. Register today <br />
                        to experience the difference and receive the most <br />
                        surprising mysterious gifts. Don't miss this opportunity, <br />
                        you deserve to experience the best service!
                    </p>

                    <p onClick={() => navigate('/buy-package')}>Buy Now!!</p>
                </div>
            </div>
        </div>
    )
}

export default JoinUs