import React, { useEffect, useState } from 'react';
import Content from '../Admin/common/Content/Content';
import { createCategory, getAllCategory, updateBrand } from '../../utils/Api/Api';
import IsLoading from '../Admin/common/IsLoading/IsLoading';
import CustomTable from '../../Table/TableCustom';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, TablePaginationConfig, message } from 'antd';
import { GetContext } from '../Admin/common/Context/Context';
import { useForm } from 'antd/es/form/Form';
interface formUpdate {
    value: string;
    id: number;
    code: string;
    type: string;
}
export default function ProductCategory() {
    const [formUpdate] = useForm<formUpdate>();
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [dataTable, setDataTable] = useState<[]>([]);
    const [total, setTotal] = useState<any>();
    const [isFetchBrand, setIsFetchBrand] = useState(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [dataUpdateCategory, setDataUpdateCategory] = useState<formUpdate>();
    const [isLoadCategory, setIsLoadCategory] = useState<boolean>(false);
    console.log(dataUpdateCategory);
    const getListCategoryFun = async () => {
        setIsLoading(true);
        const response = await getAllCategory(page, pageSize);
        if (response && response.status == 200) {
            const filterData = response.data.data.map((item: any, index: number) => {
                return {
                    key: index,
                    id: item?.id,
                    value: item?.value,
                    createAt: item?.createdAt,
                    code: item?.code,
                    type: item?.type,
                };
            });
            setTotal(response.data.meta.totalItems);
            setIsLoading(false);
            setDataTable(filterData);
            setIsLoading(false);
        }
    };
    const handleOkAdd = () => {
        setIsModalOpenAdd(false);
    };
    const handleCancelAdd = () => {
        setIsModalOpenAdd(false);
    };
    const showModalAdd = () => {
        setIsModalOpenAdd(true);
    };
    // Khi submit form Tạo product
    const onFinishAdd = async (values: any) => {
        const data = {
            type: 'CATEGORY',
            value: values.value,
        };
        setIsLoading(true);
        const response = await createCategory(data);
        console.log(response);
        if (response && response.status == 201) {
            message.success('Thành công!');
            if (isFetchBrand) {
                setIsFetchBrand(false);
            } else {
                setIsFetchBrand(true);
            }
            handleCancelAdd();
            setIsLoading(false);
        }
    };
    //   Khi xảy ra lỗi trong form Tạo Product
    const onFinishFailedAdd = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    // dùng để hiển thị title của table
    const TitleTable = () => {
        return (
            <div className="titleTable">
                <div className="titleTable__Heading">
                    <span>Quản lý Danh mục </span>
                </div>
                <div className="titleTable__btn">
                    <Button type="primary" icon={<PlusOutlined />} className="btnButton" onClick={showModalAdd}>
                        Thêm danh mục
                    </Button>
                    <Modal
                        title="Tạo loại sản phẩm"
                        open={isModalOpenAdd}
                        onOk={handleOkAdd}
                        onCancel={handleCancelAdd}
                        footer
                    >
                        <Form
                            name="basic"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinishAdd}
                            onFinishFailed={onFinishFailedAdd}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Tên loại sản phẩm"
                                name="value"
                                rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu!' }]}
                            >
                                <Input placeholder="VD: Sweater...." />
                            </Form.Item>

                            <Form.Item
                                // wrapperCol={{ offset: 8, span: 16 }}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        width: '100px',
                                    }}
                                >
                                    Tạo
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        );
    };
    const paginationConfig: TablePaginationConfig = {
        total: total, // Tổng số mục dữ liệu
        pageSize: pageSize, // Số mục dữ liệu trên mỗi trang
        current: page, // Trang hiện tại
        defaultCurrent: 1,
        onChange: (page, pageSize) => {
            // Xử lý sự kiện thay đổi trang
            console.log(`Page: ${page}, PageSize: ${pageSize}`);
            setPage(page);
            setPageSize(pageSize);
        },
        showSizeChanger: true, // Hiển thị chọn kích thước trang
        pageSizeOptions: ['5', '10', '20', '50', '100'], // Tùy chọn kích thước trang
        position: ['bottomCenter'],
    };
    // Hiển thị update
    const showModalUpdate = () => {
        setIsModalUpdate(true);
    };
    // Xử lý  update
    const handleUpdateCategory = async (values: any): Promise<void> => {
        if (dataUpdateCategory) {
            const requestData = {
                id: dataUpdateCategory?.id,
                value: values.value ? values.value : dataUpdateCategory?.value,
                code: dataUpdateCategory?.code,
                type: dataUpdateCategory?.type,
            };
            console.log(requestData);
            const response = await updateBrand(requestData);
            if (response && response.status == 200) {
                console.log(response);
                message.success(response.data.message);
                setIsLoadCategory((isLoadCategory) => !isLoadCategory);
                setIsModalUpdate(false);
                formUpdate.setFieldsValue({
                    value: '',
                });
            }
        } else {
            message.error('Đã có lỗi xảy ra');
        }
    };
    useEffect(() => {
        getListCategoryFun();
    }, [page, pageSize, isFetchBrand, isDelete, isLoadCategory]);
    useEffect(() => {
        if (dataUpdateCategory) {
            formUpdate.setFieldsValue({
                value: dataUpdateCategory?.value,
            });
        }
    }, [dataUpdateCategory]);
    return (
        <Content title={'Danh mục sản phẩm'}>
            <div className="productWrapper">
                {isLoading ? (
                    <IsLoading />
                ) : (
                    <CustomTable
                        name="Category"
                        title={TitleTable}
                        dataSource={dataTable}
                        paginationConfig={paginationConfig}
                        showModalUpdate={showModalUpdate}
                        isDelete={isDelete}
                        setIsDelete={setIsDelete}
                        setdataUpdate={setDataUpdateCategory}
                    />
                )}
            </div>
            <Modal
                title="Cập Nhật"
                open={isModalUpdate}
                onOk={() => {}}
                onCancel={() => {
                    setIsModalUpdate(false);
                }}
                footer
            >
                <Form
                    form={formUpdate}
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={(value) => {
                        handleUpdateCategory(value);
                    }}
                    // onFinishFailed={onFinishFailedUpdate}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên danh Mục"
                        name="value"
                        // rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        // wrapperCol={{ offset: 8, span: 16 }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: '100px',
                            }}
                        >
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Content>
    );
}
