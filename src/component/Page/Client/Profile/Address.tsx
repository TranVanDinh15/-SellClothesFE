import { Button, Descriptions, Row, Col, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import ModalCustomer from '../../Admin/common/Modal/ModalCustomer';
import { useForm } from 'antd/es/form/Form';
import SelectCustomer from '../../Admin/common/Select/Select';
import {
    handleCreateAddress,
    handleGetAddress,
    handleGetProvinces,
    handleUpdateAddress,
    onChangeDistrictSelect,
    onChangeProvincesSelect,
    onChangeWardSelect,
} from './ProfileMethod';
import Item from 'antd/es/list/Item';
import DeleteCustom from '../../Admin/common/Delete/DeleteCustom';
import { deleteAddress } from '../../../utils/Api/Api';
export interface formAddAddress {
    shipName: string;
    shipPhoneNumber: string;
    shipEmail: string;
    provinces: string;
    district: string;
    ward: string;
    shipAddress: string;
}
export interface provincesIF {
    value: string;
    label: string;
}
export interface DistrictIF {
    value: string;
    label: string;
}
export interface WardIF {
    value: string;
    label: string;
}
export interface AddressIF {
    createdAt: string;
    id: number;
    shipAddress: string;
    shipEmail: string;
    shipName: string;
    shipPhoneNumber: string;
    statusId: string;
    updatedAt: string;
    userId: Number;
}
export default function Address() {
    // Form cua add Banner
    const [formAdd] = useForm<formAddAddress>();
    const [formUpdate] = useForm<formAddAddress>();
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
    const [listProvinces, setListProvinces] = useState<provincesIF[] | null>(null);
    const [listDistrict, setListDistrict] = useState<DistrictIF[] | null>(null);
    const [listWard, setListWard] = useState<WardIF[] | null>(null);
    // Tên tỉnh thành phố
    const [provincesName, setProvincesName] = useState<string>('');
    // Tên quận , huyện
    const [DistrictName, setDistrictName] = useState<string>('');
    // Tên thị trấn, xã
    const [WardName, setWardName] = useState<string>('');
    // Lấy địa chỉ hiện có
    const [addressUser, setAddressUser] = useState<AddressIF[] | null>(null);
    const [isLoadAddress, setIsLoadAddress] = useState<boolean>(false);
    // Id của địa chỉ , dùng để update
    const [idAddress, setIdAddress] = useState<number | null>(null);
    console.log(addressUser);
    useEffect(() => {
        handleGetProvinces(setListProvinces);
    }, []);
    useEffect(() => {
        handleGetAddress(setAddressUser);
        setProvincesName('');
        setDistrictName('');
        setWardName('');
    }, [isLoadAddress]);
    return (
        <div className="AddressWrapper">
            <div className="Address__Box">
                <div className="Address__title">
                    <span>Địa chỉ của bạn</span>
                </div>
                <div
                    className="Address__Btn"
                    onClick={() => {
                        setIsModalAddOpen(true);
                    }}
                >
                    <Button>Thêm địa chỉ</Button>
                </div>
            </div>
            <div className="Address__Infor">
                {addressUser
                    ? addressUser.map((item, index) => {
                          return (
                              <div className="Address__Infor__Item" key={index}>
                                  <Descriptions column={1}>
                                      <Descriptions.Item label="Họ tên">Trần Văn Định</Descriptions.Item>
                                      <Descriptions.Item label="Địa chỉ">{item?.shipAddress}</Descriptions.Item>
                                      <Descriptions.Item label="Số điện thoại">
                                          {item?.shipPhoneNumber}
                                      </Descriptions.Item>
                                  </Descriptions>
                                  <div>
                                      <Button
                                          type="link"
                                          onClick={() => {
                                              setIsModalUpdateOpen(true);
                                              formUpdate.setFieldsValue({
                                                  shipName: item?.shipName,
                                                  shipPhoneNumber: item?.shipPhoneNumber,
                                                  shipEmail: item?.shipEmail,
                                                  shipAddress: item?.shipAddress,
                                              });
                                              setIdAddress(Number(item?.id));
                                          }}
                                      >
                                          Sửa
                                      </Button>
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
                      })
                    : ''}
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
                    autoComplete="off"
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
            {/* Update Address */}
            <ModalCustomer
                isModalOpen={isModalUpdateOpen}
                handleOk={() => {}}
                handleCancel={() => {
                    setIsModalUpdateOpen(false);
                }}
                title={'Cập nhật địa chỉ'}
                footer={true}
                showModal={() => {
                    setIsModalUpdateOpen(true);
                }}
            >
                <Form
                    form={formUpdate}
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

                        idAddress &&
                            handleUpdateAddress(
                                Number(idAddress),
                                data,
                                setIsModalUpdateOpen,
                                formUpdate,
                                setIsLoadAddress,
                            );
                    }}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
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
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </ModalCustomer>
        </div>
    );
}
