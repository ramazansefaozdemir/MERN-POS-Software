import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Table, message } from "antd";

const Edit = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [form] = Form.useForm();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const handleEdit = (record) => {
    form.resetFields();
    setEditingItem(record);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/categories/get-all");
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (editingItem) {
      form.setFieldsValue({
        title: editingItem.title,
        img: editingItem.img,
        price: editingItem.price,
        category: editingItem.category,
      });
    }
  }, [editingItem, form]);

  const onFinish = (values) => {
    try {
      fetch("http://localhost:5001/api/products/update-product", {
        method: "PUT",
        body: JSON.stringify({ ...values, productId: editingItem._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün Başarıyla Güncellendi.");
      setProducts(
        products.map((item) => {
          if (item._id === editingItem._id) {
            return values;
          }
          return item;
        })
      );
      form.resetFields();
      setIsEditModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = (id) => {
    if (window.confirm("Emin Misiniz?")) {
      try {
        fetch("http://localhost:5001/api/products/delete-product", {
          method: "DELETE",
          body: JSON.stringify({ productId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }).then((response) => {
          if (response.status === 200) {
            message.success("Ürün Başarı İle Silindi.");
            setProducts(products.filter((item) => item._id !== id));
          } else {
            message.error("Ürün Silinemedi.");
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "title",
      witdh: "8%",
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      witdh: "4%",
      render: (_, record) => {
        return (
          <img src={record.img} alt="" className="w-full h-20 object-contain" />
        );
      },
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
      render: (_, record) => {
        return (
          <div>
            <Button
              type="link"
              className="pl-0"
              onClick={() => handleEdit(record)}
            >
              Düzenle
            </Button>
            <Button
              type="link"
              danger
              onClick={() => deleteProduct(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
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

      <Modal
        title="Ürün Düzenle"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={editingItem}
        >
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
          <Form.Item
            label="Kategori Seç"
            rules={[
              { required: true, message: "Kategori Alanı Boş Geçilemez!" },
            ]}
            name="category"
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
              options={categories}
            />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
