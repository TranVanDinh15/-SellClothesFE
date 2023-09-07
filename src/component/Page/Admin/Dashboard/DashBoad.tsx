import React, { useState, useEffect } from 'react';
import Content from '../common/Content/Content';
import { Button, Col, DatePicker, DatePickerProps, Row, Select, Statistic } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { handleGetTotalUser, handleGetUserOnline } from './DashBoadMethod';
import './Dashboad.scss';
import { getAmountOrder, getProductSold, getRevenue, getTotalUserTime } from '../../../utils/Api/Api';
import dayjs, { Dayjs } from 'dayjs';
import PieChartDashBoad from './PieChartDashBoad';
import ProductSoldChart, { productSoldDto } from './productSoldChart';
import RevenueChar from './Revenue';
interface dataPie {
    type: string;
    value: number;
}
interface revenNueDto {
    year: string;
    value: any;
}
export default function DashBoadCustom() {
    const now = dayjs().format('YYYY-MM-DD');
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
    const defaultValue: [Dayjs, Dayjs] = [dayjs(), dayjs().add(1, 'day')];
    const { RangePicker } = DatePicker;
    const [amountTotalUser, setAmountTotalUser] = useState<number>();
    const [amountUserOnline, setAmountUserOnline] = useState<number>();
    const [amountUserRegisterTime, setAmountUserRegisterTime] = useState<number>();
    const [amountOrder, setAmountOrder] = useState<dataPie[]>([]);
    const [productSold, setProductSold] = useState<number>();
    const [RevenueState, setRevenueState] = useState<revenNueDto[]>([]);
    const [RevenueDatePicker, setRevenueDatePicker] = useState<[Dayjs, Dayjs]>([dayjs(), dayjs().add(1, 'day')]);
    const [ProductSoldState, setproductSoldState] = useState<dataPie[]>([]);

    console.log(RevenueState);
    const onChange = async (
        value: RangePickerProps['value'],
        dateString?: [string, string] | string,
    ): Promise<void> => {
        if (value) {
            const respone = await getTotalUserTime(value[0], value[1]);
            if (respone && respone.status == 200) {
                if (respone.data) {
                    setAmountUserRegisterTime(respone.data);
                }
            }
        }
    };
    const onChangeAmountOrder = async (
        value: RangePickerProps['value'],
        dateString?: [string, string] | string,
    ): Promise<void> => {
        if (value) {
            console.log(value);
            const respone = await getAmountOrder(value[0], value[1]);
            console.log(respone);
            if (respone && respone.status == 200) {
                if (respone.data) {
                    // setAmountOrder(respone.data);
                    const dataPie = [
                        {
                            type: respone?.data?.WAIT_FOR_COMFIRMATION ? 'Chờ xác nhận' : '',
                            value: respone.data?.WAIT_FOR_COMFIRMATION,
                        },
                        {
                            type: respone?.data?.CANCEL ? 'Đã hủy' : '',
                            value: respone.data?.CANCEL,
                        },
                        {
                            type: respone?.data?.DELIVERING ? 'Đang vận chuyển' : '',
                            value: respone.data?.DELIVERING,
                        },
                        {
                            type: respone?.data?.WAIT_FOR_PAYMENT ? 'Chờ thanh toán' : '',
                            value: respone.data?.WAIT_FOR_PAYMENT,
                        },
                    ];
                    setAmountOrder(dataPie);
                }
                // setAmountUserRegisterTime(respone.data);
            }
        }
    };
    const onChangeRevenue = async (
        value: RangePickerProps['value'],
        dateString?: [string, string] | string,
    ): Promise<void> => {
        if (value) {
            const respone = await getRevenue(value[0], value[1], 'week');
            console.log(respone);
            if (respone && respone.status == 200) {
                if (respone.data) {
                    // setProductSold(respone.data);
                    const transformedData = Object.entries(respone.data).map(([year, value]) => ({
                        year,
                        value,
                    }));
                    setRevenueState(transformedData);
                    if (value[0] && value[1]) {
                        const ChoiceValue: [Dayjs, Dayjs] = [value[0], value[1]];
                        setRevenueDatePicker(ChoiceValue);
                    }
                }
            }
        }
    };
    const onChangeProductSold = async (
        value: RangePickerProps['value'],
        dateString?: [string, string] | string,
    ): Promise<void> => {
        if (value) {
            const respone = await getProductSold(value[0], value[1]);
            console.log(respone);
            if (respone && respone.status == 200) {
                console.log(respone);
                const mapData = respone.data.map((item: any, index: number) => {
                    return {
                        type: item?.productName,
                        value: item?.salesCount,
                    };
                });
                setproductSoldState(mapData);
                console.log(mapData);
            }
        }
    };
    const handleChangeSelectRevenue = (value: string) => {
        console.log(`selected ${value}`);
        if (value == 'week') {
            const startOfWeek = dayjs().startOf('week'); // Thứ Hai
            const endOfWeek = dayjs().endOf('week'); // Chủ Nhật
            const weekvalue: [Dayjs, Dayjs] = [startOfWeek, endOfWeek];
            setRevenueDatePicker(weekvalue);
            onChangeRevenue(weekvalue);
        } else if (value == 'month') {
            const startOfMonth: Dayjs = dayjs().startOf('month');
            const endOfMonth: Dayjs = dayjs().endOf('month');
            const monthValue: [Dayjs, Dayjs] = [startOfMonth, endOfMonth];
            setRevenueDatePicker(monthValue);
            onChangeRevenue(monthValue);
        } else if (value == 'year') {
            const startOfYear: Dayjs = dayjs().startOf('year');
            const endOfYear: Dayjs = dayjs().endOf('year');
            const yearValue: [Dayjs, Dayjs] = [startOfYear, endOfYear];
            setRevenueDatePicker(yearValue);
            onChangeRevenue(yearValue);
        } else if (value == 'day') {
            setRevenueDatePicker(defaultValue);
            onChangeRevenue(defaultValue);
        }
    };
    const onOk = async (value: RangePickerProps['value']): Promise<void> => {
        console.log('onOk: ', value);
    };
    useEffect(() => {
        handleGetTotalUser(setAmountTotalUser);
        handleGetUserOnline(setAmountUserOnline);
        onChange(defaultValue);
        onChangeAmountOrder(defaultValue);
        onChangeProductSold(defaultValue);
        onChangeRevenue(defaultValue);
    }, []);
    return (
        <Content title={'Thống kê'}>
            <div className="DashboardWrapper">
                <Row
                    gutter={20}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}
                >
                    <Col span={7} className="dashBoad__StatisticCol">
                        <Statistic
                            title="Thành viên"
                            value={amountTotalUser && typeof amountTotalUser == 'number' ? amountTotalUser : 0}
                        />
                    </Col>
                    <Col span={7} className="dashBoad__StatisticCol">
                        <Statistic
                            title="Đang online"
                            value={amountUserOnline && typeof amountUserOnline == 'number' ? amountUserOnline : 0}
                            precision={0}
                        />
                    </Col>

                    <Col span={7} className="dashBoad__StatisticCol">
                        <Statistic
                            title="User đăng ký theo thời gian"
                            value={
                                amountUserRegisterTime && typeof amountUserRegisterTime == 'number'
                                    ? amountUserRegisterTime
                                    : 0
                            }
                            precision={0}
                        />
                        <RangePicker
                            // showTime={{ format: 'HH:mm' }}
                            format="YYYY-MM-DD"
                            onChange={onChange}
                            onOk={onOk}
                            placement="bottomLeft"
                            style={{
                                // width: '150px',
                                marginTop: '10px',
                            }}
                            // defaultValue={[now, tomorrow]}
                            defaultValue={defaultValue}
                            // value={}
                        />
                    </Col>
                </Row>
                <Row
                    gutter={16}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}
                >
                    <Col span={14} className="dashBoad__StatisticCol">
                        <div>
                            <div>
                                <span>Doanh thu</span>
                            </div>
                            <div className="dashBoad__StatisticCol__SelectCss">
                                <RangePicker
                                    // showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD"
                                    onChange={onChangeRevenue}
                                    onOk={onOk}
                                    placement="bottomLeft"
                                    style={{
                                        // width: '150px',
                                        marginTop: '10px',
                                        marginBottom: '20px',
                                    }}
                                    defaultValue={defaultValue}
                                    value={RevenueDatePicker}
                                />
                                <Select
                                    defaultValue="day"
                                    style={{ width: 120, borderRadius: '4px' }}
                                    onChange={(value) => {
                                        handleChangeSelectRevenue(value);
                                    }}
                                    options={[
                                        { value: 'day', label: 'Theo ngày' },
                                        { value: 'week', label: 'Theo tuần' },
                                        { value: 'month', label: 'Theo tháng' },
                                        { value: 'year', label: 'Theo năm' },
                                    ]}
                                />
                            </div>

                            <div style={{ width: '340px', height: 'auto' }}>
                                <RevenueChar data={RevenueState} />
                            </div>
                        </div>
                    </Col>
                    <Col span={9} className="dashBoad__StatisticCol">
                        <div>
                            <div>
                                <span>Số lượng Order</span>
                            </div>
                            <RangePicker
                                // showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD"
                                onChange={onChangeAmountOrder}
                                onOk={onOk}
                                placement="bottomLeft"
                                style={{
                                    // width: '300px',
                                    marginTop: '10px',
                                    marginBottom: '40px',
                                }}
                                defaultValue={defaultValue}
                            />
                            <div style={{ width: '340px', height: '300px' }}>
                                <PieChartDashBoad data={amountOrder} />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row
                    gutter={16}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}
                >
                    <Col span={14} className="dashBoad__StatisticCol">
                        <div>
                            <div>
                                <span>Sản phẩm đã bán</span>
                            </div>
                            <div className="dashBoad__StatisticCol__SelectCss">
                                <RangePicker
                                    // showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD"
                                    onChange={onChangeProductSold}
                                    onOk={onOk}
                                    placement="bottomLeft"
                                    style={{
                                        // width: '150px',
                                        marginTop: '10px',
                                        marginBottom: '20px',
                                    }}
                                    defaultValue={defaultValue}
                                    // value={RevenueDatePicker}
                                />
                            </div>

                            <div style={{ width: '340px', height: 'auto' }}>
                                <ProductSoldChart data={ProductSoldState} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Content>
    );
}
