import React, { useState, useEffect } from 'react';
import './Blog.scss';
import Content from '../common/Content/Content';
import CustomTable from '../../../Table/TableCustom';
import { Button, Col, Drawer, Form, Image, Input, Row, TablePaginationConfig, message } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
    handleAddBlog,
    handleGetBlog,
    handleGetSubjectId,
    handleUpdateBlog,
    handleUpdateImageBlog,
} from './BlogMethod';
import ModalCustomer from '../common/Modal/ModalCustomer';
import { useForm } from 'antd/es/form/Form';
import { getSubjectId } from '../../../utils/Api/Api';
import SelectCustomer from '../common/Select/Select';
import { HandleGetStatusSelect } from '../Banner/BannerMethod';
import MdEditor from 'react-markdown-editor-lite';
import UploadImageCustomer from '../common/UploadImage/UploadImage';
import { Avatar, List } from 'antd';
import { GetContext } from '../common/Context/Context';
var MarkdownIt = require('markdown-it');
const mdParser = new MarkdownIt(/* Markdown-it options */);
interface markdownProps {
    html: any;
    text: any;
}
export interface formAddBlog {
    title: string;
    shortDescription: string;
}
export interface selectBlog {
    value: string;
    label: string;
}
export interface dataUpdate {
    createdAt: string;
    id: number;
    contentHtml: string;
    contentMarkdown: string;
    images: any;
    shortDescription: string;
    statusId: string;
    subjectId: string;
    title: string;
}
export interface formUpdate {
    image: any;
    shortDescription: string;
    statusId: string;
    subjectId: string;
    title: string;
}
export default function Blog() {
    const { imagesUploadMultiple, setImagesUploadMultiple, setImageDp }: any = GetContext();
    const [formAdd] = useForm<formAddBlog>();
    const [formUpdate] = useForm<formUpdate>();
    // Quản lý giá trị của Markdown editor
    const [value, setValue] = useState<any>('**Hello world!!!**');
    const [text, setText] = useState<any>('**Hello world!!!**');
    console.log(text, value);
    const [dataTable, setDataTable] = useState<[]>([]);
    console.log(dataTable);
    const [total, setTotal] = useState<number>(0);
    const [pageSize, setPageSize] = useState<any>(5);
    const [page, setPage] = useState<any>(1);
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    // Quản lý đóng mở update Blog
    const [isOpenUpdateBlog, setIsOpenUpdateBlog] = useState<boolean>(false);
    // Quản lý load lại data
    const [isLoadBlog, setIsLoadBlog] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [subjectBlog, setSubjectBlog] = useState<selectBlog[] | undefined>();
    const [statusSelect, setStatusSelect] = useState<selectBlog[] | undefined>();
    // dữ liệu cập nhật Blog
    const [dataUpdateBlog, setDataUpdateBlog] = useState<dataUpdate>();
    console.log(dataUpdateBlog);
    // isUpdateImage
    const [isupdateImage, setIsUpdateImage] = useState<boolean>(false);
    const [imageUpdate, setImageUpdate] = useState<any>();
    const [open, setOpen] = useState(false);
    console.log(imageUpdate);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];
    const TitleTable = () => {
        return (
            <div className="titleTable">
                <div className="titleTable__Heading">
                    <span>Danh sách bài đăng</span>
                </div>
                <div className="titleTable__btn">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="btnButton"
                        onClick={() => {
                            setIsModalAddOpen(true);
                        }}
                    >
                        Thêm bài đăng
                    </Button>
                    {/* Add Blog */}
                    <ModalCustomer
                        isModalOpen={isModalAddOpen}
                        handleOk={() => {}}
                        handleCancel={() => {
                            setIsModalAddOpen(false);
                        }}
                        title={'Thêm bài đăng'}
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
                            onFinish={(value) => {
                                handleAddBlog(value, isLoadBlog, setIsLoadBlog, setIsModalAddOpen, formAdd);
                            }}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Tên bài viết"
                                name="title"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Mô tả ngắn"
                                name="shortDescription"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Thêm nhập hàng
                                </Button>
                            </Form.Item>
                        </Form>
                    </ModalCustomer>
                </div>
            </div>
        );
    };
    const paginationConfig: TablePaginationConfig = {
        total: total ? total : 0, // Tổng số mục dữ liệu
        pageSize: pageSize, // Số mục dữ liệu trên mỗi trang
        current: page, // Trang hiện tại
        defaultCurrent: 1,
        onChange: (page, pageSize) => {
            // Xử lý sự kiện thay đổi trang
            setPage(page);
            setPageSize(pageSize);
        },
        showSizeChanger: true, // Hiển thị chọn kích thước trang
        pageSizeOptions: ['5', '10', '20', '50', '100'], // Tùy chọn kích thước trang
        position: ['bottomCenter'],
    };

    // Finish!
    function handleEditorChange({ html, text }: markdownProps) {
        setText(text);
        setValue(html);
        console.log(html);
    }
    useEffect(() => {
        console.log('load');
        handleGetBlog(page, pageSize, setDataTable, setTotal);
    }, [isLoadBlog, pageSize, page]);
    useEffect(() => {
        handleGetSubjectId(setSubjectBlog);
        HandleGetStatusSelect(setStatusSelect);
    }, []);
    useEffect(() => {
        if (dataUpdateBlog) {
            formUpdate.setFieldsValue({
                shortDescription: dataUpdateBlog?.shortDescription,
                statusId: dataUpdateBlog?.statusId,
                subjectId: dataUpdateBlog?.subjectId,
                title: dataUpdateBlog?.title,
            });
            setText(dataUpdateBlog?.contentMarkdown);
            setImageUpdate(dataUpdateBlog.images);
        }
    }, [dataUpdateBlog]);

    return (
        <Content title={'Danh sách bài đăng'}>
            <div className="BlogWrapper">
                <CustomTable
                    name="Blog"
                    title={TitleTable}
                    dataSource={dataTable}
                    paginationConfig={paginationConfig}
                    showModalUpdate={() => {
                        setIsOpenUpdateBlog(true);
                    }}
                    isDelete={isDelete}
                    setIsDelete={setIsDelete}
                    setdataUpdate={setDataUpdateBlog}
                    showDrawer={showDrawer}
                />
            </div>
            <ModalCustomer
                isModalOpen={isOpenUpdateBlog}
                handleOk={() => {}}
                handleCancel={() => {
                    setIsOpenUpdateBlog(false);
                }}
                title={'Cập nhật bài đăng'}
                footer={true}
                showModal={() => {
                    setIsOpenUpdateBlog(true);
                }}
                width={900}
            >
                <Form
                    form={formUpdate}
                    name="basic"
                    labelCol={{ span: 24 }}
                    onFinish={(values) => {
                        console.log(value);
                        if (dataUpdateBlog) {
                            handleUpdateBlog(
                                dataUpdateBlog?.id,
                                values,
                                value,
                                text,
                                imageUpdate ? imageUpdate : [],
                                setIsOpenUpdateBlog,
                                setIsLoadBlog,
                            );
                        } else {
                            message.error('Đã có lỗi xảy ra');
                        }
                    }}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item
                                label="Tên bài viết"
                                name="title"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Mô tả ngắn"
                                name="shortDescription"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item
                                label="Thể loại"
                                name="subjectId"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <SelectCustomer
                                    mode=""
                                    option={subjectBlog ? [...subjectBlog] : []}
                                    onChange={(value: any) => {}}
                                    onSearch={(value: any) => {}}
                                ></SelectCustomer>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Trạng thái"
                                name="statusId"
                                rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                            >
                                <SelectCustomer
                                    mode=""
                                    option={statusSelect ? [...statusSelect] : []}
                                    onChange={(value: any) => {}}
                                    onSearch={(value: any) => {}}
                                ></SelectCustomer>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Item label="Viết blog">
                            <MdEditor
                                style={{ height: '200px' }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={handleEditorChange}
                                value={text}
                            />
                        </Form.Item>
                    </Row>
                    <Row
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Form.Item label="Ảnh blog" name="image">
                            <UploadImageCustomer multilple={true} />
                        </Form.Item>
                        <Form.Item name="image">
                            <Button
                                type="primary"
                                onClick={() => {
                                    if (dataUpdateBlog) {
                                        const data = {
                                            contentHtml: dataUpdateBlog.contentHtml
                                                ? dataUpdateBlog.contentHtml
                                                : value,
                                            contentMarkdown: dataUpdateBlog.contentMarkdown
                                                ? dataUpdateBlog.contentMarkdown
                                                : '**Hello world!!!**',
                                            images:
                                                imageUpdate && imageUpdate.length > 0
                                                    ? imagesUploadMultiple.length > 0
                                                        ? imagesUploadMultiple
                                                              .map((item: any) => {
                                                                  if (item?.image) {
                                                                      return item?.image;
                                                                  }
                                                              })
                                                              .concat(imageUpdate)
                                                        : imageUpdate
                                                    : imagesUploadMultiple.map((item: any) => {
                                                          if (item?.image) {
                                                              return item?.image;
                                                          }
                                                      }),
                                            shortDescription: dataUpdateBlog.shortDescription,
                                            statusId: dataUpdateBlog.statusId,
                                            subjectId: dataUpdateBlog.subjectId
                                                ? dataUpdateBlog.subjectId
                                                : formUpdate?.getFieldValue('subjectId'),
                                            title: dataUpdateBlog.title,
                                        };
                                        handleUpdateImageBlog(
                                            dataUpdateBlog?.id,
                                            data,
                                            setIsLoadBlog,
                                            setImageUpdate,
                                            page,
                                            pageSize,
                                            setImagesUploadMultiple,
                                            setImageDp,
                                        );
                                        console.log(data);
                                    }
                                }}
                            >
                                Lưu
                            </Button>
                        </Form.Item>
                    </Row>
                    {/* <Row> */}
                    {imageUpdate
                        ? imageUpdate.map((item: any, index: number) => {
                              return (
                                  <div
                                      style={{
                                          display: 'flex',
                                          gap: '20px',
                                          alignItems: 'center',
                                      }}
                                      key={index}
                                  >
                                      <Image src={`${process.env.REACT_APP_IMAGE_BLOGS_URL}${item}`} height={60} />
                                      <span>{`${process.env.REACT_APP_IMAGE_BLOGS_URL}${item}`}</span>
                                      <Button
                                          icon={<CloseOutlined />}
                                          onClick={() => {
                                              console.log(item);
                                              console.log(item[index]);
                                              //   const spliceImage = imageUpdate.splice(item, 1);
                                              const filter = imageUpdate.filter((itemImage: any) => {
                                                  return itemImage != item;
                                              });
                                              setImageUpdate(filter);
                                              console.log(filter);
                                          }}
                                      ></Button>
                                  </div>
                              );
                          })
                        : ''}

                    {/* </Row> */}
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
            {/* Xem blog */}
            <Drawer title="Bài viết" placement="right" width={'60%'} onClose={onClose} open={open}>
                <div
                    style={{
                        lineHeight: '2',
                    }}
                    contentEditable="false"
                    dangerouslySetInnerHTML={{
                        __html: `${dataUpdateBlog ? dataUpdateBlog?.contentHtml : ''}`,
                    }}
                ></div>
            </Drawer>
        </Content>
    );
}
