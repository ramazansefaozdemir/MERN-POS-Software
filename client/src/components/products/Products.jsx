import { useEffect, useState } from "react"
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import Add from "./Add";


const Products = () => {
    const [products, setProducts] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  useEffect(()=>{
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/products/get-all");
        const data = await res.json();
        setProducts(data)
      } catch (error) {
        console.log(error);
      }
    }
    getCategories();
  }, []);
  return (
    <div className="products-wrapper grid gap-4 grid-cols-card">
        {products.map((item)=>(
            <ProductItem item={item}/>
        ))}

        <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-800 flex justify-center items-center hover:opacity-90" onClick={() => setIsAddModalOpen(true)}>
            <PlusOutlined className="text-white md:text-2lg"/>
        </div>
        <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-orange-800 flex justify-center items-center hover:opacity-90">
            <EditOutlined className="text-white md:text-2lg"/>
        </div>
        <Add isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />
    </div>
  )
}

export default Products