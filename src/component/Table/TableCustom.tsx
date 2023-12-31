import React, { ReactNode } from 'react';
import { Button, Image, Popover, Table, message } from 'antd';
import type { ColumnsType, TableProps, ColumnType, TablePaginationConfig } from 'antd/es/table';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { BsTrash } from 'react-icons/bs';
import { GiClothes } from 'react-icons/gi';
import { CiImport } from 'react-icons/ci';
import { convertVND, covertCreateAt } from '../../component/Page/Admin/common/method/method';
import { GetContext } from '../Page/Admin/common/Context/Context';
import DeleteCustom from '../Page/Admin/common/Delete/DeleteCustom';
import {
    DeleteBanner,
    DeleteDetailReceipt,
    DeleteSupplier,
    deleteBrand,
    deleteCategory,
    deleteProdcut,
    deleteReceipt,
} from '../utils/Api/Api';
import { useNavigate } from 'react-router-dom';
import { FolderAddOutlined } from '@ant-design/icons';
import {
    DataTypeProductDetail,
    DataTypeSizeProductDetail,
    DatatypeBanner,
    DatatypeBlog,
    DatatypeDetailReceipt,
    DatatypeReceipt,
    DatatypeSupplier,
    orderAdminIF,
    typeVoucher,
    voucherIF,
} from './TableInterface';
import { handleDeleteDetailSize, handleDeleteProductDetail, handleGetSizeDp } from '../Page/Product/ProductMethod';
interface DataType {
    key: React.Key;
    name: string;
    chinese: number;
    math: number;
    english: number;
}
interface DataTypeBrand {
    key: React.Key;
    value: string;
    createdAt: string;
    code: any;
    id: any;
}
interface DataTypeProduct {
    key: React.Key;
    id: any;
    name: string;
    contentMarkdown: string;
    contentHtml: string;
    madeBy: string;
    material: string;
    brandId: string;
    sold: string;
    createdAt: string;
    status: {
        value: string;
        code: string;
    };
    category: {
        value: string;
        code: string;
    };
}

