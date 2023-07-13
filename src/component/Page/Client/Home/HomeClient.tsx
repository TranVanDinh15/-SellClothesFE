import React, { useState, useEffect } from 'react';
import SliderCustom from '../Slider/SliderCustom';
import { Button, Col, Row } from 'antd';
import './HomeClient.css';
import TabProductCustomer from '../Common/TabProduct/TabProduct';
import { getAllBanner } from '../../../utils/Api/Api';
export default function HomeClient() {
    const [allSlider, setAllSlider] = useState<
        {
            image: string;
        }[]
    >([]);
    const handleGetAllSlider = async (): Promise<void> => {
        const query = `statusId=ACTIVE&page=1&size=5&updatedAt=DESC`;
        const response = await getAllBanner(query);
        if (response && response.status == 200) {
            console.log(response);
            setAllSlider(response.data.data);
        }
    };
    useEffect(() => {
        handleGetAllSlider();
    }, []);
    return (
        <div className="HomeClientWrapper">
            <div className="HomeClientWrapper__slider">
                <SliderCustom data={allSlider} />
            </div>
            <div className="HomeClientSaleProduct">
                <div className="HomeClientSaleProduct__title">
                    <span>SALE SỐC</span>
                </div>
                <div className="HomeClientSaleProduct__listItem">
                    {/* <TabProductCustomer width={220} />
                    <TabProductCustomer width={220} />
                    <TabProductCustomer width={220} />
                    <TabProductCustomer width={220} />
                    <TabProductCustomer width={220} /> */}
                </div>
            </div>
            <div className="SuggestForyou HomeClientSaleProduct">
                <div className="HomeClientSaleProduct__title">
                    <div className="HomeClientSaleProduct__title__Heading">
                        <span>GỢI Ý CHO BẠN</span>
                    </div>
                    <div className="HomeClientSaleProduct__title__btn">
                        <Button type="text">Xem thêm</Button>
                    </div>
                </div>
                <div className="HomeClientSaleProduct__listItem">
                    {/* <TabProductCustomer width={220} />
                    <TabProductCustomer width={220} />
                    <TabProductCustomer width={220} />
                    <TabProductCustomer width={220} />
                    <TabProductCustomer width={220} /> */}
                </div>
            </div>
        </div>
    );
}
