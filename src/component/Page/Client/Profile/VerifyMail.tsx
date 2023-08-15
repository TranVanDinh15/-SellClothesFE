import React from 'react';
import images from '../../../../asset';
import { Image, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { handleVerifyApi } from './ProfileMethod';
export default function VerifyMail() {
    const param = useParams();
    const navigate = useNavigate();
    console.log(param);
    return (
        <div className="VerifyMailWrapper">
            <div className="VerifyMailContainer">
                <Image src={images.logo} width={100} preview={false} />
                <div className="VerifyMailUser">
                    <span>Xác minh tài khoản</span>
                </div>
                <Button
                    type="primary"
                    onClick={() => {
                        param && param?.token && handleVerifyApi({ token: param?.token }, navigate);
                    }}
                >
                    Xác minh
                </Button>
            </div>
        </div>
    );
}
