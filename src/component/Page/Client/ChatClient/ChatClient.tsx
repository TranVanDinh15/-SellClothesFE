import { MessageOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Popover, Badge, Input, Row, Col, Avatar, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import './ChatClient.scss';
import { handleCreateRoom, handleGetMess, handleGetRoom, handleGetadminApp } from './ChatClientMethod';
import SelectCustomer from '../../Admin/common/Select/Select';
import { socket } from '../../Admin/common/Socket/SocketConfig';
import { useSelector } from 'react-redux';
import { match } from 'assert';
export interface adminAppIf {
    value: string;
    label: string;
}
export interface ListRooms {
    id: number;
    userOneId: number;
    userTwoId: number;
    createdAt: string;
    updatedAt: string;
    unreadCount: number;
    userTwo: {
        firstName: string;
        image: string;
        lastName: string;
    };
}
export interface useRedux {
    reduxAuth: {
        isAuthenticate: boolean;
        user: any;
        isLoading: boolean;
        isfail: boolean;
    };
}
interface messageIF {
    createdAt: string;
    id: number;
    roomId: number;
    text: string;
    unRead: boolean;
    updatedAt: string;
    user: {
        createdAt: string;
        dob: string;
        email: string;
        firstName: string;
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
    };
    userId: number;
}
export default function ChatClient() {
    // Get User Hiện tại
    const curentUser = useSelector((state: useRedux) => state.reduxAuth.user);
    // Quản lý Input nhập tin nhắn
    const [message, setMessage] = useState<string>('');
    const [adminApp, setAdminApp] = useState<adminAppIf[] | undefined>();
    const [listRoomChat, setListRoomChat] = useState<ListRooms[] | undefined>();
    const [getMessageByRoom, setMessageByRoom] = useState<messageIF[]>([]);
    const [currentRoomId, setCurrentRoomId] = useState<number>(0);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [userReceiveId, setUserReceiveId] = useState<number>(0);
    const [numberRoom, setNumberRoom] = useState<number>(0);
    const [unreadMark, setUnReadMark] = useState<number>(0);
    const [isFlagStatus, setIsFlagStatus] = useState<string>('');
    const [isFlagReadvsUnRead, setIsFlagReadvsUnRead] = useState<any>();
    const [isLoadRoom, setIsLoadRoom] = useState<boolean>(false);

    console.log(listRoomChat);
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
                                <SelectCustomer
                                    mode=""
                                    option={adminApp ? [...adminApp] : []}
                                    onChange={(value: any) => {
                                        const data = {
                                            userTwoId: value,
                                        };
                                        handleCreateRoom(data);
                                    }}
                                    onSearch={(value: any) => {
                                        // onChangeProductSelect(value, setProductDetailApp);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="ListRoomMessage">
                            <div className="ListRoomMessage__title">
                                <span>Phòng</span>
                            </div>
                            <div className="ListRoomMessage__Content">
                                <div className="ListRoomMessage__Content__Item">
                                    {listRoomChat
                                        ? listRoomChat.map((item, index) => {
                                              console.log(item);
                                              return (
                                                  <Badge count={item?.unreadCount}>
                                                      <Button
                                                          type="text"
                                                          key={index}
                                                          onClick={() => {
                                                              //   handleGetMess(Number(item.userTwoId), setMessageByRoom);
                                                              socket.emit('join', {
                                                                  roomId: item.id,
                                                                  userId: item.userTwoId,
                                                              });
                                                              setCurrentRoomId(item.id);
                                                              console.log(item);
                                                              setUserReceiveId(item?.userTwoId);
                                                              setNumberRoom(item?.id);
                                                          }}
                                                      >
                                                          <Avatar size="small" icon={<UserOutlined />} />
                                                          <span>{`${item.userTwo.firstName} ${item.userTwo.lastName}`}</span>
                                                      </Button>
                                                  </Badge>
                                              );
                                          })
                                        : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={18}>
                    <div className="ChatClienContent__BoxChat">
                        <div className="titleName">
                            <Badge status="success" text={`Phòng ${numberRoom ? numberRoom : ''}`} />
                        </div>
                        <div className="SpaceChat">
                            {getMessageByRoom
                                ? getMessageByRoom.map((item, index) => {
                                      console.log(item);
                                      return (
                                          <div
                                              className={`${
                                                  curentUser && curentUser?.id == item.userId
                                                      ? `SpaceChat__Message`
                                                      : `SpaceChat__MessageAdmin`
                                              }  `}
                                              key={index}
                                          >
                                              <div className="messageItem">
                                                  <div
                                                      className={`${
                                                          curentUser && curentUser?.id == item.userId
                                                              ? `cssMessageUser`
                                                              : `cssMessageAdmin`
                                                      }  `}
                                                      style={{
                                                          display: 'flex',
                                                          flexDirection: 'column',
                                                      }}
                                                  >
                                                      <span>{item.text}</span>
                                                  </div>
                                              </div>
                                          </div>
                                      );
                                  })
                                : ''}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'right',
                                }}
                            >
                                <div>
                                    <span
                                        style={{
                                            marginTop: '4px',
                                            opacity: '0.6',
                                            //   display:
                                            //       isFlagStatus == item.id || item?.unRead
                                            //           ? 'block'
                                            //           : 'none',
                                            fontSize: '13px',
                                        }}
                                    >
                                        {isFlagStatus ? isFlagStatus : isFlagReadvsUnRead && 'Chưa xem'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="InputChat">
                            {isTyping == false ? '' : <img width={'80px'} src="https://kyawmal.tech/loading.gif" />}
                            <Input
                                placeholder="Nhập nội dung tin nhắn"
                                spellCheck={false}
                                // value={message}
                                onFocus={() => {
                                    socket.emit('typing', {
                                        userId: curentUser?.id,
                                        roomId: currentRoomId,
                                        typing: true,
                                    });
                                }}
                                onBlur={() => {
                                    socket.emit('typing', {
                                        userId: curentUser?.id,
                                        roomId: currentRoomId,
                                        typing: false,
                                    });
                                }}
                                onChange={(value) => {
                                    setMessage(String(value.target.value));
                                }}
                            />
                            <SendOutlined
                                className={`SendMessageIcon ${message ? 'sendMessageHaveText' : ''}`}
                                onClick={() => {
                                    if (currentRoomId) {
                                        socket.emit('message', {
                                            userIdSend: curentUser?.id,
                                            roomId: currentRoomId,
                                            text: message,
                                            userIdReceive: userReceiveId,
                                        });
                                        // setIsFlagReadvsUnRead('');
                                    }
                                }}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
    useEffect(() => {
        handleGetadminApp(setAdminApp);
    }, []);
    useEffect(() => {}, []);
    useEffect(() => {
        socket.on('roomMessages', (data) => {
            console.log('messageRoom', data);
            if (data) {
                setMessageByRoom(data);
                setTimeout(() => {
                    socket.emit('unReadCheck', { userId: curentUser?.id });
                }, 1000);
            }
        });
    }, [socket]);
    useEffect(() => {
        socket.on('messSent', (data) => {
            console.log('sent:', data); // x8WIv7-mJelg7on_ALbx
            setMessageByRoom((messageByRoom) => [...messageByRoom, data]);
        });
        socket.on('message', (data) => {
            console.log('message', data); // x8WIv7-mJelg7on_ALbx
            setMessageByRoom((messageByRoom) => [...messageByRoom, data]);
            console.log(data);

            socket.emit('read', { id: data?.id, roomId: data?.roomId, userId: curentUser?.id });
        });
        socket.on('typing', (data) => {
            console.log(data);
            setIsTyping(data?.typing);
        });
        socket.on('unReadMark', (data) => {
            console.log('unReadMark', data);
            // data && data?.totalRoomUnRead && curentUser?.id == data?.userId && setUnReadMark(data?.totalRoomUnRead);
            setUnReadMark(data?.totalRoomUnRead);
            handleGetRoom(setListRoomChat);
        });
        socket.on('pleaseCheck', (data) => {
            console.log('pleaseCheck', data);
            if (data?.userId && data?.userId == curentUser?.id) {
                socket.emit('unReadCheck', { userId: curentUser?.id });
            }
        });
        socket.on('AlreadyRead', (data) => {
            console.log('AlreadyRead', data);
            setIsFlagStatus('Đã xem');
            setIsFlagReadvsUnRead(false);
        });
    }, []);
    useEffect(() => {
        curentUser && socket.emit('unReadCheck', { userId: curentUser?.id });
    }, []);
    useEffect(() => {
        const check =
            getMessageByRoom &&
            getMessageByRoom.some((item) => {
                return item.unRead == true;
            });
        console.log(check);
        if (check) {
            setIsFlagReadvsUnRead(true);
        }
    }, [getMessageByRoom]);
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
                    <Badge count={unreadMark ? unreadMark : 0}>
                        <Button
                            type="ghost"
                            icon={<MessageOutlined />}
                            onClick={() => {
                                handleGetRoom(setListRoomChat);
                            }}
                        >
                            Chat
                        </Button>
                    </Badge>
                </Popover>
            </div>
        </div>
    );
}
