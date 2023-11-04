import React from 'react';
import { useAppDispatch } from '../../../../Redux/app.hook/app.hook';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Col, Form, Input, Row, message, Image } from 'antd';
// import './LoginClient.css';
import { loginClientActions } from '../../../../Redux/Actions/Actions.auth';
import { useSelector } from 'react-redux';
import { reduxIterface } from '../LoginClient/Login.Interface';
import { sendMailChangePassord, signUp } from '../../../utils/Api/Api';
import images from '../../../../asset';
import { signUpInterface } from '../../../utils/Api/ApiInterFace';
export default function RegisterClient() {
    const isLoading = useSelector((state: reduxIterface) => state.reduxAuth.isLoading);
    console.log(isLoading);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const dataLogin = {
            email: values.email,
            password: values.password,
        };
        dispatch(loginClientActions(values, navigate));
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const handleSignUp = async (value: signUpInterface): Promise<void> => {
        const response = await signUp(value);
        console.log(response);
        if (response && response.status == 201) {
            message.success('tạo tài khoản thành công !!');
            setTimeout(() => {
                navigate('/signIn');
            }, 1000);
        } else {
            message.error(response?.data?.message);
        }
    };
    return (
        <div className="LoginClient">
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={(value) => {
                    handleSignUp(value);
                }}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="LoginClientForm"
            >
                {/* <div className="LoginClient__logo">
                    <Image src={images.logo} preview={false} width={120} />
                </div> */}
                <div className="LoginClient__title">
                    <h3>ĐĂNG KÝ</h3>
                </div>
                <Form.Item
                    label="Họ và tên đệm"
                    name="firstName"
                    rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                >
                    <Input className="inputLoginCss" placeholder="Nhập họ của bạn" />
                </Form.Item>
                <Form.Item
                    label="Tên"
                    name="lastName"
                    rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                >
                    <Input className="inputLoginCss" placeholder="Nhập tên của bạn" />
                </Form.Item>
                <Form.Item
                    label="Giới tính"
                    name="genderId"
                    rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                >
                    <Input className="inputLoginCss" placeholder="Giới tính của bạn" />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                >
                    <Input className="inputLoginCss" placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                >
                    <Input className="inputLoginCss" placeholder="Nhập Email" />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                >
                    <Input.Password className="inputLoginCss" placeholder="Nhập mật khẩu" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                    <Button type="primary" htmlType="submit" className="btnLoginClient">
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
