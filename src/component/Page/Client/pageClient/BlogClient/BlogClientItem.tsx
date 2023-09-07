import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { handleGetDetailBlog } from './BlogClientMethod';
import { Col, Row, Image, Breadcrumb, Button } from 'antd';
import './BlogClient.scss';
import { ClockCircleOutlined, EyeOutlined, StarOutlined } from '@ant-design/icons';
import MarkdownEditor from '@uiw/react-markdown-editor';
import ReactMarkdown from 'react-markdown';
export interface detailBlog {
    id: number;
    shortDescription: number;
    title: string;
    subjectId: string;
    statusId: string;
    images: string[];
    contentMarkdown: string;
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
const markdownContent = `
## Mục Lục

- [Tiêu đề 1](#tiêu-đề-1)
- [Tiêu đề 2](#tiêu-đề-2)
- [Tiêu đề 5](#tiêu-đề-5)

## Tiêu đề 1

Đây là nội dung cho tiêu đề 1.

## Tiêu đề 2

Đây là nội dung cho tiêu đề 2.
## Tiêu đề 1

Đây là nội dung cho tiêu đề 1.

## Tiêu đề 2

Đây là nội dung cho tiêu đề 2.
## Tiêu đề 1

Đây là nội dung cho tiêu đề 1.

## Tiêu đề 2

Đây là nội dung cho tiêu đề 2.
## Tiêu đề 1

Đây là nội dung cho tiêu đề 1.

## Tiêu đề 2

Đây là nội dung cho tiêu đề 2.
## Tiêu đề 1

Đây là nội dung cho tiêu đề 1.

## Tiêu đề 5

Đây là nội dung cho tiêu đề 2.

`;
export default function BlogClientItem() {
    const param = useParams();
    const [dataDetailBlog, setDataDetailBlog] = useState<detailBlog | undefined>();
    console.log(dataDetailBlog);
    useEffect(() => {
        if (param && param?.id) {
            handleGetDetailBlog(Number(param?.id), setDataDetailBlog);
        }
    }, []);

    return (
        <div className="DetailBlogWrapper">
            <Row gutter={16}>
                <Col span={16}>
                    {dataDetailBlog ? (
                        <>
                            <div className="DetalBlogStart">
                                <div className="DetalBlogStart__Image">
                                    <Image
                                        src={`${process.env.REACT_APP_IMAGE_BLOGS_URL}${dataDetailBlog.images[0]}`}
                                        preview={false}
                                    />
                                </div>
                                <div className="DetalBlogName">
                                    <span>{dataDetailBlog?.title    }</span>
                                </div>
                                <div className="DetalBlogStart__Breadcrumb">
                                    <Breadcrumb
                                        items={[
                                            {
                                                title: 'Home',
                                            },
                                            {
                                                title: <a href="">Application Center</a>,
                                            },
                                            {
                                                title: <a href="">Application List</a>,
                                            },
                                            {
                                                title: 'An Application',
                                            },
                                        ]}
                                    />
                                </div>
                                <div className='className="DetalBlogStart__TimeAdnView'>
                                    <Button type="ghost" icon={<ClockCircleOutlined />}>
                                        15/03/2001
                                    </Button>
                                    <Button type="ghost" icon={<EyeOutlined />}>
                                        {'0'} lượt xem
                                    </Button>
                                </div>
                            </div>
                            <div
                                className="contentBlogMain"
                                style={{
                                    lineHeight: '2',
                                }}
                                contentEditable="false"
                                dangerouslySetInnerHTML={{
                                    __html: `${dataDetailBlog ? dataDetailBlog?.contentHtml : ''}`,
                                }}
                            ></div>
                        </>
                    ) : (
                        ''
                    )}
                </Col>
                <Col span={8}>
                    <div className="newsBlog">
                        <div className="newsBlog_title">
                            <Button icon={<StarOutlined />} type="ghost">
                                Có thể bạn quan tâm
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
                                            rong thời gian vừa qua với sự phát triển vượt trội của thương hiệu thời
                                            trang YODY, đã có không ít các Fanpage và Website giả mạo YODY xuất hiện
                                            tràn lan trên mạng xã hội. Chúng được tạo ra nhằm lừa đảo khách hàng, lấy
                                            danh nghĩa YODY để bán những mặt hàng kém chất lượng với giá rẻ. Bài viết
                                            này sẽ giúp nhận diện các chiêu trò lừa đảo phổ biến cũng nhưng cung cấp
                                            công cụ để khách hàng có thể xác định ngay các trang Fanpage giả mạo thương
                                            hiệu YODY trên mạng xã hội.
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
                                            rong thời gian vừa qua với sự phát triển vượt trội của thương hiệu thời
                                            trang YODY, đã có không ít các Fanpage và Website giả mạo YODY xuất hiện
                                            tràn lan trên mạng xã hội. Chúng được tạo ra nhằm lừa đảo khách hàng, lấy
                                            danh nghĩa YODY để bán những mặt hàng kém chất lượng với giá rẻ. Bài viết
                                            này sẽ giúp nhận diện các chiêu trò lừa đảo phổ biến cũng nhưng cung cấp
                                            công cụ để khách hàng có thể xác định ngay các trang Fanpage giả mạo thương
                                            hiệu YODY trên mạng xã hội.
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
