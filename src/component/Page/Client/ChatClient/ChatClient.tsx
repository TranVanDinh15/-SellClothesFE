import { MessageOutlined } from '@ant-design/icons';
import { Button, Popover, Badge } from 'antd';
import React from 'react';
import './ChatClient.scss';
export default function ChatClient() {
    return (
        <div className="ChatClientWrapper">
            <div className="ChatClientWrapper__Btn">
                <Popover placement="topLeft" title={<span>Title</span>} content={<>dasdada</>} trigger="click">
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
