import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { handleHistoryOrder } from './ProfileMethod';
import { useRedux } from '../Cart/Cart';
import { useSelector } from 'react-redux';
import { ColumnType, TablePaginationConfig } from 'antd/es/table';
import { convertVND, covertCreateAt } from '../../Admin/common/method/method';
import { useNavigate } from 'react-router-dom';
export interface orderInterface {
    id: number;
    addressUserId: number;
    statusId: string;
    typeShipId: number;
    voucherId: any;
    totalPrice: number;
    note: any;
    isPaymentOnline: boolean;
    createdAt: string;
    updatedAt: string;
    addressUser: {
        id: number;
        userId: number;
        shipName: string;
        statusId: string;
        shipAddress: string;
        shipPhoneNumber: number;
        shipEmail: string;
        createdAt: string;
        updatedAt: string;
    };
}

export default function HistoryOrder() {
    const navigate = useNavigate();
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns: ColumnType<orderInterface>[] = [
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
            title: 'Thời gian',
            render: (value, record) => <Button type="text">{covertCreateAt(record?.createdAt)}</Button>,
        },
    ];
    // Get User Hiện tại
    const curentUser = useSelector((state: useRedux) => state.reduxAuth.user);
    const [listHistoryOrder, setListHistoryOrder] = useState<orderInterface[] | null>(null);
    const [pageSize, setPageSize] = useState<any>(5);
    const [page, setPage] = useState<any>(1);
    const [total, setTotal] = useState<number>();
    console.log(listHistoryOrder);
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
        curentUser && handleHistoryOrder(Number(curentUser?.id), page, pageSize, setListHistoryOrder, setTotal);
    }, [curentUser, page, pageSize]);
    return (
        <div>
            <Table
                title={() => <span className="titleTableHOrder">Đơn hàng của bạn</span>}
                dataSource={listHistoryOrder ? listHistoryOrder : []}
                columns={columns}
                pagination={paginationConfig}
            />
            ;
        </div>
    );
}
