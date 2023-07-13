import { Skeleton } from 'antd';
import React from 'react';

export default function SekeletonCardCustomer() {
    return (
        <div className="sekeletonBox">
            <Skeleton.Input
                active={true}
                size={'large'}
                style={{
                    height: '200px',
                }}
            />
            <Skeleton.Input
                active={true}
                size={'large'}
                style={{
                    marginTop: '20px',
                }}
            />
            <div className="sekeletonBox_Price">
                <Skeleton.Button active={true} size={'default'} />
                <Skeleton.Button active={true} size={'default'} />
            </div>
            <div className="sekeletonBox_Avatar">
                <Skeleton.Avatar active={true} size={'small'} shape={'circle'} />
                <Skeleton.Avatar active={true} size={'small'} shape={'circle'} />
                <Skeleton.Avatar active={true} size={'small'} shape={'circle'} />
                <Skeleton.Avatar active={true} size={'small'} shape={'circle'} />
            </div>
        </div>
    );
}
