import { Button, Table, Tabs, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { handleHistoryOrder } from './ProfileMethod';
import { useRedux } from '../Cart/Cart';
import { useSelector } from 'react-redux';
import { ColumnType, TablePaginationConfig } from 'antd/es/table';
import { convertVND, covertCreateAt } from '../../Admin/common/method/method';
import { useNavigate } from 'react-router-dom';
import DeleteCustom from '../../Admin/common/Delete/DeleteCustom';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { BsTrash } from 'react-icons/bs';
import { listValuesOrder } from '../../Admin/OrderAdmin/OrderAdmin';
import { CancelOrder, getStatusOrder } from '../../../utils/Api/Api';
import TabPane from 'antd/es/tabs/TabPane';
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
            title: 'Action',
            dataIndex: 'updatedAt',
            render: (text, record, index) => (
                <div>
                    {record?.statusId == 'WAIT_FOR_COMFIRMATION' ? (
                        <DeleteCustom
                            title="Hủy đơn hàng"
                            description="Bạn chắc chắn muốn hủy?"
                            confirm={async () => {
                                const response = await CancelOrder(record?.id);
                                console.log(response);
                                if (response && response.status == 200) {
                                    message.info('Đã hủy đơn hàng');
                                    setReLoadData((reLoadData) => !reLoadData);
                                } else {
                                    message.info('Đã có lỗi xảy ra');
                                }
                            }}
                            cancel={() => {}}
                            placement={'topRight'}
                        >
                            <Button
                                icon={<BsTrash />}
                                type="text"
                                onClick={() => {
                                    // setIdDeleteProduct(record?.id);
                                }}
                            ></Button>
                        </DeleteCustom>
                    ) : (
                        ''
                    )}
                </div>
            ),
        },
    ];
    // Get User Hiện tại
    const curentUser = useSelector((state: useRedux) => state.reduxAuth.user);
    const [listHistoryOrder, setListHistoryOrder] = useState<orderInterface[] | null>(null);
    const [pageSize, setPageSize] = useState<any>(5);
    const [page, setPage] = useState<any>(1);
    const [total, setTotal] = useState<number>();
    const [listSelectOrder, setListSelectOrder] = useState<listValuesOrder[] | null>(null);
    const [codeOrder, setCodeOrder] = useState<string>(process.env.REACT_APP__CODE__ORDER as string);
    const [reLoadData, setReLoadData] = useState<boolean>(false);
    console.log(listSelectOrder);
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
    const handleGetOrderStatus = async (): Promise<void> => {
        const response = await getStatusOrder();
        if (response && response.status == 200) {
            console.log(response);
            if (response.data?.data && response.data?.data.length > 0) {
                const mapData = response.data?.data.map((item: any) => {
                    return {
                        value: item?.code,
                        label: item?.value,
                    };
                });
                if (mapData) {
                    setListSelectOrder(mapData);
                }
            }
        }
    };
    const onChange = (key: string) => {
        setCodeOrder(key);
    };
    useEffect(() => {
        curentUser &&
            handleHistoryOrder(Number(curentUser?.id), page, pageSize, setListHistoryOrder, setTotal, codeOrder);
    }, [curentUser, page, pageSize, codeOrder, reLoadData]);
    useEffect(() => {
        handleGetOrderStatus();
    }, []);
    return (
        <div>
            <Tabs
                defaultActiveKey="1"
                onChange={(key) => {
                    onChange(key);
                    console.log(key);
                }}
            >
                {listSelectOrder
                    ? listSelectOrder.map((item, index) => {
                          return (
                              <TabPane tab={item?.label} key={item?.value}>
                                  <Table
                                      title={() => <span className="titleTableHOrder">Đơn hàng của bạn</span>}
                                      dataSource={listHistoryOrder ? listHistoryOrder : []}
                                      columns={columns}
                                      pagination={paginationConfig}
                                  />
                              </TabPane>
                          );
                      })
                    : ''}
            </Tabs>
        </div>
    );
}
