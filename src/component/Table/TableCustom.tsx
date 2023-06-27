import React, { ReactNode } from 'react';
import { Button, Table, message } from 'antd';
import type { ColumnsType, TableProps, ColumnType, TablePaginationConfig } from 'antd/es/table';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { BsTrash } from 'react-icons/bs';
import { covertCreateAt } from '../../component/Page/Admin/common/method/method';
import { GetContext } from '../Page/Admin/common/Context/Context';
import DeleteCustom from '../Page/Admin/common/Delete/DeleteCustom';
import { deleteBrand, deleteCategory, deleteProdcut } from '../utils/Api/Api';
import { useNavigate } from 'react-router-dom';
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
}
interface DataTypeProductDetail {
    key: React.Key;
    id: number;
    name: string;
    originalPrice: number;
    discountPrice: number;
    description: string;
    colorId: any;
}
interface PropsTable {
    name: string;
    title: () => ReactNode;
    dataSource: [];
    paginationConfig: TablePaginationConfig;
    showModalUpdate: () => void;
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

const CustomTable = ({ name, title, dataSource, paginationConfig, showModalUpdate }: PropsTable) => {
    const navigate = useNavigate();
    const {
        isModalViewDes,
        setModalViewDes,
        dataUpdate,
        setDataUpdate,
        isDelete,
        setIsDelete,
        idDelete,
        setIdDelete,
        isSaveDesProduct,
        setIsSaveDesProduct,
        idDeleteProdcut,
        setIdDeleteProduct,
        setIsSaveDetailProduct,
        setIsOpenDetailP,
    }: any = GetContext();
    console.log(idDelete);
    const confirmDeleteBrand = async (e: any) => {
        const response = await deleteBrand(idDelete);
        if (response && response.status == 200) {
            console.log(response);
            message.success('Xóa thành công !');
            if (isDelete) {
                setIsDelete(false);
            } else {
                setIsDelete(true);
            }
        }
    };
    const confirmDeleteProduct = async (e: any) => {
        const response = await deleteProdcut(idDeleteProdcut);
        if (response && response.status == 200) {
            console.log(response);
            message.success('Xóa thành công !');
            if (isDelete) {
                setIsDelete(false);
            } else {
                setIsDelete(true);
            }
        }
    };
    const cancelDeleteBrand = (e: any) => {
        console.log(e);
        message.error('Click on No');
    };
    const confirmDeleteCategory = async (e: any) => {
        const response = await deleteCategory(idDelete);
        if (response && response.status == 200) {
            console.log(response);
            message.success('Xóa thành công !');
            if (isDelete) {
                setIsDelete(false);
            } else {
                setIsDelete(true);
            }
        }
    };
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
                    >
                        Xem
                    </Button>
                );
            },
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
                            // showModalUpdate();
                            // setDataUpdate(record);
                        }}
                    ></Button>
                    <DeleteCustom
                        title="Xóa sản phẩm"
                        description="Bạn chắc chắn muốn xóa?"
                        confirm={confirmDeleteProduct}
                        cancel={cancelDeleteBrand}
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
            title: 'Loại quần áo',
            dataIndex: 'value',
        },
        {
            title: 'Ngày tạo',
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
                            // showModalUpdate();
                            // setDataUpdate(record);
                        }}
                    ></Button>
                    <DeleteCustom
                        title="Xóa thương hiệu"
                        description="Bạn chắc chắn muốn xóa?"
                        confirm={confirmDeleteCategory}
                        cancel={cancelDeleteCategory}
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
    // key: React.Key;
    // id: number;
    // name: string;
    // contentMarkdown: string;
    // contentHtml: string;
    // categoryId: string;
    // statusId: string;
    // brandId: string;
    // color: string;
    // material: string;
    //    collums của detail Product
    const collumsDetailProduct: ColumnType<DataTypeProductDetail>[] = [
        {
            title: 'tên Sp',
            dataIndex: 'name',
        },
        {
            title: 'Mô tả Sp',
            dataIndex: 'contentHtml',
            // render: (value, record, index) => <span>{covertCreateAt(value)}</span>,
        },
        {
            title: 'Danh mục Sp',
            dataIndex: 'categoryId',
        },
        {
            title: 'Thương hiệu',
            dataIndex: 'brandId',
        },
        {
            title: 'Màu sắc',
            dataIndex: 'color',
        },
        {
            title: 'Chất liệu',
            dataIndex: 'material',
        },
        {
            title: 'Tình trạng',
            dataIndex: 'statusId',
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
        </React.Fragment>
    );
};

export default CustomTable;
