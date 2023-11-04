import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import { convertVND } from '../common/method/method';

interface dataRevenue {
    data: {
        type: string;
        sales: any;
    }[];
}

export default function RevenueChar({ data }: dataRevenue) {
    const config = {
        data,
        xField: 'type',
        yField: 'sales',
        columnWidthRatio: 0.8,
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        yAxis: {
            label: {
                // Tùy chỉnh định dạng label của trục y
                formatter: (v: any) => `${convertVND(Number(v)) ? convertVND(Number(v)) : '0'}`,
                // formatter: (v: any) => `${v}`,
            },
        },
        meta: {
            type: {
                alias: 'Doanh thu',
            },
            sales: {
                alias: 'Doanh thu',
            },
        },
    };
    return <Column {...config} />;
}
