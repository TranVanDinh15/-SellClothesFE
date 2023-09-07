import React, { useEffect, useState } from 'react';
import { Descriptions, Button, message } from 'antd';
import { CheckCircleOutlined, MailOutlined } from '@ant-design/icons';
import { handleGetProfile, handleVerifyMail } from './ProfileMethod';
import { RiLockPasswordLine } from 'react-icons/ri';

import { useSelector } from 'react-redux';
import { useRedux } from '../Cart/Cart';
import { sendMailChangePassord } from '../../../utils/Api/Api';
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
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="AccountWrapper">
            <div className="VoucherUserTitle">
                <span>Thông tin tài khoản</span>
            </div>
            <div className="AccountWrapper__child">
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
                    <Button
                        icon={<RiLockPasswordLine />}
                        style={{
                            backgroundColor: '#fff',
                            color: '#000',
                            minWidth: '150px',
                        }}
                        onClick={async () => {
                            const response = await sendMailChangePassord();
                            console.log(response);
                            response && response.status == 201 && message.success('Vui lòng kiểm tra email  ');
                        }}
                    >
                        Đổi mật khẩu
                    </Button>
                </div>
            </div>
        </div>
    );
}
