import { DownOutlined, MessageOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Popover, Badge, Input, Row, Col, Avatar, Image, Empty } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './ChatClient.scss';
import { handleCreateRoom, handleGetAdmin, handleGetMess, handleGetRoom, handleGetadminApp } from './ChatClientMethod';
import SelectCustomer from '../../Admin/common/Select/Select';
import { socket } from '../../Admin/common/Socket/SocketConfig';
import { useSelector } from 'react-redux';
import { match } from 'assert';
import images from '../../../../asset';
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
        statusId: string;
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
export interface adminList {
    roleId: string;
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    genderId: string;
    phoneNumber: number;
    image: string;
    dob: string;
    statusId: string;
    token: any;
    isActiveEmail: boolean;
    createdAt: string;
    updatedAt: string;
    status: {
        value: string;
        code: string;
    };
    fullName: string;
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
    const containerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
    // Get User Hiện tại
    const curentUser = useSelector((state: useRedux) => state.reduxAuth.user);
    // Quản lý Input nhập tin nhắn
    const [message, setMessage] = useState<string>('');
    const [adminApp, setAdminApp] = useState<adminAppIf[] | null>(null);
    const [listRoomChat, setListRoomChat] = useState<ListRooms[] | undefined>();
    const [getMessageByRoom, setMessageByRoom] = useState<messageIF[]>([]);
    const [currentRoomId, setCurrentRoomId] = useState<number>(0);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [userReceiveId, setUserReceiveId] = useState<number>(0);
    const [numberRoom, setNumberRoom] = useState<number>(0);
    const [unreadMark, setUnReadMark] = useState<number>(0);
    const [isFlagStatus, setIsFlagStatus] = useState<string>('');
    const [isFlagReadvsUnRead, setIsFlagReadvsUnRead] = useState<any>();
    const [isNewMessage, setIsNewMessage] = useState<boolean>(false);
    const [isDownEndPage, setIsDownEndPage] = useState<boolean>(false);
    const [isDisPlayMessage, setIsDisplayMessage] = useState<boolean>(false);
    const checkScrollPosition = () => {
        if (containerRef.current) {
            const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                setIsAtBottom(true);
            } else {
                setIsAtBottom(false);
            }
        }
    };
    useEffect(() => {
        handleGetAdmin(setAdminApp);
    }, []);
    console.log(adminApp);
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
                                        handleCreateRoom(data, setListRoomChat);
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
                                              return (
                                                  <Badge
                                                      count={item?.unreadCount}
                                                      //   status={item.userTwo.statusId === 'ON' ? 'success' : 'default'}
                                                  >
                                                      <Button
                                                          type="text"
                                                          key={index}
                                                          onClick={() => {
                                                              socket.emit('join', {
                                                                  roomId: item.id,
                                                                  userId: item.userTwoId,
                                                              });
                                                              setCurrentRoomId(item.id);
                                                              setUserReceiveId(item?.userTwoId);
                                                              setNumberRoom(item?.id);
                                                              setIsDisplayMessage(true);
                                                          }}
                                                      >
                                                          <Badge
                                                              status={
                                                                  item.userTwo.statusId === 'ON' ? 'success' : 'default'
                                                              }
                                                          />
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
                    {getMessageByRoom && isDisPlayMessage ? (
                        <div className="ChatClienContent__BoxChat">
                            <div className="titleName">
                                <Badge status="success" text={`Phòng ${numberRoom ? numberRoom : ''}`} />
                            </div>
                            <div className="SpaceChat" ref={containerRef} onScroll={checkScrollPosition}>
                                {getMessageByRoom
                                    ? getMessageByRoom.map((item, index) => {
                                          return (
                                              <div
                                                  className={`${
                                                      curentUser && curentUser?.id == item.userId
                                                          ? `SpaceChat__Message`
                                                          : `SpaceChat__MessageAdmin`
                                                  }  `}
                                                  key={index}
                                              >
                                                  {curentUser && curentUser?.id != item.userId ? (
                                                      <div>
                                                          <img
                                                              style={{
                                                                  width: '30px',
                                                                  height: '30px',
                                                                  objectFit: 'cover',
                                                                  borderRadius: '50%',
                                                              }}
                                                              src={`${process.env.REACT_APP_IMAGE_AVATAR_URL}${item.user.image}`}
                                                          />
                                                      </div>
                                                  ) : (
                                                      ''
                                                  )}
                                                  <div
                                                      className="messageItem"
                                                      style={{
                                                          display: 'flex',
                                                          gap: '5px',
                                                      }}
                                                  >
                                                      <div
                                                          className={`${
                                                              curentUser && curentUser?.id == item.userId
                                                                  ? `cssMessageUser`
                                                                  : `cssMessageAdmin`
                                                          }  `}
                                                          style={{
                                                              minWidth: '50px',
                                                          }}
                                                      >
                                                          <span>{item.text}</span>
                                                      </div>
                                                      {item?.id ===
                                                      getMessageByRoom[getMessageByRoom.length - 1]?.id ? (
                                                          <div>
                                                              <span
                                                                  style={{
                                                                      fontSize: '13px',
                                                                      opacity: '0.6',
                                                                      textAlign: 'center',
                                                                  }}
                                                              >
                                                                  {' '}
                                                                  {isFlagStatus
                                                                      ? isFlagStatus
                                                                      : isFlagReadvsUnRead && 'Chưa xem'}
                                                              </span>
                                                          </div>
                                                      ) : (
                                                          ''
                                                      )}
                                                  </div>
                                              </div>
                                          );
                                      })
                                    : ''}
                                {isTyping == false ? (
                                    ''
                                ) : (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: '20px',
                                        }}
                                    >
                                        <img width={'80px'} src="https://kyawmal.tech/loading.gif" />
                                    </div>
                                )}
                                {isNewMessage && isAtBottom == false ? (
                                    <div className="ReciveMessage">
                                        <Button
                                            icon={<DownOutlined />}
                                            onClick={() => {
                                                setIsDownEndPage((isDownEndPage) => !isDownEndPage);
                                                setIsNewMessage(false);
                                            }}
                                        >
                                            Có tin nhắn mới
                                        </Button>
                                    </div>
                                ) : (
                                    ''
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="InputChat">
                                <Input
                                    placeholder="Nhập nội dung tin nhắn"
                                    spellCheck={false}
                                    value={message}
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
                                            setMessage('');
                                            // setIsFlagReadvsUnRead('');
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <Empty
                            image={images.logo}
                            imageStyle={{ height: 100 }}
                            description={<span>Xin chào</span>}
                            className="EmptyMessage"
                        ></Empty>
                    )}
                </Col>
            </Row>
        </div>
    );

    // Chạy xuống cuối trang khi nhấn vào tin nhắn mới
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        // handleGetadminApp(setAdminApp);
    }, []);
    useEffect(() => {}, []);
    useEffect(() => {
        socket.on('roomMessages', (data) => {
            console.log(data);
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
            setMessageByRoom((messageByRoom) => [...messageByRoom, data]);
            setIsFlagStatus('Đã gửi');
        });
        socket.on('message', (data) => {
            setMessageByRoom((messageByRoom) => [...messageByRoom, data]);
            socket.emit('read', { id: data?.id, roomId: data?.roomId, userId: curentUser?.id });
            setIsNewMessage(true);
        });
        socket.on('typing', (data) => {
            setIsTyping(data?.typing);
        });
        socket.on('unReadMark', (data) => {
            // data && data?.totalRoomUnRead && curentUser?.id == data?.userId && setUnReadMark(data?.totalRoomUnRead);
            setUnReadMark(data?.totalRoomUnRead);
            handleGetRoom(setListRoomChat);
        });
        socket.on('pleaseCheck', (data) => {
            if (data?.userId && data?.userId == curentUser?.id) {
                socket.emit('unReadCheck', { userId: curentUser?.id });
            }
        });
        socket.on('AlreadyRead', (data) => {
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
        if (check) {
            setIsFlagReadvsUnRead(true);
        }
    }, [getMessageByRoom]);
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScrollPosition);
            }
        };
    }, []);
    useEffect(scrollToBottom, [isDownEndPage]);
    useEffect(() => {
        isAtBottom == true && setIsNewMessage(false);
    }, [isAtBottom]);
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
                    <Badge
                        count={unreadMark ? unreadMark : 0}
                        className="BadgeCss"
                        style={{
                            transform: 'translate(10px, -25px)',
                        }}
                    >
                        <Button
                            type="ghost"
                            icon={<MessageOutlined />}
                            onClick={() => {
                                handleGetRoom(setListRoomChat);
                            }}
                            className="custom-button"
                        >
                            {/* Chat */}
                        </Button>
                    </Badge>
                </Popover>
            </div>
        </div>
    );
}
