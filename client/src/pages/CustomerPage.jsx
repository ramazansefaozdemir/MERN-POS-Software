import { Table } from 'antd';
import { useEffect, useState } from 'react'
import Header from '../components/header/Header'

const CustomerPage = () => {
  const [billItems, setBillItems] = useState();
  
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
      title: 'İşlem Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
        return (<span>{text.substring(0,10)}</span>)
      }
    },
  ];

  return (
    <>
        <Header />
        <div className="px-6">
            <h1 className='text-4xl font-bold text-center mb-4'>Müşteriler</h1>
            <Table 
              dataSource={billItems} 
              columns={columns} 
              bordered 
              pagination={false} 
              scroll={{
                x: 1000,
                y: 300
              }}
            />
        </div>
    </>
  )
}

export default CustomerPage