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
    updateProduct,
} from '../../utils/Api/Api';
import IsLoading from '../Admin/common/IsLoading/IsLoading';
import CustomTable from '../../Table/TableCustom';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, TablePaginationConfig, message } from 'antd';
import SelectCustomer from '../Admin/common/Select/Select';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import ModalCustomer from '../Admin/common/Modal/ModalCustomer';
import { GetContext } from '../Admin/common/Context/Context';
import DetailProductCreate from './DetailProductCreate';
import { materialProduct } from './interfaceProduct/interfaceProduct';
import { handleGetMaterialProduct } from './ProductMethod';
import { useForm } from 'antd/es/form/Form';
var MarkdownIt = require('markdown-it');
const mdParser = new MarkdownIt(/* Markdown-it options */);
interface markdownProps {
    html: any;
    text: any;
}
interface formUpdate {
    name: string;
    brandId: string;
    material: string;
    categoryId: string;
    statusId: string;
    color: string[];
}
export default function Product() {
    const {
        dataProductUpdate,
        isModalViewDes,
        setModalViewDes,
        isSaveDesProduct,
        isOpenDetailP,
        setIsOpenDetailP,
    }: any = GetContext();
    const [formUpdate] = useForm<formUpdate>();
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
    const [isDelete, setIsDelete] = useState<boolean>(false);
    // Quản lý Material
    const [materialProduct, setMaterialProduct] = useState<materialProduct[] | null>(null);
    // Quản lý MarkDown cập nhật sản phẩm
    const [contentMarkDown, setContentMarkDown] = useState<string>('');
    const [contentMarkDownHtml, setContentMarkDownHtml] = useState<string>('');
    // Đặt cờ get Lại product
    const [isLoadProduct, setIsLoadProduct] = useState<boolean>(false);
    // const [isModalViewDes, setModalViewDes] = useState(false);
    // Quản lý giá trị của Markdown editor
    const [value, setValue] = useState<any>('**Hello world!!!**');
    const [text, setText] = useState<any>('**Hello world!!!**');
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
                    detail: item?.detail,
                    statusId: item?.statusId,
                    createdAt: item?.createdAt,
                    categoryId: item?.categoryId,
                };
            });
            setTotal(response.data.meta.totalItems);
            setDataTable(dataTableMap);
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
    // onchangeSelect category
    const onChangeCategorySelect = (value: string) => {
        setCategorySave(value);
    };

    const onSearchCategorySelect = (value: string) => {};
    // onchangeSelect status
    const onChangeStatusSelect = (value: string) => {
        setStatusSave(value);
    };

    const onSearchStatusSelect = (value: string) => {};

    const onFinishAdd = async (values: any) => {
        const dataSubmit = {
            contentMarkdown: text,
            contentHtml: value,
            name: values.name,
            categoryId: values.categoryId,
            statusId: values.statusId,
            brandId: values.brandId,
            colorCodes: values.color,
            material: values.material,
        };

        const response = await createNewProduct(dataSubmit);
        if (response && response.status == 201) {
            message.success('Tạo thành công !!');
            getListProductFun();
            handleCancelAdd();
        }
    };
    //   Khi xảy ra lỗi trong form Tạo Product
    const onFinishFailedAdd = (errorInfo: any) => {};
    // Lấy màu sắc
    const hanleGetSelectColor = async () => {
        const response = await getColorSelect();
        if (response && response.status == 200) {
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
    // Xử lý update Product
    const HandleUpdateProduct = async (
        values: {
            name: string;
            categoryId: string;
            statusId: string;
            brandId: string;
            color: string[];
            material: string;
        },
        contentMarkDown: string,
        contentMarkDownHtml: string,
    ): Promise<void> => {
        const data = {
            name: values.name,
            categoryId: values.categoryId,
            statusId: values.statusId,
            brandId: values.brandId,
            colorCodes: values.color,
            material: values.material,
            contentMarkdown: contentMarkDown,
            contentHtml: contentMarkDownHtml,
        };
        const response = await updateProduct(dataProductUpdate?.id, data);
        if (response && response.status == 200) {
            message.success('Cập nhật thành công');
            setIsLoadProduct((prevIsLoadProduct) => !prevIsLoadProduct);
            setIsModalUpdate(false);
            formUpdate.setFieldsValue({
                name: '',
                brandId: '',
                categoryId: '',
                color: [],
                material: '',
                statusId: '',
            });
            setContentMarkDown('');
            setContentMarkDownHtml('');
        }
    };
    const onChangeColorSelect = (value: string) => {};
    const onSearchColorSelect = (value: string) => {};
    // dùng để hiển thị title của table
    const TitleTable = () => {
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
                            showModalAdd();
                            handleGetMaterialProduct(setMaterialProduct);
                        }}
                    >
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
                                        <SelectCustomer
                                            mode=""
                                            option={materialProduct ? [...materialProduct] : []}
                                            onChange={() => {}}
                                            onSearch={() => {}}
                                        />
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

    const paginationConfig: TablePaginationConfig = {
        total: total, // Tổng số mục dữ liệu
        pageSize: pageSize, // Số mục dữ liệu trên mỗi trang
        current: page, // Trang hiện tại
        defaultCurrent: 1,
        onChange: (page, pageSize) => {
            // Xử lý sự kiện thay đổi trangf
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
    // Handle Editor Update
    const handleEditorUpdate = ({ html, text }: markdownProps) => {
        setContentMarkDown(text);
        setContentMarkDownHtml(html);
    };
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
    }, [page, pageSize, isDelete, isLoadProduct]);
    useEffect(() => {
        getCategoryProduct();
    }, []);
    useEffect(() => {
        getStatusproduct();
        getBrandProduct();
        setIsOpenDetailP(false);
        hanleGetSelectColor();
    }, []);
    useEffect(() => {
        if (dataProductUpdate) {
            formUpdate.setFieldsValue({
                name: dataProductUpdate?.name,
                brandId: dataProductUpdate?.brandId,
                categoryId: dataProductUpdate?.categoryId,
                color: dataProductUpdate?.detail.map((item: any) => {
                    return item?.color?.code;
                }),
                material: dataProductUpdate?.material,
                statusId: dataProductUpdate?.statusId,
            });
            setContentMarkDown(dataProductUpdate?.contentMarkdown);
            setContentMarkDownHtml(dataProductUpdate?.contentHtml);
        }
    }, [dataProductUpdate]);
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
                        isDelete={isDelete}
                        setIsDelete={setIsDelete}
                    />
                )}
            </div>
            {/* Modal Update Product */}
            <Modal
                title="Cập nhật sản phẩm"
                open={isModalUpdate}
                onOk={() => {}}
                onCancel={() => {
                    setIsModalUpdate(false);
                    formUpdate.setFieldsValue({
                        name: '',
                        brandId: '',
                        categoryId: '',
                        color: [],
                        material: '',
                        statusId: '',
                    });
                    setContentMarkDown('');
                    setContentMarkDownHtml('');
                }}
                footer
                width={'80%'}
            >
                <Form
                    form={formUpdate}
                    name="basic"
                    labelCol={{ span: 24 }}
                    // style={{ width: 700 }}
                    initialValues={{ remember: true }}
                    onFinish={(value) => {
                        HandleUpdateProduct(value, contentMarkDown, contentMarkDownHtml);
                    }}
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
                                    value={dataProductUpdate?.brandId}
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
                                    value={dataProductUpdate?.categoryId}
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
                                    value={dataProductUpdate?.statusId}
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
                                    value={dataProductUpdate?.detail.map((item: any) => {
                                        return item?.color?.code;
                                    })}
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
                            onChange={handleEditorUpdate}
                            value={contentMarkDown}
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
            {/* Modal xem description của sản phẩm  */}
            <div className="modalDescription">
                <ModalCustomer
                    footer={true}
                    isModalOpen={isModalViewDes}
                    showModal={showModalViewDes}
                    handleOk={handleOkViewDes}
                    handleCancel={handleCancelViewDes}
                    title={'Mô tả sản phẩm'}
                >
                    <div
                        contentEditable="false"
                        dangerouslySetInnerHTML={{
                            __html: `${isSaveDesProduct ? isSaveDesProduct : ''}`,
                        }}
                    ></div>
                </ModalCustomer>
            </div>
        </Content>
    );
}
