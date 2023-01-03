import React, { useState } from 'react'
import { Button, Form, Input, Modal, Table, message } from 'antd'

const Edit = ({isEditModalOpen, setIsEditModalOpen, categories, setCategories}) => {
    const [editingRow, setEditingRow] = useState({})
    const onFinish = (values) => {
        try {
            fetch("http://localhost:5001/api/categories/update-category", {
                method: "PUT",
                body: JSON.stringify({...values, categoryId: editingRow._id}),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }).then((response)=>{
                if(response.status === 200) {
                    message.success("Kategori Güncellendi.");
                    setCategories(categories.map((item)=>{
                        if(item._id === editingRow._id){
                            return { ...item, title: values.title }
                        }
                        return item;
                    }))
                }else {
                    message.error("Kategori Güncellenemedi.");
                }
            });
            
        } catch (error) {
            console.log(error);
        }
    } 
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
            title: "Category Title",
            dataIndex: "title",
            render: (_,record)=>{
                if(editingRow._id === record._id) {
                    return (
                        <Form.Item className='mb-0' name="title">
                            <Input defaultValue={record.title} />
                        </Form.Item>
                    )
                }else {
                    return <p>{record.title}</p>
                }
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record)=>{
                return (
                    <div>
                        <Button type='link' onClick={()=>setEditingRow(record)} className="pl-0">Düzenle</Button>
                        <Button type='link' htmlType='submit' className='text-gray-500'>Kaydet</Button>
                        <Button type='link' danger onClick={()=>deleteCategory(record._id)}>Sil</Button>
                    </div>
                )
            }
        }
    ]
  return (
    <Modal
        title="Kategori Düzenle" 
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={false}
    >
        <Form onFinish={onFinish}>
            <Table 
                bordered 
                dataSource={categories} 
                columns={columns} 
                rowKey={"_id"} 
            />
        </Form>
    </Modal>
  )
}

export default Edit