import { Badge, Input, message } from 'antd';
import { SearchOutlined, HomeOutlined, ShoppingCartOutlined, CopyOutlined, UserOutlined, BarChartOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import './index.css'

const Header = ({ setSearch }) => {
  const cart = useSelector((state)=>state.cart);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logOut = () => {
    if(window.confirm("Çıkış Yapmak İstediğinize Emin Misiniz?")){
        localStorage.removeItem("posUser");
        navigate("/login");
        message.success("Çıkış işlemi başarılı");
    }
  }
  
  return (
    <div className='border-b mb-6'>
        <header className='py-4 px-6 flex justify-between items-center gap-10'>
            <div className="logo">
                <a href="/" className='text-2xl font-bold md:text-4xl'>LOGO</a>
            </div>
            <div 
                className="header-search flex-1 flex justify-center" 
                onClick={()=>{
                        pathname !== "/" && navigate("/")
                }}>
                    <Input 
                        size="large" 
                        placeholder="Search..." 
                        prefix={<SearchOutlined />} 
                        className='rounded-full max-w-[800px]'
                        onChange={(e)=>setSearch(e.target.value.toLowerCase())}
                    />
            </div>
            <div className="menu-links">
                <Link to={'/'} className='menu-link'>
                    <HomeOutlined className={`text-xl md:text-2xl ${pathname === "/" && "active"}`} />
                    <span className={`md:text-xs text-[10px] menu-link ${pathname === "/" && "active"}`}>Ana Sayfa</span>
                </Link>
                <Badge count={cart.cartItems.length} offset={[0,0]} className='md:flex hidden'> 
                    <Link to={'/cart'} className={`menu-link ${pathname === "/cart" && "active"}`}>
                        <ShoppingCartOutlined className='text-xl md:text-2xl'/>
                        <span className='md:text-xs text-[10px]'>Sepet</span>
                    </Link>
                </Badge>
                <Link to={'/bills'} className={`menu-link ${pathname === "/bills" && "active"}`}>
                    <CopyOutlined className='text-xl md:text-2xl'/>
                    <span className='md:text-xs text-[10px]'>Faturalar</span>
                </Link>
                <Link to={'/customers'} className={`menu-link ${pathname === "/customers" && "active"}`}>
                    <UserOutlined className='text-xl md:text-2xl'/>
                    <span className='md:text-xs text-[10px]'>Müşteriler</span>
                </Link>
                <Link to={'/statistic'} className={`menu-link ${pathname === "/statistic" && "active"}`}>
                    <BarChartOutlined className='text-xl md:text-2xl'/>
                    <span className='md:text-xs text-[10px]'>İstatistikler</span>
                </Link>
                <div onClick={logOut}>
                    <Link className={`menu-link ${pathname === "/logOut" && "active"}`}>
                        <LogoutOutlined className='text-xl md:text-2xl'/>
                        <span className='md:text-xs text-[10px]'>Çıkış</span>
                    </Link>
                </div>
            </div>
            <Badge count={cart.cartItems.length} offset={[0,0]} className='md:hidden flex'> 
                    <a href={'/cart'} className={`menu-link ${pathname === "/cart" && "active"}`}>
                        <ShoppingCartOutlined className='text-2xl'/>
                        <span className='md:text-xs text-[10px]'>Sepet</span>
                    </a>
                </Badge>
        </header>
    </div>
  )
}

export default Header