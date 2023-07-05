import React from 'react';
import { useAppDispatch } from '../../../../Redux/app.hook/app.hook';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import './LoginClient.css';
import { loginClientActions } from '../../../../Redux/Actions/Actions.auth';
import { useSelector } from 'react-redux';
import { reduxIterface } from './Login.Interface';
export default function LoginClient() {
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
    return (
        <div className="LoginClient">
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="LoginClientForm"
            >
                <div className="LoginClient__title">
                    <h3>ĐĂNG NHẬP</h3>
                </div>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                >
                    <Input className="inputLoginCss" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng điền đầy đủ thông tin!' }]}
                >
                    <Input.Password className="inputLoginCss" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                    <Button type="primary" htmlType="submit" className="btnLoginClient">
                        Đăng nhập
                    </Button>
                </Form.Item>
                <Row
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Col>
                        <Form.Item className="footerFormLoginClient">
                            <Link to={'/'}>Quên mật khẩu</Link>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item className="footerFormLoginClient">
                            <Link to={'/'}>Đăng ký</Link>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
