import React from 'react';
import { Select } from 'antd';

interface SelectsProps {
    onChange: any;
    onSearch: any;
    option: {
        value: string;
        label: string;
    }[];
    mode: any;
    value?: any;
    disable?: boolean;
}
const onChange = (value: string) => {
    console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
    console.log('search:', value);
};

const SelectCustomer = ({ option, onChange, onSearch, mode, value, disable }: SelectsProps) => (
    <Select
        mode={mode}
        showSearch
        placeholder="Nhập từ khóa cần tìm"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
        options={option}
        value={value}
        disabled={disable}
    />
);

export default SelectCustomer;
