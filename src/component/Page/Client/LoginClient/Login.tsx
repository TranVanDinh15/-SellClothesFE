import React from 'react';
import { useAppDispatch } from '../../../../Redux/app.hook/app.hook';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Col, Form, Input, Row, message, Image } from 'antd';
import './LoginClient.css';
import { loginClientActions } from '../../../../Redux/Actions/Actions.auth';
import { useSelector } from 'react-redux';
import { reduxIterface } from './Login.Interface';
import { sendMailChangePassord } from '../../../utils/Api/Api';
import images from '../../../../asset';
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
                {/* <div className="LoginClient__logo">
                    <Image src={images.logo} preview={false} width={120} />
                </div> */}
                <div className="LoginClient__title">
                    <h3>ĐĂNG NHẬP</h3>
                </div>
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
                            <Button
                                type="link"
                                onClick={async () => {
                                    const response = await sendMailChangePassord();
                                    console.log(response);
                                    response && response.status == 201 && message.success('Vui lòng kiểm tra email  ');
                                }}
                            >
                                Quên mật khẩu ?
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item className="footerFormLoginClient">
                            <Link to={'/signUp'}>Đăng ký</Link>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
