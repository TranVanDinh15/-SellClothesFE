import { message } from 'antd';
import {
    GetColorProductById,
    createProductDetail,
    createProductDetailSize,
    deleteProductDetail,
    deleteProductDetailSize,
    getColorSelect,
    getMaterialClient,
    getProductById,
    getProductDetailById,
    getProductDetailSize,
    updateProductDetail,
    updateProductDetailSize,
} from '../../utils/Api/Api';
import { detaiSizeIF, materialProduct } from './interfaceProduct/interfaceProduct';
import { AnyObject } from 'antd/es/table/Table';
import Item from 'antd/es/list/Item';

// Get Color Product By Id
export const handleGetColorById = async (id: string, setSelectColor: React.Dispatch<React.SetStateAction<any>>) => {
    if (id) {
        const response = await GetColorProductById(parseInt(id));
        if (response && response.status == 200) {
            if (response.data.length > 0) {
                const result = response.data.map((item: any) => {
                    return {
                        value: item?.code,
                        label: item?.value,
                    };
                });
                setSelectColor(result);
            }
        }
    } else {
    }
};
// Open Modal Add detail Product
export const showModalAddDp = (setIsModalAddDpOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsModalAddDpOpen(true);
};
// Handle Submit Modal Add detail Product
export const handleOkAddDp = () => {};
// HandleCancel Add Detail Product
export const handleCancelDp = (
    setIsModalAddDpOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setImagesUploadMultiple: React.Dispatch<React.SetStateAction<any>>,
) => {
    setIsModalAddDpOpen(false);
    setImagesUploadMultiple([]);
};

export const handleOkUpdate = () => {};
export const handleShowUpdate = (setIsModalUpdate: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsModalUpdate(true);
};
export const handleCancelUpdate = (setIsModalUpdate: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsModalUpdate(false);
};
// Lấy màu sắc
export const hanleGetSelectColor = async (setSaveColor: React.Dispatch<React.SetStateAction<any>>) => {
    const response = await getColorSelect();
    if (response && response.status == 200) {
        if (response.data.data.length > 0) {
            const result = response.data.data.map((item: any) => {
                return {
                    value: item?.code,
                    label: item?.value,
                };
            });
            setSaveColor(result);
        }
    }
};
export const onFinishUpdate = async (
    detailId: number,
    values: any,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setIsFetchDp: React.Dispatch<React.SetStateAction<boolean>>,
    imagesUploadMultiple: any,
    imageDp: any,
    IsFetchDp: boolean,
    setIsModalUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    setImageDp: React.Dispatch<React.SetStateAction<any>>,
    value: any,
) => {
    if (detailId) {
        const reqUpdate = {
            productId: values?.productId,
            name: values?.name,
            originalPrice: values?.originalPrice,
            discountPrice: values?.discountPrice,
            description: value,
            images: imagesUploadMultiple.map((item: any) => {
                return item?.image;
            }),
            colorId: values?.colorId,
        };
        setIsLoading(true);
        const response = await updateProductDetail(detailId, reqUpdate);
        if (response && response.status == 200) {
            setIsLoading(false);
            message.success(response?.data?.message);
            setIsModalUpdate(false);
            setImageDp([]);
            if (IsFetchDp) {
                setIsFetchDp(false);
            } else {
                setIsFetchDp(true);
            }
        } else {
            message.error('Đã có lỗi xảy ra');
        }
    } else {
        message.error('Sản phẩm không tồn tại');
    }
};
export const onFailUpdate = (errorInfo: any) => {};
// Khi submit form add detail product
export const onFinishAdd = async (
    values: any,
    id: any,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    imagesUploadMultiple: any,
    setIsModalAddDpOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isFetchDp: boolean,
    setIsFetchDp: React.Dispatch<React.SetStateAction<boolean>>,
    setImagesUploadMultiple: React.Dispatch<React.SetStateAction<any>>,
    form: any,
    setImageDp: React.Dispatch<React.SetStateAction<any>>,
) => {
    // setIsLoading(true);
    if (id) {
        const reqUpdate = {
            productId: parseInt(id),
            name: values?.name,
            originalPrice: parseInt(values?.originalPrice),
            discountPrice: parseInt(values?.discountPrice),
            // description: values?.description,
            images: imagesUploadMultiple.map((item: any) => {
                return item.image;
            }),
            colorId: values.colorId,
        };
        const response = await createProductDetail(reqUpdate);
        if (response && response.status == 201) {
            message.success('Tạo thành công');
            handleCancelDp(setIsModalAddDpOpen, setImagesUploadMultiple);
            setIsFetchDp((prevIsFetchDp) => !prevIsFetchDp);
            form.setFieldsValue({
                name: '',
                originalPrice: '',
                discountPrice: '',
                colorId: '',
            });
            setImagesUploadMultiple([]);
            setImageDp([]);
        }
    } else {
        message.error('Đã có vấn đề trong lúc tạo !!');
    }
};

