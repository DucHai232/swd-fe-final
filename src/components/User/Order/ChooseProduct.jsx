import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import './ChooseProduct.css'

import { Button, message, Steps, theme } from 'antd';
import ChooseThemeInOrder from "./ChooseThemeInOrder/ChooseThemeInOrder";
import ConfirmInOrder from "./ConfirmInOrder/ConfirmInOrder";
import { getCurrentPeriod } from "../../../apis/period.request";
import ChooseBoxInOrder from "./ChooseBoxInOrder/ChooseBoxInOrder";


const ChooseProduct = ({ handleBreadcrumb, setOpenChooseProduct }) => {

  const [isNextEnabled, setNextEnabled] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState(null);
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [currentPeriod, setCurrentPeriod] = useState();
  const [dataConfirm, setDataConfirm] = useState({});
  const [selectedBoxId, setSelectedBoxId] = useState(null);

  const steps = [
    {
      title: 'Choose theme',
      content:
        <ChooseThemeInOrder
          setNextEnabled={setNextEnabled}
          selectedId={selectedThemeId}
          setSelectedId={setSelectedThemeId} // Truyền hàm để cập nhật ID của theme đã chọn
        />,
    },
    {
      title: 'Confirm',
      content:
        <ConfirmInOrder
          selectedRowKey={selectedRowKey}
          selectedThemeId={selectedThemeId}
          setDataConfirm={setDataConfirm}
        />
    },
    {
      title: 'Choose box',
      content: 
      <ChooseBoxInOrder
          selectedId={selectedBoxId}
          setSelectedId={setSelectedBoxId}
        />,

    },
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCurrentPeriod();
      setCurrentPeriod(response?.data.periodCurrent);
    };
    fetchData();
  }, []);

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
    const confirmOrderFromServer = store.getState().packageOrderReducer?.order;
    if (confirmOrderFromServer && confirmOrderFromServer.success) {
      await createPackageInPeriod({
        periodId: currentPeriod?.id,
        boxId: selectedBoxId,
        packageOrderId: confirmOrderFromServer?.order?.id,
      });
      message.success(confirmOrderFromServer.messsage);
      removeLocalstorage("data-order");
      navigate("/user/order");
    } else {
      message.error(confirmOrderFromServer.message);
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

        {/* div dành cho nút Next, Previous */}
        <div className='choose_box-btn'>

          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()} disabled={!isNextEnabled}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" /*onClick={() => message.success('Processing complete!')} */ onClick={handleDone} disabled={!selectedBoxId}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: '0 8px',
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
