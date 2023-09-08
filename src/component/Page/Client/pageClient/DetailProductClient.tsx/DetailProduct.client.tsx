import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Breadcrumb,
    Button,
    Checkbox,
    Col,
    Collapse,
    CollapseProps,
    Form,
    Image,
    Pagination,
    Progress,
    Rate,
    Row,
    Slider,
    Space,
    Tooltip,
    message,
    notification,
} from 'antd';
import './DetailProduct.client.scss';
import { Link } from 'react-router-dom';
import {
    CloseOutlined,
    CloseSquareOutlined,
    DislikeOutlined,
    DownOutlined,
    LikeOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { SiZenn } from 'react-icons/si';
import { useNumberInput, HStack, Input } from '@chakra-ui/react';
import {
    getProductByIdFun,
    handleAddInCart,
    handleCancelComment,
    handleDislikevsUndislike,
    handleEvaluateProduct,
    handleGetCommentProduct,
    handleLikeAndUnlike,
    handleOkAddComment,
    handleRepComment,
    onChangePageCmt,
    onChangeSliderHeightSize,
    onChangeSliderWeightSize,
} from './method.DPClient';
import { io } from 'socket.io-client';
import ReactImageGallery from 'react-image-gallery';
import { convertVND, covertCreateAt } from '../../../Admin/common/method/method';
import ModalCustomer from '../../../Admin/common/Modal/ModalCustomer';
import { GetContext } from '../../../Admin/common/Context/Context';
import UploadImageCustomer from '../../../Admin/common/UploadImage/UploadImage';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { socket } from '../../../Admin/common/Socket/SocketConfig';
export interface useRedux {
    reduxAuth: {
        isAuthenticate: boolean;
        user: any;
        isLoading: boolean;
        isfail: boolean;
    };
}
interface HookUsageInterFace {
    setAmountinstance: React.Dispatch<React.SetStateAction<number>>;
}
function HookUsage({ setAmountinstance }: HookUsageInterFace) {
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
    useEffect(() => {
        setAmountinstance(Number(input['aria-valuenow']));
    }, [input, inc, dec]);
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
// data filter comment
const filterComent = [
    {
        id: 0,
        name: 'Tất cả',
        value: 0,
    },
    {
        id: 1,
        name: '5 Sao ',
        value: 5,
    },
    {
        id: 2,
        name: '4 Sao',
        value: 4,
    },
    {
        id: 3,
        name: '3 Sao',
        value: 3,
    },
    {
        id: 4,
        name: '2 Sao',
        value: 2,
    },
    {
        id: 5,
        name: '1 Sao',
        value: 1,
    },
];
// data Interact

// const socket = io('http://localhost:8080/');

export default function DetailProductClient() {
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();
    // Get User Hiện tại
    const curentUser = useSelector((state: useRedux) => state.reduxAuth.user);
    // Lấy query từ URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(urlSearchParams.entries());
    console.log(queryParams);
    const { imagesUploadMultiple, setImagesUploadMultiple, setIsLoadCart }: any = GetContext();
    // Quản lý dữ liệu Product hiện tại
    const [productData, setProductData] = useState<any>();
    // State Detail product
    const [currentDetailProduct, setCurrentDetailProduct] = useState<any>();
    // isLoading
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // Hepl height cutomer
    const [heplHeight, setHelpHeight] = useState<number>(145);
    // Hepl weight cutomer
    const [heplWeight, setHelpWeight] = useState<number>(40);
    // Sau khi chọn chiều cao và cân năng xong sẽ set State
    const [resultSize, setResultSize] = useState<string>('');
    // Đóng mở Modal
    const [isModalAddComment, setIsModalAddComment] = useState<boolean>(false);
    // Quản lý comment
    const [listComment, setListComment] = useState<any>();
    // Cmt user
    const [cmtUser, setCmtUser] = useState<any>();
    // Quanr lý star client đánh giá
    const [evaluateStar, setEvaluateStar] = useState<number>(5);
    // Quản lý đánh giá sản phẩm
    const [evaluateText, setEvaluateText] = useState<any>('');
    // Dùng để quản lý gọi getComment chạy khi có thay đổi
    const [isGetCommentLoad, setIsgetCommentLoad] = useState<boolean>(false);
    // Quản  lý đóng mở rep comment
    const [isRepComment, setIsRepComment] = useState<any>();
    // Nội dung rep cmt
    const [contentRepCmt, setContentRepCmt] = useState<string>('');
    //
    const [isEmtyRepCmt, setIsEmtyRepCmt] = useState<boolean>(true);
    // Sau khi  Rep Cmt
    const [afterRepCmt, setAfterRepCmt] = useState<boolean>(false);
    // Israting
    const [isRaiting, setIsRaiting] = useState<any>();
    //    page size
    const [pageSizeCmt, setPageSizeCmt] = useState<number>(3);
    // current Page
    const [currentPage, setCurrentpage] = useState<number>(1);
    // total Item page
    const [totalItemPage, setTotalItemPage] = useState<number>(0);
    // hold get star cmt
    const [star, setStar] = useState<number>(0);
    // is filter cmt isChoose
    const [isChooseCmt, setIsChooseCmt] = useState<any>();
    // Lưu Id size
    const [idSize, setIdSize] = useState<number | undefined>();
    // Lưu số lượng khách hàng cần mua
    const [amountInstance, setAmountInstance] = useState<number>(1);
    const [isLoadProduct, setIsLoadProduct] = useState<boolean>(false);
    const chooseSliderSize = (
        <div className="sliderChooseSize">
            <div className="sliderChooseSize__Item">
                <div className="sliderChooseSize__title">
                    <div className="sliderChooseSize__title__tallWeight">
                        <span>Chiều cao</span>
                    </div>
                    <div className="sliderChooseSize__title__Number">
                        <span>{heplHeight} cm</span>
                    </div>
                </div>
                <Slider
                    min={145}
                    max={185}
                    defaultValue={145}
                    onAfterChange={(value) => {
                        onChangeSliderHeightSize(
                            value,
                            setHelpHeight,
                            heplWeight,
                            currentDetailProduct?.size,
                            setResultSize,
                            setIdSize,
                        );
                        // setIdSize(undefined);
                    }}
                />
            </div>
            <div className="sliderChooseSize__Item">
                <div className="sliderChooseSize__title">
                    <div className="sliderChooseSize__title__tallWeight">
                        <span>Cân nặng</span>
                    </div>
                    <div className="sliderChooseSize__title__Number">
                        <span>{heplWeight} Kg</span>
                    </div>
                </div>
                <Slider
                    min={40}
                    max={80}
                    defaultValue={40}
                    onAfterChange={(value) => {
                        onChangeSliderWeightSize(
                            value,
                            setHelpWeight,
                            heplHeight,
                            currentDetailProduct?.size,
                            setResultSize,
                            setIdSize,
                        );
                    }}
                />
            </div>
            {resultSize ? (
                <div className="sliderChooseSize__ResultHelpSize">
                    <span>Chúng tôi chọn giúp bạn Size: {resultSize} </span>
                </div>
            ) : (
                ''
            )}
        </div>
    );
    console.log(currentDetailProduct);
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: (
                <Button type="text" icon={<SiZenn />} className="helpsizeBtn">
                    Giúp bạn chọn size
                </Button>
            ),
            children: chooseSliderSize,
            style: {
                transitionDuration: '0.2s',
            },
        },
    ];
    // đánh giá cmt cha
    const interRact = [
        {
            id: 1,
            classname: 'sendUser',
            icon: '',
            name: 'Gửi trả lời',
        },
        {
            id: 2,
            classname: 'likeUser',
            icon: <LikeOutlined />,
            name: 'Thích',
        },
        {
            id: 3,
            classname: 'disLikeUser',
            icon: <DislikeOutlined />,
            name: 'Không thích',
        },
    ];
    // đánh giá cmt con
    const interRactChild = [
        {
            id: 1,
            icon: <LikeOutlined />,
            name: 'Thích',
        },
        {
            id: 2,
            icon: <DislikeOutlined />,
            name: 'Không thích',
        },
    ];
    useEffect(() => {
        if (queryParams?.id) {
            getProductByIdFun(queryParams?.id, setProductData, setCurrentDetailProduct, setIsLoading);
        }
    }, [isGetCommentLoad, isLoadProduct]);
    useEffect(() => {
        handleGetCommentProduct(
            Number(queryParams?.id),
            currentPage,
            pageSizeCmt,
            setTotalItemPage,
            setListComment,
            curentUser,
            setCmtUser,
            setIsRaiting,
            star,
        );
    }, [isGetCommentLoad, afterRepCmt, currentPage, star]);
    useEffect(() => {
        setContentRepCmt('');
    }, [isRepComment]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        socket.on('productUpdated', (data) => {
            console.log(data);
            if (queryParams && queryParams?.id && Number(queryParams?.id) == Number(data?.productId)) {
                console.log(data);
                setIsLoadProduct((isLoadProduct) => !isLoadProduct);
            }
        });
    }, []);

    return (
        <div className="DetailProductClient">
            <div className="DetailProductClient__container">
                <Breadcrumb
                    items={[
                        {
                            title: <Link to={'/'}>Trang chủ</Link>,
                        },
                        {
                            title: <a href="">Chi tiết sản phẩm</a>,
                        },
                        {
                            title: <a href="">Áo Polo Nam Pique Mắt Chim Basic Co Giãn Thoáng Khí</a>,
                        },
                    ]}
                />
                {productData ? (
                    <div className="DetailProductClient__content">
                        <Row gutter={30}>
                            <Col span={15}>
                                <div className="DetailProductClient__content__listImage">
                                    <ReactImageGallery
                                        showFullscreenButton={false}
                                        showPlayButton={false}
                                        // slideOnThumbnailOver={true}
                                        items={
                                            currentDetailProduct
                                                ? currentDetailProduct?.images?.map((item: any) => {
                                                      return {
                                                          original: `${process.env.REACT_APP_IMAGE_PRODUCT}${item}`,
                                                          thumbnail: `${process.env.REACT_APP_IMAGE_PRODUCT}${item}`,
                                                      };
                                                  })
                                                : []
                                        }
                                    />
                                </div>
                                <div className="DetailProductClient__content__descriptiondetail">
                                    <div className="descriptionDetailProduct__title">
                                        <span>Đặc tính nổi bật</span>
                                    </div>
                                    <div className="descriptionDetailProduct__content">
                                        <p>{currentDetailProduct?.description}</p>
                                    </div>
                                </div>
                                <Collapse
                                    items={[
                                        {
                                            key: '1',
                                            label: 'Chi tiết sản phẩm',
                                            children: (
                                                <div
                                                    contentEditable="false"
                                                    dangerouslySetInnerHTML={{
                                                        __html: currentDetailProduct?.description,
                                                    }}
                                                ></div>
                                            ),
                                        },
                                    ]}
                                    className="detailProductPart"
                                />
                                <div className="RattingVsComment">
                                    <div className="descriptionDetailProduct__title">
                                        <span>Đánh giá</span>
                                    </div>
                                    <div className="RattingVsComment__Box">
                                        <div className="RattingVsComment__Box__Star">
                                            <div className="RattingVsComment__Box__Star__Text">
                                                <span>{Math.floor(productData?.rating)} / 5</span>
                                            </div>
                                            <div className="RattingVsComment__Box__Star__Rate">
                                                <Rate
                                                    disabled
                                                    value={productData?.rating}
                                                    style={{
                                                        fontSize: '26px',
                                                    }}
                                                />
                                            </div>
                                            <div className="amountComment">
                                                <span>( {isRaiting ? isRaiting.length : '0'} đánh giá )</span>
                                            </div>
                                            <div className="sendComment">
                                                <Button
                                                    type="ghost"
                                                    onClick={() => {
                                                        setIsModalAddComment(true);
                                                    }}
                                                >
                                                    Gửi đánh giá
                                                </Button>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                // flexDirection: 'column',
                                                // justifyContent: 'right',
                                                flexBasis: '50%',
                                                gap: '20px',
                                                flexWrap: 'wrap',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {filterComent.map((item, index) => {
                                                return (
                                                    <Button
                                                        key={index}
                                                        style={{
                                                            width: '80px',
                                                            borderRadius: 'initial',
                                                            border: '1px solid rgb(0, 191, 255)',
                                                        }}
                                                        className={
                                                            isChooseCmt && isChooseCmt === item?.id
                                                                ? 'filterCmtChoose'
                                                                : ''
                                                        }
                                                        onClick={() => {
                                                            setStar(item.value);
                                                            setIsChooseCmt(item?.id);
                                                        }}
                                                        type="ghost"
                                                    >
                                                        {item.name}
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    {/* Cmt user sẽ hiện lên đầu khi người dùng có đăng nhập */}
                                    {cmtUser ? (
                                        <div className="comment__user">
                                            {
                                                <div className="ListComment__Container">
                                                    <div className="ListComment__Name">
                                                        <div className="ListComment__Name__Text">
                                                            <span>{`${cmtUser?.user?.lastName} ${cmtUser?.user?.firstName}`}</span>
                                                        </div>
                                                        <div className="ListComment__Name__Rate">
                                                            <Rate
                                                                value={cmtUser?.star}
                                                                style={{
                                                                    fontSize: '14px',
                                                                }}
                                                                disabled
                                                            />
                                                        </div>

                                                        <div className="ListComment__createAt">
                                                            <span>{covertCreateAt(cmtUser?.createdAt)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="ListComment__Text">
                                                        <span
                                                            style={{
                                                                color: '#212b35',
                                                            }}
                                                        >
                                                            {cmtUser?.content}
                                                        </span>
                                                        {cmtUser?.images && cmtUser?.images.length > 0 ? (
                                                            <Space>
                                                                {cmtUser?.images.map((image: any, index: number) => {
                                                                    return (
                                                                        <Image
                                                                            key={index}
                                                                            height={72}
                                                                            src={`${process.env.REACT_APP_IMAGE_CMT}${image}`}
                                                                        />
                                                                    );
                                                                })}
                                                            </Space>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>
                                                    <div className="ListComment__Interact">
                                                        {interRact.map((itemInterract, index) => {
                                                            return (
                                                                <span
                                                                    key={index}
                                                                    className={itemInterract.classname}
                                                                    style={{
                                                                        color:
                                                                            itemInterract.id == 2 &&
                                                                            curentUser &&
                                                                            cmtUser?.likeList.some((item: any) => {
                                                                                return item?.id == curentUser?.id;
                                                                            })
                                                                                ? 'blue'
                                                                                : '#000' &&
                                                                                  itemInterract.id == 3 &&
                                                                                  curentUser &&
                                                                                  cmtUser?.dislikeList.some(
                                                                                      (item: any) => {
                                                                                          return (
                                                                                              item?.id == curentUser?.id
                                                                                          );
                                                                                      },
                                                                                  )
                                                                                ? 'red'
                                                                                : '#000',
                                                                    }}
                                                                    onClick={() => {
                                                                        if (itemInterract.id == 1) {
                                                                            setIsRepComment(cmtUser?.id);
                                                                            if (isRepComment) {
                                                                                setIsRepComment('');
                                                                            }
                                                                        }
                                                                        if (itemInterract.id == 2) {
                                                                            handleLikeAndUnlike(
                                                                                cmtUser?.id,
                                                                                afterRepCmt,
                                                                                setAfterRepCmt,
                                                                            );
                                                                        }
                                                                        if (itemInterract.id == 3) {
                                                                            handleDislikevsUndislike(
                                                                                cmtUser?.id,
                                                                                afterRepCmt,
                                                                                setAfterRepCmt,
                                                                            );
                                                                        }
                                                                    }}
                                                                >
                                                                    {itemInterract?.icon} {itemInterract.name}{' '}
                                                                    {itemInterract.id == 2
                                                                        ? `(${cmtUser?.likeList.length})`
                                                                        : ''}
                                                                    {itemInterract.id == 3
                                                                        ? `(${cmtUser?.dislikeList.length})`
                                                                        : ''}
                                                                </span>
                                                            );
                                                        })}
                                                    </div>
                                                    {/* Rep Cmt */}
                                                    {isRepComment && isRepComment == cmtUser?.id ? (
                                                        <div className="repComment">
                                                            <div className="repComment__Input">
                                                                <Input
                                                                    placeholder={'Nhập trả lời của bạn'}
                                                                    value={contentRepCmt}
                                                                    onChange={(event) => {
                                                                        setContentRepCmt(event.target.value);
                                                                        if (event.target.value) {
                                                                            setIsEmtyRepCmt(true);
                                                                        } else {
                                                                            setIsEmtyRepCmt(false);
                                                                        }
                                                                    }}
                                                                />
                                                                {isEmtyRepCmt ? (
                                                                    ''
                                                                ) : (
                                                                    <div
                                                                        style={{
                                                                            marginTop: '4px',
                                                                            color: 'red',
                                                                        }}
                                                                    >
                                                                        <span>Bạn không được để trống trường này</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <Button
                                                                    type="ghost"
                                                                    style={{
                                                                        backgroundColor: 'rgb(0, 191, 255)',
                                                                        minHeight: '40px',
                                                                        color: '#fff',
                                                                        borderRadius: 'initial',
                                                                    }}
                                                                    onClick={() => {
                                                                        handleRepComment(
                                                                            Number(queryParams?.id),
                                                                            contentRepCmt,
                                                                            cmtUser?.id,
                                                                            api,
                                                                            setIsRepComment,
                                                                            setAfterRepCmt,
                                                                            afterRepCmt,
                                                                        );
                                                                        if (!contentRepCmt) {
                                                                            setIsEmtyRepCmt(false);
                                                                        }
                                                                    }}
                                                                >
                                                                    Trả lời
                                                                </Button>
                                                            </div>
                                                            <div
                                                                onClick={() => {
                                                                    setIsRepComment('');
                                                                    setIsEmtyRepCmt(true);
                                                                }}
                                                            >
                                                                <CloseOutlined
                                                                    style={{
                                                                        fontSize: '18px',
                                                                        cursor: 'pointer',
                                                                    }}
                                                                    className="closeRepComment"
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {/* cmt children */}
                                                    {cmtUser?.children.map((item: any, index: number) => {
                                                        return (
                                                            <div className="ListComment__Name__Child" key={index}>
                                                                <div className="ListComment__Name__Text">
                                                                    <span>{`${item?.user?.lastName} ${item?.user?.firstName}`}</span>
                                                                </div>
                                                                <div className="ListComment__createAt">
                                                                    <span>{covertCreateAt(item?.createdAt)}</span>
                                                                </div>
                                                                <div className="ListComment__Text">
                                                                    <span>{item?.content}</span>
                                                                </div>
                                                                <div className="ListComment__Interact">
                                                                    {interRactChild.map((iteminterRact, index) => {
                                                                        return (
                                                                            <span
                                                                                key={index}
                                                                                style={{
                                                                                    color:
                                                                                        iteminterRact.id == 1 &&
                                                                                        curentUser &&
                                                                                        item?.likeList.some(
                                                                                            (item: any) => {
                                                                                                return (
                                                                                                    item?.id ==
                                                                                                    curentUser?.id
                                                                                                );
                                                                                            },
                                                                                        )
                                                                                            ? 'blue'
                                                                                            : '#000' &&
                                                                                              iteminterRact.id == 2 &&
                                                                                              curentUser &&
                                                                                              item?.dislikeList.some(
                                                                                                  (item: any) => {
                                                                                                      return (
                                                                                                          item?.id ==
                                                                                                          curentUser?.id
                                                                                                      );
                                                                                                  },
                                                                                              )
                                                                                            ? 'red'
                                                                                            : '#000',
                                                                                }}
                                                                                onClick={() => {
                                                                                    if (iteminterRact.id === 1) {
                                                                                        handleLikeAndUnlike(
                                                                                            item?.id,
                                                                                            afterRepCmt,
                                                                                            setAfterRepCmt,
                                                                                        );
                                                                                    }
                                                                                    if (iteminterRact.id == 2) {
                                                                                        handleDislikevsUndislike(
                                                                                            item?.id,
                                                                                            afterRepCmt,
                                                                                            setAfterRepCmt,
                                                                                        );
                                                                                    }
                                                                                }}
                                                                            >
                                                                                {iteminterRact?.icon}{' '}
                                                                                {iteminterRact.name}
                                                                                {iteminterRact.id == 1
                                                                                    ? `(${item?.likeList.length})`
                                                                                    : ''}
                                                                                {iteminterRact.id == 2
                                                                                    ? `(${item?.dislikeList.length})`
                                                                                    : ''}
                                                                            </span>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            }
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {/* Cmt của sản phẩm  */}
                                    <div className="ListComment">
                                        {listComment
                                            ? listComment.map((item: any, index: number) => {
                                                  return (
                                                      <div className="ListComment__Container" key={index}>
                                                          <div className="ListComment__Name">
                                                              <div className="ListComment__Name__Text">
                                                                  <span>{`${item?.user?.lastName} ${item?.user?.firstName}`}</span>
                                                              </div>
                                                              <div className="ListComment__Name__Rate">
                                                                  <Rate
                                                                      value={item?.star}
                                                                      style={{
                                                                          fontSize: '14px',
                                                                      }}
                                                                      disabled
                                                                  />
                                                              </div>

                                                              <div className="ListComment__createAt">
                                                                  <span>{covertCreateAt(item?.createdAt)}</span>
                                                              </div>
                                                          </div>
                                                          <div className="ListComment__Text">
                                                              <span
                                                                  style={{
                                                                      color: '#212b35',
                                                                  }}
                                                              >
                                                                  {item?.content}
                                                              </span>
                                                              {item?.images && item?.images.length > 0 ? (
                                                                  <Space>
                                                                      {item?.images.map((image: any, index: number) => {
                                                                          return (
                                                                              <Image
                                                                                  key={index}
                                                                                  //   width={72}
                                                                                  height={72}
                                                                                  src={`${process.env.REACT_APP_IMAGE_CMT}${image}`}
                                                                              />
                                                                          );
                                                                      })}
                                                                  </Space>
                                                              ) : (
                                                                  ''
                                                              )}
                                                          </div>
                                                          <div className="ListComment__Interact">
                                                              {interRact.map((itemInterract, index) => {
                                                                  return (
                                                                      <span
                                                                          key={index}
                                                                          className={itemInterract.classname}
                                                                          style={{
                                                                              color:
                                                                                  itemInterract.id == 2 &&
                                                                                  curentUser &&
                                                                                  item?.likeList.some((item: any) => {
                                                                                      return item?.id == curentUser?.id;
                                                                                  })
                                                                                      ? 'blue'
                                                                                      : '#000' &&
                                                                                        itemInterract.id == 3 &&
                                                                                        curentUser &&
                                                                                        item?.dislikeList.some(
                                                                                            (item: any) => {
                                                                                                return (
                                                                                                    item?.id ==
                                                                                                    curentUser?.id
                                                                                                );
                                                                                            },
                                                                                        )
                                                                                      ? 'red'
                                                                                      : '#000',
                                                                          }}
                                                                          onClick={() => {
                                                                              if (itemInterract.id == 1) {
                                                                                  setIsRepComment(item?.id);
                                                                                  if (isRepComment) {
                                                                                      setIsRepComment('');
                                                                                  }
                                                                              }
                                                                              if (itemInterract.id == 2) {
                                                                                  handleLikeAndUnlike(
                                                                                      item?.id,
                                                                                      afterRepCmt,
                                                                                      setAfterRepCmt,
                                                                                  );
                                                                              }
                                                                              if (itemInterract.id == 3) {
                                                                                  handleDislikevsUndislike(
                                                                                      item?.id,
                                                                                      afterRepCmt,
                                                                                      setAfterRepCmt,
                                                                                  );
                                                                              }
                                                                          }}
                                                                      >
                                                                          {itemInterract?.icon} {itemInterract.name}{' '}
                                                                          {itemInterract.id == 2
                                                                              ? `(${item?.likeList.length})`
                                                                              : ''}
                                                                          {itemInterract.id == 3
                                                                              ? `(${item?.dislikeList.length})`
                                                                              : ''}
                                                                      </span>
                                                                  );
                                                              })}
                                                          </div>
                                                          {/* Rep cmt */}
                                                          {isRepComment && isRepComment == item?.id ? (
                                                              <div className="repComment">
                                                                  <div className="repComment__Input">
                                                                      <Input
                                                                          placeholder={'Nhập trả lời của bạn'}
                                                                          value={contentRepCmt}
                                                                          onChange={(event) => {
                                                                              setContentRepCmt(event.target.value);
                                                                              if (event.target.value) {
                                                                                  setIsEmtyRepCmt(true);
                                                                              } else {
                                                                                  setIsEmtyRepCmt(false);
                                                                              }
                                                                          }}
                                                                      />
                                                                      {isEmtyRepCmt ? (
                                                                          ''
                                                                      ) : (
                                                                          <div
                                                                              style={{
                                                                                  marginTop: '4px',
                                                                                  color: 'red',
                                                                              }}
                                                                          >
                                                                              <span>
                                                                                  Bạn không được để trống trường này
                                                                              </span>
                                                                          </div>
                                                                      )}
                                                                  </div>
                                                                  <div>
                                                                      <Button
                                                                          type="ghost"
                                                                          style={{
                                                                              backgroundColor: 'rgb(0, 191, 255)',
                                                                              minHeight: '40px',
                                                                              color: '#fff',
                                                                              borderRadius: 'initial',
                                                                          }}
                                                                          onClick={() => {
                                                                              handleRepComment(
                                                                                  Number(queryParams?.id),
                                                                                  contentRepCmt,
                                                                                  item?.id,
                                                                                  api,
                                                                                  setIsRepComment,
                                                                                  setAfterRepCmt,
                                                                                  afterRepCmt,
                                                                              );
                                                                              if (!contentRepCmt) {
                                                                                  setIsEmtyRepCmt(false);
                                                                              }
                                                                          }}
                                                                      >
                                                                          Trả lời
                                                                      </Button>
                                                                  </div>
                                                                  <div
                                                                      onClick={() => {
                                                                          setIsRepComment('');
                                                                          setIsEmtyRepCmt(true);
                                                                      }}
                                                                  >
                                                                      <CloseOutlined
                                                                          style={{
                                                                              fontSize: '18px',
                                                                              cursor: 'pointer',
                                                                          }}
                                                                          className="closeRepComment"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          ) : (
                                                              ''
                                                          )}
                                                          {/* cmt chilren  */}
                                                          {item?.children.map((item: any, index: number) => {
                                                              return (
                                                                  <div className="ListComment__Name__Child" key={index}>
                                                                      <div className="ListComment__Name__Text">
                                                                          <span>{`${item?.user?.lastName} ${item?.user?.firstName}`}</span>
                                                                      </div>
                                                                      <div className="ListComment__createAt">
                                                                          <span>{covertCreateAt(item?.createdAt)}</span>
                                                                      </div>
                                                                      <div className="ListComment__Text">
                                                                          <span>{item?.content}</span>
                                                                      </div>
                                                                      <div className="ListComment__Interact">
                                                                          {interRactChild.map(
                                                                              (iteminterRact, index) => {
                                                                                  return (
                                                                                      <span
                                                                                          style={{
                                                                                              color:
                                                                                                  iteminterRact.id ==
                                                                                                      1 &&
                                                                                                  curentUser &&
                                                                                                  item?.likeList.some(
                                                                                                      (item: any) => {
                                                                                                          return (
                                                                                                              item?.id ==
                                                                                                              curentUser?.id
                                                                                                          );
                                                                                                      },
                                                                                                  )
                                                                                                      ? 'blue'
                                                                                                      : '#000' &&
                                                                                                        iteminterRact.id ==
                                                                                                            2 &&
                                                                                                        curentUser &&
                                                                                                        item?.dislikeList.some(
                                                                                                            (
                                                                                                                item: any,
                                                                                                            ) => {
                                                                                                                return (
                                                                                                                    item?.id ==
                                                                                                                    curentUser?.id
                                                                                                                );
                                                                                                            },
                                                                                                        )
                                                                                                      ? 'red'
                                                                                                      : '#000',
                                                                                          }}
                                                                                          key={index}
                                                                                          onClick={() => {
                                                                                              if (
                                                                                                  iteminterRact.id === 1
                                                                                              ) {
                                                                                                  handleLikeAndUnlike(
                                                                                                      item?.id,
                                                                                                      afterRepCmt,
                                                                                                      setAfterRepCmt,
                                                                                                  );
                                                                                              }
                                                                                              if (
                                                                                                  iteminterRact.id == 2
                                                                                              ) {
                                                                                                  handleDislikevsUndislike(
                                                                                                      item?.id,
                                                                                                      afterRepCmt,
                                                                                                      setAfterRepCmt,
                                                                                                  );
                                                                                              }
                                                                                          }}
                                                                                      >
                                                                                          {iteminterRact?.icon}{' '}
                                                                                          {iteminterRact.name}{' '}
                                                                                          {iteminterRact.id == 1
                                                                                              ? `(${item?.likeList.length})`
                                                                                              : ''}
                                                                                          {iteminterRact.id == 2
                                                                                              ? `(${item?.dislikeList.length})`
                                                                                              : ''}
                                                                                      </span>
                                                                                  );
                                                                              },
                                                                          )}
                                                                      </div>
                                                                  </div>
                                                              );
                                                          })}
                                                      </div>
                                                  );
                                              })
                                            : ''}
                                    </div>
                                </div>
                                <Pagination
                                    className="pageginationCmt"
                                    defaultCurrent={currentPage}
                                    pageSize={pageSizeCmt}
                                    total={totalItemPage}
                                    onChange={(value) => {
                                        onChangePageCmt(value, setCurrentpage);
                                    }}
                                    showSizeChanger={false}
                                />
                            </Col>
                            <Col span={9}>
                                <div className="DetailProductClient__content__Infor">
                                    <div className="DetailProductClient__content__Infor__Name">
                                        <span>{currentDetailProduct?.name}</span>
                                    </div>
                                    <div className="DetailProductClient__content__Infor__productTop">
                                        <div className="productTop__Sold">
                                            <span>Đã bán {productData ? productData?.sold : ''}</span>
                                        </div>
                                        <div className="productTop__Rate">
                                            <Rate
                                                value={productData?.rating}
                                                disabled={true}
                                                style={{
                                                    fontSize: '20px',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {currentDetailProduct && currentDetailProduct?.discountPrice ? (
                                        <div className="DetailProductClient__content__Infor__Price">
                                            <div className="DetailProductClient__content__Infor__Price__original">
                                                <span>{convertVND(currentDetailProduct?.discountPrice)}</span>
                                            </div>
                                            <div className="DetailProductClient__content__Infor__Price__discount">
                                                <span>{convertVND(currentDetailProduct?.originalPrice)}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="DetailProductClient__content__Infor__Price__discount originalPricehave">
                                            <span>{convertVND(currentDetailProduct?.originalPrice)}</span>
                                        </div>
                                    )}
                                    <div className="DetailProductClient__content__Infor__ListCorlor">
                                        <div className="ListColor__title">
                                            <span>
                                                màu sắc:<Button type="text">Xanh cổ vịt</Button>
                                            </span>
                                        </div>
                                        <div className="ListColor__Image">
                                            <Space wrap size={16}>
                                                {productData
                                                    ? productData?.detail?.map((item: any, index: number) => {
                                                          return (
                                                              <Avatar
                                                                  key={index}
                                                                  style={{
                                                                      border: currentDetailProduct
                                                                          ? currentDetailProduct?.id == item?.id
                                                                              ? `2px solid rgb(0, 191, 255)`
                                                                              : 'none'
                                                                          : '',
                                                                      borderRadius: 'initial',
                                                                  }}
                                                                  className="colorProduct"
                                                                  shape="square"
                                                                  size={55}
                                                                  icon={<UserOutlined />}
                                                                  src={`${process.env.REACT_APP_IMAGE_PRODUCT}${item?.images[0]}`}
                                                                  onClick={() => {
                                                                      setCurrentDetailProduct(item);
                                                                  }}
                                                              />
                                                          );
                                                      })
                                                    : ''}
                                            </Space>
                                        </div>
                                    </div>
                                    <div className="DetailProductClient__content__Infor__Size">
                                        <div className="DetailProductClient__content__Infor__Size__title">
                                            <span>Kích Thước</span>
                                        </div>
                                        <div className="DetailProductClient__content__Infor__Size__List">
                                            {currentDetailProduct
                                                ? currentDetailProduct?.size?.map((item: any, index: number) => {
                                                      return (
                                                          <>
                                                              {!item?.quantity ? (
                                                                  <Tooltip
                                                                      title="Hết hàng"
                                                                      style={{
                                                                          transition: 'ease 0.2s',
                                                                      }}
                                                                  >
                                                                      {/* <span>Tooltip will show on mouse enter.</span> */}
                                                                      <Button
                                                                          disabled={item?.quantity ? false : true}
                                                                          size="large"
                                                                          style={{
                                                                              backgroundColor:
                                                                                  item?.name == resultSize ||
                                                                                  item?.id == idSize
                                                                                      ? 'rgb(0, 191, 255, 0.2)'
                                                                                      : '',
                                                                              color:
                                                                                  item?.name == resultSize ||
                                                                                  item?.id == idSize
                                                                                      ? '#fff'
                                                                                      : '',
                                                                              transition: 'ease 0.1s',
                                                                          }}
                                                                          key={index}
                                                                          onClick={() => {
                                                                              setResultSize('');
                                                                          }}
                                                                      >
                                                                          {item?.name}
                                                                      </Button>
                                                                  </Tooltip>
                                                              ) : (
                                                                  <Button
                                                                      disabled={item?.quantity ? false : true}
                                                                      size="large"
                                                                      style={{
                                                                          backgroundColor:
                                                                              item?.name == resultSize ||
                                                                              item?.id == idSize
                                                                                  ? 'rgb(0, 191, 255)'
                                                                                  : '',
                                                                          color:
                                                                              item?.name == resultSize ||
                                                                              item?.id == idSize
                                                                                  ? '#fff'
                                                                                  : '',
                                                                          transition: 'ease 0.1s',
                                                                      }}
                                                                      key={index}
                                                                      onClick={() => {
                                                                          setIdSize(Number(item?.id));
                                                                          setResultSize('');
                                                                      }}
                                                                  >
                                                                      {item?.name}
                                                                  </Button>
                                                              )}
                                                          </>
                                                      );
                                                  })
                                                : ''}
                                        </div>
                                        <div className="HelpSize">
                                            <div className="HelpSize__title">
                                                <Collapse items={items} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Infor__Amount">
                                        <HookUsage setAmountinstance={setAmountInstance} />
                                    </div>
                                    <div className="DetailProductClient__content__Infor__amountAddCart">
                                        <Button
                                            icon={<ShoppingCartOutlined />}
                                            type="default"
                                            style={{
                                                fontSize: '15px',
                                                padding: '20px 40px',
                                                // backgroundColor: 'rgb(0, 191, 255)',
                                                borderRadius: 'initial',
                                                color: '#000',
                                                display: 'flex',
                                                alignItems: 'center',
                                                border: '1px solid #333',
                                            }}
                                            onClick={() => {
                                                handleAddInCart(idSize, amountInstance, dispatch, setIsLoadCart);
                                            }}
                                        >
                                            Thêm vào giỏ hàng
                                        </Button>
                                        <Button
                                            type="default"
                                            style={{
                                                fontSize: '15px',
                                                padding: '20px 50px',
                                                backgroundColor: 'rgb(0, 191, 255)',
                                                borderRadius: 'initial',
                                                color: '#fff',
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                            onClick={() => {
                                                handleAddInCart(idSize, amountInstance, dispatch, setIsLoadCart);
                                            }}
                                        >
                                            Mua ngay
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                ) : (
                    ''
                )}
            </div>
            {/* Modal Add Comment */}
            <ModalCustomer
                isModalOpen={isModalAddComment}
                handleOk={handleOkAddComment}
                handleCancel={() => {
                    handleCancelComment(setIsModalAddComment, setImagesUploadMultiple);
                }}
                children={
                    <div className="addCommentContainer">
                        <div className="addComment__title">
                            <span>Áo Polo Nam</span>
                        </div>
                        <div className="addComment__Rate">
                            <div className="addComment__Rate">
                                <span>Đánh giá của bạn về sản phẩm: </span>
                            </div>
                            <Rate
                                value={evaluateStar}
                                onChange={setEvaluateStar}
                                style={{
                                    fontSize: '20px',
                                }}
                            />
                        </div>
                        <div className="addComment__TextArea">
                            <textarea
                                placeholder="Nhập nội dung đánh giá của bạn về sản phẩm"
                                value={evaluateText}
                                onChange={(event) => {
                                    setEvaluateText(event.target.value);
                                }}
                            />
                        </div>
                        <div className="addComment__UploadImageBTN">
                            <div className="addComment__UploadImageBTN__title">
                                <span>Đính kèm hình ảnh ( Tối đa 5 hình )</span>
                            </div>
                            <UploadImageCustomer multilple={true} />
                        </div>
                        <div className="addComment__UploadImageBTN commentSubmit">
                            <Button
                                type="ghost"
                                onClick={() => {
                                    if (curentUser) {
                                    }
                                    handleEvaluateProduct(
                                        evaluateStar,
                                        evaluateText,
                                        Number(queryParams?.id),
                                        imagesUploadMultiple,
                                        isGetCommentLoad,
                                        setIsgetCommentLoad,
                                        setImagesUploadMultiple,
                                        setIsModalAddComment,
                                    );
                                }}
                            >
                                Gửi đánh giá
                            </Button>
                        </div>
                    </div>
                }
                title={'Đánh giá sản phẩm'}
                footer={false}
                showModal={() => {}}
            />
        </div>
    );
}
