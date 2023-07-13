import React, { useEffect, useState } from 'react';
import './Product.css';
import {
    Button,
    Col,
    Descriptions,
    Empty,
    Modal,
    Row,
    Form,
    Input,
    TablePaginationConfig,
    message,
    Drawer,
    Image,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { GetContext } from '../Admin/common/Context/Context';
import UploadImageCustomer from '../Admin/common/UploadImage/UploadImage';
import {
    GetColorProductById,
    createProductDetail,
    getColorSelect,
    getProductById,
    getProductDetailSize,
} from '../../utils/Api/Api';
import SelectCustomer from '../Admin/common/Select/Select';
import ModalCustomer from '../Admin/common/Modal/ModalCustomer';
import Content from '../Admin/common/Content/Content';
import { useParams } from 'react-router-dom';
import CustomTable from '../../Table/TableCustom';
import IsLoading from '../Admin/common/IsLoading/IsLoading';
import { convertVND } from '../Admin/common/method/method';
import {
    cancelAddSizeDp,
    getProductDetail,
    handleCancelDp,
    handleCancelUpdate,
    handleCancelUpdateSizeDp,
    handleGetColorById,
    handleGetSizeDp,
    handleOkAddDp,
    handleOkUpdate,
    handleOkUpdateSizeDp,
    handleShowUpdate,
    handleShowUpdateSizeDp,
    handleSubmitAddSize,
    handleSubmitFailSize,
    handleSubmitFailUpdateSize,
    handleSubmitUpdateSize,
    hanleGetSelectColor,
    onChangeColorSelect,
    onFailAdd,
    onFailUpdate,
    onFinishAdd,
    onFinishUpdate,
    onSearchColorSelect,
    onViewCloseFullDp,
    showAddSizeDp,
    showCloseSize,
    showModalAddDp,
} from './ProductMethod';

export default function DetailProductCreate() {
    const { id } = useParams();
    const {
        isModalAddDPOpen,
        setIsModalAddDpOpen,
        imagesUploadMultiple,
        isSaveItemsDp,
        openFullDp,
        setOpenFullDp,
        saveItemDp,
        isModalAddSize,
        setIsModalAddSize,
        isOpenDrawerSize,
        setIsOpenDrawerSize,
        saveIDp,
        setSaveSizeDp,
        saveSizeDp,
        isModalUpdateSize,
        setIsModalUpdateSize,
        detailSize,
        formUpdate,
        isFetchDp,
        setIsFetchDp,
        isFetchSizeDp,
        isModalUpdate,
        setIsModalUpdate,
        formUpdateSize,
        imageDp,
        setImageDp,
        setImagesUploadMultiple,
        saveIdDetailProduct,
        setSaveIdDetailProduct,
    }: any = GetContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [saveColor, setSaveColor] = useState([]);
    const [total, setTotal] = useState<any>();
    const [pageSize, setPageSize] = useState<number>(5);
    const [page, setPage] = useState<number>(1);
    const [GetDetailP, setGetDetailP] = useState<[]>([]);
    const [selectColor, setSelectColor] = useState<[]>([]);
    console.log(GetDetailP);
    const titileSizeDp = () => {
        return <span></span>;
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
                            showModalAddDp(setIsModalAddDpOpen);
                        }}
                    >
                        Thêm Chi tiết sản phẩm
                    </Button>
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
            // console.log(`Page: ${page}, PageSize: ${pageSize}`);
            setPage(page);
            setPageSize(pageSize);
        },
        showSizeChanger: true, // Hiển thị chọn kích thước trang
        pageSizeOptions: ['5', '10', '20', '50', '100'], // Tùy chọn kích thước trang
        position: ['bottomCenter'],
    };
    const paginationSizeConfig: TablePaginationConfig = {};
    useEffect(() => {
        if (id) {
            const productId = parseInt(id);
            getProductDetail(setIsLoading, productId, setGetDetailP);
        }
    }, []);
    useEffect(() => {
        hanleGetSelectColor(setSaveColor);
        if (id) {
            handleGetColorById(id, setSelectColor);
        }
    }, []);
    useEffect(() => {
        if (id) {
            getProductDetail(setIsLoading, parseInt(id), setGetDetailP);
        }
    }, [isFetchDp]);
    useEffect(() => {
        if (saveIDp) {
            handleGetSizeDp(saveIDp, setSaveSizeDp);
        }
    }, [saveIDp, isFetchSizeDp]);
    return (
        <Content title={'Chi tiết sản phẩm'}>
            {GetDetailP.length > 0 ? (
                isLoading == false ? (
                    <CustomTable
                        name="DetailProduct"
                        title={titleDetail}
                        dataSource={GetDetailP}
                        paginationConfig={paginationConfig}
                        showModalUpdate={() => {
                            handleShowUpdate(setIsModalUpdate);
                        }}
                    />
                ) : (
                    <IsLoading />
                )
            ) : (
                <div className="DetailProductEmty">
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        description={<span>Không có dữ liệu</span>}
                    >
                        <Button
                            type="primary"
                            onClick={() => {
                                // setIsModalAddDpOpen(true);
                                // console.log('ok');
                                showModalAddDp(setIsModalAddDpOpen);
                            }}
                        >
                            Thêm chi tiết sản phẩm
                        </Button>
                    </Empty>
                </div>
            )}
            {/* Modal Update detail Product */}
            <Modal
                title="Update sản phẩm"
                open={isModalUpdate}
                onOk={handleOkUpdate}
                onCancel={() => {
                    setImageDp([]);
                    handleCancelUpdate(setIsModalUpdate);
                }}
                footer
                width={'80%'}
            >
                <Form
                    form={formUpdate}
                    name="basic"
                    labelCol={{ span: 24 }}
                    onFinish={(values) => {
                        onFinishUpdate(
                            saveIdDetailProduct,
                            values,
                            setIsLoading,
                            setIsFetchDp,
                            imagesUploadMultiple,
                            imageDp,
                            isFetchDp,
                            setIsModalUpdate,
                            setImageDp,
                        );
                    }}
                    onFinishFailed={onFailUpdate}
                    autoComplete="off"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Tên sản phẩm " name="name">
                                <Input placeholder="VD: Áo thun ...." width={'100%'} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Giá" name="originalPrice">
                                <Input placeholder="Điền chữ số" width={'100%'} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{}}>
                        <Col span={12}>
                            <Form.Item label="Giá Discount" name="discountPrice">
                                <Input placeholder="Điền chữ số" width={'100%'} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Mô tả" name="description">
                                <Input placeholder="Viết mô tả sản phẩm" width={'100%'} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{}}>
                        <Col span={12}>
                            <Form.Item label="Màu sắc" name="colorId">
                                <SelectCustomer
                                    mode=""
                                    option={[...saveColor]}
                                    onChange={onChangeColorSelect}
                                    onSearch={onSearchColorSelect}
                                />
                            </Form.Item>
                        </Col>
                        <Col
                            span={12}
                            style={{
                                display: 'none',
                            }}
                        >
                            <Form.Item label="Màu sắc" name="productId">
                                <Input placeholder="Viết mô tả sản phẩm" width={'100%'} />
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
                footer={false}
                isModalOpen={isModalAddDPOpen}
                showModal={() => {
                    showModalAddDp(setIsModalAddDpOpen);
                }}
                handleOk={handleOkAddDp}
                handleCancel={() => {
                    handleCancelDp(setIsModalAddDpOpen, setImagesUploadMultiple);
                }}
                title={'Thêm chi tiết sản phẩm'}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    // style={{ width: 700 }}
                    onFinish={(value) => {
                        onFinishAdd(
                            value,
                            id,
                            setIsLoading,
                            imagesUploadMultiple,
                            setIsModalAddDpOpen,
                            isFetchDp,
                            setIsFetchDp,
                            setImagesUploadMultiple,
                        );
                    }}
                    onFinishFailed={onFailAdd}
                    autoComplete="off"
                >
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
                        <Col span={12}>
                            <Form.Item
                                label="Màu sắc"
                                name="colorId"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập không để trống trường này!',
                                    },
                                ]}
                            >
                                <SelectCustomer
                                    mode=""
                                    option={[...selectColor]}
                                    onChange={onChangeColorSelect}
                                    onSearch={onSearchColorSelect}
                                />
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
                            cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </ModalCustomer>

            {/* Modal Add Size for detail Product */}
            <ModalCustomer
                footer={false}
                isModalOpen={isModalAddSize}
                showModal={() => {
                    showAddSizeDp(setIsModalAddSize);
                }}
                handleOk={handleOkAddDp}
                handleCancel={() => {
                    cancelAddSizeDp(setIsModalAddSize);
                }}
                title={'Thêm kích thước sản phẩm'}
            >
                <Form
                    name=""
                    labelCol={{ span: 24 }}
                    // style={{ width: 700 }}
                    initialValues={{ remember: true }}
                    onFinish={(values) => {
                        handleSubmitAddSize(values, isSaveItemsDp.id, setIsLoading, setIsModalAddSize);
                    }}
                    onFinishFailed={handleSubmitFailSize}
                    autoComplete="off"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Tên"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập chính xác và không để trống!',
                                    },
                                ]}
                            >
                                <Input placeholder="VD: S, M, L...." width={'100%'} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Chiều rộng"
                                name="width"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập chính xác và không để trống!',
                                    },
                                ]}
                                // initialValue={isSaveDetailProduct.detail.length<1 : null : isSaveDetailProduct.detail.da}
                            >
                                <Input placeholder="Vd: 50cm" width={'100%'} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{}}>
                        <Col span={12}>
                            <Form.Item
                                label="Chiều dài"
                                name="height"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập chính xác và không để trống!',
                                    },
                                ]}
                            >
                                <Input placeholder="Vd:165cm" width={'100%'} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Cân nặng"
                                name="weight"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập không để trống trường này!',
                                    },
                                ]}
                            >
                                <Input placeholder="Vd:58kg - 65kg" width={'100%'} />
                            </Form.Item>
                        </Col>
                    </Row>

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
                            loading={isLoading ? true : false}
                        >
                            Tạo size
                        </Button>
                    </Form.Item>
                </Form>
            </ModalCustomer>
            {/* Modal update size for detail Product */}
            <ModalCustomer
                footer={false}
                isModalOpen={isModalUpdateSize}
                showModal={() => {
                    handleShowUpdateSizeDp(setIsModalUpdateSize);
                }}
                handleOk={handleOkUpdateSizeDp}
                handleCancel={() => {
                    handleCancelUpdateSizeDp(setIsModalUpdateSize, formUpdateSize);
                }}
                title={'Cập nhật Size'}
            >
                <Form
                    form={formUpdateSize}
                    name=""
                    labelCol={{ span: 24 }}
                    onFinish={(values) => {
                        handleSubmitUpdateSize(
                            values,
                            detailSize,
                            setIsLoading,
                            setIsModalUpdateSize,
                            saveIDp,
                            setSaveSizeDp,
                            formUpdateSize,
                        );
                    }}
                    onFinishFailed={handleSubmitFailUpdateSize}
                    autoComplete="off"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Tên" name="name">
                                <Input placeholder={detailSize?.name} width={'100%'} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Chiều rộng" name="width">
                                <Input placeholder={detailSize?.width} width={'100%'} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{}}>
                        <Col span={12}>
                            <Form.Item label="Chiều dài" name="height">
                                <Input placeholder={detailSize?.height} width={'100%'} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Cân nặng" name="weight">
                                <Input placeholder={detailSize?.weight} width={'100%'} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Số lượng" name="quantity">
                                <Input placeholder={detailSize?.quantity} width={'100%'} />
                            </Form.Item>
                        </Col>
                    </Row>

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
                            loading={isLoading ? true : false}
                        >
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </ModalCustomer>
            {/* Xem full chi tiết sản phẩm */}
            <Drawer
                placement="right"
                onClose={() => {
                    onViewCloseFullDp(setOpenFullDp);
                }}
                open={openFullDp}
                width={'40%'}
            >
                {saveItemDp ? (
                    <Descriptions title="Chi tiết sản phẩm" column={1}>
                        <Descriptions.Item label="Tên sản phẩm">{saveItemDp.name}</Descriptions.Item>
                        <Descriptions.Item label="Giá bán">{convertVND(saveItemDp.originalPrice)}</Descriptions.Item>
                        <Descriptions.Item label="Giá giảm giá">
                            {convertVND(saveItemDp.discountPrice)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Thương hiệu">{saveItemDp.brandId}</Descriptions.Item>
                        <Descriptions.Item label="Danh mục sp">{saveItemDp.categoryId}</Descriptions.Item>
                        <Descriptions.Item label="Chất liệu">{saveItemDp.material}</Descriptions.Item>
                        <Descriptions.Item label="Màu">{saveItemDp.color}</Descriptions.Item>
                        <Descriptions.Item label="size">empty</Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">{saveItemDp.statusId}</Descriptions.Item>
                        <Descriptions.Item label="Ảnh">
                            <div>
                                {saveItemDp?.images.map((item: string) => {
                                    return <Image width={80} src={`${process.env.REACT_APP_IMAGE_PRODUCT}${item}`} />;
                                })}
                            </div>
                        </Descriptions.Item>
                    </Descriptions>
                ) : (
                    <Empty />
                )}
            </Drawer>
            {/* Xem size của sản phẩm */}
            <Drawer
                title="Bảng size sản phẩm"
                width={'50%'}
                placement="right"
                onClose={() => {
                    showCloseSize(setIsOpenDrawerSize);
                }}
                open={isOpenDrawerSize}
            >
                {saveSizeDp ? (
                    <CustomTable
                        name="SizeDetailProduct"
                        dataSource={saveSizeDp}
                        title={titileSizeDp}
                        paginationConfig={paginationSizeConfig}
                        showModalUpdate={() => {
                            // handleShowUpdate(setIsModalUpdate);
                        }}
                    />
                ) : (
                    <Empty />
                )}
            </Drawer>
        </Content>
    );
}
