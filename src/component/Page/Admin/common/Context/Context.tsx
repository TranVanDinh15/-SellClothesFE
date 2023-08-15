import { Form } from 'antd';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { FormValues } from '../../Supplier/Supplier';
interface childrenProps {
    children: React.ReactNode;
}
interface detailProductInterFace {
    color: {
        value: string;
        code: string;
    };
    discountPrice: number;
    images: string[];
    originalPrice: number;
}
interface dataUpdateReceipt {
    supplierId: number;
    id: number;
}

type MyContextType = {
    // Định nghĩa các thuộc tính hoặc phương thức của context
    dataUpdate: any;
    setDataUpdate: React.Dispatch<React.SetStateAction<any>>;
    isDelete: boolean;
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
    idDelete: any;
    setIdDelete: React.Dispatch<React.SetStateAction<any>>;
    idDeleteProdcut: any;
    setIdDeleteProduct: React.Dispatch<React.SetStateAction<any>>;
    isModalViewDes: boolean;
    setModalViewDes: React.Dispatch<React.SetStateAction<boolean>>;
    isSaveDesProduct: any;
    setIsSaveDesProduct: React.Dispatch<React.SetStateAction<any>>;
    isSaveDetailProduct: any;
    setIsSaveDetailProduct: React.Dispatch<React.SetStateAction<any>>;
    isOpenDetailP: boolean;
    setIsOpenDetailP: React.Dispatch<React.SetStateAction<boolean>>;
    imagesUploadMultiple: any;
    setImagesUploadMultiple: React.Dispatch<React.SetStateAction<any>>;
    isModalAddDPOpen: boolean;
    setIsModalAddDpOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSaveItemsDp: any;
    setIsSaveItmDp: React.Dispatch<React.SetStateAction<any>>;
    openFullDp: boolean;
    setOpenFullDp: React.Dispatch<React.SetStateAction<boolean>>;
    saveItemDp: any;
    setSaveItemDp: React.Dispatch<React.SetStateAction<any>>;
    isModalAddSize: boolean;
    setIsModalAddSize: React.Dispatch<React.SetStateAction<boolean>>;
    isOpenDrawerSize: boolean;
    setIsOpenDrawerSize: React.Dispatch<React.SetStateAction<boolean>>;
    saveSizeDp: any;
    setSaveSizeDp: React.Dispatch<React.SetStateAction<any>>;
    saveIDp: number | undefined;
    setSaveIdDp: React.Dispatch<React.SetStateAction<number | undefined>>;
    isModalUpdateSize: boolean;
    setIsModalUpdateSize: React.Dispatch<React.SetStateAction<boolean>>;
    detailSize: any;
    setDetailSize: React.Dispatch<React.SetStateAction<any>>;
    formUpdate: any;
    formUpdateSize: any;
    isFetchDp: boolean;
    setIsFetchDp: React.Dispatch<React.SetStateAction<boolean>>;
    isFetchSizeDp: boolean;
    setIsFetchSizeDp: React.Dispatch<React.SetStateAction<boolean>>;
    isModalUpdate: boolean;
    setIsModalUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    imageDp: [];
    setImageDp: React.Dispatch<React.SetStateAction<[]>>;
    saveIdDetailProduct: number | undefined;
    setSaveIdDetailProduct: React.Dispatch<React.SetStateAction<number | undefined>>;
    itemCategory: any;
    setItemCategory: React.Dispatch<React.SetStateAction<any>>;
    detailitemProduct: detailProductInterFace | undefined;
    setDetailItemProduct: React.Dispatch<React.SetStateAction<detailProductInterFace | undefined>>;
    sortId: string;
    setSortId: React.Dispatch<React.SetStateAction<string>>;
    urlCustomer: string;
    setUrlCustomer: React.Dispatch<React.SetStateAction<string>>;
    isBorderColor: any;
    setIsBorderColor: React.Dispatch<React.SetStateAction<any>>;
    dataSupplierUpdate: any;
    setDataSupplierUpdate: React.Dispatch<React.SetStateAction<any>>;
    dataReceiptUpdate: dataUpdateReceipt | null;
    setDataReceiptUpdate: React.Dispatch<React.SetStateAction<dataUpdateReceipt | null>>;
    dataDetailReceipt: any;
    setDataDetailReceipt: React.Dispatch<React.SetStateAction<any>>;
    dataBannerUpdate: any;
    setDataBannerUpdate: React.Dispatch<React.SetStateAction<any>>;
    dataProductUpdate: any;
    setDataProductUpdate: React.Dispatch<React.SetStateAction<any>>;
    isLoadCart: boolean;
    setIsLoadCart: React.Dispatch<React.SetStateAction<boolean>>;
    isLoadSearch: boolean;
    setIsLoadSearch: React.Dispatch<React.SetStateAction<boolean>>;
};
const ChatContext = createContext<MyContextType | undefined>(undefined);
const ChatProvide = ({ children }: childrenProps) => {
    const [dataUpdate, setDataUpdate] = useState();
    const [isDelete, setIsDelete] = useState<boolean>(false);
    // quản lý đóng mở của modal xem mô tả sản phẩm
    const [isModalViewDes, setModalViewDes] = useState(false);
    // Quản lý thông tin của một sản phẩm (dùng để lấy ra Description để hiển thị) khi click xem mô tả
    const [isSaveDesProduct, setIsSaveDesProduct] = useState();
    // // Delete brand Id, product,...
    const [idDelete, setIdDelete] = useState();
    // Quản lý thông tin chi tiết sản phẩm
    const [isSaveDetailProduct, setIsSaveDetailProduct] = useState();
    // Quản lý ảnh upload
    const [imagesUploadMultiple, setImagesUploadMultiple] = useState([]);
    const [isOpenDetailP, setIsOpenDetailP] = useState(false);
    // đóng mở product detail
    const [isModalAddDPOpen, setIsModalAddDpOpen] = useState(false);
    // Quản lý thông tin item detail Product
    const [isSaveItemsDp, setIsSaveItmDp] = useState();
    const [idDeleteProdcut, setIdDeleteProduct] = useState();
    const [openFullDp, setOpenFullDp] = useState<boolean>(false);
    const [saveItemDp, setSaveItemDp] = useState<any>();
    // đóng mở drawer size
    const [isOpenDrawerSize, setIsOpenDrawerSize] = useState<boolean>(false);
    // đóng mở modal add size
    const [isModalAddSize, setIsModalAddSize] = useState<boolean>(false);
    // Lưu Id của Product Detail
    const [saveIDp, setSaveIdDp] = useState<number | undefined>();
    // lưu size product detail
    const [saveSizeDp, setSaveSizeDp] = useState<any>();
    // Quanr lý đóng mở modal update  product detail
    const [isModalUpdate, setIsModalUpdate] = useState<boolean>(false);
    // Quản lý đóng mở modal update size
    const [isModalUpdateSize, setIsModalUpdateSize] = useState<any>();
    // Quản lý Id của product detail size ( xử dụng để update + delete)
    const [detailSize, setDetailSize] = useState<any>();
    // Quản lý Form update
    const [formUpdate] = Form.useForm();
    // Quản lý Form update Size
    const [formUpdateSize] = Form.useForm();
    // Quản lý reCall Api get Detail product
    const [isFetchDp, setIsFetchDp] = useState<boolean>(false);
    // Quản lý reCall Api get Size Detail product
    const [isFetchSizeDp, setIsFetchSizeDp] = useState<boolean>(false);
    // Quản lý ảnh của product detail
    const [imageDp, setImageDp] = useState<[]>([]);
    // Quản lý lưu Id product Detail
    const [saveIdDetailProduct, setSaveIdDetailProduct] = useState<number | undefined>();
    // // Quản lý dữ liệu của một danh mục sản phẩm khi click vào tìm kiếm theo category
    const [itemCategory, setItemCategory] = useState<any>();
    // Quản  lý chi tiết sản phẩm
    const [detailitemProduct, setDetailItemProduct] = useState<detailProductInterFace | undefined>();
    // State manage sort
    const [sortId, setSortId] = useState<string>('');
    // customer Url
    const [urlCustomer, setUrlCustomer] = useState<string>('');
    // Quản lý filter màu sắc có boder hoăcj không
    const [isBorderColor, setIsBorderColor] = useState<any>([]);
    // Quản lý  dữ liệu nhà cung cấp khi nhấn vào update
    const [dataSupplierUpdate, setDataSupplierUpdate] = useState<any>();
    // Quản lý  dữ liệu Biên lai Nhập hàng khi nhấn vào update
    const [dataReceiptUpdate, setDataReceiptUpdate] = useState<dataUpdateReceipt | null>(null);
    // Quản lý dữ liệu Nhập hàng khi nhấn vào update
    const [dataDetailReceipt, setDataDetailReceipt] = useState<any>();
    // Quản lý dữ liệu Banner khi nhấn vào update
    const [dataBannerUpdate, setDataBannerUpdate] = useState<any>();
    // Quản  lý dữ liệu Product khi nhấn vào update
    const [dataProductUpdate, setDataProductUpdate] = useState<any>();
    // Đặt cờ Load lại Cart
    const [isLoadCart, setIsLoadCart] = useState<boolean>(false);
    // Đặt cờ Load lại Search Product
    const [isLoadSearch, setIsLoadSearch] = useState<boolean>(false);
    return (
        <ChatContext.Provider
            value={{
                isModalViewDes,
                setModalViewDes,
                dataUpdate,
                setDataUpdate,
                isDelete,
                setIsDelete,
                idDelete,
                setIdDelete,
                isSaveDesProduct,
                setIsSaveDesProduct,
                idDeleteProdcut,
                setIdDeleteProduct,
                isSaveDetailProduct,
                setIsSaveDetailProduct,
                isOpenDetailP,
                setIsOpenDetailP,
                imagesUploadMultiple,
                setImagesUploadMultiple,
                isModalAddDPOpen,
                setIsModalAddDpOpen,
                isSaveItemsDp,
                setIsSaveItmDp,
                openFullDp,
                setOpenFullDp,
                saveItemDp,
                setSaveItemDp,
                isModalAddSize,
                setIsModalAddSize,
                isOpenDrawerSize,
                setIsOpenDrawerSize,
                saveSizeDp,
                setSaveSizeDp,
                saveIDp,
                setSaveIdDp,
                isModalUpdateSize,
                setIsModalUpdateSize,
                detailSize,
                setDetailSize,
                formUpdate,
                isFetchDp,
                setIsFetchDp,
                isFetchSizeDp,
                setIsFetchSizeDp,
                isModalUpdate,
                setIsModalUpdate,
                formUpdateSize,
                imageDp,
                setImageDp,
                saveIdDetailProduct,
                setSaveIdDetailProduct,
                itemCategory,
                setItemCategory,
                detailitemProduct,
                setDetailItemProduct,
                sortId,
                setSortId,
                urlCustomer,
                setUrlCustomer,
                isBorderColor,
                setIsBorderColor,
                dataSupplierUpdate,
                setDataSupplierUpdate,
                dataReceiptUpdate,
                setDataReceiptUpdate,
                dataDetailReceipt,
                setDataDetailReceipt,
                dataBannerUpdate,
                setDataBannerUpdate,
                dataProductUpdate,
                setDataProductUpdate,
                isLoadCart,
                setIsLoadCart,
                isLoadSearch,
                setIsLoadSearch,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
export const GetContext = () => {
    return useContext(ChatContext);
};
export default ChatProvide;
