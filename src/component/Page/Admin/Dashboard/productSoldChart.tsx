import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Bar } from '@ant-design/plots';
export default function ProductSoldChart() {
    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 6 },
        { year: '1996', value: 10 },
        { year: '1997', value: 60 },

        // more data...
    ];
    const config = {
        data,
        xField: 'year',
        yField: 'value',
        seriesField: 'year',
        // legend: { position: 'top-left' },
    };
    return <Bar {...config} />;
}
