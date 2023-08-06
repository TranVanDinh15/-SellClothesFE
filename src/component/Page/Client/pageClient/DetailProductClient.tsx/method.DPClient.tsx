import { idText } from 'typescript';
import {
    createCommentProduct,
    createRepCommentProduct,
    disLikeVsUndislike,
    getCommentByIdProduct,
    getProductById,
    getProductDetailById,
    likeVsunLike,
} from '../../../../utils/Api/Api';
import { message } from 'antd';
import { useRedux } from './DetailProduct.client';
import { handleUpdateQuantity } from '../../Cart/CartMethod';
type DataType = {
    id: number;
    content: string;
    productId: string;
    parentId: number | null;
    userId: number;
};
type TransformedDataType = DataType & { children: TransformedDataType[] };
// Khi thay đổi help height
export const onChangeSliderHeightSize = (
    value: number | [number, number],
    setHelpHeight: React.Dispatch<React.SetStateAction<number>>,
    heplWeight: number,
    sizeArray: any,
    setResultheplSize: React.Dispatch<React.SetStateAction<string>>,
    setIdSize: React.Dispatch<React.SetStateAction<number | undefined>>,
) => {
    const sizeClientChoose = {
        height: Number(value),
        weight: heplWeight,
    };
    handleAfterHelpSize(sizeArray, sizeClientChoose, setResultheplSize, setIdSize);
    setHelpHeight(Number(value));
};
// Khi thay đổi help weight
export const onChangeSliderWeightSize = (
    value: number | [number, number],
    setHelpWeight: React.Dispatch<React.SetStateAction<number>>,
    heplHeight: number,
    sizeArray: any,
    setResultSize: React.Dispatch<React.SetStateAction<string>>,
    setIdSize: React.Dispatch<React.SetStateAction<number | undefined>>,
) => {
    const sizeClientChoose = {
        height: heplHeight,
        weight: Number(value),
    };
    handleAfterHelpSize(sizeArray, sizeClientChoose, setResultSize, setIdSize);
    setHelpWeight(Number(value));
};
// Get Product
export const getProductByIdFun = async (
    id: string,
    setCurrentProduct: React.Dispatch<React.SetStateAction<any>>,
    setCurrentDetailProduct: React.Dispatch<React.SetStateAction<any>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
    setIsLoading(true);
    const response = await getProductById(id);
    if (response && response.status == 200) {
        console.log(response);
        setCurrentProduct(response?.data?.product);
        setCurrentDetailProduct(response?.data?.product?.detail[0]);
        setIsLoading(false);
    }
};
//Xử lý khi Chọn Help Size xong
export const handleAfterHelpSize = (
    arraySize: {
        height: number;
        weight: number;
        name: string;
        id: number;
        quantity: number;
    }[],
    sizeClientChoose: {
        height: number;
        weight: number;
    },
    setResultheplSize: React.Dispatch<React.SetStateAction<string>>,
    setIdSize: React.Dispatch<React.SetStateAction<number | undefined>>,
): void => {
    let result = null;

    // Sắp xếp mảng theo chiều tăng dần của height và weight
    const sortedArr = arraySize.sort((a, b) => a.height - b.height || a.weight - b.weight);

    for (let i = 0; i < sortedArr.length; i++) {
        if (sortedArr[i].height >= sizeClientChoose.height && sortedArr[i].weight >= sizeClientChoose.weight) {
            result = sortedArr[i];
            break;
        }
    }
    console.log(result);
    if (result) {
        setResultheplSize(result?.name.toString());
        if (result?.quantity > 0) {
            setIdSize(result?.id);
        }
    }
};
//Xử lý khi submit Modal
export const handleOkAddComment = () => {};
export const handleCancelComment = (
    setIsModalAddComment: React.Dispatch<React.SetStateAction<boolean>>,
    setImagesUploadMultiple: React.Dispatch<React.SetStateAction<any>>,
) => {
    setIsModalAddComment(false);
    setImagesUploadMultiple([]);
};
// Handle chia comment theo parentId
export const filterComment = (arr: DataType[]): TransformedDataType[] => {
    // Tạo một object để lưu trữ mối quan hệ giữa các đối tượng dựa trên id và parentId
    const map: Record<number, TransformedDataType> = {};
    arr.forEach((item) => (map[item.id] = { ...item, children: [] }));
    // Tạo mảng kết quả
    const result: TransformedDataType[] = [];

    arr.forEach((item) => {
        if (item.parentId !== null) {
            const parent = map[item.parentId];
            if (parent) parent.children.push(map[item.id]);
        } else {
            result.push(map[item.id]);
        }
    });

    return result;
};
// Handle Get  Comment
export const handleGetCommentProduct = async (
    id: number,
    page: number,
    size: number,
    setTotalItemSize: React.Dispatch<React.SetStateAction<number>>,
    setComment: React.Dispatch<React.SetStateAction<any>>,
    curentUser: any,
    setCmtUser: React.Dispatch<React.SetStateAction<any>>,
    setIsRating: React.Dispatch<React.SetStateAction<any>>,
    star: number,
): Promise<void> => {
    const response = await getCommentByIdProduct(id, page, size, star);
    if (response && response.status == 200) {
        console.log(response);
        const listComment = response?.data?.data;
        const meta = response?.data?.meta;
        if (listComment) {
            if (curentUser) {
                const findCmtUser = listComment.find((item: any) => {
                    return curentUser?.id == item?.userId;
                });
                const filterCmtUser = listComment.filter((item: any) => {
                    return item?.userId != curentUser?.id;
                });
                console.log(findCmtUser);
                setCmtUser(findCmtUser);
                setComment(filterCmtUser);
                // Dùng để custom mục Raiting
                setIsRating(listComment);
                setTotalItemSize(meta?.totalItems);
            }
            if (!curentUser) {
                // Dùng để Custom mục raiting
                setIsRating(listComment);
                setComment(listComment);
                setTotalItemSize(meta?.totalItems);
            }
        }
    }
};
// Handle Evaluate product
export const handleEvaluateProduct = async (
    star: number,
    evaluateText: string,
    id: number,
    image: any,
    isGetCommentLoad: boolean,
    setIsgetCommentLoad: React.Dispatch<React.SetStateAction<boolean>>,
    setImagesUploadMultiple: React.Dispatch<React.SetStateAction<any>>,
    setIsModalAddComment: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const dataComment = {
        content: evaluateText,
        productId: id,
        star: star,
        images:
            image.length > 0
                ? image.map((item: any) => {
                      return item?.image;
                  })
                : [],
    };
    const response = await createCommentProduct(dataComment);
    console.log(response);
    if (response && response.status == 201) {
        if (isGetCommentLoad) {
            setIsgetCommentLoad(false);
        } else {
            setIsgetCommentLoad(true);
        }
        message.success('Đánh giá sản phẩm đã được ghi lại ');
        handleCancelComment(setIsModalAddComment, setImagesUploadMultiple);
    }
};
// Handle Rep comment
export const handleRepComment = async (
    id: number,
    content: string,
    parentId: number,
    api: any,
    setIsRepCmt: React.Dispatch<React.SetStateAction<boolean>>,
    setAfterRepCmt: React.Dispatch<React.SetStateAction<boolean>>,
    afterRepCmt: boolean,
): Promise<void> => {
    if (content && id && parentId) {
        const dataRepCmt = {
            content: content,
            productId: id,
            parentId: parentId,
        };
        console.log(dataRepCmt);
        const response = await createRepCommentProduct(dataRepCmt);
        if (response && response.status == 201) {
            api.info({
                message: `Thông báo`,
                description: 'Trả lời xong',
                placement: 'topRight',
            });
            setIsRepCmt(false);
            if (afterRepCmt) {
                setAfterRepCmt(false);
            } else {
                setAfterRepCmt(true);
            }
        }
    }
};
// Handle like and unlike
export const handleLikeAndUnlike = async (
    idCmt: number,
    afterRepCmt: boolean,
    setAfterRepCmt: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
    try {
        const response = await likeVsunLike(idCmt);
        if (response && response.status == 200) {
            if (afterRepCmt) {
                setAfterRepCmt(false);
            } else {
                setAfterRepCmt(true);
            }
        }
    } catch (error) {
        console.log(error);
    }
};
// Khi dislike cmt
export const handleDislikevsUndislike = async (
    idCmt: number,
    afterRepCmt: boolean,
    setAfterRepCmt: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
    try {
        const response = await disLikeVsUndislike(idCmt);
        if (response && response.status == 200) {
            if (afterRepCmt) {
                setAfterRepCmt(false);
            } else {
                setAfterRepCmt(true);
            }
        }
    } catch (error) {
        console.log(error);
    }
};
export const onChangePageCmt = (value: any, setCurrentpage: React.Dispatch<React.SetStateAction<number>>) => {
    setCurrentpage(value);
};
export const handleAddInCart = async (
    size: number | undefined,
    quantity: number,
    dispatch: any,
    setIsLoadCart: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
    console.log('ok');
    if (!size) {
        message.error('Bạn chưa chọn size');
    } else {
        await handleUpdateQuantity(size, quantity, dispatch, setIsLoadCart);
        // setIsLoadCart((isLoadCart) => !isLoadCart);
        message.success('Đã thêm vào giỏ hàng');
    }
};
