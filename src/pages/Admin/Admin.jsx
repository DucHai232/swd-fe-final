import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  message,
  Space,
  theme,
} from "antd";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import ManageProduct from "../../components/Admin/Product/ManageProduct";

import "./Admin.css";
import logo from "/assets/Logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/auth.action";

const { Header, Sider, Content } = Layout;
const items = [
  {
    key: "theme",
    icon: <PieChartOutlined />,
    label: "Quản lý theme",
    route: "manage-theme",
  },
  {
    key: "product",
    icon: <ContainerOutlined />,
    label: "Quản lý sản phẩm",
    route: "manage-product",
  },
  {
    key: "package",
    label: "Quản lý package",
    icon: <MailOutlined />,
    children: [
      {
        key: "5",
        label: "Quản lý package",
        route: "manage-package",
      },
      {
        key: "6",
        label: "Thùng rác package",
        route: "trash-package",
      },
    ],
  },
  {
    key: "box",
    label: "Mystery Box",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "9",
        label: "Lịch sử chọn các box",
        route: "manage-box-history",
      },
      {
        key: "10",
        label: "Quản lý box",
        route: "manage-box",
      },
    ],
  },
  {
    key: "cart",
    label: "Orders",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "1",
        label: "Doanh thu",
        route: "orders/revenue",
      },
      {
        key: "2",
        label: "Xác nhận gói hàng",
        route: "orders/confirm-box-order",
      },
      {
        key: "3",
        label: "Quản lý gói hàng",
        route: "orders/manage-box-period",
      },
      {
        key: "4",
        label: "Quản lý đơn hàng",
        route: "orders/manage-order",
      },
    ],
  },
];

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (e) => {
    let selectedItem;

    items.forEach((item) => {
      if (item.key === e.key) {
        selectedItem = item;
      }
      if (item.children) {
        item.children.forEach((child) => {
          if (child.key === e.key) {
            selectedItem = child;
          }
        });
      }
    });

    if (selectedItem?.route) {
      navigate(selectedItem.route);
    }
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    dispatch(logout());
    message.success("Log Out Successfully");
    navigate("/");
  };

  const listDropdown = [
    {
      label: "Log out",
      key: "1",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  const menu = <Menu items={listDropdown} />;
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* <div className="demo-logo-vertical" /> */}
        <div className="header-admin">
          {!collapsed ? <img src={logo} className="logo" /> : <></>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{ height: "100vh" }}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <Dropdown
            menu={{ items: listDropdown }}
            trigger={["click"]}
            className="dropdown"
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar
                  src={
                    "https://cdn-media.sforum.vn/storage/app/media/THANHAN/avatar-trang-98.jpg"
                  }
                  style={{
                    cursor: "pointer",
                    width: "40px",
                    height: "40px",
                    marginRight: "20px",
                  }}
                />
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
