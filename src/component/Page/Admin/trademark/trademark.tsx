import React, { useEffect, useState } from 'react';
import Content from '../common/Content/Content';
import { AiFillTrademarkCircle } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import CustomTable from '../../../Table/TableCustom';
import './trademark.css';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getAllBrand } from '../../../utils/Api/Api';
interface itemsData {
    value: string;
    createdAt: string;
}
const TitleTable = () => {
    return (
        <div className="titleTable">
            <div className="titleTable__Heading">
                <span>Danh sách thương hiệu</span>
            </div>
            <div className="titleTable__btn">
                <Button type="primary" icon={<PlusOutlined />} className="btnButton">
                    Thêm thương hiệu
                </Button>
            </div>
        </div>
    );
};

export default function TrademarkManage() {
    const [dataTable, setDataTable] = useState<[]>([]);
    const getAllBrandFun = async () => {
        const response = await getAllBrand();
        console.log(response);
        if (response.data && response.status == 200) {
            const filterData = response.data.map((item: itemsData) => {
                return {
                    value: item?.value,
                    createAt: item?.createdAt,
                };
            });
            // console.log(filterData);
            setDataTable(filterData);
        }
    };
    console.log(dataTable);
    useEffect(() => {
        getAllBrandFun();
    }, []);
    return (
        <Content title={'Quản lý thương hiệu'}>
            <CustomTable name="Trademark" title={TitleTable} dataSource={dataTable} />
        </Content>
    );
}
