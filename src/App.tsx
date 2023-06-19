import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLayoutAdmin from './component/Page/Admin/defaultLayoutAdmin/defaultLayoutAdmin';
import NotFound from './component/Page/Admin/common/NotFound/NotFound';
import DashBoad from './component/Page/Admin/Dashboard/DashBoad';
import Blog from './component/Page/Admin/Blog/Blog';
import AddBlog from './component/Page/Admin/Blog/addBlog';
import ListUser from './component/Page/Admin/User/listUser';
import DefaultLayoutClient from './component/Page/Client/defaultLayoutClient/defaultLayoutClient';
import LoginAdmin from './component/Page/Admin/LoginAdmin/LoginAdmin';
import TrademarkManage from './component/Page/Admin/trademark/trademark';

function App() {
    const router = createBrowserRouter([
        {
            path: '/Admin',
            element: <DefaultLayoutAdmin />,
            errorElement: <NotFound type={'notAccess'} />,
            // loader: rootLoader,
            children: [
                {
                    index: true,
                    // path: 'Dashboard',
                    element: <DashBoad />,
                    errorElement: <NotFound type={'notRole'} />,
                    // loader: teamLoader,
                },
                {
                    path: 'Blog/listBlog',
                    element: <Blog />,
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'Blog/addBlog',
                    element: <AddBlog />,
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'User/listUser',
                    element: <ListUser />,
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'TradeMark',
                    element: <TrademarkManage />,
                    errorElement: <NotFound type={'notRole'} />,
                },
            ],
        },
        {
            path: '/Login-Admin',
            element: <LoginAdmin />,
            errorElement: <NotFound type={'notAccess'} />,
        },
        {
            path: '/',
            element: <DefaultLayoutClient />,
            errorElement: <NotFound type={'notAccess'} />,
            // loader: rootLoader,
            children: [],
        },
    ]);
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
