import { Card, Table, Button, message, Popconfirm } from "antd"
import { useState } from "react";
import Header from "../components/header/Header"
import CreateBill from "./CreateBill";
import { useSelector,useDispatch } from "react-redux";
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { increase, decrease, deleteCart } from '../redux/cartSlice.js';

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch();
    
  const columns = [
    {
      title: 'Ürün Görseli',
      dataIndex: 'img',
      key: 'img',
      with: '125px',
      render: (text)=>{
        return <img src={text} alt="" className='w-full h-20 object-contain' />
    } 
    },
    {
      title: 'Ürün Adı',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Ürün Fiyatı',
      dataIndex: 'price',
      key: 'price',
      render: (text) => {
        return (<span>{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(text)}</span>)
      }
    },
    {
      title: 'Ürün Adedi',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => {
        return (<>
          <div className='flex items-center gap-x-1'>
          <Button 
            type='primary'
            size='small'
            icon={<PlusCircleOutlined />}
            className='w-full flex items-center justify-center !rounded-full'
            onClick={() => dispatch(increase(record))}
          />
          <span className='font-bold w-3 inline-block text-center'>{record.quantity}</span>
          <Button 
            type='primary'
            size='small'
            icon={<MinusCircleOutlined />}
            className='w-full flex items-center justify-center !rounded-full'
            onClick={() => {
              if(record.quantity === 1){
                if(window.confirm('Ürün Silinsin Mi?')){
                  dispatch(decrease(record));
                  message.success('Ürün Sepetten Silindi.')
                }
              }
              if(record.quantity > 1) {
                dispatch(decrease(record))
              }
            }}
          />
        </div>
        </>)
      }
    },
    {
      title: 'Toplam Fiyat',
      dataIndex: 'total',
      key: 'total',
      render: (_,record) => {
        return (<span>{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(record.quantity * record.price)}</span>)
      }
    },
    {
      title: 'Action',
      render: (_,record) => {
        return (
          <Popconfirm
            title="Silmek istediğinize emin misiniz ?"
            onConfirm={()=> {
              dispatch(deleteCart(record));
              message.success('Ürün Sepetten Silindi.')
            }}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button 
              type="link" 
              danger
            >
              Sil
            </Button>
          </Popconfirm>
        )
      }
    },
  ];

  return (
    <>
        <Header />
        <div className="px-6">
            <Table 
              dataSource={cart.cartItems} 
              columns={columns} 
              bordered 
              pagination={false} 
              key={cart.cartItems._id} 
              scroll={{
                x: 1200,
                y: 300
              }}
            />
            <div className="cart-total flex justify-end mt-4">
                <Card className="w-72">
                    <div className="flex justify-between">
                        <span>Ara Toplam</span>
                        <span>{cart.total > 0 ? new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(cart.total) : 0}₺</span>
                    </div>
                    <div className="flex justify-between my-2">
                        <span>KDV %{cart.tax}</span>
                        <span className="text-red-600">+{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format((cart.total * cart.tax) / 100)}₺</span>
                    </div>
                    <div className="flex justify-between">
                        <b>Toplam</b>
                        <b>{new Intl.NumberFormat('tr', { style: 'currency', currency: 'TRY' }).format(cart.total + (cart.total * cart.tax) / 100)}₺</b>
                    </div>
                    <Button 
                      className="mt-4 w-full" 
                      type="primary" size="large" 
                      onClick={() => setIsModalOpen(true)}
                      disabled={cart.cartItems.length === 0}
                    >
                      Sipariş Oluştur
                    </Button>
                </Card>
            </div>
        </div>
        <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
}

export default CartPage