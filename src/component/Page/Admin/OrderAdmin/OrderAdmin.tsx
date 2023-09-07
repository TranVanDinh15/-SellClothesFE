import React, { useState, useEffect } from 'react';
import Content from '../common/Content/Content';
import CustomTable from '../../../Table/TableCustom';
import { Button, Form, Input, TablePaginationConfig, Tabs, TabsProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModalCustomer from '../common/Modal/ModalCustomer';
import { useForm } from 'antd/es/form/Form';
import SelectCustomer from '../common/Select/Select';
import { GetContext } from '../common/Context/Context';
import './OrderAdmin.scss';
import { handleGetOrderAdmin, handleGetOrderStatus, handleUpdateOrderAdmin } from './OrderAdminMethod';
import TabPane from 'antd/es/tabs/TabPane';
export interface listValuesOrder {
    value: string;
    label: string;
}
export interface formAddReceipt {
    statusId: string;
}

export default function OrderAdmin() {
    const { dataUpdate, setDataReceiptUpdate }: any = GetContext();
    console.log(dataUpdate);
    // Form cua add supplier
    const [formUpdate] = useForm<{ statusId: string }>();
    const [dataTable, setDataTable] = useState<[]>([]);
    const [total, setTotal] = useState<number>();
    const [pageSize, setPageSize] = useState<any>(5);
    const [page, setPage] = useState<any>(1);
    const [listSelectOrder, setListSelectOrder] = useState<listValuesOrder[] | null>(null);
    const [isLoadOrder, setIsLoadOrder] = useState<boolean>(false);

    // console.log(listSelectOrder);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    // Quản lý đóng mở update Biên lai nhập hàng
    const [isOpenUpdateOrder, setIsOpenUpdateOrder] = useState<boolean>(false);
    const [codeOrder, setCodeOrder] = useState<string>(process.env.REACT_APP__CODE__ORDER as string);
    const TitleTable = () => {
        return (
            <div className="titleTable">
                <div className="titleTable__Heading">
                    <span>Danh sách đặt hàng</span>
                </div>
            </div>
        );
    };
    const paginationConfig: TablePaginationConfig = {
        total: total ? total : 0, // Tổng số mục dữ liệu
        pageSize: pageSize, // Số mục dữ liệu trên mỗi trang
        current: page, // Trang hiện tại
        defaultCurrent: 1,
        onChange: (page, pageSize) => {
            // Xử lý sự kiện thay đổi trang
            setPage(page);
            setPageSize(pageSize);
        },
        showSizeChanger: true, // Hiển thị chọn kích thước trang
        pageSizeOptions: ['5', '10', '20', '50', '100'], // Tùy chọn kích thước trang
        position: ['bottomCenter'],
    };
    const onChange = (key: string) => {
        setCodeOrder(key);
    };
    useEffect(() => {
        handleGetOrderAdmin(page, pageSize, setDataTable, setTotal, codeOrder);
    }, [page, pageSize, codeOrder, isLoadOrder]);
    useEffect(() => {
        handleGetOrderStatus(setListSelectOrder);
    }, []);
    return (
        <Content title={'Danh sách đặt hàng'}>
            <div className="SupplierWrapper">
                <div className="StatusOrderMenu">
                    <Tabs
                        defaultActiveKey="1"
                        onChange={(key) => {
                            onChange(key);
                        }}
                    >
                        {listSelectOrder
                            ? listSelectOrder.map((item, index) => {
                                  return (
                                      <TabPane tab={item?.label} key={item?.value}>
                                          <CustomTable
                                              name="CollumsOrder"
                                              title={TitleTable}
                                              dataSource={dataTable}
                                              paginationConfig={paginationConfig}
                                              showModalUpdate={() => {
                                                  // setIsOpenUpdateSupplier(true);
                                                  setIsOpenUpdateOrder(true);
                                              }}
                                              isDelete={isDelete}
                                              setIsDelete={setIsDelete}
                                          />
                                      </TabPane>
                                  );
                              })
                            : ''}
                    </Tabs>
                </div>
            </div>
            {/* Modal Update  Nhập hàng */}
            <ModalCustomer
                isModalOpen={isOpenUpdateOrder}
                handleOk={() => {}}
                handleCancel={() => {
                    setIsOpenUpdateOrder(false);
                }}
                title={'Cập nhật đơn hàng'}
                footer={true}
                showModal={() => {
                    setIsOpenUpdateOrder(true);
                }}
            >
                <Form
                    form={formUpdate}
                    name="basic"
                    labelCol={{ span: 24 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={(value) => {
                        if (dataUpdate) {
                            handleUpdateOrderAdmin(
                                Number(dataUpdate?.id),
                                {
                                    statusId: value?.statusId,
                                },
                                setIsLoadOrder,
                                setIsOpenUpdateOrder,
                            );
                        }
                    }}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Trạng thái"
                        name="statusId"
                        rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                    >
                        <SelectCustomer
                            mode=""
                            option={listSelectOrder ? [...listSelectOrder] : []}
                            onChange={(value: any) => {
                                // onChangeSupplierSelect(value);
                            }}
                            onSearch={(value: any) => {
                                // onSearchSupplierSelect(value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </ModalCustomer>
        </Content>
    );
}
