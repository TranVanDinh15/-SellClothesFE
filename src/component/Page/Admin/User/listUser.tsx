import React from 'react';
import Content from '../common/Content/Content';
import { FiUsers } from 'react-icons/fi';
import CustomTable from '../../../Table/TableCustom';
export default function ListUser() {
    return (
        <Content title={'Quản lý Users'}>
            <div className="ListUserWrapper">{/* <CustomTable name="Users" /> */}</div>
        </Content>
    );
}
