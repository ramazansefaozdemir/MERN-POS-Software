import { Button, Table } from 'antd';
import React, { useState } from 'react'
import PrintBill from '../components/bills/PrintBill';
import Header from '../components/header/Header'
import { useEffect } from 'react';

const BillPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [billItems, setBillItems] = useState();
    const [customer, setCustomer] = useState();

    useEffect(()=>{
      try {
        const getBills = async () =>{
          const res = await fetch("http://localhost:5001/api/bills/get-all");
          const data = await res.json();
          setBillItems(data);
        }
        getBills();
      } catch (error) {
        console.log(error);
      }
    }, [])

    
      
  const columns = [
    {
      title: 'Müşteri Adı',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Telefon Numarası',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber',
    },
    {
      title: 'Oluşturma Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
        return (
          <span>
            {text.substring(0, 10)}
          </span>
        )
      }
    },
    {
      title: 'Ödeme Yöntemi',
      dataIndex: 'paymentMode',
      key: 'paymentMode',
    },
    {
      title: 'Toplam Fiyat',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text) => {
        return <span>{text}₺</span>
      }
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (_,record) => {
        return (
            <Button 
              type="link" 
              className="pl-0"
              onClick={() => {
                setIsModalOpen(true)
                setCustomer(record)
              }}
            >
              Yazdır
            </Button>
        )
      }
    },
  ];

  return (
    <>
        <Header />
        <div className="px-6">
            <h1 className='text-4xl font-bold text-center mb-4'>Faturalar</h1>
            <Table 
              dataSource={billItems} 
              columns={columns} 
              bordered 
              pagination={false} 
            />
            <PrintBill 
              isModalOpen={isModalOpen} 
              setIsModalOpen={setIsModalOpen} 
              customer={customer}
            />
        </div>
    </>
  )
}

export default BillPage