import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import './LoginAdmin.css';
import { loginAdmin } from '../../../utils/Api/Api';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';
import { useAppDispatch } from '../../../../Redux/app.hook/app.hook';
import { loginActions } from '../../../../Redux/Actions/Actions.auth';
import { useNavigate } from 'react-router-dom';

export default function LoginAdmin() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const dataLogin = {
            email: values.email,
            password: values.password,
        };
        dispatch(loginActions(values, navigate));
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="LoginAdmin">
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div className="LoginAdmin__title">
                    <h3>Login</h3>
                </div>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Nhớ tài khoản</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
