import React from 'react';
import images from '../../../../asset';
import { Image, Button, Input, Form, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { handleVerifyApi } from './ProfileMethod';
import { changePassword } from '../../../utils/Api/Api';

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    newPass?: string;
};

export default function ChangPassword() {
    const param = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    console.log(token);
    console.log(param);
    const onFinish = async (values: any) => {
        console.log('Success:', values, param?.token);
        if (param && param?.token) {
            const response = await changePassword({
                newPass: values?.newPass,
                token: param?.token,
            });
            console.log(response);
            response.status == 403 && message.error('Phiên thay đổi đã hết hạn');
            if (response && response.status == 200) {
                message.success('Đã thay đổi mật khẩu');
                navigate('/Profile');
            }
        }
    };
    return (
        <div className="VerifyMailWrapper">
            <div className="VerifyMailContainer">
                <Image src={images.logo} width={100} preview={false} />
                <div className="VerifyMailUser">
                    <span>Thay đổi mật khẩu </span>
                </div>
                <div className="NewPassword">
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label="Mật khẩu mới"
                            name="newPass"
                            rules={[{ required: true, message: 'Vui lòng điền mật khẩu' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    marginTop: '20px',
                                }}
                            >
                                Thay đổi
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                {/* <Button
                    type="primary"
                    onClick={() => {
                        param && param?.token && handleVerifyApi({ token: param?.token }, navigate);
                    }}
                >
                    Thay đổi
                </Button> */}
            </div>
        </div>
    );
}
