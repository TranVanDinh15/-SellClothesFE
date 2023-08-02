import React, { useState, useEffect } from 'react';
import Content from '../common/Content/Content';
import CustomTable from '../../../Table/TableCustom';
import { Button, Col, Form, Input, Row, TablePaginationConfig, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
    HandleAddDetailReceipt,
    HandleGetCategoryReceipt,
    HandleGetDetailReceipt,
    HandleUpdateDetapReceipt,
    onChangeCategorySelect,
    onChangeProductSelect,
    onChangeProductSizeSelect,
} from './ReceiptMethod';
import { useParams } from 'react-router-dom';
import ModalCustomer from '../common/Modal/ModalCustomer';
import { useForm } from 'antd/es/form/Form';
import { categoryDefine, productdefine } from './ReceiptInterface';
import SelectCustomer from '../common/Select/Select';
import { GetContext } from '../common/Context/Context';
export interface formAddDetailReceipt {
    receiptId: number;
    productDetailSizeId: number;
    quantity: number;
    price: number;
}
export interface formUpdateDetailReceipt {
    quantity: number;
    price: number;
}
export default function ReceiptDetail() {
    const param = useParams();
    const { dataDetailReceipt, idDelete }: any = GetContext();
    console.log(param);
    // Form cua add Receipt
    const [formAdd] = useForm<formAddDetailReceipt>();
    // Form Cua Update Receipt
    const [formUpdate] = useForm<formUpdateDetailReceipt>();
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [dataTable, setDataTable] = useState<[]>([]);
    // Quản lý load lại data
    const [isLoadDetailReceipt, setIsLoadDetailReceipt] = useState<boolean>(false);
    const [total, setTotal] = useState<number>();
    const [pageSize, setPageSize] = useState<any>(5);
    const [page, setPage] = useState<any>(1);
    //   const [listSelectsupplier, setListSelectSupplier] = useState<listValuesSupplier[] | null>(null);
    // Quản lý đóng mở update Biên lai nhập hàng
    const [isOpenUpdateDetailReceipt, setIsOpenUpdateDetailReceipt] = useState<boolean>(false);
    // Quản lý Product khi nhập hàng
    const [productApp, setProductApp] = useState<productdefine[] | null>(null);
    // Quản lý Category khi nhập hàng
    const [CategoryApp, setCategoryApp] = useState<categoryDefine[] | null>(null);
    // Quản lý Product Detail khi nhập hàng
    const [productDetailApp, setProductDetailApp] = useState<productdefine[] | null>(null);
    // quản lý Size Detail khi nhập hàng
    const [productDetailSizeApp, setProductDetailSizeApp] = useState<productdefine[] | null>(null);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    console.log(isDelete);
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
                        Nhập hàng
                    </Button>
                    {/* Add Supplier */}
                    <ModalCustomer
                        isModalOpen={isModalAddOpen}
                        handleOk={() => {}}
                        handleCancel={() => {
                            setIsModalAddOpen(false);
                            setProductApp(null);
                            setProductDetailApp(null);
                            setProductDetailSizeApp(null);
                        }}
                        title={'Nhập hàng'}
                        footer={true}
                        showModal={() => {
                            setIsModalAddOpen(true);
                        }}
                    >
                        <Form
                            form={formAdd}
                            name="basic"
                            labelCol={{ span: 24 }}
                            initialValues={{ remember: true }}
                            onFinish={(value) => {
                                // handleAddReCeipt(value, isLoadReceipt, setIsLoadReceipt, setIsModalAddOpen, formAdd);
                                if (param && param?.id) {
                                    HandleAddDetailReceipt(
                                        value,
                                        Number(param?.id),
                                        isLoadDetailReceipt,
                                        setIsLoadDetailReceipt,
                                        setIsModalAddOpen,
                                        formAdd,
                                        setProductApp,
                                        setProductDetailApp,
                                        setProductDetailSizeApp,
                                    );
                                } else {
                                    message.error('Đã có lỗi xảy ra');
                                }
                            }}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Row
                                gutter={20}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Col span={12}>
                                    <Form.Item
                                        label="Danh mục"
                                        name="categoryId"
                                        rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                                    >
                                        <SelectCustomer
                                            mode=""
                                            option={CategoryApp ? [...CategoryApp] : []}
                                            onChange={(value: any) => {
                                                onChangeCategorySelect(
                                                    value,
                                                    setProductApp,
                                                    setProductDetailApp,
                                                    setProductDetailSizeApp,
                                                );
                                            }}
                                            onSearch={(value: any) => {
                                                onChangeCategorySelect(
                                                    value,
                                                    setProductApp,
                                                    setProductDetailApp,
                                                    setProductDetailSizeApp,
                                                );
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                {productApp ? (
                                    <Col span={12}>
                                        <Form.Item
                                            label="Sản phẩm"
                                            name="categoryId"
                                            rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                                        >
                                            <SelectCustomer
                                                mode=""
                                                option={productApp ? [...productApp] : []}
                                                onChange={(value: any) => {
                                                    onChangeProductSelect(value, setProductDetailApp);
                                                }}
                                                onSearch={(value: any) => {
                                                    onChangeProductSelect(value, setProductDetailApp);
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                ) : (
                                    ''
                                )}
                            </Row>
                            <Row
                                gutter={20}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                {productDetailApp ? (
                                    <Col span={12}>
                                        <Form.Item
                                            label="Chi tiết"
                                            name="categoryId"
                                            rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                                        >
                                            <SelectCustomer
                                                mode=""
                                                option={productDetailApp ? [...productDetailApp] : []}
                                                onChange={(value: any) => {
                                                    onChangeProductSizeSelect(value, setProductDetailSizeApp);
                                                }}
                                                onSearch={(value: any) => {
                                                    // onSearchSupplierSelect(value);
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                ) : (
                                    ''
                                )}
                                {productDetailSizeApp ? (
                                    <Col span={12}>
                                        <Form.Item
                                            label="Size Sp"
                                            name="productDetailSizeId"
                                            rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                                        >
                                            <SelectCustomer
                                                mode=""
                                                option={productDetailSizeApp ? [...productDetailSizeApp] : []}
                                                onChange={(value: any) => {
                                                    // onChangeSupplierSelect(value);
                                                }}
                                                onSearch={(value: any) => {
                                                    // onSearchSupplierSelect(value);
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                ) : (
                                    ''
                                )}
                            </Row>

                            <Row
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                                gutter={20}
                            >
                                <Col span={12}>
                                    <Form.Item
                                        label="Số lượng"
                                        name="quantity"
                                        rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                                    >
                                        <Input
                                            placeholder="Nhập số"
                                            style={{
                                                borderRadius: 'initial',
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Đơn giá"
                                        name="price"
                                        rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                                    >
                                        <Input
                                            placeholder="Vd: Nhập giá trị của một đơn hàng"
                                            style={{
                                                borderRadius: 'initial',
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Nhập hàng
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
        console.log('detailReceipt');
        if (param && param?.id) {
            HandleGetDetailReceipt(Number(param?.id), page, pageSize, setDataTable, setTotal);
        }
    }, [isLoadDetailReceipt, page, pageSize, isDelete]);
    useEffect(() => {
        HandleGetCategoryReceipt(page, setCategoryApp);
    }, []);
    useEffect(() => {
        if (dataDetailReceipt) {
            formUpdate.setFieldsValue({
                quantity: dataDetailReceipt?.quantity,
                price: dataDetailReceipt?.price,
            });
        }
    }, [dataDetailReceipt]);
    return (
        <Content title={'Chi tiết  nhập hàng'}>
            <div className="DetailReceiptWrapper">
                <CustomTable
                    name="DetailReceipt"
                    title={TitleTable}
                    dataSource={dataTable}
                    paginationConfig={paginationConfig}
                    showModalUpdate={() => {
                        setIsOpenUpdateDetailReceipt(true);
                    }}
                    isDelete={isDelete}
                    setIsDelete={setIsDelete}
                />
            </div>
            {/* Modal Update Detail Receipt */}
            <ModalCustomer
                isModalOpen={isOpenUpdateDetailReceipt}
                handleOk={() => {}}
                handleCancel={() => {
                    setIsOpenUpdateDetailReceipt(false);
                    setProductApp(null);
                    setProductDetailApp(null);
                    setProductDetailSizeApp(null);
                }}
                title={'Nhập hàng'}
                footer={true}
                showModal={() => {
                    setIsOpenUpdateDetailReceipt(true);
                }}
            >
                <Form
                    form={formUpdate}
                    name="basic"
                    labelCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={(value) => {
                        if (param && param?.id && dataDetailReceipt) {
                            HandleUpdateDetapReceipt(
                                dataDetailReceipt?.productDetailSizeId,
                                Number(param?.id),
                                dataDetailReceipt?.id,
                                value,
                                setIsOpenUpdateDetailReceipt,
                                isLoadDetailReceipt,
                                setIsLoadDetailReceipt,
                                setProductApp,
                                setProductDetailApp,
                                setProductDetailSizeApp,
                            );
                        } else {
                            message.error('Đã có lỗi xảy ra');
                        }
                    }}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Row
                        gutter={20}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Col span={12}>
                            <Form.Item label="Danh mục" name="categoryId">
                                <SelectCustomer
                                    mode=""
                                    option={CategoryApp ? [...CategoryApp] : []}
                                    onChange={(value: any) => {
                                        onChangeCategorySelect(
                                            value,
                                            setProductApp,
                                            setProductDetailApp,
                                            setProductDetailSizeApp,
                                        );
                                    }}
                                    onSearch={(value: any) => {
                                        onChangeCategorySelect(
                                            value,
                                            setProductApp,
                                            setProductDetailApp,
                                            setProductDetailSizeApp,
                                        );
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        {productApp ? (
                            <Col span={12}>
                                <Form.Item
                                    label="Sản phẩm"
                                    name="categoryId"
                                    rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                                >
                                    <SelectCustomer
                                        mode=""
                                        option={productApp ? [...productApp] : []}
                                        onChange={(value: any) => {
                                            onChangeProductSelect(value, setProductDetailApp);
                                        }}
                                        onSearch={(value: any) => {
                                            onChangeProductSelect(value, setProductDetailApp);
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        ) : (
                            ''
                        )}
                    </Row>
                    <Row
                        gutter={20}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        {productDetailApp ? (
                            <Col span={12}>
                                <Form.Item
                                    label="Chi tiết"
                                    name="categoryId"
                                    rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                                >
                                    <SelectCustomer
                                        mode=""
                                        option={productDetailApp ? [...productDetailApp] : []}
                                        onChange={(value: any) => {
                                            onChangeProductSizeSelect(value, setProductDetailSizeApp);
                                        }}
                                        onSearch={(value: any) => {
                                            // onSearchSupplierSelect(value);
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        ) : (
                            ''
                        )}
                        {productDetailSizeApp ? (
                            <Col span={12}>
                                <Form.Item
                                    label="Size Sp"
                                    name="productDetailSizeId"
                                    rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                                >
                                    <SelectCustomer
                                        mode=""
                                        option={productDetailSizeApp ? [...productDetailSizeApp] : []}
                                        onChange={(value: any) => {
                                            // onChangeSupplierSelect(value);
                                        }}
                                        onSearch={(value: any) => {
                                            // onSearchSupplierSelect(value);
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        ) : (
                            ''
                        )}
                    </Row>

                    <Row
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                        gutter={20}
                    >
                        <Col span={12}>
                            <Form.Item
                                label="Số lượng"
                                name="quantity"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <Input
                                    placeholder="Nhập số"
                                    style={{
                                        borderRadius: 'initial',
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Đơn giá"
                                name="price"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <Input
                                    placeholder="Vd: Nhập giá trị của một đơn hàng"
                                    style={{
                                        borderRadius: 'initial',
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Nhập hàng
                        </Button>
                    </Form.Item>
                </Form>
            </ModalCustomer>
        </Content>
    );
}
