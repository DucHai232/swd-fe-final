import { Modal, Button, message, Result } from "antd";
import React, { useState } from "react";
import { updateStatusPackageInPeriod } from "../../../apis/packageInPeriods.request";

const ModalUpdateOrders = ({
  packageInPeriod,
  isModalOpen,
  handleOk,
  handleCancel,
  setCallback,
}) => {
  const handleUpdateStatus = async (body) => {
    const response = await updateStatusPackageInPeriod(
      packageInPeriod.id,
      body
    );
    if (response.data.success) {
      message.success(response.data.message);
      setCallback((prev) => !prev);
      handleCancel();
    } else {
      message.error(response.data.message);
    }
  };

  return (
    <div>
      <Modal
        title="Order Status"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {!packageInPeriod.packagingDate && (
          <>
            <p>Đang đóng gói hàng ....</p>
            <Button
              type="primary"
              onClick={() =>
                handleUpdateStatus({
                  status: "packageDate",
                  updateStatus: "DELIVERY",
                })
              }
            >
              Đóng gói xong
            </Button>
          </>
        )}
        {packageInPeriod.packagingDate && !packageInPeriod.deliveryDate && (
          <>
            <p>Đang giao hàng ...</p>
            <Button
              type="primary"
              onClick={() =>
                handleUpdateStatus({
                  status: "deliveryDate",
                  updateStatus: "CONFIRM",
                })
              }
            >
              Giao hàng xong
            </Button>
          </>
        )}
        {packageInPeriod.deliveryDate && !packageInPeriod.confirmDate && (
          <>
            <p>Xác nhận đơn hàng ...</p>
            <Button
              type="primary"
              onClick={() =>
                handleUpdateStatus({
                  status: "confirmDate",
                  updateStatus: "CONFIRM",
                })
              }
            >
              Xác nhận đơn hàng
            </Button>
          </>
        )}
        {packageInPeriod.packagingDate &&
          packageInPeriod.deliveryDate &&
          packageInPeriod.confirmDate && (
            <>
              <Result
                status="success"
                title="Đơn hàng đã hoàn thành!"
                subTitle="Mystery Box xin cảm ơn"
              />
            </>
          )}
      </Modal>
    </div>
  );
};

export default ModalUpdateOrders;
