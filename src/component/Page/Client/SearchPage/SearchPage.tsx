import React, { useEffect, useState } from 'react';
import './SearchPage.scss';
import { Breadcrumb, Space } from 'antd';
import { resultSearch } from '../Header/HeaderInterface';
import { handleGetAllResult } from './SearchMethod';
import TabProductCustomer from '../Common/TabProduct/TabProduct';
import { GetContext } from '../../Admin/common/Context/Context';
export default function SearchPage() {
    const { isLoadSearch }: any = GetContext();
    // Lấy query từ URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(urlSearchParams.entries());
    console.log(queryParams);
    // Quản lý Tất cả kết quả Search
    const [allResult, setAllResult] = useState<resultSearch[]>([]);
    console.log(allResult);
    useEffect(() => {
        if (queryParams && queryParams?.name) {
            handleGetAllResult('product', queryParams?.name, setAllResult);
        }
    }, [isLoadSearch]);
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
                                title: 'Tìm kiếm',
                            },
                        ]}
                    />
                    <div className="BlogClientBox__title__text">
                        <span>Kết quả tìm kiếm sản phẩm </span>
                    </div>
                </div>
                <div className="BlogClientBox__Content">
                    {allResult.length > 0 ? (
                        <Space className="ProductCatContent__ListCard" wrap={true} size={'small'} align="center">
                            <TabProductCustomer width={210} listData={allResult} />
                        </Space>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
}
