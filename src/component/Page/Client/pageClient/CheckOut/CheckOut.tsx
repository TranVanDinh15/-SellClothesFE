import React, { useEffect, useState } from 'react';
import './CheckOut.scss';
import {
    Button,
    Image,
    Table,
    Descriptions,
    Popover,
    Input,
    Empty,
    Row,
    Col,
    Badge,
    Radio,
    RadioChangeEvent,
    message,
    Form,
} from 'antd';
import { CiLocationOn } from 'react-icons/ci';
import { BsTicketPerforated } from 'react-icons/bs';
import { Tag } from '@chakra-ui/react';
import { ColumnsType } from 'antd/es/table';
import { convertVND } from '../../../Admin/common/method/method';
import { useSelector } from 'react-redux';
import { AddressIF, DistrictIF, WardIF, formAddAddress, provincesIF } from '../../Profile/Address';
import {
    handleCreateAddress,
    handleGetAddress,
    handleGetProvinces,
    handleGetVoucherUser,
    onChangeDistrictSelect,
    onChangeProvincesSelect,
    onChangeWardSelect,
} from '../../Profile/ProfileMethod';
import { listVoucherIF } from '../../VoucherClient/VoucherClient';
import images from '../../../../../asset';
import DeleteCustom from '../../../Admin/common/Delete/DeleteCustom';
import { handleGetPayment, handleGetTypeShip, handleOrderProduct, handleuseVoucher } from './CheckOutMethod';
import { cartRedux, dataTableCart } from '../../Cart/CartPage';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ModalCustomer from '../../../Admin/common/Modal/ModalCustomer';
import { useForm } from 'antd/es/form/Form';
import SelectCustomer from '../../../Admin/common/Select/Select';
import { deleteAddress } from '../../../../utils/Api/Api';
export interface useRedux {
    reduxAuth: {
        isAuthenticate: boolean;
        user: any;
        isLoading: boolean;
        isfail: boolean;
    };
}
export interface typeShip {
    createdAt: string;
    id: number;
    price: string;
    type: {
        code: string;
        createdAt: string;
        hexCode: any;
        id: number;
        parentCode: any;
        type: string;
        updatedAt: string;
        value: string;
    };
    typeId: string;
    updatedAt: string;
}
export interface payMent {
    id: number;
    type: string;
    value: string;
    code: string;
    parentCode: any;
    hexCode: any;
    createdAt: string;
    updatedAt: string;
}
interface contentAddress {
    addressUser: AddressIF[] | null;
    setCurrentAddress: React.Dispatch<React.SetStateAction<AddressIF | null>>;
    currenrAddress: AddressIF | null;
    setIsLoadAddress: React.Dispatch<React.SetStateAction<boolean>>;
}
interface typeshipProps {
    TypeShip?: typeShip[] | null;
    setTypeshipCurrent: React.Dispatch<React.SetStateAction<typeShip | null>>;
    typeShipCurrent: typeShip | null;
}
interface payMentProps {
    // setCurrentAddress: React.Dispatch<React.SetStateAction<AddressIF | null>>;
    payMent?: payMent[] | null;
    setCurrentPayment: React.Dispatch<React.SetStateAction<payMent | null>>;
    currentPayMent: payMent | null;
}
const { Search } = Input;
const ContentAddress = ({ addressUser, setCurrentAddress, currenrAddress, setIsLoadAddress }: contentAddress) => {
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [formAdd] = useForm<formAddAddress>();
    // Tên tỉnh thành phố
    const [provincesName, setProvincesName] = useState<string>('');
    // Tên quận , huyện
    const [DistrictName, setDistrictName] = useState<string>('');
    // Tên thị trấn, xã
    const [WardName, setWardName] = useState<string>('');
    const [listProvinces, setListProvinces] = useState<provincesIF[] | null>(null);
    const [listDistrict, setListDistrict] = useState<DistrictIF[] | null>(null);
    const [listWard, setListWard] = useState<WardIF[] | null>(null);
    // Id của địa chỉ , dùng để update
    const [idAddress, setIdAddress] = useState<number | null>(null);
    useEffect(() => {
        handleGetProvinces(setListProvinces);
    }, []);
    return (
        <div className="ContentAddress">
            <div className="ContentAddress__ListAddress">
                {addressUser && addressUser.length > 0 ? (
                    <>
                        {/* <div className="ContentAddress__BtnAdd"> */}
                        <div className="AddresAddCheckOut">
                            <Button
                                type="primary"
                                style={{
                                    marginBottom: '20px',
                                }}
                                onClick={() => {
                                    setIsModalAddOpen(true);
                                }}
                            >
                                Thêm địa chỉ
                            </Button>
                        </div>
                        {/* </div> */}
                        <Radio.Group
                            onChange={(event) => {
                                console.log(event.target.value);
                                setCurrentAddress(event.target.value);
                            }}
                            value={currenrAddress}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                gap: '20px',
                            }}
                        >
                            {addressUser.map((item, index) => {
                                return (
                                    <div className="ContentAddress__Infor" key={index}>
                                        <Radio value={item}>
                                            <div className="ContentAddress__Infor__Top">
                                                <Descriptions column={1} className="ContentAddress__Infor__Item">
                                                    <Descriptions.Item label="Họ tên">
                                                        {item?.shipName}
                                                    </Descriptions.Item>
                                                    <Descriptions.Item label="Địa chỉ">
                                                        {item?.shipAddress}
                                                    </Descriptions.Item>
                                                    <Descriptions.Item label="Số điện thoại">
                                                        {item?.shipPhoneNumber}
                                                    </Descriptions.Item>
                                                </Descriptions>
                                            </div>
                                        </Radio>

                                        <div>
                                            <DeleteCustom
                                                title="Xóa địa chỉ"
                                                description="Bạn chắc chắn muốn xóa?"
                                                confirm={async (e: any) => {
                                                    if (idAddress) {
                                                        const respone = await deleteAddress(Number(idAddress));
                                                        respone &&
                                                            respone.status == 200 &&
                                                            setIsLoadAddress((isLoadAddress) => !isLoadAddress);
                                                    }
                                                }}
                                                cancel={() => {}}
                                                placement={'topLeft'}
                                            >
                                                <Button
                                                    type="link"
                                                    onClick={() => {
                                                        setIdAddress(item?.id);
                                                    }}
                                                >
                                                    Xóa
                                                </Button>
                                            </DeleteCustom>
                                        </div>
                                    </div>
                                );
                            })}
                        </Radio.Group>

                        {/* <div className="ContentAddress__BtnAdd__Container">
                            <Button className="ContentAddress__BtnCancel">Hủy</Button>
                            <Button className="ContentAddress__BtnAdd">Xác nhận</Button>
                        </div> */}
                    </>
                ) : (
                    <div
                        className="ContentAddress__BtnAdd"
                        onClick={() => {
                            setIsModalAddOpen(true);
                        }}
                    >
                        <Button>Thêm địa chỉ </Button>
                    </div>
                )}
            </div>
            <ModalCustomer
                isModalOpen={isModalAddOpen}
                handleOk={() => {}}
                handleCancel={() => {
                    setIsModalAddOpen(false);
                }}
                title={'Thêm địa chỉ'}
                footer={true}
                showModal={() => {
                    setIsModalAddOpen(true);
                }}
            >
                <Form
                    form={formAdd}
                    name="basic"
                    labelCol={{ span: 24 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={(value) => {
                        const data = {
                            shipName: value.shipName,
                            shipPhoneNumber: value.shipPhoneNumber,
                            shipEmail: value.shipEmail,
                            shipAddress: value.shipAddress,
                            addressDetail: `${WardName}, ${DistrictName}, ${provincesName}`,
                        };
                        handleCreateAddress(data, setIsModalAddOpen, formAdd, setIsLoadAddress);
                    }}
                    // onFinishFailed={onFinishFailed}
                >
                    <Row
                        gutter={20}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Col span={12}>
                            <Form.Item
                                label="Tên"
                                name="shipName"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <Input placeholder="Họ tên" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Địa chỉ nhà, cơ quan"
                                name="shipAddress"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <Input placeholder="Địa chỉ" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Số điện thoại"
                                name="shipPhoneNumber"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <Input placeholder="Số điện thoại" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Email"
                                name="shipEmail"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Tỉnh"
                                name="provinces"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <SelectCustomer
                                    mode=""
                                    option={listProvinces ? [...listProvinces] : []}
                                    onChange={(value: any) => {
                                        onChangeProvincesSelect(value, setListDistrict, setProvincesName);
                                    }}
                                    onSearch={(value: any) => {
                                        onChangeProvincesSelect(value, setListDistrict, setProvincesName);
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Quận, huyện"
                                name="district"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <SelectCustomer
                                    mode=""
                                    option={listDistrict ? [...listDistrict] : []}
                                    onChange={(value: any) => {
                                        onChangeDistrictSelect(value, setListWard, setDistrictName);
                                    }}
                                    onSearch={(value: any) => {
                                        onChangeDistrictSelect(value, setListWard, setDistrictName);
                                    }}
                                    disable={listDistrict ? false : true}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Phường, thị xã, thị trấn"
                                name="ward"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <SelectCustomer
                                    mode=""
                                    option={listWard ? [...listWard] : []}
                                    onChange={(value: any) => {
                                        onChangeWardSelect(value, setWardName);
                                    }}
                                    onSearch={(value: any) => {}}
                                    disable={listWard ? false : true}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </ModalCustomer>
        </div>
    );
};
const TypeShipJsx = ({ TypeShip, setTypeshipCurrent, typeShipCurrent }: typeshipProps) => {
    return (
        <div className="TypeShipWrapper">
            <Radio.Group
                onChange={(event) => {
                    setTypeshipCurrent(event?.target.value);
                }}
                value={typeShipCurrent}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                {TypeShip && TypeShip.length > 0
                    ? TypeShip.map((item, index) => {
                          return (
                              <Radio value={item} key={index}>
                                  <div className="TypeShipWrapper__Item">
                                      <div>
                                          <span className="TypeShipWrapper__Item__Text">{item?.type.value}</span>
                                      </div>
                                      <div>
                                          <span className="TypeShipWrapper__Item__Price">
                                              {convertVND(Number(item?.price))}
                                          </span>
                                      </div>
                                  </div>
                              </Radio>
                          );
                      })
                    : ''}
            </Radio.Group>
        </div>
    );
};
const PayMentJsx = ({ payMent, setCurrentPayment, currentPayMent }: payMentProps) => {
    return (
        <div className="TypeShipWrapper">
            <Radio.Group
                onChange={(event) => {
                    setCurrentPayment(event.target.value);
                }}
                value={currentPayMent}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                {payMent && payMent.length > 0
                    ? payMent.map((item, index) => {
                          return (
                              <Radio value={item} key={index}>
                                  <div className="TypeShipWrapper__Item">
                                      <div>
                                          <span className="TypeShipWrapper__Item__Text">{item?.value}</span>
                                      </div>
                                      <div>
                                          {/* <span className="TypeShipWrapper__Item__Price">
                                              {convertVND(Number(item?.price))}
                                          </span> */}
                                      </div>
                                  </div>
                              </Radio>
                          );
                      })
                    : ''}
            </Radio.Group>
        </div>
    );
};
export default function CheckOut() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Lấy danh sách voucher hiện có của shop
    const [listVoucher, setListVoucher] = useState<listVoucherIF[] | null>(null);
    const [pageSize, setPageSize] = useState<any>(1000);
    const [page, setPage] = useState<any>(1);
    const [total, setTotal] = useState<number>();
    // console.log(listVoucher);
    // Get User Hiện tại
    const curentUser = useSelector((state: useRedux) => state.reduxAuth.user);
    const getCartRedux = useSelector((state: cartRedux) => state.CartReducer.cartRedux);
    // Lấy địa chỉ hiện có
    const [addressUser, setAddressUser] = useState<AddressIF[] | null>(null);
    const [currenrAddress, setCurrentAddress] = useState<AddressIF | null>(null);
    const [value, setValue] = useState<any>(1);
    const [dataTableCart, setDatatableCart] = useState<dataTableCart[]>([]);
    console.log(dataTableCart);
    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    const [typeShip, setTypeShip] = useState<typeShip[] | null>(null);
    const [typeShipCurrent, setTypeshipCurrent] = useState<typeShip | null>(null);
    const [payMent, setPayment] = useState<payMent[] | null>(null);
    const [currentPayMent, setCurrentPayment] = useState<payMent | null>(null);
    const [voucherCode, setVoucherCode] = useState<string>('');
    const [isLoadAddress, setIsLoadAddress] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    console.log(getCartRedux);
    // console.log(typeShipCurrent);
    interface DataType {
        color: string;
        discountPrice: number;
        image: string;
        name: string;
        originalPrice: number;
        productDetailSizeId: number;
        productDetailSizeName: string;
        quantity: number;
        total: number;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Sản phẩm',
            render: (text, record) => (
                <div className="ProductName__CheckOut">
                    <div className="ProductName__CheckOut__box">
                        <Image src={`${process.env.REACT_APP_IMAGE_PRODUCT}${record.image}`} width={50} />
                        <span>{record?.name}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Số lượng',

            render: (text, record) => <span>{record?.quantity}</span>,
        },
        {
            title: 'Đơn giá',
            render: (text, record) => (
                <span
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {record.discountPrice ? convertVND(record.discountPrice) : convertVND(record.originalPrice)}
                    {record?.discountPrice ? (
                        <span
                            style={{
                                textDecoration: 'line-through',
                                color: '#ccc',
                            }}
                        >
                            {convertVND(record.originalPrice)}
                        </span>
                    ) : (
                        ''
                    )}
                </span>
            ),
        },
        {
            title: 'Thành tiền',
            render: (text, record) => (
                <span>
                    {record.total
                        ? convertVND(record.total)
                        : convertVND(
                              record.discountPrice
                                  ? record.discountPrice * record.quantity
                                  : record.originalPrice * record.quantity,
                          )}
                </span>
            ),
        },
    ];

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        console.log(value);
        if (e.target.value === value) {
            // Nếu Radio đang được chọn được nhấp, hãy đặt giá trị về null
            setValue(null);
            setVoucherCode('');
        } else {
            setValue(e.target.value);
            setVoucherCode(e.target.value);
        }
    };
    const contentVoucher = (
        <div className="contentVoucherWrapper">
            {listVoucher && listVoucher.length > 0 ? (
                <Radio.Group
                    onChange={onChange}
                    value={value}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Row gutter={[16, 16]}>
                        {listVoucher && listVoucher.length > 0
                            ? listVoucher.map((item, index) => {
                                  return (
                                      <>
                                          {item?.typeVoucher?.typeVoucherCode ==
                                          process.env.REACT_APP__CODE__VOUCHER__PERCENT ? (
                                              <Col span={24} key={index}>
                                                  <Badge.Ribbon text={`x1`} color="red">
                                                      <div className="ListVoucherClient__CheckOut">
                                                          <div className="ListVoucherClientCheckout__Logo">
                                                              <Image src={images.logo} preview={false} width={80} />
                                                          </div>
                                                          <div className="ListVoucherClient__CheckOut__Infor">
                                                              <div className="ListVoucherClient__CheckOut__Infor__Text">
                                                                  <div className="CheckOut__bigText">
                                                                      <span>Giảm {`${item?.typeVoucher.value}%`}</span>
                                                                  </div>
                                                                  <div className="CheckOut__smallText">
                                                                      <span>
                                                                          Đơn tối đa{' '}
                                                                          {convertVND(
                                                                              Number(item?.typeVoucher.maxValue),
                                                                          )}
                                                                      </span>
                                                                  </div>
                                                                  <div className="VoucherClient__smallText">
                                                                      <span>Ngày hết hạn {item?.toDate}</span>
                                                                  </div>
                                                              </div>
                                                              {/* <Button
                                                          onClick={() => {
                                                                handleAddVoucherinList(item?.codeVoucher);
                                                          }}
                                                      >
                                                          Sử dụng
                                                      </Button> */}
                                                          </div>
                                                          <Radio
                                                              value={item?.codeVoucher}
                                                              onClick={(event) => {
                                                                  if (item?.codeVoucher === value) {
                                                                      setValue(null);
                                                                      setVoucherCode('');
                                                                  } else {
                                                                      setValue(item?.codeVoucher);
                                                                      setVoucherCode(item?.codeVoucher);
                                                                  }
                                                              }}
                                                          ></Radio>
                                                      </div>
                                                  </Badge.Ribbon>
                                              </Col>
                                          ) : (
                                              <Col span={24} key={index}>
                                                  <Badge.Ribbon text={`x1`} color="red">
                                                      <div className="ListVoucherClient__CheckOut">
                                                          <div className="ListVoucherClientCheckout__Logo">
                                                              <Image src={images.logo} preview={false} width={80} />
                                                          </div>
                                                          <div className="ListVoucherClient__CheckOut__Infor">
                                                              <div className="ListVoucherClient__CheckOut__Infor__Text">
                                                                  <div className="CheckOut__bigText">
                                                                      <span>
                                                                          Giảm{' '}
                                                                          {convertVND(Number(item?.typeVoucher.value))}
                                                                      </span>
                                                                  </div>
                                                                  <div className="VoucherClient__smallText">
                                                                      <span>
                                                                          Đơn tối đa{' '}
                                                                          {convertVND(
                                                                              Number(item?.typeVoucher.maxValue),
                                                                          )}
                                                                      </span>
                                                                  </div>
                                                                  <div className="CheckOut__smallText">
                                                                      <span>Ngày hết hạn {item?.toDate}</span>
                                                                  </div>
                                                              </div>
                                                          </div>

                                                          <Radio
                                                              value={item?.codeVoucher}
                                                              onClick={(event) => {
                                                                  if (item?.codeVoucher === value) {
                                                                      setValue(null);
                                                                      setVoucherCode('');
                                                                  } else {
                                                                      setValue(item?.codeVoucher);
                                                                      setVoucherCode(item?.codeVoucher);
                                                                  }
                                                              }}
                                                          ></Radio>
                                                      </div>
                                                  </Badge.Ribbon>
                                              </Col>
                                          )}
                                      </>
                                  );
                              })
                            : ''}
                    </Row>
                </Radio.Group>
            ) : (
                <>
                    <div className="contentVoucher__ApplyVoucher">
                        <Search
                            placeholder="Nhập mã Voucher"
                            allowClear
                            enterButton="Áp dụng"
                            size="large"
                            onSearch={() => {}}
                        />
                    </div>
                    <div className="contentVoucher__Image">
                        <svg
                            width="140"
                            height="140"
                            viewBox="0 0 140 140"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 0H140V140H0V0Z"
                                fill="white"
                                fill-opacity="0.01"
                            ></path>
                            <path
                                d="M63 115C65.2091 115 67 113.209 67 111C67 108.791 65.2091 107 63 107C60.7909 107 59 108.791 59 111C59 113.209 60.7909 115 63 115Z"
                                stroke="#E8E8E8"
                                stroke-width="2"
                            ></path>
                            <path
                                d="M77 23C79.2091 23 81 21.2091 81 19C81 16.7909 79.2091 15 77 15C74.7909 15 73 16.7909 73 19C73 21.2091 74.7909 23 77 23Z"
                                stroke="#E8E8E8"
                                stroke-width="2"
                            ></path>
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M123 92C123.552 92 124 92.4477 124 93V95.999L127 96C127.552 96 128 96.4477 128 97C128 97.5523 127.552 98 127 98H124V101C124 101.552 123.552 102 123 102C122.448 102 122 101.552 122 101V98H119C118.448 98 118 97.5523 118 97C118 96.4477 118.448 96 119 96H122V93C122 92.4477 122.448 92 123 92Z"
                                fill="#E8E8E8"
                            ></path>
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M39 23C39.5523 23 40 23.4477 40 24V26.999L43 27C43.5523 27 44 27.4477 44 28C44 28.5523 43.5523 29 43 29H40V32C40 32.5523 39.5523 33 39 33C38.4477 33 38 32.5523 38 32V29H35C34.4477 29 34 28.5523 34 28C34 27.4477 34.4477 27 35 27H38V24C38 23.4477 38.4477 23 39 23Z"
                                fill="#E8E8E8"
                            ></path>
                            <path
                                d="M90.3995 59.4263C90.9853 58.8405 90.9853 57.8908 90.3995 57.305C89.8137 56.7192 88.864 56.7192 88.2782 57.305L67.065 78.5182C66.4792 79.104 66.4792 80.0537 67.065 80.6395C67.6508 81.2253 68.6005 81.2253 69.1863 80.6395L90.3995 59.4263Z"
                                fill="#BDBDBD"
                            ></path>
                            <path
                                d="M70 67C73.3137 67 76 64.3137 76 61C76 57.6863 73.3137 55 70 55C66.6863 55 64 57.6863 64 61C64 64.3137 66.6863 67 70 67Z"
                                stroke="#BDBDBD"
                                stroke-width="3"
                            ></path>
                            <path
                                d="M88 83C91.3137 83 94 80.3137 94 77C94 73.6863 91.3137 71 88 71C84.6863 71 82 73.6863 82 77C82 80.3137 84.6863 83 88 83Z"
                                stroke="#BDBDBD"
                                stroke-width="3"
                            ></path>
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M110 43C112.209 43 114 44.7909 114 47V60C109.029 60 105 64.0294 105 69C105 73.9706 109.029 78 114 78V91C114 93.2091 112.209 95 110 95H30C27.7909 95 26 93.2091 26 91V78C30.9706 78 35 73.9706 35 69C35 64.0294 30.9706 60 26 60V47C26 44.7909 27.7909 43 30 43H110Z"
                                stroke="#BDBDBD"
                                stroke-width="2"
                            ></path>
                            <path
                                d="M50.5 47H48.5C47.6716 47 47 47.6716 47 48.5V89.5C47 90.3284 47.6716 91 48.5 91H50.5C51.3284 91 52 90.3284 52 89.5V48.5C52 47.6716 51.3284 47 50.5 47Z"
                                fill="#E8E8E8"
                            ></path>
                        </svg>
                    </div>
                    <div className="contentVoucher__Infor">
                        <span>Hiện tại chưa có mã giảm giá nào</span>
                        <span>Bạn có thể nhập mã code vào thanh bên trên để sử dụng mã giảm giá</span>
                    </div>
                </>
            )}
            <div className="useVoucherBtn">
                <Button
                    type="primary"
                    style={{
                        width: '100px',
                        height: '40px',
                    }}
                    onClick={() => {
                        handleuseVoucher(dispatch, { voucherCode: voucherCode }, setIsLoading);
                    }}
                    loading={isLoading}
                >
                    Sử dụng
                </Button>
            </div>
        </div>
    );
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        handleGetAddress(setAddressUser);
    }, [isLoadAddress]);
    useEffect(() => {
        addressUser && addressUser.length > 0 && setCurrentAddress(addressUser[0]);
    }, [addressUser]);
    useEffect(() => {
        typeShip && typeShip.length > 0 && setTypeshipCurrent(typeShip[0]);
    }, [typeShip]);
    useEffect(() => {
        handleGetVoucherUser(Number(curentUser?.id), pageSize, page, setListVoucher, setTotal);
    }, []);
    useEffect(() => {
        handleGetTypeShip(setTypeShip);
        handleGetPayment(setPayment);
    }, []);
    useEffect(() => {
        if (getCartRedux) {
            console.log(getCartRedux);
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
            setTotalPrice(getCartRedux?.useVoucherPrice);
        }
    }, [getCartRedux]);
    return (
        <>
            {currenrAddress || curentUser ? (
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
                                <span>{currenrAddress?.shipName} (+84)</span>
                                <span>{currenrAddress?.shipPhoneNumber}</span>
                            </div>
                            <div className="checkOutAddressInfor__address">
                                <span>{currenrAddress?.shipAddress}</span>
                            </div>
                            <div className="checkOutAddressInfor__option">
                                <Tag color="blue">Mặc định</Tag>
                                <Popover
                                    placement="bottomRight"
                                    title={'Địa chỉ'}
                                    content={
                                        <ContentAddress
                                            addressUser={addressUser}
                                            setCurrentAddress={setCurrentAddress}
                                            currenrAddress={currenrAddress}
                                            setIsLoadAddress={setIsLoadAddress}
                                        />
                                    }
                                    trigger="click"
                                    arrow={false}
                                >
                                    <Button type="link">Thay đổi</Button>
                                </Popover>
                            </div>
                        </div>
                    </div>
                    <div className="checkOutProduct">
                        <div className="checkOutProduct__Box">
                            <Table columns={columns} dataSource={dataTableCart} pagination={false} />
                            <div className="VoucherShop">
                                <div>
                                    <Popover
                                        placement="bottomRight"
                                        title={'Mã giảm giá'}
                                        content={contentVoucher}
                                        trigger="click"
                                        arrow={false}
                                    >
                                        <Button
                                            icon={
                                                <BsTicketPerforated
                                                    style={{
                                                        // fontSize: '18px',
                                                        fontSize: '24px',
                                                        color: 'red',
                                                    }}
                                                />
                                            }
                                            type="link"
                                        >
                                            Thêm mã giảm giá của Shop
                                        </Button>
                                    </Popover>
                                </div>
                            </div>
                            <div className="ChooseVoucher__typeTransport">
                                <div className="typeTransport__text">
                                    <span>Đơn vận chuyển</span>
                                </div>
                                <div className="typeTransport__result">
                                    <div className="typeTransport__Result__text">
                                        <span>{typeShipCurrent?.type.value}</span>
                                        {/* <span>Nhận hàng vào 10 Th08 - 14 Th08</span> */}
                                    </div>
                                    <Popover
                                        placement="bottomRight"
                                        title={'Địa chỉ'}
                                        content={
                                            <TypeShipJsx
                                                TypeShip={typeShip}
                                                setTypeshipCurrent={setTypeshipCurrent}
                                                typeShipCurrent={typeShipCurrent}
                                            />
                                        }
                                        trigger="click"
                                        arrow={false}
                                    >
                                        <Button type="link">Thay đổi</Button>
                                    </Popover>
                                </div>
                                <div className="PriceTransport">
                                    <span>{convertVND(Number(typeShipCurrent?.price))}</span>
                                </div>
                            </div>
                            <div className="TotalPrice__CheckOut">
                                <div className="TotalPrice__CheckOut__Text">
                                    <span>{`Tổng số tiền (1 sản phẩm)`}</span>
                                </div>
                                {getCartRedux?.useVoucherPrice != getCartRedux?.totalPrice ? (
                                    <div className="TotalPrice__CheckOut__result">
                                        <span className="originalPriceHaveVoucher">
                                            {convertVND(getCartRedux?.totalPrice ? getCartRedux?.totalPrice : 0)}
                                        </span>
                                        <span>{convertVND(totalPrice ? totalPrice : 0)}</span>
                                    </div>
                                ) : (
                                    <div className="TotalPrice__CheckOut__result">
                                        <span>{convertVND(totalPrice ? totalPrice : 0)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* <div className="checkOutVoucher">
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
                    </div> */}
                    <div className="MethodPay">
                        <div className="MethodPay__Box">
                            <div className="MethodPay__Box__text">
                                <span>Phương thức thanh toán</span>
                            </div>
                            <div className="MethodPay__Box__ChangeMethodPay">
                                <div className="MethodPay__Box__typePay">
                                    <span>{currentPayMent?.value}</span>
                                </div>
                                <Popover
                                    placement="bottomRight"
                                    title={'Phương thức thanh toán'}
                                    content={
                                        <PayMentJsx
                                            payMent={payMent}
                                            setCurrentPayment={setCurrentPayment}
                                            currentPayMent={currentPayMent}
                                        />
                                    }
                                    trigger="click"
                                    arrow={false}
                                >
                                    <Button type="link">Thay đổi</Button>
                                </Popover>
                            </div>
                        </div>
                        <div className="TotalPriceResult">
                            <Descriptions column={1} className="TotalPriceResult_Des">
                                <Descriptions.Item label="Tổng tiền hàng">
                                    {convertVND(Number(totalPrice))}
                                </Descriptions.Item>
                                <Descriptions.Item label="Phí vận chuyển">
                                    {convertVND(Number(typeShipCurrent?.price))}
                                </Descriptions.Item>
                                <Descriptions.Item label="tổng thanh toán" className="totalGoods">
                                    {convertVND(Number(totalPrice))}
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="TotalPriceResult__Btn">
                            <Button
                                onClick={() => {
                                    console.log('ok', currenrAddress?.id, typeShipCurrent?.id, currentPayMent?.code);
                                    if (
                                        currenrAddress?.id != undefined &&
                                        typeShipCurrent?.id != undefined &&
                                        currentPayMent?.code !== undefined
                                    ) {
                                        const data = {
                                            addressUserId: currenrAddress?.id,
                                            typeShipId: typeShipCurrent?.id,
                                            type: 'PAYMENT',
                                            voucherCode: voucherCode,
                                        };
                                        console.log(data);
                                        handleOrderProduct(data, currentPayMent?.code, navigate);
                                    } else {
                                        !currentPayMent && message.warning('Vui lòng chọn phương thức thanh toán');
                                    }
                                }}
                            >
                                Đặt hàng
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </>
    );
}
