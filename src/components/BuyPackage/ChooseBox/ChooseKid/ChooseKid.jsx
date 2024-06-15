import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Empty, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import "./ChooseKid.css";
import { useDispatch, useSelector } from "react-redux";
import { getKidProfile } from "../../../../redux/actions/kid.action";

const ChooseKid = ({
  setNextEnabled,
  selectedRowKey,
  setSelectedRowKey,
  paginationState,
  setPaginationState,
}) => {
  const [selectionType, setSelectionType] = useState("radio");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const dispatch = useDispatch();

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
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
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

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      className: "column",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Date of birth",
      dataIndex: "yob",
      className: "column",
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      className: "column",
      filters: [
        {
          text: "Boy",
          value: "Boy",
        },
        {
          text: "Girl",
          value: "Girl",
        },
        {
          text: "Unisex",
          value: "Unisex",
        },
      ],
      onFilter: (value, record) => record.gender.indexOf(value) === 0,
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    setPaginationState(pagination);
  };

  const [isRowSelected, setIsRowSelected] = useState(false);

  const handleRowSelection = () => ({
    onClick: () => {
      setIsRowSelected(true);
    },
  });

  useEffect(() => {
    if (selectedRowKey) {
      setIsRowSelected(true);
    }
    setNextEnabled(isRowSelected);
    dispatch(getKidProfile());
  }, [selectedRowKey, isRowSelected, setNextEnabled]);
  const kids = useSelector((state) => state.kidReducer?.dataKids);
  return (
    <div className="choose_kid-container">
      <Table
        className="choose_kid-table"
        rowSelection={{
          type: selectionType,
          selectedRowKeys: selectedRowKey ? [selectedRowKey] : [],
          onChange: (selectedRowKeys) => {
            const selectedKey = selectedRowKeys[0];
            setSelectedRowKey(selectedKey);
          },
        }}
        columns={columns}
        dataSource={kids.map((kid) => ({ ...kid, key: kid.id }))}
        onChange={onChange}
        onRow={(record, rowIndex) => ({
          ...handleRowSelection(record, rowIndex),
        })}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
        pagination={paginationState}
        locale={{
          emptyText: <Empty description="You have no kid here" />,
        }}
      />
    </div>
  );
};

export default ChooseKid;
