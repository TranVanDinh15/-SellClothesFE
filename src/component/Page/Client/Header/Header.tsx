import { Header } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import './HeaderClient.css';
import { Link } from 'react-router-dom';
import { Badge, Button, Input, Menu, Popover } from 'antd';
import {
    AudioOutlined,
    FilterOutlined,
    PhoneOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { getListCategoryFun, getListCategorySub } from './Header.Method';
import { chidrenCategory, dataCategoy, headerCategory } from './HeaderInterface';
const { Search } = Input;
const headerStyle: React.CSSProperties = {
    // textAlign: 'center',
    color: '#fff',
    minHeight: '150px',
    backgroundColor: '#fff',
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: '20px ',
    paddingBottom: '20px ',
    borderBottom: '1px solid #ccc',
};
const itemsMenu = [
    {
        id: 0,
        name: 'VỀ CHÚNG TÔI',
        children: [
            {
                id: 1,
                name: 'Áo khoác',
            },
            {
                id: 2,
                name: 'Bảo vệ khách hàng',
            },
            {
                id: 3,
                name: 'Câu chuyện và nhân vật',
            },
        ],
    },
    {
        id: 1,
        name: 'BLOG',
        children: [
            {
                id: 1,
                name: 'Làm đẹp',
            },
            {
                id: 2,
                name: 'Du lịch',
            },
            {
                id: 3,
                name: 'Mặt hàng',
            },
        ],
    },
];
export default function HeaderClient() {
    const [isOpenSubCategory, setIsOpenSubcategory] = useState<boolean>(false);
    const [saveIdCategory, setSaveidCategory] = useState<number | undefined>();
    const [headerCategory, setHeaderCategory] = useState<headerCategory[]>([]);
    const [dataCategory, setDatacategory] = useState<dataCategoy[]>([]);

    const [saveCodeCategory, setSaveCodeCategory] = useState<string>('');
    const onSearch = (value: string) => console.log(value);
    console.log(dataCategory);
    console.log(headerCategory);
    const subNavItemHeader = (itemsData: chidrenCategory[]) => {
        return (
            <ul>
                {itemsData.map((item: chidrenCategory) => {
                    return (
                        <li className="subnavCategory">
                            <Link to="/">
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    };
    useEffect(() => {
        getListCategoryFun(setHeaderCategory);
    }, []);
    useEffect(() => {
        if (saveCodeCategory) {
            getListCategorySub(setDatacategory, saveCodeCategory);
        }
    }, [saveCodeCategory]);

    return (
        <Header style={headerStyle}>
            <header className="headerClientAbove">
                <div className="headerClientAbove__Logo">
                    <Link to={'/'}>
                        <img src="https://bizweb.dktcdn.net/100/438/408/themes/913235/assets/logo.svg?1688174100192"></img>
                    </Link>
                </div>
                <div className="headerClientAbove__search">
                    <Search
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40,
                        }}
                        placeholder="Tìm kiếm"
                        allowClear
                        size="large"
                        onSearch={onSearch}
                    />
                </div>
                <div className="headerClientAbove__LoginOutCart">
                    <div>
                        <Button
                            type="text"
                            style={{
                                fontSize: '15px',
                                padding: '4px ',
                                color: '#11006f',
                            }}
                            icon={
                                <PhoneOutlined
                                    style={{
                                        border: 'none',
                                        fontSize: '20px',
                                        color: '#11006f',
                                    }}
                                />
                            }
                        >
                            0457965152
                            <Button
                                type="ghost"
                                style={{
                                    fontSize: '15px',
                                    padding: '4px ',
                                    backgroundColor: 'orangered',
                                    marginLeft: '10px',
                                    borderRadius: '10px',
                                    color: '#fff',
                                }}
                            >
                                Free
                            </Button>
                        </Button>
                    </div>
                    <div className="headerClientAbove__Cart">
                        <Badge count={5}>
                            <Button
                                type="text"
                                icon={
                                    <ShoppingCartOutlined
                                        style={{
                                            fontSize: '25px',
                                            color: '#11006f',
                                        }}
                                    />
                                }
                            ></Button>
                        </Badge>
                    </div>
                    <div className="headerClientAbove__LoginOut">
                        <Button
                            type="text"
                            icon={
                                <UserOutlined
                                    style={{
                                        border: 'none',
                                        fontSize: '16px',
                                        color: '#11006f',
                                    }}
                                />
                            }
                        ></Button>
                        <Button
                            type="text"
                            style={{
                                fontSize: '15px',
                                padding: '4px ',
                                color: '#11006f',
                            }}
                        >
                            Đăng Ký
                        </Button>
                        <span
                            style={{
                                color: '#11006f',
                                fontSize: '15px',
                            }}
                        >
                            \
                        </span>
                        <Link to={'/signIn'}>
                            <Button
                                type="text"
                                style={{
                                    fontSize: '15px',
                                    padding: '4px',
                                    color: '#11006f',
                                }}
                            >
                                Đăng Nhập
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>
            <header className="headerClientbelow">
                <ul className="headerClientbelow__listMenu">
                    <li>
                        <Button
                            type="text"
                            icon={<FilterOutlined />}
                            style={{
                                paddingLeft: '0',
                                color: 'orangered',
                                fontSize: '16px',
                            }}
                        >
                            Bộ lọc tìm kiếm
                        </Button>
                    </li>
                    {headerCategory.length > 0 &&
                        headerCategory.map((item: any, index: number) => {
                            return (
                                <li key={index}>
                                    <div
                                        className={dataCategory.length > 0 ? 'bigChildrenTab' : ''}
                                        onMouseMove={(event) => {
                                            setSaveCodeCategory(item.code);
                                        }}
                                    >
                                        <Button type="text" className="ListHeaderCat">
                                            {item.value}
                                        </Button>

                                        <div className="subNavCategory">
                                            {dataCategory && dataCategory.length > 0 ? (
                                                <div className="subNavCategory__container">
                                                    {dataCategory.map((item: dataCategoy) => {
                                                        return (
                                                            <div className="subNavCategory__item">
                                                                <div className="subNavCategory__heading">
                                                                    <span>{item?.value}</span>
                                                                </div>
                                                                <ul className="subNavCategory__listItems">
                                                                    {item.children.length > 0
                                                                        ? item?.children.map(
                                                                              (item: any, index: number) => {
                                                                                  return (
                                                                                      <li key={index}>
                                                                                          <Link to="/">
                                                                                              <span>{item?.value}</span>
                                                                                          </Link>
                                                                                      </li>
                                                                                  );
                                                                              },
                                                                          )
                                                                        : ''}
                                                                </ul>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    {itemsMenu.map((item: any, index: number) => {
                        return (
                            <li key={index}>
                                <Popover content={subNavItemHeader(item.children)} placement="bottomLeft" arrow={false}>
                                    <Button type="text" className="ListHeaderCat ">
                                        {item.name}
                                    </Button>
                                </Popover>
                            </li>
                        );
                    })}
                </ul>
            </header>
        </Header>
    );
}
