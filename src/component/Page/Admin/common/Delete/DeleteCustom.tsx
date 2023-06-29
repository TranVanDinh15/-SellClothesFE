import React from 'react';
import { message, Popconfirm } from 'antd';

interface childrenProps {
    children: React.ReactNode;
    title: string;
    description: string;
    confirm: any;
    cancel: any;
    placement: any;
}

const DeleteCustom = ({ children, title, description, confirm, cancel, placement }: childrenProps) => (
    <Popconfirm
        title={title}
        description={description}
        onConfirm={confirm}
        onCancel={cancel}
        okText="Xóa"
        cancelText="Trở lại"
        placement={placement}
    >
        {children}
    </Popconfirm>
);

export default DeleteCustom;
