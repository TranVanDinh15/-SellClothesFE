import React, { useState, useEffect } from 'react';
import './Blog.scss';
import Content from '../common/Content/Content';
import CustomTable from '../../../Table/TableCustom';
import { Button, Form, Input, TablePaginationConfig } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { handleAddBlog, handleGetBlog } from './BlogMethod';
import ModalCustomer from '../common/Modal/ModalCustomer';
import { useForm } from 'antd/es/form/Form';
export interface formAddBlog {
    title: string;
    shortDescription: string;
}
export default function Blog() {
    const [formAdd] = useForm<formAddBlog>();

    const [dataTable, setDataTable] = useState<[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [pageSize, setPageSize] = useState<any>(5);
    const [page, setPage] = useState<any>(1);
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    // Quản lý đóng mở update Blog
    const [isOpenUpdateBlog, setIsOpenUpdateBlog] = useState<boolean>(false);
    // Quản lý load lại data
    const [isLoadBlog, setIsLoadBlog] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const TitleTable = () => {
        return (
            <div className="titleTable">
                <div className="titleTable__Heading">
                    <span>Danh sách bài đăng</span>
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
                        Thêm bài đăng
                    </Button>
                    {/* Add Blog */}
                    <ModalCustomer
                        isModalOpen={isModalAddOpen}
                        handleOk={() => {}}
                        handleCancel={() => {
                            setIsModalAddOpen(false);
                        }}
                        title={'Thêm bài đăng'}
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
                            onFinish={(value) => {
                                handleAddBlog(value, isLoadBlog, setIsLoadBlog, setIsModalAddOpen, formAdd);
                            }}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Tên bài viết"
                                name="title"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Mô tả ngắn"
                                name="shortDescription"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <Input />
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
        console.log('load');
        handleGetBlog(page, pageSize, setDataTable, setTotal);
    }, [isLoadBlog, pageSize, page]);
    return (
        <Content title={'Danh sách bài đăng'}>
            <div className="BlogWrapper">
                <CustomTable
                    name="Blog"
                    title={TitleTable}
                    dataSource={dataTable}
                    paginationConfig={paginationConfig}
                    showModalUpdate={() => {
                        // setIsOpenUpdateSupplier(true);
                        setIsOpenUpdateBlog(true);
                    }}
                    isDelete={isDelete}
                    setIsDelete={setIsDelete}
                />
            </div>
        </Content>
    );
}
