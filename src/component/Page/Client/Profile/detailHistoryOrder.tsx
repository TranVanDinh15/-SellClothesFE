import { Button, Image } from 'antd';
import Table, { ColumnType, TablePaginationConfig } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { convertVND, covertCreateAt } from '../../Admin/common/method/method';
import { useParams } from 'react-router-dom';
import { handleGetDetailOrderById } from './ProfileMethod';
export interface detailOrderbyId {
    id: number;
    addressUserId: number;
    statusId: string;
    typeShipId: number;
    voucherId: any;
    totalPrice: number;
    note: any;
    isPaymentOnline: false;
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
    orderDetails: orderDetails[];
}
interface orderDetails {
    id: number;
    orderId: number;
    productDetailSizeId: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    productDetailSize: {
        id: number;
        productDetailId: number;
        name: string;
        quantity: number;
        width: number;
        height: number;
        weight: number;
        createdAt: string;
        updatedAt: string;
        productDetail: {
            id: number;
            productId: number;
            name: string;
            originalPrice: number;
            discountPrice: number;
            description: string;
            images: string[];
            colorId: string;
            createdAt: string;
            updatedAt: string;
            product: {
                id: number;
                name: string;
                contentMarkdown: string;
                contentHtml: string;
                categoryId: string;
                statusId: string;
                view: number;
                madeBy: any;
                material: string;
                brandId: string;
                sold: number;
                rating: number;
                createdAt: string;
                updatedAt: string;
            };
        };
    };
}
export default function DetailHistoryOrder() {
    const params = useParams();
    console.log(params);
    const [detailOrder, setDetailOrder] = useState<detailOrderbyId | null>(null);
    const [productOrder, setProductOrder] = useState<orderDetails[] | null>(null);
    const [pageSize, setPageSize] = useState<any>(5);
    const [page, setPage] = useState<any>(1);
    const [total, setTotal] = useState<number>();
    console.log(detailOrder);
    const columns: ColumnType<orderDetails>[] = [
        {
            title: 'Sản phẩm',
            render: (value, record) => (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}
                >
                    <Image
                        preview={false}
                        width={50}
                        src={`${process.env.REACT_APP_IMAGE_PRODUCT}${record?.productDetailSize?.productDetail?.images[0]}`}
                    />
                    {record?.productDetailSize?.productDetail?.name}
                </div>
            ),
        },
        {
            title: 'Đơn giá',
            render: (value, record) => (
                <div className="dongia">
                    <div className="dongiadiscount">
                        <span>
                            {record?.productDetailSize?.productDetail?.discountPrice
                                ? convertVND(Number(record?.productDetailSize?.productDetail?.discountPrice))
                                : convertVND(Number(record?.productDetailSize?.productDetail?.originalPrice))}
                        </span>
                    </div>
                    {record?.productDetailSize?.productDetail?.discountPrice ? (
                        <div
                            className="dongiagoc"
                            // style={}
                        >
                            <span>{convertVND(Number(record?.productDetailSize?.productDetail?.originalPrice))}</span>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            ),
        },
        {
            title: 'Số lượng',
            render: (value, record) => <Button type="text">{record?.quantity}</Button>,
        },
        {
            title: 'Tổng',
            render: (value, record) => (
                <Button type="text">
                    {record?.productDetailSize?.productDetail?.discountPrice
                        ? convertVND(
                              Number(record?.productDetailSize?.productDetail?.discountPrice) *
                                  Number(record?.quantity),
                          )
                        : convertVND(
                              Number(record?.productDetailSize?.productDetail?.originalPrice) *
                                  Number(record?.quantity),
                          )}
                </Button>
            ),
        },
    ];
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
        params?.id && handleGetDetailOrderById(Number(params?.id), setDetailOrder);
    }, []);
    useEffect(() => {
        if (detailOrder) {
            setProductOrder(detailOrder?.orderDetails);
        }
    }, [detailOrder]);
    return (
        <div className="DetailHistoryOrderWrapper">
            <div className="statusPayTran">
                <div className="statusPayTran__Item">
                    <span>Trạng thái thanh toán: </span>
                    <span>{detailOrder?.statusId}</span>
                </div>
                <div className="statusPayTran__Item">
                    <span>Trạng thái vận chuyển: </span>
                    <span>Chưa chuyển</span>
                </div>
            </div>
            <div className="statusAddressPayload">
                <div className="statusAddressPayload__Item">
                    <div className="AddressPay__title">
                        <span>Địa chỉ giao hàng</span>
                    </div>
                    <div className="AddressPay__Infor">
                        <div className="AddressPay__Infor__name">
                            <span>{detailOrder?.addressUser?.shipName}</span>
                        </div>
                        <div className="AddressPay__Infor__Address">
                            <span>Địa chỉ: {detailOrder?.addressUser?.shipAddress}</span>
                        </div>
                        <div className="AddressPay__Infor__Address">
                            <span>Số điện thoại : {detailOrder?.addressUser?.shipPhoneNumber}</span>
                        </div>
                    </div>
                </div>
                <div className="statusAddressPayload__Item">
                    <div className="AddressPay__title">
                        <span>Thanh toán</span>
                    </div>
                    <div className="AddressPay__Infor">
                        <div className="AddressPay__Infor__Address">
                            <span>
                                {detailOrder?.isPaymentOnline
                                    ? 'Thanh toán online qua VNPAY'
                                    : 'Thanh toán khi nhận hàng'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Table dataSource={productOrder ? productOrder : []} columns={columns} pagination={false} />
            <div className="TotalPriceOrder">
                <div className="TotalPriceOrder__box">
                    <span>Tổng tiền: </span>
                    <span>{convertVND(Number(detailOrder?.totalPrice))}</span>
                </div>
            </div>
        </div>
    );
}
