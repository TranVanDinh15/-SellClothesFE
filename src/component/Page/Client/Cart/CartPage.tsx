import React, { useState, useEffect, useContext } from 'react';
import './Cart.scss';
import { Col, Image, Row } from 'antd';
import { Space, Table, Tag, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useSelector } from 'react-redux';
import { dataCart } from './CartInterFace';
import { HStack, Input, useNumberInput } from '@chakra-ui/react';
import { convertVND } from '../../Admin/common/method/method';
import { BsTrash } from 'react-icons/bs';
import { hadnleUpdateZero, handleUpdateQuantity } from './CartMethod';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetContext } from '../../Admin/common/Context/Context';
const { Column, ColumnGroup } = Table;

export interface cartRedux {
    CartReducer: {
        cartRedux: dataCart;
    };
}
export type dataTableCart = {
    name: string;
    discountPrice: number;
    originalPrice: number;
    quantity: number;
    total: number;
    image: string;
    productDetailSizeId: number;
    productDetailSizeName: string;
    color: string;
};
interface HookProps {
    value: number;
    productDetailSize: number;
    dispatch: any;
    setIsLoadCart: React.Dispatch<React.SetStateAction<boolean>>;
}
function HookUsage({ value, productDetailSize, dispatch, setIsLoadCart }: HookProps) {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
        step: 1,
        value: value,
        // min: 0,
        max: 99,
        // precision: 2,
    });
    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();
    return (
        <HStack minWidth={'80px'}>
            <Button
                {...dec}
                style={{
                    borderRadius: 'initial',
                    height: '41.33px',
                    width: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onClick={() => {
                    handleUpdateQuantity(productDetailSize, -1, dispatch, setIsLoadCart);
                }}
            >
                -
            </Button>
            <Input
                {...input}
                style={{
                    borderRadius: 'initial',
                    height: '41.33px',
                    width: '51px',
                }}
            />
            <Button
                {...inc}
                style={{
                    borderRadius: 'initial',
                    height: '41.33px',
                    width: '40px',

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onClick={() => {
                    handleUpdateQuantity(productDetailSize, 1, dispatch, setIsLoadCart);
                }}
            >
                +
            </Button>
        </HStack>
    );
}

export default function CartPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setIsLoadCart }: any = GetContext();
    // const [isLoadCartPage, setIsLoadCartPage] = useState<boolean>(false);
    const getCartRedux = useSelector((state: cartRedux) => state.CartReducer.cartRedux);
    const [dataTableCart, setDatatableCart] = useState<dataTableCart[]>([]);
    const [valueInput, setValueInput] = useState<number | undefined>();
    const columns: ColumnsType<dataTableCart> = [
        {
            title: 'Sản phẩm ',
            dataIndex: 'name',
            render: (value, record) => (
                <div
                    style={{
                        display: 'flex',
                    }}
                    className="pageCartName"
                >
                    <Image
                        style={
                            {
                                // flexBasis: '50%',
                            }
                        }
                        width={70}
                        src={`${process.env.REACT_APP_IMAGE_PRODUCT}${record.image}`}
                        preview={false}
                    />
                    <span>{record.name}</span>
                </div>
            ),
            width: '40%',
        },
        {
            title: 'Size',
            dataIndex: '',
            render: (value, record) => <span>{record.productDetailSizeName}</span>,
        },
        {
            title: 'Màu',
            dataIndex: '',
            render: (value, record) => <span>{record.color}</span>,
        },
        {
            title: 'Đơn giá',
            // dataIndex: 'price',
            render: (value, record) => (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <span
                        style={{
                            color: 'red',
                        }}
                    >
                        {convertVND(record.discountPrice)}
                    </span>
                    <span
                        style={{
                            textDecoration: 'line-through',
                            color: '#8a8a8f',
                        }}
                    >
                        {convertVND(record.originalPrice)}
                    </span>
                </div>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            render: (value, record) => (
                <HookUsage
                    value={record.quantity}
                    productDetailSize={record.productDetailSizeId}
                    dispatch={dispatch}
                    setIsLoadCart={setIsLoadCart}
                />
            ),
        },
        {
            title: 'Tổng tiền',
            render: (value, record) => (
                <span onClick={() => {}}>{convertVND(Number(record.discountPrice) * Number(record.quantity))}</span>
            ),
        },
        // {
        //     title: 'Xóa',
        //     render: (value, record) => (
        //         <div>
        //             <BsTrash />
        //         </div>
        //     ),
        // },
    ];
    useEffect(() => {
        if (getCartRedux) {
            const maptableCart = getCartRedux.cart.detail.map((item) => {
                return {
                    name: item.productDetailSize.productDetail.name,
                    discountPrice: item.productDetailSize.productDetail.discountPrice,
                    originalPrice: item.productDetailSize.productDetail.originalPrice,
                    quantity: item.quantity,
                    total: item.quantity * item.productDetailSize.productDetail.discountPrice,
                    image: item.productDetailSize.productDetail.images[0],
                    productDetailSizeId: item.productDetailSizeId,
                    productDetailSizeName: item?.productDetailSize.name,
                    color: item.productDetailSize.productDetail.color.value,
                };
            });
            setDatatableCart(maptableCart);
        }
    }, [getCartRedux]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="CartPageWrapper">
            <Row gutter={20}>
                <Col
                    span={17}
                    style={{
                        backgroundColor: '#fff',
                        minHeight: '100vh',
                        padding: '20px',
                    }}
                >
                    <div className="CartPagetitle">
                        <span>Giỏ hàng</span>
                        <span>(2) Sản phẩm</span>
                    </div>
                    <Table dataSource={dataTableCart} columns={columns} pagination={false}></Table>
                </Col>
                <Col
                    span={7}
                    style={{
                        backgroundColor: '#fff',
                        minHeight: '100vh',
                    }}
                >
                    <div className="toCheckOut">
                        <div className="toCheckOut__Box">
                            <div className="toCheckOut__Box__note">
                                <span>Sử dụng mã giảm giá ở bước tiếp theo</span>
                            </div>
                            <div className="toCheckOut__Box__content">
                                <div className="toCheckOut__Box__content__total">
                                    <span>Tổng cộng: </span>
                                    <span>{convertVND(getCartRedux.totalPrice)}</span>
                                </div>
                                <div className="toCheckOut__Box__content__btn">
                                    <Button
                                        type="ghost"
                                        style={{
                                            backgroundColor: 'rgb(0, 191, 255)',
                                            color: '#fff',
                                            width: '100px',
                                            height: '40px',
                                            borderRadius: 'initial',
                                        }}
                                        onClick={() => {
                                            navigate('/thanh-toan');
                                        }}
                                    >
                                        Thanh Toán
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
