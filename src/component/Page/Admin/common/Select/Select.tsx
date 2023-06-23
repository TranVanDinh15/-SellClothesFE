import React from 'react';
import { Select } from 'antd';

interface SelectsProps {
    // onChange: (e: string) => void;
    option: {
        value: string;
        label: string;
    }[];
}
const onChange = (value: string) => {
    console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
    console.log('search:', value);
};

const SelectCustomer = ({ option }: SelectsProps) => (
    <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        // filterOption={(input, option) =>
        //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        // }
        options={option}
    />
);

export default SelectCustomer;
