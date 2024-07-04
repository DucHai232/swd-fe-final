import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import User from "./pages/User/User";
import UserProfile from "./components/User/UserProfile/UserProfile";
import KidProfile from "./components/User/KidProfile/KidProfile";
import Order from "./components/User/Order/Order";
import BuyPackage from "./pages/BuyPackage/BuyPackage";
import ChoosePackage from "./components/BuyPackage/ChoosePackage/ChoosePackage";
import ChooseBox from "./components/BuyPackage/ChooseBox/ChooseBox";
import ManageTheme from "./components/Admin/Theme/ManageTheme";
import ManageProduct from "./components/Admin/Product/ManageProduct";
import Revenue from "./components/Admin/Revenue/Revenue";
import ManagePackage from "./components/Admin/Package/ManagePackage";
import HistoryBox from "./components/Admin/Box/HistoryBox";
import ManageBox from "./components/Admin/Box/ManageBox";
import { useSelector } from "react-redux";
import ManageOrder from "./components/Admin/Status/ManageOrder";
import getUserLocalstorage from "./utils/UserCurrent";
import CreateStepBox from "./components/Admin/Box/CreateStepBox/CreateStepBox";
import Product from './components/Product/Product';

function App() {
  const user =
    useSelector((state) => state.authReducer?.auth?.user) ||
    getUserLocalstorage();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user?.role == "ADMIN" ? <Navigate to={"admin"} /> : <Home />}
        />
        <Route
          path="/admin/*"
          element={user?.role === "ADMIN" ? <Admin /> : <Navigate to={"/"} />}
        >
          <Route path="manage-theme" element={<ManageTheme />} />
          <Route path="manage-product" element={<ManageProduct />} />
          <Route path="manage-cart/revenue" element={<Revenue />} />
          <Route path="manage-cart/status" element={<ManageOrder />} />
          <Route path="manage-package" element={<ManagePackage />} />
          <Route path="manage-box-history" element={<HistoryBox />} />
          <Route path="manage-box" element={<ManageBox />} />
          <Route path="create-box" element={<CreateStepBox />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/user*" element={<User/>}/> */}
        <Route path="/user" element={<User />}>
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="kid-profile" element={<KidProfile />} />
          <Route path="order" element={<Order />} />
        </Route>

        <Route path="/buy-package" element={<BuyPackage />}>
          <Route path="choose-package" element={<ChoosePackage />} />
          <Route path="choose-box/:id" element={<ChooseBox />} />
        </Route>

        <Route path="/product" element={<Product/>}/>

      </Routes>
    </>
  );
}

export default App;
