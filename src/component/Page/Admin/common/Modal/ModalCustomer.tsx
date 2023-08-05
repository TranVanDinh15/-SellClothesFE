import React, { useState } from 'react';
import { Button, Modal } from 'antd';
interface ModalProps {
    isModalOpen: boolean;
    showModal: () => void;
    handleOk: () => void;
    handleCancel: () => void;
    children: React.ReactNode;
    title: string;
    footer: boolean;
    width?: number;
}
const ModalCustomer = ({ isModalOpen, handleOk, handleCancel, children, title, footer, width }: ModalProps) => {
    return (
        <>
            <Modal
                title={title}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={footer ? footer : <></>}
                width={width}
            >
                {children}
            </Modal>
        </>
    );
};

export default ModalCustomer;
