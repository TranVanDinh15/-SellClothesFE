import React, { useEffect, useState } from 'react';
import './VoucherAdmin.scss';
import Content from '../common/Content/Content';
import CustomTable from '../../../Table/TableCustom';
import { useForm } from 'antd/es/form/Form';
import { Button, Col, DatePicker, Form, Input, Row, TablePaginationConfig } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModalCustomer from '../common/Modal/ModalCustomer';
import UploadImageCustomer from '../common/UploadImage/UploadImage';
import SelectCustomer from '../common/Select/Select';
import { GetContext } from '../common/Context/Context';
import { handleAddVoucher, handleGetTypeVoucher } from './VoucherAdminMethod';
export interface StatusSelect {
    value: string;
    label: string;
}
export interface formAddBanner {
    toDate: string;
    fromDate: string;
    typeVoucherId: number;
    amount: number;
    codeVoucher: string;
}
export default function VoucherAdmin() {
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
    // type voucher
    const [typeVoucher, setTypeVoucher] = useState<{ value: string; label: string }[] | null>(null);
    const [toDate, setToDate] = useState<string>('');
    const [fromDate, setFromDate] = useState<string>('');
    const TitleTable = () => {
        return (
            <div className="titleTable">
                <div className="titleTable__Heading">
                    <span>Danh sách Voucher</span>
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
                        Thêm Voucher
                    </Button>
                    {/* Add Banner */}
                    <ModalCustomer
                        isModalOpen={isModalAddOpen}
                        handleOk={() => {}}
                        handleCancel={() => {
                            setIsModalAddOpen(false);
                        }}
                        title={'Thêm Voucher'}
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
                                const data = {
                                    toDate: toDate,
                                    fromDate: fromDate,
                                    typeVoucherId: value?.typeVoucherId,
                                    amount: Number(value.amount),
                                    codeVoucher: value.codeVoucher,
                                };
                                console.log(data);
                                // HandleAddBanner(
                                //     value,
                                //     image,
                                //     isLoadBanner,
                                //     setIsLoadBanner,
                                //     setIsModalAddOpen,
                                //     formAdd,
                                //     setImagesUploadMultiple,
                                //     setImageDp,
                                // );
                                handleAddVoucher(data);
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
                                        label="Ngày bắt đầu"
                                        name="fromDate"
                                        rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                                    >
                                        <DatePicker
                                            onChange={(date: any, dateString: string) => {
                                                setFromDate(dateString);
                                            }}
                                            format="DD/MM/YYYY"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Ngày kết thúc"
                                        name="toDate"
                                        rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                                    >
                                        <DatePicker
                                            onChange={(date: any, dateString: string) => {
                                                setToDate(dateString);
                                            }}
                                            format="DD/MM/YYYY"
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item
                                        label="Kiểu Voucher"
                                        name="typeVoucherId"
                                        rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                                    >
                                        <SelectCustomer
                                            mode=""
                                            option={typeVoucher ? [...typeVoucher] : []}
                                            onChange={(value: any) => {}}
                                            onSearch={(value: any) => {}}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Số lượng"
                                        name="amount"
                                        rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Mã Voucher"
                                        name="codeVoucher"
                                        rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                                    >
                                        <Input />
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
                                    Thêm Voucher
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
        // HandleGetBanner(page, pageSize, setDataTable, setTotal);
    }, [isLoadBanner, page, pageSize, isDelete]);
    useEffect(() => {
        // HandleGetStatusSelect(setStatusSelect);
    }, []);
    useEffect(() => {
        if (imagesUploadMultiple.length > 0) {
            setImage(imagesUploadMultiple[0]?.image);
        }
    }, [imagesUploadMultiple]);

    useEffect(() => {
        handleGetTypeVoucher(setTypeVoucher);
    }, []);
    return (
        <Content title={'Danh sách Voucher'}>
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
                            // HandleUpdateBanner(
                            //     dataBannerUpdate?.id,
                            //     value,
                            //     image ? image : dataBannerUpdate?.image,
                            //     isLoadBanner,
                            //     setIsLoadBanner,
                            //     setIsOpenUpdateBanner,
                            //     formUpdate,
                            //     setImage,
                            //     setImagesUploadMultiple,
                            //     setImageDp,
                            //     setDataBannerUpdate,
                            // );
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
