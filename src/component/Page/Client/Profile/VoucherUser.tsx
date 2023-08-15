import React, { useEffect, useState } from 'react';
import { listVoucherIF } from '../VoucherClient/VoucherClient';
import { useSelector } from 'react-redux';
import { useRedux } from '../Cart/Cart';
import { handleGetVoucherUser } from './ProfileMethod';
import { Badge, Col, Row, Image } from 'antd';
import images from '../../../../asset';
import { convertVND } from '../../Admin/common/method/method';
import { Button } from '@chakra-ui/react';

export default function VoucherUser() {
    // Lấy danh sách voucher hiện có của shop
    const [listVoucher, setListVoucher] = useState<listVoucherIF[] | null>(null);
    const [pageSize, setPageSize] = useState<any>(1000);
    const [page, setPage] = useState<any>(1);
    const [total, setTotal] = useState<number>();
    console.log(listVoucher);
    // Get User Hiện tại
    const curentUser = useSelector((state: useRedux) => state.reduxAuth.user);
    useEffect(() => {
        if (curentUser) {
            handleGetVoucherUser(Number(curentUser?.id), pageSize, page, setListVoucher, setTotal);
        }
    }, []);
    return (
        <div className="VoucherUserWrapper">
            <div className="VoucherUserTitle">
                <span>Đã Lưu</span>
            </div>
            <div className="ListVoucherClient">
                <Row gutter={[16, 16]}>
                    {listVoucher && listVoucher.length > 0
                        ? listVoucher.map((item, index) => {
                              return (
                                  <>
                                      {item?.typeVoucher?.typeVoucherCode ==
                                      process.env.REACT_APP__CODE__VOUCHER__PERCENT ? (
                                          <Col span={12} key={index}>
                                              <Badge.Ribbon text={`x1`} color="red">
                                                  <div className="ListVoucherClient__Item ListVoucherClient__ItemUser">
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
                                                                      {convertVND(Number(item?.typeVoucher.maxValue))}
                                                                  </span>
                                                              </div>
                                                              <div className="VoucherClient__smallText">
                                                                  <span>Ngày hết hạn {item?.toDate}</span>
                                                              </div>
                                                          </div>
                                                          <Button
                                                              onClick={() => {
                                                                  //   handleAddVoucherinList(item?.codeVoucher);
                                                              }}
                                                          >
                                                              Sử dụng
                                                          </Button>
                                                      </div>
                                                  </div>
                                              </Badge.Ribbon>
                                          </Col>
                                      ) : (
                                          <Col span={12} key={index}>
                                              <Badge.Ribbon text={`x1`} color="red">
                                                  <div className="ListVoucherClient__Item ListVoucherClient__ItemUser">
                                                      <div className="ListVoucherClient__Logo">
                                                          <Image src={images.logo} preview={false} width={80} />
                                                      </div>
                                                      <div className="ListVoucherClient__Item__Infor">
                                                          <div className="ListVoucherClient__Item__Infor__Text">
                                                              <div className="VoucherClient__bigText">
                                                                  <span>
                                                                      Giảm {convertVND(Number(item?.typeVoucher.value))}
                                                                  </span>
                                                              </div>
                                                              <div className="VoucherClient__smallText">
                                                                  <span>
                                                                      Giảm tối đa{' '}
                                                                      {convertVND(Number(item?.typeVoucher.maxValue))}
                                                                  </span>
                                                              </div>
                                                              <div className="VoucherClient__smallText">
                                                                  <span>Ngày hết hạn {item?.toDate}</span>
                                                              </div>
                                                          </div>
                                                          <Button
                                                              onClick={() => {
                                                                  //   handleAddVoucherinList(item?.codeVoucher);
                                                              }}
                                                          >
                                                              Sử dụng
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
    );
}
