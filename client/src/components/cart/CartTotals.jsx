import { Button, message } from 'antd'
import { ClearOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, increase, decrease, reset } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';


const CartTotals = () => {
  const cart = useSelector((state)=> state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className='cart h-full flex flex-col max-h-[calc(100vh_-_90px)]'>
      <h2 className='bg-blue-600 text-center py-4 text-white font-bold tracking-wide'>Sepetteki Ürünler</h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto"> 
      {cart.cartItems.length > 0 ? cart.cartItems.map((item)=>(
          <li className="cart-item flex justify-between" key={item._id}>
          <div className='flex items-center'>
            <img src={item.img} alt="" className='w-16 h-16 object-contain cursor-pointer' onClick={()=> {
              dispatch(deleteCart(item));
              message.success('Ürün Sepetten Silindi.')
            }}/>
            <div className='flex flex-col ml-2'>
              <b>{item.title}</b>
              <span>{item.price}₺ x {item.quantity}</span>
            </div>
          </div>
          <div className='flex items-center gap-x-1'>
            <Button 
              type='primary'
              size='small'
              icon={<PlusCircleOutlined />}
              className='w-full flex items-center justify-center !rounded-full'
              onClick={() => dispatch(increase(item))}
            />
            <span className='font-bold w-3 inline-block text-center'>{item.quantity}</span>
            <Button 
              type='primary'
              size='small'
              icon={<MinusCircleOutlined />}
              className='w-full flex items-center justify-center !rounded-full'
              onClick={() => {
                if(item.quantity === 1){
                  if(window.confirm('Ürün Silinsin Mi?')){
                    dispatch(decrease(item));
                    message.success('Ürün Sepetten Silindi.')
                  }
                }
                if(item.quantity > 1) {
                  dispatch(decrease(item))
                }
              }}
            />
          </div>
        </li>
        )).reverse() : 'Sepetinizde Hiç Ürün Bulunmuyor.'}
      </ul>
      <div className="cart-totals mt-auto">
        <div className='border-b border-t'>
          <div className='flex justify-between p-2'>
            <b>Ara Toplam</b>
            <span>{cart.total > 0 ? formatPrice(cart.total) : 0}</span>
          </div>
          <div className='flex justify-between p-2'>
            <b>KDV %{cart.tax}</b>
            <span className='text-red-700'>{((cart.total * cart.tax) / 100) ? `+${formatPrice((cart.total * cart.tax) / 100)}` : 0}</span>
          </div>
        </div>
        <div className='border-b mt-4'>
          <div className='flex justify-between p-2'>
            <b className='text-xl text-green-500'>Genel Toplam</b>
            <span className='text-xl'>{formatPrice(cart.total + (cart.total * cart.tax) / 100)}</span>
          </div>
        </div>
        <div className='py-4 px-2'>
          <Button 
            type='primary' 
            size='large' 
            className='w-full'
            disabled={cart.cartItems.length === 0}
            onClick={() => navigate('/cart')}
          >
            Sipariş Oluştur
          </Button>
          <Button 
            type='primary' 
            size='large' 
            className='w-full mt-2 flex items-center justify-center' 
            danger 
            disabled={cart.cartItems.length === 0}
            icon={<ClearOutlined />}
            onClick={() => {
              if (window.confirm('Sepeti Silmek İstediğinize Emin Misiniz?')) {
                dispatch(reset());
                message.success('Sepet Temizlendi.');
              }
            }}
            >
              Temizle
            </Button>
        </div>
      </div>
    </div>
  )
}

export default CartTotals