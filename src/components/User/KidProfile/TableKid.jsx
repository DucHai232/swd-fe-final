import React, { useEffect, useRef, useState } from "react";
import "./TableKid.css";

import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Empty, Input, Popconfirm, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import CreateKid from "./CreateKid";
import { useDispatch, useSelector } from "react-redux";
import { getKidProfile } from "../../../redux/actions/kid.action";

const data = [
  {
    key: "1",
    fullName: "John Brown",
    yob: "1/1/2010",
    gender: "Male",
    descriptionHobby: "Toy car, rubik",
    type: "puzzle",
    color: "pink",
    material: "wood",
    toyOrigin: "China",
  },
  {
    key: "2",
    fullName: "Alice Smith",
    yob: "3/14/2012",
    gender: "Female",
    descriptionHobby: "Dolls, drawing",
    type: "educational",
    color: "blue",
    material: "plastic",
    toyOrigin: "USA",
  },
  {
    key: "3",
    fullName: "Michael Johnson",
    yob: "7/22/2008",
    gender: "Male",
    descriptionHobby: "Lego, puzzles",
    type: "construction",
    color: "red",
    material: "metal",
    toyOrigin: "Germany",
  },
  {
    key: "4",
    fullName: "Emma Davis",
    yob: "11/5/2011",
    gender: "Female",
    descriptionHobby: "Board games, reading",
    type: "board game",
    color: "green",
    material: "cardboard",
    toyOrigin: "Canada",
  },
  {
    key: "5",
    fullName: "William Martinez",
    yob: "5/30/2009",
    gender: "Male",
    descriptionHobby: "Action figures, sports",
    type: "action figure",
    color: "black",
    material: "plastic",
    toyOrigin: "Japan",
  },
  {
    key: "6",
    fullName: "Olivia Garcia",
    yob: "8/19/2013",
    gender: "Female",
    descriptionHobby: "Crafts, music",
    type: "musical",
    color: "yellow",
    material: "wood",
    toyOrigin: "Italy",
  },
  {
    key: "7",
    fullName: "James Rodriguez",
    yob: "2/28/2010",
    gender: "Male",
    descriptionHobby: "Cars, video games",
    type: "vehicle",
    color: "blue",
    material: "metal",
    toyOrigin: "France",
  },
  {
    key: "8",
    fullName: "Sophia Hernandez",
    yob: "12/15/2011",
    gender: "Female",
    descriptionHobby: "Science kits, reading",
    type: "educational",
    color: "purple",
    material: "plastic",
    toyOrigin: "UK",
  },
  {
    key: "9",
    fullName: "Liam Lopez",
    yob: "4/10/2008",
    gender: "Male",
    descriptionHobby: "Robotics, coding",
    type: "robotic",
    color: "silver",
    material: "metal",
    toyOrigin: "South Korea",
  },
  {
    key: "10",
    fullName: "Mia Wilson",
    yob: "6/25/2012",
    gender: "Female",
    descriptionHobby: "Cooking sets, gardening",
    type: "pretend play",
    color: "pink",
    material: "plastic",
    toyOrigin: "Mexico",
  },
  {
    key: "11",
    fullName: "Noah Clark",
    yob: "9/17/2009",
    gender: "Male",
    descriptionHobby: "Dinosaurs, archaeology",
    type: "dinosaur",
    color: "green",
    material: "plastic",
    toyOrigin: "Australia",
  },
];

export default function TableKid() {
  const [showTable, setShowTable] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [kid, setKid] = useState({});
  const [kidId, setKidId] = useState("");
  const [dataTmp, setDataTmp] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getKidProfile());
  }, []);
  const kids = useSelector((state) => state.kidReducer?.dataKids);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleView = (record) => {
    // Thực hiện hành động khi nhấp vào "View"
    setShowTable(true);
    setIsDisable(true);
    setKid(record);
  };

  const handleUpdate = (record) => {
    // Thực hiện hành động khi nhấp vào "Update"
    setShowTable(true);
    setIsDisable(false);
    setKid(record);
    setKidId(record.id);
  };

  const handleShowTable = () => {
    setShowTable(false);
  };

  const handleDelete = (record) => {
    const newData = data.filter((item) => item.key != record.key);
    setDataTmp(newData);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const columns = [
    {
      title: "Full name",
      dataIndex: "fullName",
      key: "fullName",
      width: "30%",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Age",
      dataIndex: "yob",
      key: "age",
      width: "10%",
      sorter: (a, b) => calculateAge(a.yob) - calculateAge(b.yob),
      sortDirections: ["descend", "ascend"],
      render: (text, record) => calculateAge(record.yob),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => (
        <p>
          {gender === "MALE" ? "Boy" : gender === "FEMALE" ? "Girl" : "Unisex"}
        </p>
      ),
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "20%",
      render: (text, record) => (
        <Space>
          <Button onClick={() => handleView(record)}>
            <EyeOutlined />
          </Button>
          <Button onClick={() => handleUpdate(record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Are you sure delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record)}
          >
            <Button danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div className="table_kid-container">
      {!showTable ? (
        <Table
          columns={columns}
          dataSource={kids}
          scroll={{ y: 300 }}
          pagination={{
            pageSize: 5,
          }}
          locale={{
            emptyText: <Empty description="You have no kid here" />,
          }}
        />
      ) : (
        <CreateKid
          kid={kid}
          kidId={kidId}
          showTable={handleShowTable}
          isDisable={isDisable}
        />
      )}
    </div>
  );
}
