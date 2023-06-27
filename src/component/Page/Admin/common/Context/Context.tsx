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
    const [idDeleteProdcut, setIdDeleteProduct] = useState();

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
