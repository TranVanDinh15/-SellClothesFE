import React, { useEffect, useState } from 'react';
import './Product.css';
import { Button, Col, Descriptions, Empty, Modal, Row, Form, Input, TablePaginationConfig } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { GetContext } from '../Admin/common/Context/Context';
import UploadImageCustomer from '../Admin/common/UploadImage/UploadImage';
import { getColorSelect, getProductById, getProductDetailById } from '../../utils/Api/Api';
import SelectCustomer from '../Admin/common/Select/Select';
import ModalCustomer from '../Admin/common/Modal/ModalCustomer';
import Content from '../Admin/common/Content/Content';
import { useParams } from 'react-router-dom';
import CustomTable from '../../Table/TableCustom';
import { DataTypeProductDetail } from '../../Table/TableInterface';

export default function DetailProductCreate() {
    const { id } = useParams();
    const { isSaveDetailProduct, setIsSaveDetailProduct, imagesUploadMultiple, setImagesUploadMultiple }: any =
        GetContext();
    console.log(isSaveDetailProduct);
    const [imagesUpload, setImageUpload] = useState();
    const [isModalUpdate, setIsModalUpdate] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [saveColor, setSaveColor] = useState([]);
    const [total, setTotal] = useState<any>();
    const [pageSize, setPageSize] = useState<number>(5);
    const [page, setPage] = useState<number>(1);
    const [dataTable, setDataTable] = useState<[]>([]);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const handleGetProductById = async () => {
        if (id) {
            const response = await getProductById(id);
            if (response && response.status == 200) {
                console.log(response);
            }
        }
    };
    // Open Modal Add detail Product
    const showModalAddDp = () => {
        setIsModalAddOpen(true);
    };
    // Handle Submit Modal Add detail Product
    const handleOkAddDp = () => {};
    // HandleCancel Add Detail Product
    const handleCancelDp = () => {
        setIsModalAddOpen(false);
    };

    const handleOkUpdate = () => {};
    const handleShowUpdate = () => {
        setIsModalUpdate(true);
    };
    const handleCancelUpdate = () => {
        setIsModalUpdate(false);
    };
    // Lấy màu sắc
    const hanleGetSelectColor = async () => {
        const response = await getColorSelect();
        if (response && response.status == 200) {
            console.log(response);
            if (response.data.data.length > 0) {
                const result = response.data.data.map((item: any) => {
                    return {
                        value: item.code,
                        label: item.value,
                    };
                });
                setSaveColor(result);
            }
        }
    };
    const onFinishUpdate = (values: any) => {
        console.log(values);
        const reqUpdate = {
            productId: 6,
            name: 'APN4396-DEN',
            originalPrice: 2000,
            discountPrice: 1400,
            description: 'hdhhdhd',
            images: imagesUpload,
            colorId: 'red',
        };
    };
    const onFailUpdate = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    // Lấy thông tin sản phẩm
    const getProductDetail = async () => {
        setIsLoading(true);
        // const response= await getProductDetailById()
    };
    const onChangeColorSelect = (value: string) => {};

    const onSearchColorSelect = (value: string) => {
        console.log('search:', value);
    };
    const titleDetail = () => {
        return (
            <div className="titleTable">
                <div className="titleTable__Heading">
                    <span>Danh sách sản phẩm</span>
                </div>
                <div className="titleTable__btn">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="btnButton"
                        onClick={() => {
                            showModalAddDp();
                        }}
                    >
                        Thêm chi tiết sp
                    </Button>
                    {isSaveDetailProduct?.detail.length > 0 ? (
                        <>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                className="btnButton"
                                onClick={() => {
                                    // showModalAddDp();
                                }}
                            >
                                Thêm size
                            </Button>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                className="btnButton"
                                onClick={() => {
                                    handleShowUpdate();
                                }}
                            >
                                Update
                            </Button>
                        </>
                    ) : (
                        ''
                    )}
                </div>
                {/* Modal Update detail Product */}
                <Modal
                    title="Update sản phẩm"
                    open={isModalUpdate}
                    onOk={handleOkUpdate}
                    onCancel={handleCancelUpdate}
                    footer
                    width={'80%'}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 24 }}
                        // style={{ width: 700 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinishUpdate}
                        onFinishFailed={onFailUpdate}
                        autoComplete="off"
                    >
                        <Row gutter={16} style={{}}>
                            <Col span={12}>
                                <Form.Item
                                    label="Danh mục sản phẩm"
                                    name="categoryId"
                                    rules={[{ required: true, message: 'Vui lòng chọn danh mục sản phẩm !!' }]}
                                >
                                    <SelectCustomer
                                        mode=""
                                        option={[...saveColor]}
                                        onChange={onChangeColorSelect}
                                        onSearch={onSearchColorSelect}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Tên sản phẩm "
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập chính xác và không để trống!',
                                        },
                                    ]}
                                    initialValue={isSaveDetailProduct?.name}
                                >
                                    <Input placeholder="VD: Áo thun ...." width={'100%'} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Giá"
                                    name="originalPrice"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập chính xác và không để trống!',
                                        },
                                    ]}
                                    // initialValue={isSaveDetailProduct.detail.length<1 : null : isSaveDetailProduct.detail.da}
                                >
                                    <Input placeholder="Điền chữ số" width={'100%'} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{}}>
                            <Col span={12}>
                                <Form.Item
                                    label="Giá Discount"
                                    name="discountPrice"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập chính xác và không để trống!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Điền chữ số" width={'100%'} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label="Ảnh" name="images">
                            <UploadImageCustomer multilple={true} />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 24 }}
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
                {/* Modal Add detail Prodcut */}
                <ModalCustomer
                    isModalOpen={isModalAddOpen}
                    showModal={showModalAddDp}
                    handleOk={handleOkAddDp}
                    handleCancel={handleCancelDp}
                    title={'Thêm chi tiết sản phẩm'}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 24 }}
                        // style={{ width: 700 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinishUpdate}
                        onFinishFailed={onFailUpdate}
                        autoComplete="off"
                    >
                        <Row gutter={16} style={{}}>
                            <Col span={12}>
                                <Form.Item
                                    label="Màu sắc"
                                    name="categoryId"
                                    rules={[{ required: true, message: 'Vui lòng chọn danh mục sản phẩm !!' }]}
                                >
                                    <SelectCustomer
                                        mode=""
                                        option={[...saveColor]}
                                        onChange={onChangeColorSelect}
                                        onSearch={onSearchColorSelect}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Tên sản phẩm "
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập chính xác và không để trống!',
                                        },
                                    ]}
                                    initialValue={isSaveDetailProduct?.name}
                                >
                                    <Input placeholder="VD: Áo thun ...." width={'100%'} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Giá"
                                    name="originalPrice"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập chính xác và không để trống!',
                                        },
                                    ]}
                                    // initialValue={isSaveDetailProduct.detail.length<1 : null : isSaveDetailProduct.detail.da}
                                >
                                    <Input placeholder="Điền chữ số" width={'100%'} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{}}>
                            <Col span={12}>
                                <Form.Item
                                    label="Giá Discount"
                                    name="discountPrice"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập chính xác và không để trống!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Điền chữ số" width={'100%'} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label="Ảnh" name="images">
                            <UploadImageCustomer multilple={true} />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 24 }}
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
                </ModalCustomer>
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
            // console.log(`Page: ${page}, PageSize: ${pageSize}`);
            setPage(page);
            setPageSize(pageSize);
        },
        showSizeChanger: true, // Hiển thị chọn kích thước trang
        pageSizeOptions: ['5', '10', '20', '50', '100'], // Tùy chọn kích thước trang
        position: ['bottomCenter'],
    };
    useEffect(() => {
        hanleGetSelectColor();
        handleGetProductById();
    }, []);

    return (
        <Content title={'Chi tiết sản phẩm'}>
            <CustomTable
                name="DetailProduct"
                title={titleDetail}
                dataSource={dataTable}
                paginationConfig={paginationConfig}
                showModalUpdate={handleShowUpdate}
            />
        </Content>
    );
}
