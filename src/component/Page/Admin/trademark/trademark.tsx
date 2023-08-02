import React, { useEffect, useState } from 'react';
import Content from '../common/Content/Content';
import { AiFillTrademarkCircle } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import CustomTable from '../../../Table/TableCustom';
import './trademark.css';
import { Button, Modal, Checkbox, Form, Input, message, TablePaginationConfig } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createBrand, getAllBrand, updateBrand } from '../../../utils/Api/Api';
import IsLoading from '../common/IsLoading/IsLoading';
import { GetContext } from '../common/Context/Context';
import { useForm } from 'antd/es/form/Form';

interface itemsData {
    code: string;
    value: string;
    createdAt: string;
    id: string;
    type: string;
}
interface formUpdate {
    value: string;
}
export default function TrademarkManage() {
    const [formUpdate] = useForm<formUpdate>();
    const { dataUpdate, setDataUpdate }: any = GetContext();
    console.log(dataUpdate);
    const [dataTable, setDataTable] = useState<[]>([]);
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [isFetchBrand, setIsFetchBrand] = useState(false);
    const [page, setPage] = useState<any>(1);
    const [pageSize, setPageSize] = useState<any>(5);
    const [total, setTotal] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const getAllBrandFun = async () => {
        setIsLoading(true);
        const response = await getAllBrand(page, pageSize);
        if (response.data && response.status == 200) {
            const filterData = response.data.data.map((item: itemsData, index: number) => {
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
        }
    };
    const showModalAdd = () => {
        setIsModalOpenAdd(true);
    };

    const handleOkAdd = () => {
        setIsModalOpenAdd(false);
    };

    const handleCancelAdd = () => {
        setIsModalOpenAdd(false);
    };
    const showModalUpdate = () => {
        setIsModalUpdate(true);
    };
    const handleOkUpdate = () => {};
    const handleCancelUpdate = () => {
        setIsModalUpdate(false);
    };
    // Khi submit form update Brand
    const onFinishUpdate = async (value: any) => {
        const requestData = {
            id: dataUpdate?.id,
            value: value.value ? value.value : dataUpdate.value,
            code: dataUpdate?.code,
            type: dataUpdate?.type,
        };
        setIsLoading(true);
        const response = await updateBrand(requestData);
        if (response && response.status == 200) {
            console.log(response);
            message.success(response.data.message);
            getAllBrandFun();
            setIsLoading(false);
            handleCancelUpdate();
        }
    };
    const onFinishFailedUpdate = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    // Khi submit form Tạo thương hiệu
    const onFinishAdd = async (values: any) => {
        console.log('Success:', values);
        const data = {
            type: 'BRAND',
            value: values.value,
        };
        setIsLoading(true);
        const response = await createBrand(data);
        if (response) {
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
    //   Khi xảy ra lỗi trong form Tạo thương hiệu
    const onFinishFailedAdd = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    // dùng để hiển thị title của table
    const TitleTable = () => {
        return (
            <div className="titleTable">
                <div className="titleTable__Heading">
                    <span>Danh sách thương hiệu</span>
                </div>
                <div className="titleTable__btn">
                    <Button type="primary" icon={<PlusOutlined />} className="btnButton" onClick={showModalAdd}>
                        Thêm thương hiệu
                    </Button>
                    <Modal
                        title="Tạo thương hiệu"
                        open={isModalOpenAdd}
                        onOk={handleOkAdd}
                        onCancel={handleCancelAdd}
                        footer
                    >
                        <Form
                            // form={formAdd}
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
                                label="Tên thương hiệu"
                                name="value"
                                rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu!' }]}
                            >
                                <Input placeholder="VD: Yody...." />
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
    useEffect(() => {
        getAllBrandFun();
    }, [isFetchBrand, pageSize, page, isDelete]);
    useEffect(() => {
        if (dataUpdate) {
            formUpdate.setFieldsValue({
                value: dataUpdate?.value,
            });
        }
    }, [dataUpdate]);
    return (
        <Content title={'Quản lý thương hiệu'}>
            <div className="brandWrapper">
                {isLoading ? (
                    <IsLoading />
                ) : (
                    <CustomTable
                        name="Trademark"
                        title={TitleTable}
                        dataSource={dataTable}
                        paginationConfig={paginationConfig}
                        showModalUpdate={showModalUpdate}
                        isDelete={isDelete}
                        setIsDelete={setIsDelete}
                    />
                )}
                <Modal title="Cập Nhật" open={isModalUpdate} onOk={handleOkUpdate} onCancel={handleCancelUpdate} footer>
                    <Form
                        form={formUpdate}
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinishUpdate}
                        onFinishFailed={onFinishFailedUpdate}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tên thương hiệu"
                            name="value"
                            // rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu!' }]}
                        >
                            <Input placeholder={dataUpdate?.value} />
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
            </div>
        </Content>
    );
}
