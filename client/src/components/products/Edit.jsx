import React, { useEffect, useState } from 'react'
import { Button, Form, Table, message } from 'antd'

const Edit = ({categories, setCategories}) => {
    const [products, setProducts] = useState([]);

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
   
    const deleteCategory = (id) => {
       if(window.confirm("Emin Misiniz?")){
        try {
            fetch("http://localhost:5001/api/categories/delete-category", {
                method: "DELETE",
                body: JSON.stringify({categoryId: id}),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }).then((response)=>{
                if(response.status === 200){
                    message.success("Kategori Başarı İle Silindi.");
                    setCategories(categories.filter((item)=>item._id !== id))
                }else {
                    message.error("Kategori Silinemedi.")
                }
            })
        } catch (error) {
            console.log(error);
        }
       }
    }
    const columns = [
        {
            title: "Ürün Adı",
            dataIndex: "title",
            witdh: "8%",
            render: (_,record)=>{
                return <p>{record.title}</p>
            }
        },
        {
            title: "Ürün Görseli",
            dataIndex: "img",
            witdh: "4%",
            render: (_,record)=>{
                return <img src={record.img} alt="" className='w-full h-20 object-contain' />
            }
        },
        {
            title: "Ürün Fiyatı",
            dataIndex: "price",
            witdh: "8%",
        },
        {
            title: "Kategori",
            dataIndex: "category",
            witdh: "8%",
        },
        {
            title: "Action",
            dataIndex: "action",
            witdh: "8%",
            render: (_, record)=>{
                return (
                    <div>
                        <Button type='link' className="pl-0">Düzenle</Button>
                        <Button type='link' htmlType='submit' className='text-gray-500'>Kaydet</Button>
                        <Button type='link' danger onClick={()=>deleteCategory(record._id)}>Sil</Button>
                    </div>
                )
            }
        }
    ]
  return (
    <Form>
        <Table 
            bordered 
            dataSource={products} 
            columns={columns} 
            rowKey={"_id"} 
            scroll={{
                x: 1000,
                y: 600,
            }}
        />
    </Form>
  )
}

export default Edit