import React, { useState, useEffect } from 'react';
import './Receipt.scss';
import Content from '../common/Content/Content';
import CustomTable from '../../../Table/TableCustom';
import { Button, Form, Input, TablePaginationConfig } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModalCustomer from '../common/Modal/ModalCustomer';
import {
    HandleGetReceipt,
    handleAddReCeipt,
    handleGetSelectSupplier,
    handleUpdateReceipt,
    onChangeSupplierSelect,
    onSearchSupplierSelect,
} from './ReceiptMethod';
import { useForm } from 'antd/es/form/Form';
import { FormValues } from '../Supplier/Supplier';
import SelectCustomer from '../common/Select/Select';
import { GetContext } from '../common/Context/Context';
export interface listValuesSupplier {
    value: string;
    label: string;
}
export interface formAddReceipt {
    supplierId: number | undefined;
}
export default function Receipt() {
    const { dataReceiptUpdate, setDataReceiptUpdate }: any = GetContext();
    console.log(dataReceiptUpdate);
    // Form cua add supplier
    const [formAdd] = useForm<formAddReceipt>();
    const [formUpdate] = useForm<{ supplierId: number }>();
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    // Quản lý load lại data
    const [isLoadReceipt, setIsLoadReceipt] = useState<boolean>(false);
    const [dataTable, setDataTable] = useState<[]>([]);
    const [total, setTotal] = useState<number>();
    const [pageSize, setPageSize] = useState<any>(5);
    const [page, setPage] = useState<any>(1);
    const [listSelectsupplier, setListSelectSupplier] = useState<listValuesSupplier[] | null>(null);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    console.log(listSelectsupplier);
    // Quản lý đóng mở update Biên lai nhập hàng
    const [isOpenUpdateReceipt, setIsOpenUpdateReceipt] = useState<boolean>(false);
    const TitleTable = () => {
        return (
            <div className="titleTable">
                <div className="titleTable__Heading">
                    <span>Danh sách nhập hàng</span>
                </div>
                <div className="titleTable__btn">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="btnButton"
                        onClick={() => {
                            setIsModalAddOpen(true);
                        }}
                    >
                        Thêm nhập hàng
                    </Button>
                    {/* Add Supplier */}
                    <ModalCustomer
                        isModalOpen={isModalAddOpen}
                        handleOk={() => {}}
                        handleCancel={() => {
                            setIsModalAddOpen(false);
                        }}
                        title={'Thêm Nhập hàng'}
                        footer={true}
                        showModal={() => {
                            setIsModalAddOpen(true);
                        }}
                    >
                        <Form
                            form={formAdd}
                            name="basic"
                            labelCol={{ span: 24 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={(value) => {
                                handleAddReCeipt(value, isLoadReceipt, setIsLoadReceipt, setIsModalAddOpen, formAdd);
                            }}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Nhà cung cấp"
                                name="supplierId"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <SelectCustomer
                                    mode=""
                                    option={listSelectsupplier ? [...listSelectsupplier] : []}
                                    onChange={(value: any) => {
                                        onChangeSupplierSelect(value);
                                    }}
                                    onSearch={(value: any) => {
                                        onSearchSupplierSelect(value);
                                    }}
                                />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Thêm nhập hàng
                                </Button>
                            </Form.Item>
                        </Form>
                    </ModalCustomer>
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
    useEffect(() => {
        HandleGetReceipt(page, pageSize, setDataTable, setTotal);
    }, [isLoadReceipt, page, pageSize, isLoadReceipt, isDelete]);
    useEffect(() => {
        handleGetSelectSupplier(setListSelectSupplier);
    }, []);
    useEffect(() => {
        if (dataReceiptUpdate) {
            formUpdate.setFieldsValue({
                supplierId: dataReceiptUpdate?.supplierId?.id,
            });
        }
    }, [dataReceiptUpdate]);
    return (
        <Content title={'Danh sách nhập hàng'}>
            <div className="SupplierWrapper">
                <CustomTable
                    name="Receipt"
                    title={TitleTable}
                    dataSource={dataTable}
                    paginationConfig={paginationConfig}
                    showModalUpdate={() => {
                        // setIsOpenUpdateSupplier(true);
                        setIsOpenUpdateReceipt(true);
                    }}
                    isDelete={isDelete}
                    setIsDelete={setIsDelete}
                />
            </div>
            {/* Modal Update  Nhập hàng */}
            <ModalCustomer
                isModalOpen={isOpenUpdateReceipt}
                handleOk={() => {}}
                handleCancel={() => {
                    setIsOpenUpdateReceipt(false);
                }}
                title={'Cập nhật nhập hàng'}
                footer={true}
                showModal={() => {
                    setIsOpenUpdateReceipt(true);
                }}
            >
                <Form
                    form={formUpdate}
                    name="basic"
                    labelCol={{ span: 24 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={(value) => {
                        // handleUpdateReceipt();
                        if (dataReceiptUpdate && dataReceiptUpdate?.id) {
                            handleUpdateReceipt(
                                dataReceiptUpdate.id,
                                value,
                                isLoadReceipt,
                                setIsLoadReceipt,
                                setIsOpenUpdateReceipt,
                            );
                        }
                    }}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Nhà cung cấp"
                        name="supplierId"
                        rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                    >
                        <SelectCustomer
                            mode=""
                            option={listSelectsupplier ? [...listSelectsupplier] : []}
                            onChange={(value: any) => {
                                onChangeSupplierSelect(value);
                            }}
                            onSearch={(value: any) => {
                                onSearchSupplierSelect(value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Thêm nhập hàng
                        </Button>
                    </Form.Item>
                </Form>
            </ModalCustomer>
        </Content>
    );
}
