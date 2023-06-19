import React, { ReactNode } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType, TableProps, ColumnType } from 'antd/es/table';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { BsTrash } from 'react-icons/bs';
import { covertCreateAt } from '../../component/Page/Admin/common/method/method';
interface DataType {
    key: React.Key;
    name: string;
    chinese: number;
    math: number;
    english: number;
}
interface DataTypeBrand {
    // key: React.Key;
    value: string;
    createdAt: string;
}
interface PropsTable {
    name: string;
    title: () => ReactNode;
    dataSource: [];
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
        render: (text) => (
            <div>
                <Button icon={<BsTrash />} type="text"></Button>
                <Button icon={<HiOutlinePencilSquare />} type="text"></Button>
            </div>
        ),
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

const CustomTable = ({ name, title, dataSource }: PropsTable) => {
    console.log(dataSource);
    return (
        <React.Fragment>
            {name == 'Users' ? <Table columns={columns} dataSource={data} onChange={onChange} title={title} /> : ''}
            {name == 'Trademark' ? <Table columns={columnsBrand} dataSource={dataSource} title={title} /> : ''}
        </React.Fragment>
    );
};

export default CustomTable;
