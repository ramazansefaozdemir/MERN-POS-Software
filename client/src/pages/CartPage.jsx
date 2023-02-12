import { Card, Table, Button, message, Popconfirm, Input, Space } from "antd"
import { SearchOutlined } from '@ant-design/icons';
import { useRef, useState } from "react";
import Header from "../components/header/Header"
import CreateBill from "./CreateBill";
import { useSelector,useDispatch } from "react-redux";
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { increase, decrease, deleteCart } from '../redux/cartSlice.js';
import { formatPrice } from "../utils/formatPrice";
import Highlighter from 'react-highlight-words';

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
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
          color: filtered ? '#1890ff' : undefined,
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
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
    
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
      ...getColumnSearchProps("title"),
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
      ...getColumnSearchProps("category"),
    },
    {
      title: 'Ürün Fiyatı',
      dataIndex: 'price',
      key: 'price',
      sorter: (a,b) => a.price - b.price,
      render: (text) => {
        return (<span>{formatPrice(text)}</span>)
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
        return (<span>{formatPrice(record.quantity * record.price)}</span>)
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
                        <span>{cart.total > 0 ? formatPrice(cart.total) : 0}₺</span>
                    </div>
                    <div className="flex justify-between my-2">
                        <span>KDV %{cart.tax}</span>
                        <span className="text-red-600">+{formatPrice((cart.total * cart.tax) / 100)}₺</span>
                    </div>
                    <div className="flex justify-between">
                        <b>Toplam</b>
                        <b>{formatPrice(cart.total + (cart.total * cart.tax) / 100)}₺</b>
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