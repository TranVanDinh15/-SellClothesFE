import React, { useEffect } from 'react';
import './CheckOut.scss';
import { Button, Image, Table, Descriptions } from 'antd';
import { CiLocationOn } from 'react-icons/ci';
import { BsTicketPerforated } from 'react-icons/bs';
import { Tag } from '@chakra-ui/react';
import { ColumnsType } from 'antd/es/table';
import { convertVND } from '../../../Admin/common/method/method';
import { useSelector } from 'react-redux';
export interface useRedux {
    reduxAuth: {
        isAuthenticate: boolean;
        user: any;
        isLoading: boolean;
        isfail: boolean;
    };
}
export default function CheckOut() {
    // Get User Hiện tại
    const curentUser = useSelector((state: useRedux) => state.reduxAuth.user);
    console.log(curentUser);
    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
                <div className="ProductName__CheckOut">
                    <div className="ProductName__CheckOut__box">
                        <Image
                            src="https://down-vn.img.susercontent.com/file/d59ac710d62165260f59e06e77bed552_tn"
                            width={50}
                        />
                        <span>Loa Kéo JBL Bass 40 Vỏ Gỗ , 2 Micro Hút Âm cao cấp giá rẻ</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'age',
            key: 'age',
            render: (text) => <span>1</span>,
        },
        {
            title: 'Đơn giá',
            dataIndex: 'address',
            render: (text) => <span>{convertVND(25000000)}</span>,
        },
        {
            title: 'Thành tiền',
            dataIndex: 'address',
            key: 'address',
            render: (text) => <span>{convertVND(25000000)}</span>,
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            {curentUser ? (
                <div className="checkOutWrapper">
                    <div className="checkOutAddress">
                        <div className="vtrWey"></div>
                        <div className="checkOutAddress__Title">
                            <Button type="text" icon={<CiLocationOn />}>
                                Địa chỉ nhận hàng
                            </Button>
                        </div>
                        <div className="checkOutAddressInfor">
                            <div className="checkOutAddressInfor__name">
                                <span>{curentUser?.fullName} (+84)</span>
                                <span>{curentUser?.phoneNumber}</span>
                            </div>
                            <div className="checkOutAddressInfor__address">
                                <span>
                                    Tổ dân phố 3, thị trấn La Hà, huyện Tư Nghĩa , tỉnh Quãng Ngãi, Thị Trấn La Hà,
                                    Huyện Tư Nghĩa, Quảng Ngãi
                                </span>
                            </div>
                            <div className="checkOutAddressInfor__option">
                                <Tag color="blue">Mặc định</Tag>
                                <Button type="link">Thay đổi</Button>
                            </div>
                        </div>
                    </div>
                    <div className="checkOutProduct">
                        <div className="checkOutProduct__Box">
                            <Table columns={columns} dataSource={data} pagination={false} />

                            <div className="ChooseVoucher__typeTransport">
                                <div className="typeTransport__text">
                                    <span>Đơn vận chuyển</span>
                                </div>
                                <div className="typeTransport__result">
                                    <div className="typeTransport__Result__text">
                                        <span>Nhanh</span>
                                        <span>Nhận hàng vào 10 Th08 - 14 Th08</span>
                                    </div>
                                    <Button type="link">Thay đổi</Button>
                                </div>
                                <div className="PriceTransport">
                                    <span>{convertVND(42500)}</span>
                                </div>
                            </div>
                            <div className="TotalPrice__CheckOut">
                                <div className="TotalPrice__CheckOut__Text">
                                    <span>{`Tổng số tiền (1 sản phẩm)`}</span>
                                </div>
                                <div className="TotalPrice__CheckOut__result">
                                    <span>{convertVND(3520000)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="checkOutVoucher">
                        <div className="checkOutProduct__ChooseVoucher">
                            <div className="ChooseVoucher__title">
                                <Button
                                    type="text"
                                    icon={
                                        <BsTicketPerforated
                                            style={{
                                                fontSize: '30px',
                                                color: 'red',
                                            }}
                                        />
                                    }
                                >
                                    Voucher của Shop
                                </Button>
                            </div>
                            <div className="ChooseVoucher__text">
                                <Button type="link">Chọn Voucher</Button>
                            </div>
                        </div>
                    </div>
                    <div className="MethodPay">
                        <div className="MethodPay__Box">
                            <div className="MethodPay__Box__text">
                                <span>Phương thức thanh toán</span>
                            </div>
                            <div className="MethodPay__Box__ChangeMethodPay">
                                <div className="MethodPay__Box__typePay">
                                    <span>Thanh toán khi nhận hàng</span>
                                </div>
                                <Button type="link">Thay đổi</Button>
                            </div>
                        </div>
                        <div className="TotalPriceResult">
                            <Descriptions column={1} className="TotalPriceResult_Des">
                                <Descriptions.Item label="Tổng tiền hàng">{convertVND(200000)}</Descriptions.Item>
                                <Descriptions.Item label="Phí vận chuyển">{convertVND(20000)}</Descriptions.Item>
                                <Descriptions.Item label="tổng thanh toán" className="totalGoods">
                                    {convertVND(220000)}
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="TotalPriceResult__Btn">
                            <Button>Đặt hàng</Button>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </>
    );
}
