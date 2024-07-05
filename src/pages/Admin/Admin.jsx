import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import ManageProduct from "../../components/Admin/Product/ManageProduct";
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
        label: "Quản lý đơn hàng",
        route: "orders/manage-box-period",
      },
    ],
  },
];

const Admin = () => {
  const navigate = useNavigate();
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

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
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
