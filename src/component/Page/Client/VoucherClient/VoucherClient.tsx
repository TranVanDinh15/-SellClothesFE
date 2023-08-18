import React, { useEffect, useState } from 'react';
import { Image, Row, Col, Badge, Button } from 'antd';
import './VoucherClient.scss';
import images from '../../../../asset';
import { handleAddVoucherinList, handleGetVoucherClient } from './VoucherClientMethod';
import { convertVND } from '../../Admin/common/method/method';

export interface listVoucherIF {
    id: number;
    fromDate: string;
    toDate: string;
    typeVoucherId: number;
    amount: number;
    statusId: string;
    usedAmount: number;
    codeVoucher: string;
    createdAt: string;
    updatedAt: string;
    addToUserAmount: number;
    typeVoucher: {
        id: number;
        typeVoucherCode: string;
        value: number;
        maxValue: number;
        minValue: number;
        statusId: string;
        createdAt: string;
        updatedAt: string;
    };
}
export default function VoucherClient() {
    // Lấy danh sách voucher hiện có của shop
    const [listVoucher, setListVoucher] = useState<listVoucherIF[] | null>(null);
    const [pageSize, setPageSize] = useState<any>(5);
    const [page, setPage] = useState<any>(1);
    const [total, setTotal] = useState<number>();
    console.log(listVoucher);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        handleGetVoucherClient(pageSize, page, setListVoucher, setTotal);
    }, []);
    return (
        <div className="VoucherClientWrapper">
            <div className="VoucherClientBox">
                <div className="VoucherBanner">
                    <Image
                        src="https://thuvienmuasam.com/uploads/default/original/2X/1/1ae37050401d2baa4ed2fabfae2258dc01d83af3.jpeg"
                        preview={false}
                        width={850}
                    />
                </div>
                <div className="VoucherTitle">
                    <Image
                        src="https://down-vn.img.susercontent.com/file/vn-50009109-4a4154fd61ceeab8396a9f91df4963d4@resize_w1920_nl.webp"
                        preview={false}
                        width={600}
                    />
                </div>
                <div className="VoucherTitle">
                    <Image
                        src="https://down-vn.img.susercontent.com/file/vn-50009109-3670bff95b36713bd7ab952d902769eb@resize_w1920_nl.webp"
                        preview={false}
                        width={500}
                    />
                </div>
                <div className="ListVoucherClient">
                    <Row gutter={[16, 16]}>
                        {listVoucher && listVoucher.length > 0
                            ? listVoucher.map((item, index) => {
                                  return (
                                      <>
                                          {item?.typeVoucher?.typeVoucherCode ==
                                          process.env.REACT_APP__CODE__VOUCHER__PERCENT ? (
                                              <Col span={8} key={index}>
                                                  <Badge.Ribbon
                                                      text={`x${Number(item?.amount) - Number(item?.addToUserAmount)}`}
                                                      color="red"
                                                  >
                                                      <div className="ListVoucherClient__Item ">
                                                          <div className="ListVoucherClient__Logo">
                                                              <Image src={images.logo} preview={false} width={80} />
                                                          </div>
                                                          <div className="ListVoucherClient__Item__Infor">
                                                              <div className="ListVoucherClient__Item__Infor__Text">
                                                                  <div className="VoucherClient__bigText">
                                                                      <span>Giảm {`${item?.typeVoucher.value}%`}</span>
                                                                  </div>
                                                                  <div className="VoucherClient__smallText">
                                                                      <span>
                                                                          Giảm tối đa{' '}
                                                                          {convertVND(
                                                                              Number(item?.typeVoucher.maxValue),
                                                                          )}
                                                                      </span>
                                                                  </div>
                                                                  <div className="VoucherClient__smallText">
                                                                      <span>Ngày hết hạn {item?.toDate}</span>
                                                                  </div>
                                                              </div>
                                                              <Button
                                                                  onClick={() => {
                                                                      handleAddVoucherinList(item?.codeVoucher);
                                                                  }}
                                                                  disabled={
                                                                      item?.amount == item?.addToUserAmount
                                                                          ? true
                                                                          : false
                                                                  }
                                                              >
                                                                  {item?.amount == item?.addToUserAmount
                                                                      ? 'Đã hết'
                                                                      : 'Lưu'}
                                                              </Button>
                                                          </div>
                                                      </div>
                                                  </Badge.Ribbon>
                                              </Col>
                                          ) : (
                                              <Col span={8} key={index}>
                                                  <Badge.Ribbon
                                                      text={`x${Number(item?.amount) - Number(item?.addToUserAmount)}`}
                                                      color="red"
                                                  >
                                                      <div className="ListVoucherClient__Item">
                                                          <div className="ListVoucherClient__Logo">
                                                              <Image src={images.logo} preview={false} width={80} />
                                                          </div>
                                                          <div className="ListVoucherClient__Item__Infor">
                                                              <div className="ListVoucherClient__Item__Infor__Text">
                                                                  <div className="VoucherClient__bigText">
                                                                      <span>
                                                                          Giảm{' '}
                                                                          {convertVND(Number(item?.typeVoucher.value))}
                                                                      </span>
                                                                  </div>
                                                                  <div className="VoucherClient__smallText">
                                                                      <span>
                                                                          Giảm tối đa{' '}
                                                                          {convertVND(
                                                                              Number(item?.typeVoucher.maxValue),
                                                                          )}
                                                                      </span>
                                                                  </div>
                                                                  <div className="VoucherClient__smallText">
                                                                      <span>Ngày hết hạn {item?.toDate}</span>
                                                                  </div>
                                                              </div>
                                                              <Button
                                                                  onClick={() => {
                                                                      handleAddVoucherinList(item?.codeVoucher);
                                                                  }}
                                                                  disabled={
                                                                      item?.amount == item?.addToUserAmount
                                                                          ? true
                                                                          : false
                                                                  }
                                                              >
                                                                  {item?.amount == item?.addToUserAmount
                                                                      ? 'Đã hết'
                                                                      : 'Lưu'}
                                                              </Button>
                                                          </div>
                                                      </div>
                                                  </Badge.Ribbon>
                                              </Col>
                                          )}
                                      </>
                                  );
                              })
                            : ''}
                    </Row>
                </div>
            </div>
        </div>
    );
}
