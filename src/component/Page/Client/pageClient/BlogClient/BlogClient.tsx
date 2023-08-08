import React from 'react';
import './BlogClient.scss';
import { Breadcrumb } from 'antd';
export default function BlogClient() {
    return (
        <div className="BlogClientWarrapper">
            <div className="BlogClientBox">
                <div className="BlogClientBox__title">
                    <Breadcrumb
                        items={[
                            {
                                title: 'Trang chủ',
                            },
                            {
                                title: 'Thời trang',
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
