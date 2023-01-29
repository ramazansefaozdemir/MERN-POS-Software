import { Button, Card, Form, Input, Modal, Select, message } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { reset } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CreateBill = ({isModalOpen, setIsModalOpen}) => {

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    try {
        const res = await fetch("http://localhost:5001/api/bills/add-bill", {
            method: "POST",
            body: JSON.stringify({
                ...values,
                subTotal: cart.total,
                tax: ((cart.total * cart.tax) / 100),
                totalAmount: (cart.total + (cart.total * cart.tax) / 100),
                cartItems: cart.cartItems,
            }),
            headers: {"Content-type": "application/json; chartset=UTF-8"}
        })

        if(res.status === 200) {
            message.success("Fatura Başarıyla Oluşturuldu.");
            dispatch(reset());
            navigate('/bills');
        }

    } catch (error) {
        message.danger("Fatura Oluşturulamadı.")
        console.log(error);
    }
  }

  return (
    <Modal 
        title="Fatura Oluştur" 
        open={isModalOpen} 
        footer={false} 
        onCancel={() => setIsModalOpen(false)}
    >
        <Form layout={"vertical"} onFinish={onFinish}>
            <Form.Item 
                label="Müşteri Adı" 
                required
                name={"customerName"}
                rules={[{required: true, message: "Müşteri Adı Alanı Boş Geçilemez"}]}
            >
                <Input placeholder="Bir Müşteri Adı Yazınız"/>
            </Form.Item>
            <Form.Item 
                label="Tel No" 
                name={"customerPhoneNumber"}
                required
                rules={[{required: true, message: "Telefon No Alanı Boş Geçilemez"}]}
            >
                <Input placeholder="Bir Telefon Numarası Yazınız" maxLength={11}/>
            </Form.Item>
            <Form.Item 
                label="Ödeme Yöntemi" 
                required
                name={"paymentMode"}
                rules={[{required: true, message: "Ödeme Yöntemi Alanı Boş Geçilemez"}]}
            >
                <Select placeholder="Bir Ödeme Yöntemi Seçiniz">
                    <Select.Option value="Nakit">Nakit</Select.Option>    
                    <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>    
                </ Select>
            </Form.Item>
            <Card>
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
                    <b>{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(cart.total + (cart.total * cart.tax) / 100)}₺</b>
                </div>
                <div className="flex justify-end">
                    <Button 
                        className="mt-4" 
                        type="primary" 
                        onClick={() => setIsModalOpen(true)}
                        htmlType="submit"
                        disabled={cart.cartItems.length === 0}
                    >Sipariş Oluştur</Button>
                </div>
            </Card>
        </Form>
    </Modal>
  )
}

export default CreateBill