import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import "./ChooseProduct.css";
import { Button, message, Steps, theme } from "antd";
import ChooseThemeInOrder from "./ChooseThemeInOrder/ChooseThemeInOrder";
import ConfirmInOrder from "./ConfirmInOrder/ConfirmInOrder";
import ChooseBoxInOrder from "./ChooseBoxInOrder/ChooseBoxInOrder";
import {
  loadFromLocalstorage,
  removeLocalstorage,
  saveLocalstorage,
} from "../../../utils/LocalstorageMySteryBox";
import { createPackageInPeriod } from "../../../apis/packageInPeriods.request";

const ChooseProduct = ({
  handleBreadcrumb,
  setOpenChooseProduct,
  packageOrderId,
  setShowDetail,
}) => {
  const [isNextEnabled, setNextEnabled] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState(null);
  const [condition, setCondition] = useState({
    themeId: selectedThemeId,
    yob: "",
  });
  const [dataConfirm, setDataConfirm] = useState({});
  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const steps = [
    {
      title: "Choose theme",
      content: (
        <ChooseThemeInOrder
          setNextEnabled={setNextEnabled}
          selectedId={selectedThemeId}
          setSelectedId={setSelectedThemeId}
          setCondition={setCondition}
        />
      ),
    },
    {
      title: "Confirm",
      content: (
        <ConfirmInOrder
          selectedThemeId={selectedThemeId}
          setDataConfirm={setDataConfirm}
        />
      ),
    },
    {
      title: "Choose box",
      content: (
        <ChooseBoxInOrder
          selectedId={selectedBoxId}
          setSelectedId={setSelectedBoxId}
          condition={condition}
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
      saveLocalstorage("data-period-confirm", dataConfirm);
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
    const confirmUserOrder = loadFromLocalstorage("data-period-confirm");
    const response = await createPackageInPeriod({
      boxId: selectedBoxId,
      packageOrderId: packageOrderId,
      address: confirmUserOrder?.address,
      phone: confirmUserOrder?.phone,
      nameOfAdult: confirmUserOrder?.nameOfAdult,
    });
    if (response.data.success) {
      message.success(response.data.message);
      removeLocalstorage("data-period-confirm");
      removeLocalstorage("data-order");
      setShowDetail(false);
      setOpenChooseProduct(false);
    } else {
      message.error("Hệ thống đang lỗi thử lại sau");
    }

    window.scrollTo(0, 350);
  };
  return (
    <div className="choose-product-container">
      <Breadcrumb
        style={{
          fontSize: "18px",
          fontFamily: "Josefin Sans, sans-serif",
          display: "flex",
          alignItems: "center",
        }}
        items={[
          {
            title: (
              <p
                onClick={() => handleBreadcrumb()}
                style={{ cursor: "pointer" }}
              >
                Orders
              </p>
            ),
          },
          {
            title: (
              <p
                onClick={() => setOpenChooseProduct(false)}
                style={{ cursor: "pointer" }}
              >
                Detail
              </p>
            ),
          },
          {
            title: <p>Choose product</p>,
          },
        ]}
      />

      <div className="choose_box-content">
        <Steps current={current} items={items} />

        <div style={contentStyle}>{steps[current].content}</div>
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
              onClick={handleDone}
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

export default ChooseProduct;
