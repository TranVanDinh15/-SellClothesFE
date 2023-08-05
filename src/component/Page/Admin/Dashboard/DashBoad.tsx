import React, { useState, useEffect } from 'react';
import Content from '../common/Content/Content';
import { Button, Col, DatePicker, DatePickerProps, Row, Statistic } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { handleGetTotalUser, handleGetUserOnline } from './DashBoadMethod';
import './Dashboad.scss';
import { getAmountOrder, getProductSold, getTotalUserTime } from '../../../utils/Api/Api';
import dayjs, { Dayjs } from 'dayjs';
import PieChartDashBoad from './PieChartDashBoad';
import ProductSoldChart from './productSoldChart';
interface dataPie {
    type: string;
    value: number;
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
    console.log(amountOrder);
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
                    ];
                    setAmountOrder(dataPie);
                }
                // setAmountUserRegisterTime(respone.data);
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
                if (respone.data) {
                    setProductSold(respone.data);
                }
            }
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
                                width: '150px',
                                marginTop: '10px',
                            }}
                            // defaultValue={[now, tomorrow]}
                            defaultValue={defaultValue}
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
                                <span>Số lượng Order</span>
                            </div>
                            <RangePicker
                                // showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD"
                                onChange={onChangeAmountOrder}
                                onOk={onOk}
                                placement="bottomLeft"
                                style={{
                                    width: '150px',
                                    marginTop: '10px',
                                    marginBottom: '20px',
                                }}
                                defaultValue={defaultValue}
                            />
                            <div style={{ width: '340px', height: 'auto' }}>
                                <ProductSoldChart />
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
                                    width: '150px',
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
            </div>
        </Content>
    );
}
