import { MessageOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Popover, Badge, Input, Row, Col, Avatar } from 'antd';
import React, { useState } from 'react';
import './ChatClient.scss';
export default function ChatClient() {
    // Quản lý Input nhập tin nhắn
    const [message, setMessage] = useState<string>('');
    const contentMessage = (
        <div className="ChatClienContent">
            <Row gutter={16}>
                <Col span={6}>
                    <div className="ListAdminMessage">
                        <div className="ListAdminMessage__title">
                            <span>Danh sách Admin</span>
                        </div>
                        <div className="ListAdminMessage__Parent">
                            <div className="ListAdminMessage__Item">
                                <Button type="text">
                                    <Avatar size={'small'} icon={<UserOutlined />} />
                                    <span>Trần Văn Định</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={18}>
                    <div className="ChatClienContent__BoxChat">
                        <div className="titleName">
                            <Badge status="success" text="TD Shop" />
                        </div>
                        <div className="SpaceChat">
                            <div className={`SpaceChat__Message `}>
                                <div className="cssMessageUser ">
                                    <span>Máy này có thể down nhạc về ko shop</span>
                                </div>
                            </div>
                            <div className={`SpaceChat__MessageAdmin`}>
                                <div className=" cssMessageAdmin">
                                    <span>Ok kkkkkkkkkkkkkkkkkkk</span>
                                </div>
                            </div>
                        </div>
                        <div className="InputChat">
                            <Input
                                placeholder="Nhập nội dung tin nhắn"
                                spellCheck={false}
                                // value={message}
                                onChange={(value) => {
                                    setMessage(String(value.target.value));
                                }}
                            />

                            <SendOutlined className={`SendMessageIcon ${message ? 'sendMessageHaveText' : ''}`} />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
    return (
        <div className="ChatClientWrapper">
            <div className="ChatClientWrapper__Btn">
                <Popover
                    placement="topLeft"
                    title={
                        <span
                            style={{
                                fontSize: '20px',
                                color: 'rgb(0, 191, 255)',
                            }}
                        >
                            Chat
                        </span>
                    }
                    content={contentMessage}
                    trigger="click"
                    className="PopoverChat"
                >
                    <Badge count={100}>
                        <Button type="ghost" icon={<MessageOutlined />}>
                            Chat
                        </Button>
                    </Badge>
                </Popover>
            </div>
        </div>
    );
}
