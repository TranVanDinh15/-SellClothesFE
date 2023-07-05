import React from 'react';
import SliderCustom from '../Slider/SliderCustom';
import { Col, Row } from 'antd';
import './HomeClient.css';
import TabProductCustomer from '../Common/TabProduct/TabProduct';
export default function HomeClient() {
    return (
        <div className="HomeClientWrapper">
            <Row gutter={16}>
                <Col span={13}>
                    <div className="HomeClientSaleProduct">
                        <div className="HomeClientSaleProduct__title">
                            <span>SALE SỐC</span>
                        </div>
                        <div className="HomeClientSaleProduct__listItem">
                            <TabProductCustomer />
                            <TabProductCustomer />
                            <TabProductCustomer />
                            <TabProductCustomer />
                            <TabProductCustomer />
                            <TabProductCustomer />
                        </div>
                    </div>
                </Col>
                <Col
                    span={11}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <div>
                        <SliderCustom />
                    </div>
                    <div className="HomeClientSaleBanner__Static">
                        <Row gutter={16}>
                            <Col span={12}>
                                <div className="HomeClientSaleBanner__Static__Item">
                                    <img src="https://img.freepik.com/free-vector/online-store-quarantine-promo-banner-template_1361-2358.jpg?size=626&ext=jpg&ga=GA1.2.103136954.1681458465&semt=ais" />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="HomeClientSaleBanner__Static__Item">
                                    <img src="https://img.freepik.com/free-psd/horizontal-banner-template-summer-sale_23-2148723339.jpg?size=626&ext=jpg&ga=GA1.2.103136954.1681458465&semt=ais" />
                                </div>
                            </Col>
                        </Row>
                        <Row
                            gutter={16}
                            style={{
                                marginTop: '16px',
                            }}
                        >
                            <Col span={12}>
                                <div className="HomeClientSaleBanner__Static__Item">
                                    <img src="https://img.freepik.com/premium-vector/best-season-sale-banner-design-template_2239-1175.jpg?size=626&ext=jpg&ga=GA1.2.103136954.1681458465&semt=ais" />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="HomeClientSaleBanner__Static__Item">
                                    <img src="https://img.freepik.com/premium-vector/best-season-sale-banner-design-template_2239-1175.jpg?size=626&ext=jpg&ga=GA1.2.103136954.1681458465&semt=ais" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
