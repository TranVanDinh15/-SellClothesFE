import React, { useEffect, useState } from 'react';
import Content from '../Admin/common/Content/Content';
import { getListProduct } from '../../utils/Api/Api';
import IsLoading from '../Admin/common/IsLoading/IsLoading';
import CustomTable from '../../Table/TableCustom';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, TablePaginationConfig } from 'antd';

export default function Product() {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [dataTable, setDataTable] = useState<[]>([]);
    const [total, setTotal] = useState<any>();

    const getListProductFun = async () => {
        const response = await getListProduct(page, pageSize);
        if (response && response.status == 200) {
            const dataTableMap = response.data.data.map((item: any, index: any) => {
                return {
                    key: index,
                    id: item?.id,
                    name: item?.name,
                    contentMarkdown: item?.contentMarkdown,
                    contentHtml: item?.contentHtml,
                    madeBy: item?.madeBy,
                    material: item?.material,
                    brandId: item?.brandId,
                    sold: item?.sold,
                    createdAt: item?.createdAt,
                };
            });
            setTotal(response.data.meta.totalItems);
            setDataTable(dataTableMap);
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
    const onFinishAdd = async (values: any) => {};
    //   Khi xảy ra lỗi trong form Tạo Product
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
                            name="basic"
                            labelCol={{ span: 24 }}
                            // style={{ minWidth: 700 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinishAdd}
                            onFinishFailed={onFinishFailedAdd}
                            autoComplete="off"
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Tên sản phẩm "
                                        name="name"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu!' }]}
                                    >
                                        <Input placeholder="VD: Yody...." width={'100%'} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Tên sản phẩm "
                                        name="name"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu!' }]}
                                    >
                                        <Input placeholder="VD: Yody...." />
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
    const showModalUpdate = () => {
        setIsModalUpdate(true);
    };
    useEffect(() => {
        getListProductFun();
    }, [page, pageSize]);
    return (
        <Content title={'Quản lý sản phẩm'}>
            <div className="productWrapper">
                {isLoading ? (
                    <IsLoading />
                ) : (
                    <CustomTable
                        name="Product"
                        title={TitleTable}
                        dataSource={dataTable}
                        paginationConfig={paginationConfig}
                        showModalUpdate={showModalUpdate}
                    />
                )}
            </div>
        </Content>
    );
}
