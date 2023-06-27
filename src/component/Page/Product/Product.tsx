import React, { useEffect, useState } from 'react';
import Content from '../Admin/common/Content/Content';
import {
    createNewProduct,
    getAllCategory,
    getBrandSelect,
    getCategory,
    getColorSelect,
    getListProduct,
    getStatus,
} from '../../utils/Api/Api';
import IsLoading from '../Admin/common/IsLoading/IsLoading';
import CustomTable from '../../Table/TableCustom';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, TablePaginationConfig, message } from 'antd';
import SelectCustomer from '../Admin/common/Select/Select';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import ModalCustomer from '../Admin/common/Modal/ModalCustomer';
import { GetContext } from '../Admin/common/Context/Context';
import DetailProductCreate from './DetailProductCreate';
var MarkdownIt = require('markdown-it');
const mdParser = new MarkdownIt(/* Markdown-it options */);
interface markdownProps {
    html: any;
    text: any;
}
export default function Product() {
    const { isModalViewDes, setModalViewDes, isSaveDesProduct, isDelete, isOpenDetailP, setIsOpenDetailP }: any =
        GetContext();
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [dataTable, setDataTable] = useState<[]>([]);
    const [total, setTotal] = useState<any>();
    const [listCategory, setListCategory] = useState<any>([]);
    const [statusProduct, setStatusProduct] = useState<any>([]);
    const [brandProduct, setBrandProdcut] = useState<any>([]);
    const [brandSave, setBrandSave] = useState<any>();
    const [categorySave, setCategorySave] = useState<any>();
    const [statusSave, setStatusSave] = useState<any>();
    const [saveColorSelect, setSaveColorSelect] = useState([]);
    // const [isModalViewDes, setModalViewDes] = useState(false);
    // Quản lý giá trị của Markdown editor
    const [value, setValue] = useState<any>('**Hello world!!!**');
    const [text, setText] = useState<any>('**Hello world!!!**');
    const getListProductFun = async () => {
        setIsLoading(true);
        const response = await getListProduct(page, pageSize);
        console.log(response);
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
                    detail: item?.detail,
                    createdAt: item?.createdAt,
                };
            });
            setTotal(response.data.meta.totalItems);
            setDataTable(dataTableMap);
            setIsLoading(false);
        }
    };
    // lấy loại sản phẩm
    const getCategoryProduct = async () => {
        const response = await getCategory();
        if (response && response.status == 200) {
            const optionCategory = response.data.data.map((item: any) => {
                return {
                    value: item.code,
                    label: item.value,
                };
            });
            setListCategory(optionCategory);
        }
    };
    // Lấy trạng thái sản phẩm
    const getStatusproduct = async () => {
        const response = await getStatus();
        if (response && response.status == 200) {
            console.log(response);
            const status = response.data.data.map((item: any) => {
                return {
                    value: item.code,
                    label: item.value,
                };
            });
            setStatusProduct(status);
        }
    };
    // get Brand
    const getBrandProduct = async () => {
        const response = await getBrandSelect();
        if (response && response.status == 200) {
            const brand = response.data.data.map((item: any) => {
                return {
                    value: item.code,
                    label: item.value,
                };
            });
            setBrandProdcut(brand);
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
    // onChangeSelect Brand
    const onChangeBrandSelect = (value: string) => {
        setBrandSave(value);
    };

    const onSearchBrandSelect = (value: string) => {
        console.log('search:', value);
    };
    // onchangeSelect category
    const onChangeCategorySelect = (value: string) => {
        setCategorySave(value);
    };

    const onSearchCategorySelect = (value: string) => {
        console.log('search:', value);
    };
    // onchangeSelect status
    const onChangeStatusSelect = (value: string) => {
        setStatusSave(value);
    };

    const onSearchStatusSelect = (value: string) => {
        console.log('search:', value);
    };

    const onFinishAdd = async (values: any) => {
        const dataSubmit = {
            name: values.name,
            contentMarkdown: text,
            contentHtml: value,
            categoryId: values.categoryId,
            statusId: values.statusId,
            brandId: values.brandId,
            colorCodes: values.color,
            material: values.material,
        };
        // console.log(dataSubmit);
        // console.log(values);
        setIsLoading(true);
        const response = await createNewProduct(dataSubmit);
        if (response && response.status == 201) {
            console.log(response);
            message.success('Tạo thành công !!');
            getListProductFun();
            setIsLoading(false);
            handleCancelAdd();
        }
    };
    //   Khi xảy ra lỗi trong form Tạo Product
    const onFinishFailedAdd = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
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
                setSaveColorSelect(result);
            }
        }
    };
    const onChangeColorSelect = (value: string) => {
        console.log(value);
    };
    const onSearchColorSelect = (value: string) => {};
    // dùng để hiển thị title của table
    const TitleTable = () => {
        return (
            <div className="titleTable">
                <div className="titleTable__Heading">
                    <span>Danh sách sản phẩm</span>
                </div>
                <div className="titleTable__btn">
                    <Button type="primary" icon={<PlusOutlined />} className="btnButton" onClick={showModalAdd}>
                        Thêm sản phẩm
                    </Button>

                    <Modal
                        title="Thêm sản phẩm"
                        open={isModalOpenAdd}
                        onOk={handleOkAdd}
                        onCancel={handleCancelAdd}
                        footer
                        width={'80%'}
                    >
                        <Form
                            name="basic"
                            labelCol={{ span: 24 }}
                            // style={{ width: 700 }}
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
                                        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                                    >
                                        <Input placeholder="VD: Áo thun ...." width={'100%'} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Thương hiệu"
                                        name="brandId"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu!' }]}
                                    >
                                        <SelectCustomer
                                            mode=""
                                            option={[...brandProduct]}
                                            onChange={onChangeColorSelect}
                                            onSearch={onSearchColorSelect}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Chất liệu"
                                        name="material"
                                        rules={[{ required: true, message: 'Vui lòng nhập chất liệu sản phẩm!' }]}
                                    >
                                        <Input placeholder="VD: cotton, thun, ... " width={'100%'} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Danh mục sản phẩm"
                                        name="categoryId"
                                        rules={[{ required: true, message: 'Vui lòng chọn danh mục sản phẩm !!' }]}
                                    >
                                        <SelectCustomer
                                            mode=""
                                            option={[...listCategory]}
                                            onChange={onChangeCategorySelect}
                                            onSearch={onSearchCategorySelect}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{}}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Trạng thái"
                                        name="statusId"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu!' }]}
                                    >
                                        <SelectCustomer
                                            mode=""
                                            option={[...statusProduct]}
                                            onChange={onChangeStatusSelect}
                                            onSearch={onSearchStatusSelect}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        // wrapperCol={{ span: 24 }}
                                        label="Màu sắc"
                                        name="color"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu!' }]}
                                    >
                                        <SelectCustomer
                                            mode="multiple"
                                            option={[...saveColorSelect]}
                                            onChange={onChangeColorSelect}
                                            onSearch={onSearchColorSelect}
                                        />
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
                                <MdEditor
                                    style={{ height: '500px' }}
                                    renderHTML={(text) => mdParser.render(text)}
                                    onChange={handleEditorChange}
                                />
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
                </div>
            </div>
        );
    };
    // <CustomTable
    //     name="Product"
    //     title={TitleTable}
    //     dataSource={dataTable}
    //     paginationConfig={paginationConfig}
    //     showModalUpdate={showModalUpdate}
    // />
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
    // Finish!
    function handleEditorChange({ html, text }: markdownProps) {
        setText(text);
        setValue(html);
    }
    // handle Modal View Description
    const showModalViewDes = () => {
        setModalViewDes(true);
    };
    const handleOkViewDes = () => {};
    const handleCancelViewDes = () => {
        setModalViewDes(false);
    };
    useEffect(() => {
        getListProductFun();
    }, [page, pageSize, isDelete]);
    useEffect(() => {
        getCategoryProduct();
    }, []);
    useEffect(() => {
        getStatusproduct();
        getBrandProduct();
        setIsOpenDetailP(false);
        hanleGetSelectColor();
    }, []);
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
            {/* Modal xem description của sản phẩm  */}
            <div className="modalDescription">
                <ModalCustomer
                    isModalOpen={isModalViewDes}
                    showModal={showModalViewDes}
                    handleOk={handleOkViewDes}
                    handleCancel={handleCancelViewDes}
                    title={'Mô tả sản phẩm'}
                >
                    <div
                        contentEditable="true"
                        dangerouslySetInnerHTML={{
                            __html: `${isSaveDesProduct ? isSaveDesProduct : ''}`,
                        }}
                    ></div>
                </ModalCustomer>
            </div>
        </Content>
    );
}
