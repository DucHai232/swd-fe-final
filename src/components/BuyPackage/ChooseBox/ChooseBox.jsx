import React, { useEffect, useState } from "react";
import "./ChooseBox.css";

import { Button, message, Steps, theme } from "antd";
import ChooseTheme from "./ChooseTheme/ChooseTheme";
import ChooseKid from "./ChooseKid/ChooseKid";
import Confirm from "./Confirm/Confirm";
import ChooseBoxStep from "./ChooseBoxStep/ChooseBoxStep";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getKidProfile } from "../../../redux/actions/kid.action";
import { getDataPackage } from "../../../redux/actions/package.action";
import { getThemes } from "../../../redux/actions/theme.action";
import { orderPackage } from "../../../redux/actions/package-order.action";
import store from "../../../store/ReduxStore";
import getUserLocalstorage from "../../../utils/UserCurrent";
import { updateInfoProfileKid } from "../../../apis/kid.request";
import {
  loadFromLocalstorage,
  removeLocalstorage,
  saveLocalstorage,
} from "../../../utils/LocalstorageMySteryBox";

const ChooseBox = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isNextEnabled, setNextEnabled] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState(null);
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [paginationState, setPaginationState] = useState({
    current: 1,
    pageSize: 5,
  });
  const [dataConfirm, setDataConfirm] = useState({});
  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const steps = [
    {
      title: "Choose theme",
      content: (
        <ChooseTheme
          setNextEnabled={setNextEnabled}
          selectedId={selectedThemeId}
          setSelectedId={setSelectedThemeId} // Truyền hàm để cập nhật ID của theme đã chọn
        />
      ),
    },
    {
      title: "Choose kid",
      content: (
        <ChooseKid
          setNextEnabled={setNextEnabled}
          selectedRowKey={selectedRowKey}
          setSelectedRowKey={setSelectedRowKey}
          paginationState={paginationState}
          setPaginationState={setPaginationState}
        />
      ),
    },
    {
      title: "Confirm",
      content: (
        <Confirm
          selectedRowKey={selectedRowKey}
          selectedThemeId={selectedThemeId}
          setDataConfirm={setDataConfirm}
        />
      ),
    },
    {
      title: "Choose box",
      content: (
        <ChooseBoxStep
          selectedId={selectedBoxId}
          setSelectedId={setSelectedBoxId}
        />
      ),
    },
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = async () => {
    setCurrent(current + 1);
    window.scrollTo(0, 350);
    if (current + 1 === 2) {
      await updateInfoProfileKid(selectedRowKey, { themeId: selectedThemeId });
    }
    if (current + 1 === 3) {
      saveLocalstorage("data-order", dataConfirm);
    }
  };
  const prev = () => {
    setCurrent(current - 1);
    window.scrollTo(0, 350);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  const handleDone = async () => {
    const confirmUserOrder = loadFromLocalstorage("data-order");
    await dispatch(orderPackage(id, confirmUserOrder));
    const confirmOrderFromServer =
      store.getState().packageOrderReducer.packageOrders[0];
    if (confirmOrderFromServer.success) {
      message.success(confirmOrderFromServer.messsage);
      removeLocalstorage("data-order");
      navigate("/user/order");
    } else {
      message.error(confirmOrderFromServer.message);
    }
    window.scrollTo(0, 350);
  };

  return (
    <div className="choose_box-container">
      <p className="choose_box-title">Choose box</p>

      <div className="choose_box-content">
        <Steps current={current} items={items} />

        <div style={contentStyle}>{steps[current].content}</div>

        {/* div dành cho nút Next, Previous */}
        <div className="choose_box-btn">
          {current < steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => next()}
              disabled={!isNextEnabled}
            >
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              /*onClick={() => message.success('Processing complete!')} */ onClick={
                handleDone
              }
              disabled={!selectedBoxId}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChooseBox;
