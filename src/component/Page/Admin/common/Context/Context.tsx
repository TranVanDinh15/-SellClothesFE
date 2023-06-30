import { Form } from 'antd';
import React, { createContext, useContext, useEffect, useState } from 'react';
interface childrenProps {
    children: React.ReactNode;
}
type MyContextType = {
    // Định nghĩa các thuộc tính hoặc phương thức của context
    dataUpdate: any;
    setDataUpdate: React.Dispatch<React.SetStateAction<any>>;
    isDelete: any;
    setIsDelete: React.Dispatch<React.SetStateAction<any>>;
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
    imageDp: any;
    setImageDp: React.Dispatch<React.SetStateAction<any>>;
    saveIdDetailProduct: number | undefined;
    setSaveIdDetailProduct: React.Dispatch<React.SetStateAction<number | undefined>>;
};
const ChatContext = createContext<MyContextType | undefined>(undefined);
const ChatProvide = ({ children }: childrenProps) => {
    const [dataUpdate, setDataUpdate] = useState();
    const [isDelete, setIsDelete] = useState(false);
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
    const [imageDp, setImageDp] = useState<any>();
    // Quản lý lưu Id product Detail
    const [saveIdDetailProduct, setSaveIdDetailProduct] = useState<number | undefined>();
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
