import React, { useState, useEffect } from 'react';
import './Banner.scss';
import Content from '../common/Content/Content';
import CustomTable from '../../../Table/TableCustom';
import { useForm } from 'antd/es/form/Form';
import { Button, Col, Form, Input, Row, TablePaginationConfig } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { HandleAddBanner, HandleGetBanner, HandleGetStatusSelect, HandleUpdateBanner } from './BannerMethod';
import ModalCustomer from '../common/Modal/ModalCustomer';
import UploadImageCustomer from '../common/UploadImage/UploadImage';
import SelectCustomer from '../common/Select/Select';
import { GetContext } from '../common/Context/Context';
export interface StatusSelect {
    value: string;
    label: string;
}
export interface formAddBanner {
    name: string;
    description: string;
    statusId: string;
}
export default function Banner() {
    const { imagesUploadMultiple, setImagesUploadMultiple, dataBannerUpdate, setImageDp, setDataBannerUpdate }: any =
        GetContext();
    console.log(imagesUploadMultiple);
    // Form cua add Banner
    const [formAdd] = useForm<formAddBanner>();
    // Form cua Update Banner
    const [formUpdate] = useForm<formAddBanner>();
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    // Quản lý load lại data
    const [isLoadBanner, setIsLoadBanner] = useState<boolean>(false);
    const [dataTable, setDataTable] = useState<[]>([]);
    const [total, setTotal] = useState<number>();
    const [pageSize, setPageSize] = useState<any>(5);
    const [page, setPage] = useState<any>(1);
    // Quản lý đóng mở update Biên lai nhập hàng
    const [isOpenUpdateBanner, setIsOpenUpdateBanner] = useState<boolean>(false);
    // Quản lý status Banner khi thêm banner
    const [statusSelect, setStatusSelect] = useState<StatusSelect[] | undefined>();
    // Quản lý image  Add
    const [image, setImage] = useState<string>('');
    // Quanr lý xóa  Banner
    const [isDelete, setIsDelete] = useState<boolean>(true);
    console.log(isDelete);
    const TitleTable = () => {
        return (
            <div className="titleTable">
                <div className="titleTable__Heading">
                    <span>Danh sách Banner</span>
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
                        Thêm Banner
                    </Button>
                    {/* Add Banner */}
                    <ModalCustomer
                        isModalOpen={isModalAddOpen}
                        handleOk={() => {}}
                        handleCancel={() => {
                            setIsModalAddOpen(false);
                        }}
                        title={'Thêm Banner'}
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
                                // onFinishAddSupplier(
                                //     value,
                                //     isLoadSupplier,
                                //     setIsLoadSupplier,
                                //     setIsModalAddOpen,
                                //     formAdd,
                                // );
                                HandleAddBanner(
                                    value,
                                    image,
                                    isLoadBanner,
                                    setIsLoadBanner,
                                    setIsModalAddOpen,
                                    formAdd,
                                    setImagesUploadMultiple,
                                    setImageDp,
                                );
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
                                        label="Tên Banner"
                                        name="name"
                                        rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Mô tả ngắn"
                                        name="description"
                                        rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Ảnh (1 ảnh)"
                                        // name="description"
                                    >
                                        <UploadImageCustomer multilple={true} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Trạng thái"
                                        name="statusId"
                                        rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                                    >
                                        <SelectCustomer
                                            mode=""
                                            option={statusSelect ? [...statusSelect] : []}
                                            onChange={(value: any) => {
                                                // onChangeCategorySelect(
                                                //     value,
                                                //     setProductApp,
                                                //     setProductDetailApp,
                                                //     setProductDetailSizeApp,
                                                // );
                                            }}
                                            onSearch={(value: any) => {
                                                // onChangeCategorySelect(
                                                //     value,
                                                //     setProductApp,
                                                //     setProductDetailApp,
                                                //     setProductDetailSizeApp,
                                                // );
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Thêm Banner
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
        HandleGetBanner(page, pageSize, setDataTable, setTotal);
    }, [isLoadBanner, page, pageSize, isDelete]);
    useEffect(() => {
        HandleGetStatusSelect(setStatusSelect);
    }, []);
    useEffect(() => {
        if (imagesUploadMultiple.length > 0) {
            setImage(imagesUploadMultiple[0]?.image);
        }
    }, [imagesUploadMultiple]);
    useEffect(() => {
        if (dataBannerUpdate) {
            console.log(`${process.env.REACT_APP_IMAGE_BANNER_URL}${dataBannerUpdate?.image}`);
            formUpdate.setFieldsValue({
                name: dataBannerUpdate?.name,
                description: dataBannerUpdate?.description,
                statusId: dataBannerUpdate?.statusId,
            });
            setImageDp([
                {
                    uid: dataBannerUpdate?.id,
                    thumbUrl: `${process.env.REACT_APP_IMAGE_BANNER_URL}${dataBannerUpdate?.image}`,
                },
            ]);
        }
    }, [dataBannerUpdate]);

    return (
        <Content title={'Danh sách Banner'}>
            <div className="SupplierWrapper">
                <CustomTable
                    name="Banner"
                    title={TitleTable}
                    dataSource={dataTable}
                    paginationConfig={paginationConfig}
                    showModalUpdate={() => {
                        // setIsOpenUpdateSupplier(true);
                        setIsOpenUpdateBanner(true);
                    }}
                    isDelete={isDelete}
                    setIsDelete={setIsDelete}
                />
            </div>
            {/* Modal Custom Update */}
            <ModalCustomer
                isModalOpen={isOpenUpdateBanner}
                handleOk={() => {}}
                handleCancel={() => {
                    setIsOpenUpdateBanner(false);
                    setImage('');
                    setImagesUploadMultiple([]);
                    setImageDp([]);
                    setDataBannerUpdate('');
                }}
                title={'Cập nhật Banner'}
                footer={true}
                showModal={() => {
                    setIsModalAddOpen(true);
                }}
            >
                <Form
                    form={formUpdate}
                    name="basic"
                    labelCol={{ span: 24 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={(value) => {
                        if (dataBannerUpdate) {
                            console.log('ok');
                            HandleUpdateBanner(
                                dataBannerUpdate?.id,
                                value,
                                image ? image : dataBannerUpdate?.image,
                                isLoadBanner,
                                setIsLoadBanner,
                                setIsOpenUpdateBanner,
                                formUpdate,
                                setImage,
                                setImagesUploadMultiple,
                                setImageDp,
                                setDataBannerUpdate,
                            );
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
                                label="Tên Banner"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Mô tả ngắn"
                                name="description"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Ảnh (1 ảnh)"
                                // name="description"
                            >
                                <UploadImageCustomer multilple={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Trạng thái"
                                name="statusId"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <SelectCustomer
                                    mode=""
                                    option={statusSelect ? [...statusSelect] : []}
                                    onChange={(value: any) => {
                                        // onChangeCategorySelect(
                                        //     value,
                                        //     setProductApp,
                                        //     setProductDetailApp,
                                        //     setProductDetailSizeApp,
                                        // );
                                    }}
                                    onSearch={(value: any) => {
                                        // onChangeCategorySelect(
                                        //     value,
                                        //     setProductApp,
                                        //     setProductDetailApp,
                                        //     setProductDetailSizeApp,
                                        // );
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Cập nhật Banner
                        </Button>
                    </Form.Item>
                </Form>
            </ModalCustomer>
        </Content>
    );
}
