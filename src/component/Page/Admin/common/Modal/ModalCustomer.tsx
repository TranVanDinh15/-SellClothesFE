import React, { useState } from 'react';
import { Button, Modal } from 'antd';
interface ModalProps {
    isModalOpen: boolean;
    showModal: () => void;
    handleOk: () => void;
    handleCancel: () => void;
    children: React.ReactNode;
    title: string;
}
const ModalCustomer = ({ isModalOpen, showModal, handleOk, handleCancel, children, title }: ModalProps) => {
    return (
        <>
            <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {children}
            </Modal>
        </>
    );
};

export default ModalCustomer;
