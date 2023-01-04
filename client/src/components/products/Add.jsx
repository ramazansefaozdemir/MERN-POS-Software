import { Button, Form, Input, Modal, message } from 'antd'
import React from 'react'

const Add = ({isAddModalOpen, setIsAddModalOpen, categories, setCategories}) => {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    try {
        fetch("http://localhost:5001/api/categories/add-category", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        message.success("Ürün Başarıyla Eklendi.");
        form.resetFields();
        setCategories([...categories, {_id: Math.random(), title: values.title}]);
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <Modal
            title="Yeni Ürün Ekle" 
            open={isAddModalOpen}
            onCancel={() => setIsAddModalOpen(false)}
            footer={false}
        >
        <Form layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item 
                label="Ürün Adı"
                rules={[{ required: true, message: "Ürün Alanı Boş Geçilemez!" }]}
                name="title" 
            >
                <Input />
            </Form.Item>
            <Form.Item 
                label="Ürün Görseli"
                rules={[{ required: true, message: "Ürün Görseli Boş Geçilemez!" }]}
                name="img" 
            >
                <Input />
            </Form.Item>
            <Form.Item 
                label="Ürün Fiyatı"
                rules={[{ required: true, message: "Ürün Fiyatı Boş Geçilemez!" }]}
                name="price" 
            >
                <Input />
            </Form.Item>
            <Form.Item className="flex justify-end mb-0">
                <Button 
                    type="primary" 
                    htmlType="submit"
                >
                    Oluştur
                </Button>
            </Form.Item>
        </Form>
      </Modal>
  )
}

export default Add