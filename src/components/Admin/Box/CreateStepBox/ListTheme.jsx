import React, { useEffect, useState } from "react";
import { CheckSquareOutlined, LoadingOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { getThemes } from "../../../../apis/theme.request";
const { Meta } = Card;

const ListTheme = ({ setSelectedThemeId, selectedThemeId }) => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getThemes("", 1);
      setThemes(response.data?.themes || []);
      setLoading(true);
    };
    fetchData();
  }, []);
  const conatinerStyle = {
    padding: "12px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 2fr)",
    gap: "12px",
    margin: "0 auto",
    alignItems: "center",
    justifyItems: "center",
  };

  return (
    <>
      {loading ? (
        <div style={conatinerStyle}>
          {themes.map((theme) => (
            <Card
              onClick={() => setSelectedThemeId(theme?.id)}
              style={{
                width: 300,
                border: theme?.id === selectedThemeId ? "3px solid blue" : "",
              }}
              cover={
                <img
                  alt="example"
                  style={{ height: "300px", objectFit: "cover" }}
                  src={theme?.image}
                />
              }
              actions={[
                <CheckSquareOutlined
                  onClick={() => setSelectedThemeId(theme?.id)}
                  style={{
                    color: theme?.id === selectedThemeId ? "blue" : "gray",
                  }}
                />,
              ]}
            >
              <Meta title={theme?.name} description={theme?.description} />
            </Card>
          ))}{" "}
        </div>
      ) : (
        <div>
          <LoadingOutlined
            style={{
              fontSize: "30px",

              // display: "flex",
              // alignItems: "center",
              // justifyContent: "center",
            }}
          />
        </div>
      )}
    </>
  );
};

export default ListTheme;
