import React from 'react';
import { message, Popconfirm } from 'antd';

interface childrenProps {
    children: React.ReactNode;
    title: string;
    description: string;
    confirm: any;
    cancel: any;
}

const DeleteCustom = ({ children, title, description, confirm, cancel }: childrenProps) => (
    <Popconfirm
        title={title}
        description={description}
        onConfirm={confirm}
        onCancel={cancel}
        okText="Xóa"
        cancelText="Trở lại"
    >
        {children}
    </Popconfirm>
);

export default DeleteCustom;
