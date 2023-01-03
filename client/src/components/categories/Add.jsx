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
        message.success("Kategori Başarıyla Eklendi.");
        form.resetFields();
        setCategories([...categories, {_id: Math.random(), title: values.title}]);
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <Modal
            title="Yeni Kategori Ekle" 
            open={isAddModalOpen}
            onCancel={() => setIsAddModalOpen(false)}
            footer={false}
        >
        <Form layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item 
                label="Kategori Ekle"
                rules={[{ required: true, message: "Kategori Alanı Boş Geçilemez!" }]}
                name="title" //api category içersine göre 
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