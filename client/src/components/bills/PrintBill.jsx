import { Button, Modal } from "antd"

const PrintBill = ({isModalOpen, setIsModalOpen}) => {

  return (
    <Modal 
        title="Fatura Yazdır" 
        open={isModalOpen} 
        footer={false} 
        onCancel={() => setIsModalOpen(false)}
        width={800}
    >
        <section className="py-20 bg-black">
          <div className="max-w-5xl mx-auto bg-white px-6">
            <article className="overflow-hidden">
              <div className="logo my-6 text-slate-700">
                <h2 className="text-4xl font-bold">LOGO</h2>
              </div>
                <div className="bill-details">
                  <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                    <div className="font-light text-sm text-slate-500">
                      <p className="font-normal text-slate-700">Fatura Detayı:</p>
                      <p>Unwrapped</p>
                      <p>Fake Street 123</p>
                      <p>San Javier</p>
                      <p>CA 1234</p>
                    </div>
                    <div className="text-sm font-light text-slate-500">
                      <p className="font-normal text-slate-700">Fatura</p>
                      <p>The Boring Company</p>
                      <p>Tesla Street 007</p>
                      <p>Frisco</p>
                      <p>CA 0000</p>
                    </div>
                    <div className="text-sm font-light text-slate-500">
                      <div>
                        <p className="font-normal text-slate-700">Fatura numarası:</p>
                        <p>0007</p>
                      </div>
                      <div>
                        <p className="font-normal text-slate-700 mt-2">Veriliş Tarihi:</p>
                        <p>2022-11-21</p>
                      </div>
                    </div>
                    <div className="text-sm font-light text-slate-500 sm:block hidden">
                      <div>
                        <p className="font-normal text-slate-700">Şartlar:</p>
                        <p>10 Gün</p>
                      </div>
                      <div>
                        <p className="font-normal text-slate-700 mt-2">Vade:</p>
                        <p>2023.01.20</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bill-table-area mt-8">
                  <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5  text-left font-normal text-slate-700  md:pl-0 sm:table-cell hidden">Görsel</th>
                        <th scope="col" className="py-3.5  text-left font-normal text-slate-700  md:pl-0 sm:table-cell hidden">Başlık</th>
                        <th scope="col" className="py-3.5  text-left font-normal text-slate-700  md:pl-0 sm:hidden" colSpan={4}>Başlık</th>
                        <th scope="col" className="py-3.5  text-center font-normal text-slate-700  md:pl-0 sm:table-cell hidden">Fiyat</th>
                        <th scope="col" className="py-3.5  text-center font-normal text-slate-700  md:pl-0 sm:table-cell hidden">Adet</th>
                        <th scope="col" className="py-3.5  text-end font-normal text-slate-700  md:pl-0">Toplam</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-slate-500 border-b border-slate-200">
                        <td className="py-4 sm:table-cell hidden">
                          <img src="https://i.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4" alt="" className="h-12 w-12 object-cover"/>
                        </td>
                        <td className="py-4 sm:table-cell hidden">
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-700">Şalgam</span>
                            <span className="text-xs sm:hidden inline-block text-slate-700">Birim Fiyatı 5₺</span>
                          </div>
                        </td>
                        <td className="py-4 sm:hidden" colSpan={4}>
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-700">Şalgam</span>
                            <span className="text-xs sm:hidden inline-block text-slate-700">Birim Fiyatı 5₺</span>
                          </div>
                        </td>
                        <td className="py-4 text-center sm:table-cell hidden">
                          <span>5₺</span>
                        </td>
                        <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                          <span>1</span>
                        </td>
                        <td className="py-4 text-end">
                          <span>5.00₺</span>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th className="text-right pt-4 sm:table-cell hidden" colSpan={4} scope="row">
                          <span className="font-normal text-slate-500">Ara Toplam</span>
                        </th>
                        <th className="text-left pt-4 sm:hidden" scope="row" colSpan={4}>
                          <p className="font-normal text-slate-500">Ara Toplam</p>
                        </th>
                        <th className="text-right pt-4" colSpan={4} scope="row">
                          <span className="font-normal text-slate-500">61₺</span>
                        </th>
                      </tr>
                      <tr>
                        <th className="text-right pt-4 sm:table-cell hidden" colSpan={4} scope="row">
                          <span className="font-normal text-slate-500">KDV</span>
                        </th>
                        <th
                      className="text-left pt-4 sm:hidden" scope="row" colSpan="4">
                      <p className="font-normal text-slate-700">KDV</p>
                    </th>
                        <th className="text-right pt-4" colSpan={4} scope="row">
                          <span className="font-normal text-red-600">61₺</span>
                        </th>
                      </tr>
                      <tr>
                        <th className="text-right pt-4 sm:table-cell hidden" colSpan={4} scope="row">
                          <span className="font-normal text-slate-700">Genel Toplam</span>
                        </th>
                        <th className="text-left pt-4 sm:hidden" scope="row" colSpan="4">
                          <p className="font-normal text-slate-700">Genel Toplam</p>
                        </th>
                        <th className="text-right pt-4" colSpan={4} scope="row">
                          <span className="font-normal text-slate-700">65.88₺</span>
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                  <div className="py-9">
                    <div className="border-t pt-9 border-slate-200">
                      <div className="text-sm font-light text-slate-700">
                        <p>Ödeme koşulları 14 gündür. Paketlenmemiş Borçların Geç Ödenmesi Yasası 0000'e göre, serbest çalışanların bu süreden sonra borçların ödenmemesi durumunda 00.00 gecikme ücreti talep etme hakkına sahip olduklarını ve bu noktada bu ücrete ek olarak yeni bir fatura sunulacağını lütfen unutmayın. Revize faturanın 14 gün içinde ödenmemesi durumunda, vadesi geçmiş hesaba ek faiz ve %8 yasal oran artı %0,5 Bank of England tabanı olmak üzere toplam %8,5 uygulanacaktır. Taraflar Kanun hükümleri dışında sözleşme yapamazlar.</p>
                      </div>
                    </div>
                  </div>
                </div>
            </article>
          </div>
        </section>
        <div className="flex justify-end mt-4">
          <Button type="primary" size="large">Yazdır</Button>
        </div>
    </Modal>
  )
}

export default PrintBill