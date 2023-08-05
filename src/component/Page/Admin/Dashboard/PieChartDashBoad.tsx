import React from 'react';
import { Pie, G2 } from '@ant-design/plots';
interface dataPie {
    data: {
        type: string;
        value: number;
    }[];
}
export default function PieChartDashBoad({ data }: dataPie) {
    const { registerTheme } = G2;

    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            // offset: '-30%',
            content: '{value}',
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
            {
                type: 'element-selected',
            },
        ],
    };
    return <Pie {...config} />;
}