interface PropsTable {
    name: string;
    title?: () => ReactNode;
    dataSource: [];
    paginationConfig?: TablePaginationConfig;
    showModalUpdate: () => void;
    isDelete: boolean;
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
    setISViewDeTailDes?: React.Dispatch<React.SetStateAction<boolean>>;
    setViewDetailProduct?: React.Dispatch<React.SetStateAction<string>>;
    setdataUpdate?: React.Dispatch<React.SetStateAction<any>>;
    showDrawer?: () => void;
    collums?: any;
}
const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Chinese Score',
        dataIndex: 'chinese',
        sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
        },
    },
    {
        title: 'Math Score',
        dataIndex: 'math',
        sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
        },
    },
    {
        title: 'English Score',
        dataIndex: 'english',
        sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
        },
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        chinese: 98,
        math: 60,
        english: 70,
    },
    {
        key: '2',
        name: 'Jim Green',
        chinese: 98,
        math: 66,
        english: 89,
    },
    {
        key: '3',
        name: 'Joe Black',
        chinese: 98,
        math: 90,
        english: 70,
    },
    {
        key: '4',
        name: 'Jim Red',
        chinese: 88,
        math: 99,
        english: 89,
    },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const CustomTable = ({
    name,
    title,
    dataSource,
    paginationConfig,
    showModalUpdate,
    isDelete,
    setIsDelete,
    setISViewDeTailDes,
    setViewDetailProduct,
    setdataUpdate,
    showDrawer,
    collums,
}: PropsTable) => {
    const navigate = useNavigate();
    const {
        setModalViewDes,
        setDataUpdate,
        idDelete,
        setIdDelete,
        setIsSaveDesProduct,
        idDeleteProdcut,
        setIdDeleteProduct,
        setIsSaveDetailProduct,
        setIsSaveItmDp,
        setOpenFullDp,
        setSaveItemDp,
        setIsModalAddSize,
        setIsOpenDrawerSize,
        setSaveIdDp,
        saveIDp,
        setSaveSizeDp,
        setIsModalUpdateSize,
        setDetailSize,
        formUpdate,
        isFetchDp,
        setIsFetchDp,
        isFetchSizeDp,
        setIsFetchSizeDp,
        setIsModalUpdate,
        formUpdateSize,
        setImageDp,
        setSaveIdDetailProduct,
        setImagesUploadMultiple,
        setDataSupplierUpdate,
        setDataReceiptUpdate,
        setDataDetailReceipt,
        setDataBannerUpdate,
        setDataProductUpdate,
    }: any = GetContext();
    const cancelDeleteBrand = (e: any) => {
        console.log(e);
        message.error('Click on No');
    };
    // Xử lý delete
    const confirmDeleteBrand = async (e: any) => {
        const response = await deleteBrand(idDelete);
        if (response && response.status == 200) {
            message.success('Xóa thành công !');
            setIsDelete((prevIsDelete) => !prevIsDelete);
        }
    };
    const confirmDeleteProduct = async (e: any) => {
        const response = await deleteProdcut(idDeleteProdcut);
        if (response && response.status == 200) {
            console.log(response);
            message.success('Xóa thành công !');
            setIsDelete((prevIsDelete) => !prevIsDelete);
        }
    };
    const confirmDeleteCategory = async (e: any) => {
        const response = await deleteCategory(idDelete);
        console.log(response);
        if (response && response.status == 200) {
            message.success('Xóa thành công !');
            setIsDelete((prevIsDelete) => !prevIsDelete);
        }
    };
    const confirmDeleteSupplier = async (id: number): Promise<void> => {
        console.log('delete', id);
        const response = await DeleteSupplier(id);
        console.log(response);
        if (response && response.status == 200) {
            message.success('Xóa thành công !');
            setIsDelete((prevIsDelete) => !prevIsDelete);
        } else {
            message.error('Nhà cung cấp này đã được nhập hàng');
        }
    };
    const confirmDeleteReceipt = async (id: number): Promise<void> => {
        const response = await deleteReceipt(id);
        if (response && response.status == 200) {
            console.log(response);
            setIsDelete((prevIsDelete) => !prevIsDelete);
            message.success('Xóa thành công !');
        } else {
            message.error('Nhà cung cấp này đã nhập hàng');
        }
    };
    const confirmDeleteDetailReceipt = async (id: number): Promise<void> => {
        const response = await DeleteDetailReceipt(id);
        if (response && response.status == 200) {
            console.log(response);
            setIsDelete((prevIsDelete) => !prevIsDelete);
            message.success('Xóa thành công !');
        }
    };
    //
    const conFirmDeleteBanner = async (id: number): Promise<void> => {
        const response = await DeleteBanner(id);
        console.log(response);
        if (response && response.status == 200) {
            message.success('Xóa thành công !');
            setIsDelete((prevIsDelete) => !prevIsDelete);
            console.log(isDelete);
        }
    };

    //
    const cancelDeleteCategory = () => {};
    const columnsBrand: ColumnsType<DataTypeBrand> = [
        {
            title: 'Tên thương hiệu',
            dataIndex: 'value',
        },
        {
            title: 'Ngày thành lập',
            dataIndex: 'createAt',
            render: (value, record, index) => <span>{covertCreateAt(value)}</span>,
        },
        {
            title: 'Action',
            dataIndex: 'updatedAt',
            render: (text, record, index) => (
                <div>
                    <Button
                        icon={<HiOutlinePencilSquare />}
                        type="text"
                        onClick={() => {
                            showModalUpdate();
                            setDataUpdate(record);
                        }}
                    ></Button>
                    <DeleteCustom
                        title="Xóa thương hiệu"
                        description="Bạn chắc chắn muốn xóa?"
                        confirm={confirmDeleteBrand}
                        cancel={cancelDeleteBrand}
                        placement={'topRight'}
                    >
                        <Button
                            icon={<BsTrash />}
                            type="text"
                            onClick={() => {
                                setIdDelete(record?.id);
                            }}
                        ></Button>
                    </DeleteCustom>
                </div>
            ),
        },
    ];
    const confirmDeleteDetailSize = () => {};
    const cancelDeleteDetailSize = () => {};
    // Collums của Product
    const collumsProduct: ColumnType<DataTypeProduct>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            // width: '20%',
            width: '30%',
        },
        {
            title: 'Mô tả ',
            dataIndex: 'contentHtml',
            render: (value) => {
                return (
                    <Button
                        onClick={() => {
                            setModalViewDes(true);
                            setIsSaveDesProduct(value);
                            console.log(value);
                        }}
                        type="link"
                    >
                        Xem
                    </Button>
                );
            },
        },

        {
            title: 'TH',
            dataIndex: 'brandId',
        },
        {
            title: 'Đã bán',
            dataIndex: 'sold',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            render: (value) => {
                return <span>{covertCreateAt(value)}</span>;
            },
        },
        {
            title: 'Chi tiết',
            // dataIndex: 'contentHtml',
            render: (value) => {
                return (
                    <Button
                        onClick={() => {
                            setIsSaveDetailProduct(value);
                            navigate(`/Admin/Product/DetailProduct/${value.id}`);
                        }}
                        type="link"
                    >
                        Xem
                    </Button>
                );
            },
        },
        {
            title: 'Tình trạng',
            dataIndex: 'statusId',
        },
        {
            title: 'Action',
            dataIndex: 'updatedAt',
            render: (text, record, index) => (
                <div>
                    <Button
                        icon={<HiOutlinePencilSquare />}
                        type="text"
                        onClick={() => {
                            showModalUpdate();
                            // setDataUpdate(record);
                            setDataProductUpdate(record);
                        }}
                    ></Button>
                    <DeleteCustom
                        title="Xóa sản phẩm"
                        description="Bạn chắc chắn muốn xóa?"
                        confirm={confirmDeleteProduct}
                        cancel={cancelDeleteBrand}
                        placement={'topRight'}
                    >
                        <Button
                            icon={<BsTrash />}
                            type="text"
                            onClick={() => {
                                setIdDeleteProduct(record?.id);
                            }}
                        ></Button>
                    </DeleteCustom>
                </div>
            ),
        },
    ];
    // collums của CategoryProduct
    const columnsCategory: ColumnsType<DataTypeBrand> = [
        {
            title: 'Danh mục',
            dataIndex: 'value',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createAt',
            render: (value, record, index) => <span>{covertCreateAt(value)}</span>,
        },
        {
            title: 'Action',
            render: (text, record, index) => (
                <div>
                    <Button
                        icon={<HiOutlinePencilSquare />}
                        type="text"
                        onClick={() => {
                            showModalUpdate();
                            // setDataUpdate(record);
                            setdataUpdate?.(record);
                        }}
                    ></Button>
                    <DeleteCustom
                        title="Xóa thương hiệu"
                        description="Bạn chắc chắn muốn xóa?"
                        confirm={confirmDeleteCategory}
                        cancel={cancelDeleteCategory}
                        placement={'topRight'}
                    >
                        <Button
                            icon={<BsTrash />}
                            type="text"
                            onClick={() => {
                                setIdDelete(record?.id);
                            }}
                        ></Button>
                    </DeleteCustom>
                </div>
            ),
        },
    ];
    const collumsDetailProduct: ColumnType<DataTypeProductDetail>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Tên Sp',
            dataIndex: 'name',
            render: (value, record, index) => (
                <Popover content={<div>Xem chi tiết sản phẩm</div>} title="Chi tiết sản phẩm">
                    <Button
                        style={{
                            color: 'red',
                        }}
                        type="text"
                        onClick={() => {
                            setSaveItemDp(record);
                            setOpenFullDp(true);
                        }}
                    >
                        {value}
                    </Button>
                </Popover>
            ),
        },
        {
            title: 'Mô tả Sp',
            dataIndex: 'contentHtml',
            render: (value, record, index) => (
                <Button
                    type="link"
                    onClick={() => {
                        setISViewDeTailDes?.(true);
                        setViewDetailProduct?.(record.description);
                    }}
                >
                    Xem
                </Button>
            ),
        },
        {
            title: 'Màu sắc',
            dataIndex: 'colorId',
            render: (value, record, index) => <span>{value}</span>,
        },
        {
            title: 'Size',
            // dataIndex: 'material',
            render: (value, record) => (
                <Button
                    onClick={() => {
                        setIsOpenDrawerSize(true);
                        setSaveIdDp(record?.id);
                        handleGetSizeDp(saveIDp, setSaveSizeDp);
                    }}
                    type="link"
                >
                    Xem
                </Button>
            ),
        },

        {
            title: 'Action',
            // dataIndex: 'updatedAt',
            width: '150px',
            render: (value, record) => (
                <div>
                    <Popover content={<div>Thêm kích thước</div>} title="Chi tiết sản phẩm">
                        <Button
                            icon={
                                <GiClothes
                                    style={{
                                        fontSize: '16px',
                                    }}
                                />
                            }
                            type="text"
                            onClick={() => {
                                setIsSaveItmDp(record);
                                setIsModalAddSize(true);
                            }}
                        ></Button>
                    </Popover>
                    <Popover content={<div>Cập nhật chi tiết sản phẩm</div>} title="Chi tiết sản phẩm">
                        <Button
                            icon={<HiOutlinePencilSquare />}
                            type="text"
                            onClick={() => {
                                console.log(record);
                                formUpdate.setFieldsValue({
                                    name: record?.name,
                                    originalPrice: record?.originalPrice,
                                    discountPrice: record?.discountPrice,
                                    description: record?.description,
                                    colorId: record?.colorId,
                                    productId: record?.productId,
                                });
                                setIsModalUpdate(true);
                                setSaveIdDetailProduct(record?.id);
                                if (record.images) {
                                    const resultImages = record.images.map((item: string, index: any) => {
                                        return {
                                            id: index,
                                            name: item,
                                            status: 'done',
                                            url: `${process.env.REACT_APP_IMAGE_PRODUCT}${item}`,
                                            image: item,
                                        };
                                    });
                                    setImageDp(resultImages);
                                    setImagesUploadMultiple(resultImages);
                                }
                            }}
                        ></Button>
                    </Popover>
                    <DeleteCustom
                        title="Xóa chi tiết sản phẩm"
                        description="Bạn chắc chắn muốn xóa?"
                        confirm={() => {
                            handleDeleteProductDetail(record?.id, isFetchDp, setIsFetchDp);
                        }}
                        cancel={cancelDeleteCategory}
                        placement={'topRight'}
                    >
                        <Popover content={<div>Xóa chi tiết sản phẩm</div>} title="Chi tiết sản phẩm">
                            <Button
                                icon={<BsTrash />}
                                type="text"
                                onClick={() => {
                                    // setIdDelete(record?.id);
                                }}
                            ></Button>
                        </Popover>
                    </DeleteCustom>
                </div>
            ),
        },
    ];
    const collumsSizeDetailProduct: ColumnType<DataTypeSizeProductDetail>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Tên size',
            dataIndex: 'name',
        },
        {
            title: 'Chiều dài',
            dataIndex: 'height',
        },
        {
            title: 'Chiều rộng',
            dataIndex: 'width',
        },
        {
            title: 'cân nặng',
            dataIndex: 'weight',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Action',
            render: (text, record, index) => (
                <div>
                    <Button
                        icon={<HiOutlinePencilSquare />}
                        type="text"
                        onClick={async () => {
                            await formUpdate.resetFields();
                            setIsModalUpdateSize(true);
                            setDetailSize(record);
                            formUpdateSize.setFieldsValue({
                                name: record?.name,
                                width: record?.width,
                                height: record?.height,
                                weight: record?.weight,
                            });
                        }}
                    ></Button>
                    <DeleteCustom
                        title="Xóa size"
                        description="Bạn chắc chắn muốn xóa?"
                        confirm={() => {
                            handleDeleteDetailSize(record.id, isFetchSizeDp, setIsFetchSizeDp);
                        }}
                        cancel={cancelDeleteDetailSize}
                        placement={'topLeft'}
                    >
                        <Button
                            icon={<BsTrash />}
                            type="text"
                            onClick={() => {
                                // setIdDelete(record?.id);
                            }}
                        ></Button>
                    </DeleteCustom>
                </div>
            ),
        },
    ];
    // Collums Supplier
    const collumsSupplier: ColumnType<DatatypeSupplier>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Nhà cung cấp',
            dataIndex: 'name',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Ngày Nhập',
            dataIndex: 'createdAt',
            render: (value, record) => <span>{covertCreateAt(record.createdAt)}</span>,
        },
        {
            title: 'Actions',
            render: (value, record) => (
                <div>
                    <Button
                        icon={<HiOutlinePencilSquare />}
                        type="text"
                        onClick={() => {
                            showModalUpdate();
                            setDataSupplierUpdate({
                                name: record.name,
                                email: record.email,
                                address: record.address,
                                id: record.id,
                            });
                        }}
                    ></Button>
                    <DeleteCustom
                        title="Xóa size"
                        description="Bạn chắc chắn muốn xóa?"
                        confirm={() => {
                            confirmDeleteSupplier(record.id);
                        }}
                        cancel={() => {}}
                        placement={'topLeft'}
                    >
                        <Button
                            icon={<BsTrash />}
                            type="text"
                            onClick={() => {
                                // setIdDelete(record?.id);
                            }}
                        ></Button>
                    </DeleteCustom>
                </div>
            ),
        },
    ];
    // Collums Receipt
    const CollumsReceipt: ColumnType<DatatypeReceipt>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Nhân viên',
            render: (value, record) => <span>{`${record.user.lastName}${record.user.firstName}`}</span>,
        },
        {
            title: 'Nhà cung cấp',
            render: (value, record) => <span>{`${record.supplier.name}`}</span>,
        },
        {
            title: 'Chi tiết nhập hàng',
            // dataIndex: 'supplier',
            render: (value, record) => (
                <Button
                    type="link"
                    onClick={() => {
                        navigate(`/Admin/ImportFoods/${record.id}`);
                    }}
                >
                    Xem
                </Button>
            ),
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            render: (value) => <span>{covertCreateAt(value)}</span>,
        },
        {
            title: 'Actions',
            render: (value, record) => (
                <div>
                    <Button
                        icon={<HiOutlinePencilSquare />}
                        type="text"
                        onClick={() => {
                            showModalUpdate();
                            // setDataSupplierUpdate({
                            //     name: record.name,
                            //     email: record.email,
                            //     address: record.address,
                            //     id: record.id,
                            // });
                            setDataReceiptUpdate({
                                id: record.id,
                                supplierId: record.supplier,
                            });
                        }}
                    ></Button>
                    <DeleteCustom
                        title="Xóa size"
                        description="Bạn chắc chắn muốn xóa?"
                        confirm={() => {
                            // handleDeleteDetailSize(record.id, isFetchSizeDp, setIsFetchSizeDp);
                            confirmDeleteReceipt(record.id);
                        }}
                        cancel={() => {}}
                        placement={'topLeft'}
                    >
                        <Button
                            icon={<BsTrash />}
                            type="text"
                            onClick={() => {
                                // setIdDelete(record?.id);
                            }}
                        ></Button>
                    </DeleteCustom>
                </div>
            ),
        },
    ];
    // Collums  Detail Receipt
    const CollumsDetailReceipt: ColumnType<DatatypeDetailReceipt>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Tên hàng',
            render: (value, record) => <span>{record.productDetailSize.productDetail.name}</span>,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            render: (value, record) => (
                <span
                    style={{
                        color: 'red',
                    }}
                >
                    {convertVND(Number(record.price))}
                </span>
            ),
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
        },
        {
            title: 'Actions',
            render: (value, record) => (
                <div>
                    <Button
                        icon={<HiOutlinePencilSquare />}
                        type="text"
                        onClick={() => {
                            showModalUpdate();
                            setDataDetailReceipt(record);
                        }}
                    ></Button>
                    <DeleteCustom
                        title="Xóa size"
                        description="Bạn chắc chắn muốn xóa?"
                        confirm={() => {
                            confirmDeleteDetailReceipt(record.id);
                        }}
                        cancel={() => {}}
                        placement={'topLeft'}
                    >
                        <Button
                            icon={<BsTrash />}
                            type="text"
                            onClick={() => {
                                // setIdDelete(record?.id);
                            }}
                        ></Button>
                    </DeleteCustom>
                </div>
            ),
        },
    ];
    // Collums Blog
    const CollumsBlog: ColumnType<DatatypeBlog>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Tên bài đăng',
            dataIndex: 'title',
            render: (value, record) => (
                <Button
                    type="text"
                    onClick={() => {
                        showDrawer?.();
                        setdataUpdate?.(record);
                    }}
                >
                    <span
                        style={{
                            cursor: 'pointer',
                            color: 'red',
                        }}
                    >
                        {value}
                    </span>
                </Button>
            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'shortDescription',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'statusId',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            render: (value, record) => <span>{covertCreateAt(record?.createdAt)}</span>,
        },
        {
            title: 'Actions',
            render: (value, record) => (
                <div>
                    <Button
                        icon={<HiOutlinePencilSquare />}
                        type="text"
                        onClick={() => {
                            showModalUpdate();
                            console.log(record);
                            setdataUpdate?.(record);
                        }}
                    ></Button>
                    <DeleteCustom
                        title="Xóa size"
                        description="Bạn chắc chắn muốn xóa?"
                        confirm={() => {}}
                        cancel={() => {}}
                        placement={'topLeft'}
                    >
                        <Button icon={<BsTrash />} type="text"></Button>
                    </DeleteCustom>
                </div>
            ),
        },
    ];
    // Collums Banner
    const CollumsBanner: ColumnType<DatatypeBanner>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Tên ',
            dataIndex: 'name',
            render: (value) => <span>{value}</span>,
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            render: (value, record) => (
                <Image width={200} src={`${process.env.REACT_APP_IMAGE_BANNER_URL}${record.image}`} />
            ),
        },
        {
            title: 'Trạng thái',
            render: (value, record) => <span>{record.status.value}</span>,
        },
        {
            title: 'Ngày tạo',
            render: (value, record) => <span>{covertCreateAt(record.createdAt)}</span>,
        },
        {
            title: 'Actions',
            render: (value, record) => (
                <div>
                    <Button
                        icon={<HiOutlinePencilSquare />}
                        type="text"
                        onClick={() => {
                            showModalUpdate();
                            setDataBannerUpdate(record);
                        }}
                    ></Button>
                    <DeleteCustom
                        title="Xóa size"
                        description="Bạn chắc chắn muốn xóa?"
                        confirm={(e: any) => {
                            // setIsDelete(!isDelete);
                            console.log(e);
                            e.isDefaultPrevented();
                            // setIdDelete(!isDelete);
                            conFirmDeleteBanner(record.id);
                        }}
                        cancel={() => {}}
                        placement={'topLeft'}
                    >
                        <Button
                            icon={<BsTrash />}
                            type="text"
                            onClick={() => {
                                // setIsDelete(!isDelete);
                                // conFirmDeleteBanner(record.id);
                            }}
                        ></Button>
                    </DeleteCustom>
                </div>
            ),
        },
    ];
    // Collums typeVoucher
    const CollumsTypeVoucher: ColumnType<typeVoucher>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Tên ',
            // dataIndex: 'name',
            render: (value, record) => <span>{record.typeVoucher.value}</span>,
        },
        {
            title: 'Giá trị',
            // dataIndex: 'image',
            render: (value, record) => <span>{record.value}</span>,
        },
        {
            title: 'Tối thiểu',
            // dataIndex: 'image',
            render: (value, record) => <span>{convertVND(Number(record.minValue))}</span>,
        },
        {
            title: 'Tối đa',
            // dataIndex: 'image',
            render: (value, record) => <span>{convertVND(Number(record.maxValue))}</span>,
        },
        {
            title: 'Trạng thái',
            // dataIndex: 'image',
            render: (value, record) => <span>{record.statusId}</span>,
        },
        {
            title: 'Ngày tạo',
            render: (value, record) => <span>{covertCreateAt(record.createdAt)}</span>,
        },
        {
            title: 'Actions',
            render: (value, record) => (
                <div>
                    <Button
                        icon={<HiOutlinePencilSquare />}
                        type="text"
                        onClick={() => {
                            showModalUpdate();
                            // setDataBannerUpdate(record);
                            // setDataUpdate;
                        }}
                    ></Button>
                </div>
            ),
        },
    ];
    // Collums Voucher
    const CollumsVoucher: ColumnType<voucherIF>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Loại Voucher',
            // dataIndex: 'name',
            render: (value, record) => <span>{record.typeVoucher.typeVoucherCode}</span>,
        },
        {
            title: 'Bắt đầu',
            // dataIndex: 'image',
            render: (value, record) => <span>{record.fromDate}</span>,
        },
        {
            title: 'Kết thúc',
            // dataIndex: 'image',
            render: (value, record) => <span>{record.toDate}</span>,
        },
        {
            title: 'Số lượng',
            // dataIndex: 'image',
            render: (value, record) => <span>{record.amount}</span>,
        },
        {
            title: 'code',
            // dataIndex: 'image',
            render: (value, record) => <span>{record.codeVoucher}</span>,
        },
        {
            title: 'Trạng thái',
            // dataIndex: 'image',
            render: (value, record) => <span>{record.statusId}</span>,
        },
        {
            title: 'Ngày tạo',
            render: (value, record) => <span>{covertCreateAt(record.createdAt)}</span>,
        },
        {
            title: 'Actions',
            render: (value, record) => (
                <div>
                    <Button
                        icon={<HiOutlinePencilSquare />}
                        type="text"
                        onClick={() => {
                            showModalUpdate();
                            setDataUpdate(record);
                        }}
                    ></Button>
                </div>
            ),
        },
    ];
    // Collums Order
    const CollumsOrder: ColumnType<orderAdminIF>[] = [
        {
            title: 'Mã HD',
            dataIndex: 'id',
            render: (value) => (
                <Button
                    type="link"
                    onClick={() => {
                        navigate(`/Profile/detailOrder/${value}`);
                    }}
                >
                    #{value}
                </Button>
            ),
        },

        {
            title: 'Tổng tiền',
            render: (value, record) => <Button type="text">{convertVND(record?.totalPrice)}</Button>,
        },
        {
            title: 'PTTT',
            render: (value, record) => (
                <Button type="text">{record?.isPaymentOnline ? 'Online' : 'Thanh toán khi nhận hàng'}</Button>
            ),
        },
        {
            title: 'Trạng thái',
            render: (value, record) => <Button type="text">{record?.statusId}</Button>,
        },
        {
            title: 'Trạng thái thanh toán',
            render: (value, record) => (
                <Button type="text">{record?.isPaymentOnline ? 'Đã thanh toán' : 'Chưa thanh toán'}</Button>
            ),
        },
        {
            title: 'Thời gian',
            render: (value, record) => <Button type="text">{covertCreateAt(record?.createdAt)}</Button>,
        },
        {
            title: 'Actions',
            render: (value, record) => (
                <div>
                    <Button
                        icon={<HiOutlinePencilSquare />}
                        type="text"
                        onClick={() => {
                            showModalUpdate();
                            setDataUpdate(record);
                        }}
                    ></Button>
                </div>
            ),
        },
    ];
    return (
        <React.Fragment>
            {name == 'Users' ? <Table columns={columns} dataSource={data} onChange={onChange} title={title} /> : ''}
            {name == 'Trademark' ? (
                <Table columns={columnsBrand} dataSource={dataSource} title={title} pagination={paginationConfig} />
            ) : (
                ''
            )}
            {name == 'Category' ? (
                <Table columns={columnsCategory} dataSource={dataSource} title={title} pagination={paginationConfig} />
            ) : (
                ''
            )}
            {name == 'Product' ? (
                <Table columns={collumsProduct} dataSource={dataSource} title={title} pagination={paginationConfig} />
            ) : (
                ''
            )}
            {name == 'DetailProduct' ? (
                <Table
                    columns={collumsDetailProduct}
                    dataSource={dataSource}
                    title={title}
                    pagination={paginationConfig}
                />
            ) : (
                ''
            )}
            {name == 'SizeDetailProduct' ? (
                <Table
                    columns={collumsSizeDetailProduct}
                    dataSource={dataSource}
                    title={title}
                    // pagination={paginationConfig}
                />
            ) : (
                ''
            )}
            {name == 'Supplier' ? (
                <Table columns={collumsSupplier} dataSource={dataSource} title={title} pagination={paginationConfig} />
            ) : (
                ''
            )}
            {name == 'Receipt' ? (
                <Table columns={CollumsReceipt} dataSource={dataSource} title={title} pagination={paginationConfig} />
            ) : (
                ''
            )}
            {name == 'DetailReceipt' ? (
                <Table
                    columns={CollumsDetailReceipt}
                    dataSource={dataSource}
                    title={title}
                    pagination={paginationConfig}
                />
            ) : (
                ''
            )}
            {name == 'Blog' ? (
                <Table columns={CollumsBlog} dataSource={dataSource} title={title} pagination={paginationConfig} />
            ) : (
                ''
            )}
            {name == 'Banner' ? (
                <Table columns={CollumsBanner} dataSource={dataSource} title={title} pagination={paginationConfig} />
            ) : (
                ''
            )}
            {name == 'typeVoucher' ? (
                <Table
                    columns={CollumsTypeVoucher}
                    dataSource={dataSource}
                    title={title}
                    pagination={paginationConfig}
                />
            ) : (
                ''
            )}
            {name == 'CollumsVoucher' ? (
                <Table columns={CollumsVoucher} dataSource={dataSource} title={title} pagination={paginationConfig} />
            ) : (
                ''
            )}
            {name == 'CollumsOrder' ? (
                <Table columns={CollumsOrder} dataSource={dataSource} title={title} pagination={paginationConfig} />
            ) : (
                ''
            )}
        </React.Fragment>
    );
};

export default CustomTable;