export const onFailAdd = (errorInfo: any) => {};
// Lấy thông tin chi tiết sản phẩm
export const getProductDetail = async (
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    productId: number,
    setGetDetailP: React.Dispatch<React.SetStateAction<any>>,
) => {
    setIsLoading(true);
    const response = await getProductDetailById(productId);
    if (response && response.status == 200) {
        if (response.data.length > 0) {
            const result = response.data.map((item: any, index: any) => {
                return {
                    key: index,
                    id: item.id,
                    name: item.name,
                    colorId: item?.colorId,
                    createdAt: item?.createdAt,
                    description: item?.description,
                    discountPrice: item?.discountPrice,
                    images: item?.images,
                    originalPrice: item?.originalPrice,
                    productId: item?.productId,
                    updatedAt: item?.updatedAt,
                    size: item?.size,
                };
            });
            setGetDetailP(result);
            setIsLoading(false);
        }
    }
};
// Delete chi tiết sản phẩm
export const handleDeleteProductDetail = async (
    id: number,
    isFetchDp: boolean,
    setIsFetchDp: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    if (id) {
        const response = await deleteProductDetail(id);
        if (response && response.status == 200) {
            message.success(response?.data?.message);
            if (isFetchDp) {
                setIsFetchDp(false);
            } else {
                setIsFetchDp(true);
            }
        }
    } else {
        message.error('Đã có lỗi xảy ra');
    }
};
export const onChangeColorSelect = (value: string) => {};

export const onSearchColorSelect = (value: string) => {};
// handle đóng mở view full detail product
export const showViewFullDp = (setOpenFullDp: React.Dispatch<React.SetStateAction<boolean>>) => {
    setOpenFullDp(true);
};
export const onViewCloseFullDp = (setOpenFullDp: React.Dispatch<React.SetStateAction<boolean>>) => {
    setOpenFullDp(false);
};
// handle mở add size
export const showAddSizeDp = (setIsModalAddSize: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsModalAddSize(true);
};
// handle submit add size
export const handleSubmitAddSize = async (
    values: any,
    productId: any,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setIsModalAddSize: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const reqAddSize = {
        productDetailId: productId,
        name: values.name,
        width: values.width,
        height: values.height,
        weight: values.weight,
    };
    setIsLoading(true);
    const response = await createProductDetailSize(reqAddSize);
    if (response && response.status == 201) {
        message.success(response.data.message);
        setIsLoading(false);
        cancelAddSizeDp(setIsModalAddSize);
    }
};
// handle submit fail add size
export const handleokaddsize = () => {};
export const handleSubmitFailSize = () => {};
// Handle cancel add size
export const cancelAddSizeDp = (setIsModalAddSize: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsModalAddSize(false);
};
// Handle show drawer size
export const showDrawerSize = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
    setState(true);
};
// Handle show drawer size
export const showCloseSize = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
    setState(false);
};
// handle Get size detail product
export const handleGetSizeDp = async (id: number, setSaveSizeDp: React.Dispatch<React.SetStateAction<any>>) => {
    const response = await getProductDetailSize(id);
    if (response && response.status == 200) {
        const sizes = response.data;
        setSaveSizeDp(sizes);
    }
};
// handle delete product detail size
export const handleDeleteDetailSize = async (
    id: number,
    isFetchSizeDp: boolean,
    setIsFetchSizeDp: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    if (id) {
        const response = await deleteProductDetailSize(id);
        if (response && response.status == 200) {
            message.success(response?.data?.message);
            if (isFetchSizeDp) {
                setIsFetchSizeDp(false);
            } else {
                setIsFetchSizeDp(true);
            }
        }
    } else {
        message.error('Đã có lỗi xảy ra');
    }
};
// Hanlde show modal update size
export const handleShowUpdateSizeDp = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
    setState(true);
};
// Hanlde cancel modal update size
export const handleCancelUpdateSizeDp = (
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    formUpdateSize: any,
) => {
    setState(false);
    formUpdateSize.resetFields();
};
// Hanlde ok modal update size
export const handleOkUpdateSizeDp = () => {};
// Handle submit update add size
export const handleSubmitUpdateSize = async (
    values: any,
    detailSize: detaiSizeIF,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setIsModalUpdateSize: React.Dispatch<React.SetStateAction<boolean>>,
    id: number,
    setSaveSizeDp: React.Dispatch<React.SetStateAction<any>>,
    formUpdateSize: any,
) => {
    if (detailSize) {
        const reqUpdate = {
            productDetailId: detailSize.productDetailId,
            name: values?.name || detailSize.name,
            width: values?.width || detailSize.width,
            height: values?.height || detailSize.height,
            weight: values?.weight || detailSize.weight,
            quantity: parseInt(values?.quantity) || detailSize.quantity,
        };
        setIsLoading(true);
        const response = await updateProductDetailSize(reqUpdate, detailSize.id);
        if (response) {
            message.success(response?.data?.message);
            setIsLoading(false);
            handleCancelUpdateSizeDp(setIsModalUpdateSize, formUpdateSize);
            handleGetSizeDp(id, setSaveSizeDp);
        }
    }
};
export const handleSubmitFailUpdateSize = (errorInfo: any) => {};
// Handle Get Material
export const handleGetMaterialProduct = async (
    setMaterialProduct: React.Dispatch<React.SetStateAction<materialProduct[] | null>>,
): Promise<void> => {
    const response = await getMaterialClient();
    if (response && response.status == 200) {
        const mapDta = response.data?.data.map((item: any, index: number) => {
            return {
                value: item?.code,
                label: item?.value,
            };
        });
        if (mapDta) {
            setMaterialProduct(mapDta);
        }
    }
};
