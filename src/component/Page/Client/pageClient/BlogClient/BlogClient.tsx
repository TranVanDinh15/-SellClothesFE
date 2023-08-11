import React, { useEffect, useState } from 'react';
import './BlogClient.scss';
import { Breadcrumb, Card, Col, Row, Button, Image } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { handleGetBlogById } from './BlogClientMethod';
import { useNavigate, useParams } from 'react-router-dom';
export interface dataBlog {
    id: number;
    shortDescription: number;
    title: string;
    subjectId: string;
    statusId: string;
    images: string[];
    contentMarkdown: any;
    contentHtml: string;
    userId: number;
    view: number;
    createdAt: string;
    updatedAt: string;
    status: {
        value: string;
        code: string;
    };
    subject: {
        value: string;
        code: string;
    };
}
export default function BlogClient() {
    // navigate
    const navigate = useNavigate();
    const param = useParams();
    console.log(param);
    //    page size
    const [pageSizeBlog, setPageSizeBlog] = useState<number>(3);
    // current Page
    const [currentPage, setCurrentpage] = useState<number>(1);
    // total Item page
    const [totalItemPage, setTotalItemPage] = useState<number>(0);
    // data Blog
    const [listBlog, setListBlog] = useState<dataBlog[]>([]);

    console.log(listBlog);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        if (param && param?.subjectId) {
            handleGetBlogById(param?.subjectId, currentPage, pageSizeBlog, setListBlog, setTotalItemPage);
        }
    }, [param]);
    const news = (
        <Col span={8}>
            <div className="newsBlog">
                <div className="newsBlog_title">
                    <Button icon={<StarOutlined />} type="ghost">
                        Tin nổi bật
                    </Button>
                </div>
                <div className="newsBlog__Content">
                    <Row gutter={[16, 16]} className="newsBlog__Content__Row">
                        <Col span={12} className="newsBlog__Content__Col">
                            <Image
                                src="https://bizweb.dktcdn.net/thumb/medium/100/438/408/articles/phan-biet-fanpage-gia-mao-4.jpg?v=1685151128577"
                                preview={false}
                                // height={110}
                                width={'90%'}
                            />
                        </Col>
                        <Col span={12} className="newsBlog__Content__Col">
                            <div className="newsBlog__Content__title">
                                <span>CÔNG CỤ PHÂN BIỆT FANPAGE GIẢ MẠO YODY TRÊN MẠNG XÃ HỘI</span>
                            </div>
                            <div className="newsBlog__Content__Description">
                                <span>
                                    rong thời gian vừa qua với sự phát triển vượt trội của thương hiệu thời trang YODY,
                                    đã có không ít các Fanpage và Website giả mạo YODY xuất hiện tràn lan trên mạng xã
                                    hội. Chúng được tạo ra nhằm lừa đảo khách hàng, lấy danh nghĩa YODY để bán những mặt
                                    hàng kém chất lượng với giá rẻ. Bài viết này sẽ giúp nhận diện các chiêu trò lừa đảo
                                    phổ biến cũng nhưng cung cấp công cụ để khách hàng có thể xác định ngay các trang
                                    Fanpage giả mạo thương hiệu YODY trên mạng xã hội.
                                </span>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} className="newsBlog__Content__Row">
                        <Col span={12} className="newsBlog__Content__Col">
                            <Image
                                src="https://bizweb.dktcdn.net/thumb/medium/100/438/408/articles/phan-biet-fanpage-gia-mao-4.jpg?v=1685151128577"
                                preview={false}
                                // height={110}
                                width={'90%'}
                            />
                        </Col>
                        <Col span={12} className="newsBlog__Content__Col">
                            <div className="newsBlog__Content__title">
                                <span>CÔNG CỤ PHÂN BIỆT FANPAGE GIẢ MẠO YODY TRÊN MẠNG XÃ HỘI</span>
                            </div>
                            <div className="newsBlog__Content__Description">
                                <span>
                                    rong thời gian vừa qua với sự phát triển vượt trội của thương hiệu thời trang YODY,
                                    đã có không ít các Fanpage và Website giả mạo YODY xuất hiện tràn lan trên mạng xã
                                    hội. Chúng được tạo ra nhằm lừa đảo khách hàng, lấy danh nghĩa YODY để bán những mặt
                                    hàng kém chất lượng với giá rẻ. Bài viết này sẽ giúp nhận diện các chiêu trò lừa đảo
                                    phổ biến cũng nhưng cung cấp công cụ để khách hàng có thể xác định ngay các trang
                                    Fanpage giả mạo thương hiệu YODY trên mạng xã hội.
                                </span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Col>
    );

    return (
        <div className="BlogClientWarrapper">
            <div className="BlogClientBox">
                <div className="BlogClientBox__title">
                    <Breadcrumb
                        items={[
                            {
                                title: 'Trang chủ',
                            },
                            {
                                title: 'Thời trang',
                            },
                        ]}
                    />
                    <div className="BlogClientBox__title__text">
                        <span>Xu hướng thời trang</span>
                    </div>
                </div>
                <div className="BlogClientBox__Content">
                    <Row gutter={[16, 16]} className="BlogClientBox__Content__Row">
                        {listBlog.length > 0
                            ? listBlog.map((item, index, arr) => {
                                  return (
                                      <>
                                          {index == 2 ? (
                                              <>
                                                  {news}
                                                  <Col span={8}>
                                                      <Card
                                                          hoverable
                                                          style={{ width: '100%' }}
                                                          cover={
                                                              <img
                                                                  alt="example"
                                                                  src={`${process.env.REACT_APP_IMAGE_BLOGS_URL}${
                                                                      arr[2].images && arr[2]?.images[0]
                                                                  }`}
                                                                  style={{
                                                                      height: '300px',
                                                                      objectFit: 'contain',
                                                                  }}
                                                              />
                                                          }
                                                          onClick={() => {
                                                              navigate(`/${item.subjectId}/${item.id}`);
                                                          }}
                                                      >
                                                          <div className="BogItem__Title">
                                                              <span>{arr[2]?.title}</span>
                                                          </div>
                                                          <div className="BogItem__description">
                                                              <span>{arr[2]?.shortDescription}</span>
                                                          </div>
                                                      </Card>
                                                  </Col>
                                              </>
                                          ) : (
                                              <Col span={8}>
                                                  <Card
                                                      hoverable
                                                      style={{ width: '100%' }}
                                                      cover={
                                                          <img
                                                              alt="example"
                                                              src={`${process.env.REACT_APP_IMAGE_BLOGS_URL}${
                                                                  item.images && item?.images[0]
                                                              }`}
                                                              style={{
                                                                  height: '300px',
                                                                  objectFit: 'contain',
                                                              }}
                                                          />
                                                      }
                                                      onClick={() => {
                                                          navigate(`/${item.subjectId}/${item.id}`);
                                                      }}
                                                  >
                                                      <div className="BogItem__Title">
                                                          <span>{item?.title}</span>
                                                      </div>
                                                      <div className="BogItem__description">
                                                          <span>{item?.shortDescription}</span>
                                                      </div>
                                                  </Card>
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
