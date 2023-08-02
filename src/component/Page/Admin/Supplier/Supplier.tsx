import React, { useState, useEffect } from 'react';
import './Supplier.scss';
import Content from '../common/Content/Content';
import CustomTable from '../../../Table/TableCustom';
import { Button, Form, Input, Modal, TablePaginationConfig } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
    handleCancelAddSupplier,
    handleOkaddSupplier,
    handlegetSupplier,
    onFinishAddSupplier,
    onFinishUpdateSupplier,
    showModalUpdateSupplier,
} from './SupplierMethod';
import { DatatypeSupplier } from '../../../Table/TableInterface';
import IsLoading from '../common/IsLoading/IsLoading';
import ModalCustomer from '../common/Modal/ModalCustomer';
import { useForm } from 'antd/es/form/Form';
import { GetContext } from '../common/Context/Context';
export interface FormValues {
    name: string;
    email: string;
    address: string;
}
export default function Supplier() {
    const { dataSupplierUpdate }: any = GetContext();
    console.log(dataSupplierUpdate);
    // Form cua add supplier
    const [formAdd] = useForm<FormValues>();
    // Form cu update supplier
    const [formUpdate] = useForm<FormValues>();
    const [dataTable, setDataTable] = useState<[]>([]);
    const [total, setTotal] = useState<number>();
    const [pageSize, setPageSize] = useState<any>(5);
    const [page, setPage] = useState<any>(1);
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isLoadSupplier, setIsLoadSupplier] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    // Quản lý đóng mở update nhà cung cấp
    const [isOpenUpdateSupplier, setIsOpenUpdateSupplier] = useState<boolean>(false);
    // dùng để hiển thị title của table
    const TitleTable = () => {
        return (
            <div className="titleTable">
                <div className="titleTable__Heading">
                    <span>Danh sách Nhà cung cấp</span>
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
                        Thêm NCC
                    </Button>
                    {/* Add Supplier */}
                    <ModalCustomer
                        isModalOpen={isModalAddOpen}
                        handleOk={handleOkaddSupplier}
                        handleCancel={() => {
                            handleCancelAddSupplier(setIsModalAddOpen);
                        }}
                        title={'Thêm nhà cung cấp'}
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
                                onFinishAddSupplier(
                                    value,
                                    isLoadSupplier,
                                    setIsLoadSupplier,
                                    setIsModalAddOpen,
                                    formAdd,
                                );
                            }}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Tên nhà cung cấp"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Thêm NCC
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
        handlegetSupplier(page, pageSize, setDataTable, setTotal);
    }, [isLoadSupplier, isDelete, page, pageSize]);
    useEffect(() => {
        console.log('Update ok');
        if (dataSupplierUpdate) {
            formUpdate.setFieldsValue({
                name: dataSupplierUpdate?.name,
                email: dataSupplierUpdate?.email,
                address: dataSupplierUpdate?.address,
            });
        }
    }, [dataSupplierUpdate]);
    return (
        <Content title={'Nhà cung cấp '}>
            {dataTable.length > 0 ? (
                <div className="SupplierWrapper">
                    <CustomTable
                        name="Supplier"
                        title={TitleTable}
                        dataSource={dataTable}
                        paginationConfig={paginationConfig}
                        showModalUpdate={() => {
                            setIsOpenUpdateSupplier(true);
                        }}
                        isDelete={isDelete}
                        setIsDelete={setIsDelete}
                    />
                </div>
            ) : (
                <IsLoading />
            )}
            {/* Update Supplier */}
            <ModalCustomer
                isModalOpen={isOpenUpdateSupplier}
                handleOk={() => {}}
                handleCancel={() => {
                    setIsOpenUpdateSupplier(false);
                }}
                title={'Cập nhật thông tin'}
                footer={true}
                showModal={() => {
                    setIsOpenUpdateSupplier(true);
                }}
            >
                <Form
                    form={formUpdate}
                    name="basic"
                    labelCol={{ span: 24 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={(value) => {
                        onFinishUpdateSupplier(
                            dataSupplierUpdate?.id,
                            value,
                            isLoadSupplier,
                            setIsLoadSupplier,
                            setIsOpenUpdateSupplier,
                        );
                    }}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên nhà cung cấp"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Cập nhật NCC
                        </Button>
                    </Form.Item>
                </Form>
            </ModalCustomer>
        </Content>
    );
}
