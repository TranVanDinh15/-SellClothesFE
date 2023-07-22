import React, { useEffect, useRef, useState } from 'react';
import { CloseCircleOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Tag, theme } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { useDispatch } from 'react-redux';
import { ClientChooseDeleteAction } from '../../../../../Redux/Actions/Actions.url';
interface tagProps {
    clientChooseCustom: {
        id: string;
        value: string;
    }[];
    setCheckValues: React.Dispatch<React.SetStateAction<any>>;
    handleCheckboxChange: (param: any) => void;
    setIsBoderColor: React.Dispatch<React.SetStateAction<any>>;
    setIsBorderMaterial: React.Dispatch<React.SetStateAction<any>>;
}
export default function TagYourChoose({
    clientChooseCustom,
    setCheckValues,
    handleCheckboxChange,
    setIsBoderColor,
    setIsBorderMaterial,
}: tagProps) {
    const dispatch = useDispatch();
    const preventDefault = (
        e: React.MouseEvent<HTMLElement>,
        item: {
            value: string;
            id: string;
        },
    ) => {
        e.preventDefault();
        console.log(e);
        dispatch(
            ClientChooseDeleteAction(
                item,
                clientChooseCustom,
                setCheckValues,
                handleCheckboxChange,
                setIsBoderColor,
                setIsBorderMaterial,
            ),
        );
    };

    return (
        <div
            style={{
                marginLeft: '18px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '20px',
            }}
        >
            {clientChooseCustom.map((item, index) => {
                return (
                    <Tag
                        onClose={(e) => {
                            preventDefault(e, item);
                        }}
                        key={index}
                        closeIcon={
                            <CloseOutlined
                                style={{
                                    color: '#fff',
                                }}
                            />
                        }
                        closable
                        style={{
                            padding: '4px',
                            backgroundColor: '#00BFFF',
                            color: '#fff',
                        }}
                    >
                        {item.value}
                    </Tag>
                );
            })}
        </div>
    );
}
