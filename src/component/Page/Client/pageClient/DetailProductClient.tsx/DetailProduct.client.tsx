import { Avatar, Breadcrumb, Button, Col, Collapse, CollapseProps, Image, Rate, Row, Slider, Space } from 'antd';
import React from 'react';
import './DetailProduct.client.scss';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { SiZenn } from 'react-icons/si';
import { useNumberInput, InputGroup, InputRightElement, HStack, Input } from '@chakra-ui/react';
import { onAfterChangeSliderSize, onChangeSliderSize } from './method.DPClient';

function HookUsage() {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
        max: 99,
        // precision: 2,
    });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();
    return (
        <HStack maxW="200px">
            <Button
                {...dec}
                style={{
                    borderRadius: 'initial',
                    height: '41.33px',
                }}
            >
                -
            </Button>
            <Input
                {...input}
                style={{
                    borderRadius: 'initial',
                    height: '41.33px',
                }}
            />
            <Button
                {...inc}
                style={{
                    borderRadius: 'initial',
                    height: '41.33px',
                }}
            >
                +
            </Button>
        </HStack>
    );
}
export default function DetailProductClient() {
    const chooseSliderSize = (
        <div className="sliderChooseSize">
            <div className="sliderChooseSize__Item">
                <div className="sliderChooseSize__title">
                    <div className="sliderChooseSize__title__tallWeight">
                        <span>Chiều cao</span>
                    </div>
                    <div className="sliderChooseSize__title__Number">
                        <span>169 cm</span>
                    </div>
                </div>
                <Slider defaultValue={30} onChange={onChangeSliderSize} onAfterChange={onAfterChangeSliderSize} />
            </div>
            <div className="sliderChooseSize__Item">
                <div className="sliderChooseSize__title">
                    <div className="sliderChooseSize__title__tallWeight">
                        <span>Cân nặng</span>
                    </div>
                    <div className="sliderChooseSize__title__Number">
                        <span>50 Kg</span>
                    </div>
                </div>
                <Slider defaultValue={30} onChange={onChangeSliderSize} onAfterChange={onAfterChangeSliderSize} />
            </div>
        </div>
    );
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: (
                <Button type="text" icon={<SiZenn />}>
                    Giúp bạn chọn size
                </Button>
            ),
            children: chooseSliderSize,
        },
    ];
    return (
        <div className="DetailProductClient">
            <div className="DetailProductClient__container">
                <Breadcrumb
                    items={[
                        {
                            title: <Link to={'/'}>Trang chủ</Link>,
                        },
                        {
                            title: <a href="">Application Center</a>,
                        },
                        {
                            title: <a href="">Application List</a>,
                        },
                    ]}
                />
                <div className="DetailProductClient__content">
                    <Row gutter={30}>
                        <Col span={14}>
                            <div className="DetailProductClient__content__listImage">
                                <Image
                                    preview={{ visible: false }}
                                    width={'48%'}
                                    src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                                    // onClick={() => setVisible(true)}
                                />
                                <Image
                                    preview={{ visible: false }}
                                    width={'48%'}
                                    src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                                    // onClick={() => setVisible(true)}
                                />
                                <Image
                                    preview={{ visible: false }}
                                    width={'48%'}
                                    src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                                    // onClick={() => setVisible(true)}
                                />
                            </div>
                            <div className="DetailProductClient__content__descriptiondetail">
                                <div className="descriptionDetailProduct__title">
                                    <span>Đặc tính nổi bật</span>
                                </div>
                                <div className="descriptionDetailProduct__content">
                                    <p>
                                        Chất liệu: 100% Cotton Cotton bền vững: Góp phần bảo vệ môi trường sống Loại sợi
                                        chất lượng cao được sử dụng trên trang phục chất lượng cao với độ mảnh và khả
                                        năng nhuộm ưu việt Thấm hút mồ hôi tốt, thoáng mát, rất thích hợp với thời tiết
                                        nóng ẩm việt Nam Thiết kế cổ tròn cơ bản cùng dáng suông giúp tạo sự thoải mái
                                        cử động cho người mặc Đa dạng màu sắc dễ dàng kết hợp cùng quần shorts hoặc quần
                                        jeans YODY - Look good. Feel good
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col span={10}>
                            <div className="DetailProductClient__content__Infor">
                                <div className="DetailProductClient__content__Infor__Name">
                                    <span>Áo Thu Nam Cổ Tròn Cơ Bản Cotton Usa</span>
                                </div>
                                <div className="DetailProductClient__content__Infor__productTop">
                                    <div className="productTop__Sold">
                                        <span>Đã bán 828</span>
                                    </div>
                                    <div className="productTop__Rate">
                                        <Rate
                                            disabled={true}
                                            style={{
                                                fontSize: '20px',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="DetailProductClient__content__Infor__Price">
                                    <div className="DetailProductClient__content__Infor__Price__original">
                                        <span>160.300 đ</span>
                                    </div>
                                    <div className="DetailProductClient__content__Infor__Price__discount">
                                        <span>229.000 đ</span>
                                    </div>
                                </div>
                                <div className="DetailProductClient__content__Infor__ListCorlor">
                                    <div className="ListColor__title">
                                        <span>
                                            màu sắc:<Button type="text">Xanh cổ vịt</Button>
                                        </span>
                                    </div>
                                    <div className="ListColor__Image">
                                        <Space wrap size={16}>
                                            <Avatar
                                                shape="square"
                                                size={50}
                                                icon={<UserOutlined />}
                                                src={
                                                    'https://bizweb.dktcdn.net/100/438/408/products/tsm6163-xcv-4-8423349f-102a-46ac-bf98-08983c66b13e.jpg?v=1686303780020'
                                                }
                                            />
                                            <Avatar
                                                shape="square"
                                                size={50}
                                                icon={<UserOutlined />}
                                                src={
                                                    'https://bizweb.dktcdn.net/100/438/408/products/tsm6163-xadjpg-2.jpg?v=1686303780020'
                                                }
                                            />
                                            <Avatar
                                                shape="square"
                                                size={50}
                                                icon={<UserOutlined />}
                                                src={
                                                    'https://bizweb.dktcdn.net/100/438/408/products/tsm6163-nau-3-c52636ea-7639-4948-8432-75fde631bdfb.jpg?v=1686303787263'
                                                }
                                            />
                                            <Avatar
                                                shape="square"
                                                size={50}
                                                icon={<UserOutlined />}
                                                src={
                                                    'https://bizweb.dktcdn.net/100/438/408/products/tsm6163-dn1-3-02f9fe61-5532-4aeb-ad52-166cc13fc4ae.jpg?v=1686303787263'
                                                }
                                            />
                                        </Space>
                                    </div>
                                </div>
                                <div className="DetailProductClient__content__Infor__Size">
                                    <div className="DetailProductClient__content__Infor__Size__title">
                                        <span>Kích Thước</span>
                                    </div>
                                    <div className="DetailProductClient__content__Infor__Size__List">
                                        <Button size="large" disabled>
                                            S
                                        </Button>
                                        <Button size="large">S</Button>
                                        <Button size="large">S</Button>
                                        <Button size="large">S</Button>
                                    </div>
                                    <div className="HelpSize">
                                        <div className="HelpSize__title">
                                            <Collapse items={items} />
                                        </div>
                                    </div>
                                </div>
                                <div className="DetailProductClient__content__Infor__amountAddCart">
                                    <div className="Infor__Amount">
                                        <HookUsage />
                                    </div>
                                    {/* <div className="Infor__Btn">
                                        <div className="Infor__Btn__Item">Thêm vào giỏ hàng</div>
                                    </div> */}
                                    <Button
                                        type="ghost"
                                        style={{
                                            fontSize: '15px',
                                            padding: '20px 40px',
                                            backgroundColor: 'orangered',
                                            marginLeft: '10px',
                                            borderRadius: 'initial',
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}
