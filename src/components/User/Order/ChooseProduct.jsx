import { Breadcrumb } from "antd";
import React from "react";

const ChooseProduct = ({ handleBreadcrumb, setOpenChooseProduct }) => {
  return (
    <div className="choose-product-container">
      <Breadcrumb
        style={{
          fontSize: "18px",
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
    </div>
  );
};

export default ChooseProduct;
