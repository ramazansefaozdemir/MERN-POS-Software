import { Button, Input, Space, Spin, Table } from "antd";
import React, { useRef, useState } from "react";
import PrintBill from "../components/bills/PrintBill";
import Header from "../components/header/Header";
import { useEffect } from "react";
import { formatPrice } from "../utils/formatPrice";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItems, setBillItems] = useState();
  const [customer, setCustomer] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  useEffect(() => {
    try {
      const getBills = async () => {
        const res = await fetch("http://localhost:5001/api/bills/get-all");
        const data = await res.json();
        setBillItems(data);
      };
      getBills();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
            Ara
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Sil
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
            Filtrele
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Kapat
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
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
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
      ...getColumnSearchProps("customerName"),
    },
    {
      title: "Telefon Numarası",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
      ...getColumnSearchProps("customerPhoneNumber"),
    },
    {
      title: "Oluşturma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
    {
      title: "Ödeme Yöntemi",
      dataIndex: "paymentMode",
      key: "paymentMode",
      filters: [
        {
          text: "Kredi Kartı",
          value: "Kredi Kartı",
        },
        {
          text: "Nakit",
          value: "Nakit",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.paymentMode.includes(value),
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "totalAmount",
      key: "totalAmount",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      render: (text) => {
        return <span>{formatPrice(text)}₺</span>;
      },
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Button
            type="link"
            className="pl-0"
            onClick={() => {
              setIsModalOpen(true);
              setCustomer(record);
            }}
          >
            Yazdır
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">Faturalar</h1>
      {billItems ? (
        <div className="px-6">
          <Table
            dataSource={billItems}
            columns={columns}
            bordered
            pagination={false}
            rowKey="_id"
            scroll={{
              x: 1000,
              y: 300,
            }}
          />
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}
      <PrintBill
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        customer={customer}
      />
    </>
  );
};

export default BillPage;
