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
};
const ChatContext = createContext<MyContextType | undefined>(undefined);
const ChatProvide = ({ children }: childrenProps) => {
    const [dataUpdate, setDataUpdate] = useState();
    const [isDelete, setIsDelete] = useState(false);
    // // Delete brand Id
    const [idDelete, setIdDelete] = useState();

    return (
        <ChatContext.Provider value={{ dataUpdate, setDataUpdate, isDelete, setIsDelete, idDelete, setIdDelete }}>
            {children}
        </ChatContext.Provider>
    );
};
export const GetContext = () => {
    return useContext(ChatContext);
};
export default ChatProvide;
