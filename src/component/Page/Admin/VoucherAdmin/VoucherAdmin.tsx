import React, { useEffect, useState } from 'react';
import './VoucherAdmin.scss';
import Content from '../common/Content/Content';
import CustomTable from '../../../Table/TableCustom';
import { useForm } from 'antd/es/form/Form';
import { Button, Col, DatePicker, Form, Input, Row, TablePaginationConfig } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModalCustomer from '../common/Modal/ModalCustomer';
import SelectCustomer from '../common/Select/Select';
import { GetContext } from '../common/Context/Context';
import {
    handleAddVoucher,
    handleGetStatusUpdate,
    handleGetTypeVoucherSelect,
    handleUpdateVoucher,
    handlegetVoucher,
} from './VoucherAdminMethod';
// import { handleAddVoucher, handleGetTypeVoucher } from './VoucherAdminMethod';
export interface StatusSelect {
    value: string;
    label: string;
}
export interface formAddVoucher {
    toDate: string;
    fromDate: string;
    typeVoucherId: number;
    amount: number;
    codeVoucher: string;
}
export interface formUpdateVoucher {
    statusId: string;
}
export default function VoucherAdmin() {
    const { dataUpdate }: any = GetContext();
    console.log(dataUpdate);
    // Form cua add Voucher
    const [formAdd] = useForm<formAddVoucher>();
    const [formUpdate] = useForm<formUpdateVoucher>();
    // Form cua Update Banner
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
    // Quản lý load lại data
    const [isLoadVoucher, setIsLoadVoucher] = useState<boolean>(false);
    const [dataTable, setDataTable] = useState<[]>([]);
    const [total, setTotal] = useState<number>();
    const [pageSize, setPageSize] = useState<any>(5);
    const [page, setPage] = useState<any>(1);
    // Select type Voucher
    const [typeVoucherSelect, setTypeVoucherSelect] = useState<StatusSelect[] | null>(null);
    console.log(typeVoucherSelect);
    // Quanr lý xóa  Banner
    const [isDelete, setIsDelete] = useState<boolean>(true);
    const [toDate, setToDate] = useState<string>('');
    const [fromDate, setFromDate] = useState<string>('');
    // Quản lý Status để update voucher
    const [statusVoucherSelect, setStatusVoucherSelect] = useState<StatusSelect[] | null>(null);
    console.log(dataUpdate);
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

                                handleAddVoucher(data, setIsModalAddOpen, formAdd, setIsLoadVoucher);
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
                                            option={typeVoucherSelect ? [...typeVoucherSelect] : []}
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
        handlegetVoucher(pageSize, page, setDataTable, setTotal);
    }, [isLoadVoucher, page, pageSize, isDelete]);
    useEffect(() => {
        handleGetTypeVoucherSelect(setTypeVoucherSelect);
    }, []);

    useEffect(() => {
        handleGetStatusUpdate(setStatusVoucherSelect);
    }, []);
    useEffect(() => {
        formUpdate.setFieldsValue({
            statusId: dataUpdate?.statusId,
        });
    }, [dataUpdate]);
    return (
        <Content title={'Danh sách Voucher'}>
            <div className="SupplierWrapper">
                <CustomTable
                    name="CollumsVoucher"
                    title={TitleTable}
                    dataSource={dataTable}
                    paginationConfig={paginationConfig}
                    showModalUpdate={() => {
                        setIsModalUpdateOpen(true);
                    }}
                    isDelete={isDelete}
                    setIsDelete={setIsDelete}
                />
            </div>
            <ModalCustomer
                isModalOpen={isModalUpdateOpen}
                handleOk={() => {}}
                handleCancel={() => {
                    setIsModalUpdateOpen(false);
                }}
                title={'Cập nhật voucher'}
                footer={true}
                showModal={() => {}}
            >
                <Form
                    form={formUpdate}
                    name="basic"
                    labelCol={{ span: 24 }}
                    onFinish={(value) => {
                        if (dataUpdate) {
                            handleUpdateVoucher(
                                Number(dataUpdate?.id),
                                {
                                    statusId: value?.statusId,
                                },
                                setIsLoadVoucher,
                                formUpdate,
                                setIsModalUpdateOpen,
                            );
                        }
                    }}
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
                                label="Trạng thái"
                                name="statusId"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <SelectCustomer
                                    mode=""
                                    option={statusVoucherSelect ? [...statusVoucherSelect] : []}
                                    onChange={(value: any) => {
                                        // onChangeProductSelect(value, setProductDetailApp);
                                    }}
                                    onSearch={(value: any) => {
                                        // onChangeProductSelect(value, setProductDetailApp);
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </ModalCustomer>
        </Content>
    );
}
