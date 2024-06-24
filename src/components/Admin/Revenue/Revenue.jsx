import React, { useEffect, useState } from "react";
import "./Revenue.css";
import { IoStatsChart } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";
import Chart from "./Chart";
import { DatePicker } from "antd";
import { revenueWeek } from "../../../apis/dashboard.request";

const Revenue = () => {
  const [dataRevenue, setDataRevenue] = useState({});
  useEffect(() => {
    const fetchRevenue = async () => {
      const response = await revenueWeek();
      setDataRevenue(response.data);
    };
    fetchRevenue();
  }, []);

  const listData = [
    {
      number: dataRevenue?.sumMoneyThisWeek,
      des: "Tổng tiền",
      color: "color-blue",
      status: "reduce",
      growNumber: "2.65",
      text: "So với tuần trước",
      icon: <IoStatsChart />,
    },
    {
      number: dataRevenue?.countThisWeek,
      des: "Đơn hàng",
      color: "color-green",
      status: "reduce",
      growNumber: "0.85",
      text: "So với tuần trước",
      icon: <CiShoppingCart />,
    },
    {
      number: "40",
      des: "Khách hàng mới",
      color: "color-red",
      status: "increase",
      growNumber: "6.65",
      text: "So với tuần trước",
      icon: <FaUserFriends />,
    },
    {
      number: dataRevenue?.growthRate,
      des: "Tăng trưởng",
      color: "color-tomato",
      status: "increase",
      growNumber: "10.65",
      text: "So với tuần trước",
      icon: <IoStatsChart />,
    },
  ];
  return (
    <div className="revenue-container">
      <h1>Doanh thu</h1>
      <div className="cards">
        {listData.map((item) => (
          <div className="card total-price">
            <div className="item-1">
              <div>
                <p className="number">{item.number?.toLocaleString()}</p>
                <p className="des">Tổng tiền</p>
              </div>
              {/* <IoStatsChart className="icon color-blue" /> */}
              <div className={`icon ${item.color}`}>{item.icon}</div>
            </div>
            <div className="item-2">
              <div className={item.status === "increase" ? "grow" : "down"}>
                {item.status === "increase" ? (
                  <FaArrowUp />
                ) : (
                  <FaArrowDownLong />
                )}

                <p className="number">{item.growNumber}%</p>
              </div>
              <p className="text">So với tuần trước</p>
            </div>
          </div>
        ))}
      </div>
      <div className="charts">
        <div className="card chart">
          <Chart />
        </div>
        <div className="filter">
          <div className="filter-date">
            <div className="title">Chọn ngày tháng</div>
            <div className="date">
              <DatePicker style={{ width: "100%" }} />
              <DatePicker style={{ width: "100%", marginTop: "12px" }} />
            </div>
            <button
              style={{
                marginTop: "12px",
                position: "absolute",
                top: "55%",
                left: "50%",
                transform: "translate(-50%, 0%)",
                border: "none",
                color: "white",
                padding: "8px 32px",
                cursor: "pointer",
                background: "#3572EF",
                borderRadius: "8px",
              }}
            >
              Dữ liệu
            </button>
          </div>
          <div className="filter-choose">
            <div className="title">Bộ lọc</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
