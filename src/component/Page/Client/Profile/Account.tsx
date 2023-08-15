import React, { useEffect, useState } from 'react';
import { Descriptions, Button } from 'antd';
import { CheckCircleOutlined, MailOutlined } from '@ant-design/icons';
import { handleGetProfile, handleVerifyMail } from './ProfileMethod';
import { useSelector } from 'react-redux';
import { useRedux } from '../Cart/Cart';
export interface profileIF {
    createdAt: string;
    dob: string;
    email: string;
    firstName: string;
    fullName: string;
    genderId: string;
    id: number;
    image: string;
    isActiveEmail: boolean;
    lastName: string;
    phoneNumber: string;
    roleId: string;
    statusId: string;
    token: any;
    updatedAt: string;
}
export default function Account() {
    // lấy Profile
    const [profileUser, setProfileUser] = useState<profileIF | null>(null);
    // reload Get Profile
    const [isLoadAccount, setIsLoadAccount] = useState<boolean>(false);
    
    // console.log(curentUser);
    useEffect(() => {
        handleGetProfile(setProfileUser);
    }, [isLoadAccount]);
    return (
        <div className="AccountWrapper">
            <Descriptions column={1}>
                <Descriptions.Item label="Tên">{profileUser?.fullName}</Descriptions.Item>
                <Descriptions.Item label="Email">{profileUser?.email}</Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">{profileUser?.phoneNumber}</Descriptions.Item>
            </Descriptions>
            <div className="AuthentiCateMail">
                {profileUser?.isActiveEmail ? (
                    <Button
                        icon={<CheckCircleOutlined />}
                        style={{
                            backgroundColor: '#00ff00',
                            color: '#fff',
                            minWidth: '150px',
                        }}
                    >
                        Đã xác thực
                    </Button>
                ) : (
                    <Button
                        icon={<MailOutlined />}
                        style={{
                            backgroundColor: '#fff',
                            color: '#000',
                            minWidth: '150px',
                        }}
                        onClick={() => {
                            if (profileUser) {
                                handleVerifyMail(setIsLoadAccount);
                            }
                        }}
                    >
                        Xác thực mail
                    </Button>
                )}
            </div>
        </div>
    );
}
