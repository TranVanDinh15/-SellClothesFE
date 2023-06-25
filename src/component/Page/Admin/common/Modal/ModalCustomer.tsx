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
    //   const [isModalOpen, setIsModalOpen] = useState(false);

    //   const showModal = () => {
    //     setIsModalOpen(true);
    //   };

    //   const handleOk = () => {
    //     setIsModalOpen(false);
    //   };

    //   const handleCancel = () => {
    //     setIsModalOpen(false);
    //   };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {children}
            </Modal>
        </>
    );
};

export default ModalCustomer;
