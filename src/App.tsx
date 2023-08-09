import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLayoutAdmin from './component/Page/Admin/defaultLayoutAdmin/defaultLayoutAdmin';
import NotFound from './component/Page/Admin/common/NotFound/NotFound';
import Blog from './component/Page/Admin/Blog/Blog';
import ListUser from './component/Page/Admin/User/listUser';
import DefaultLayoutClient from './component/Page/Client/defaultLayoutClient/defaultLayoutClient';
import LoginAdmin from './component/Page/Admin/LoginAdmin/LoginAdmin';
import TrademarkManage from './component/Page/Admin/trademark/trademark';
import Product from './component/Page/Product/Product';
import ProductCategory from './component/Page/Product/CategoryProduct';
import DetailProductCreate from './component/Page/Product/DetailProductCreate';
import LoginClient from './component/Page/Client/LoginClient/Login';
import HomeClient from './component/Page/Client/Home/HomeClient';
import DetailProductClient from './component/Page/Client/pageClient/DetailProductClient.tsx/DetailProduct.client';
import { ChakraProvider } from '@chakra-ui/react';
import CheckOut from './component/Page/Client/pageClient/CheckOut/CheckOut';
import ProductCat from './component/Page/Client/pageClient/ProductCat/ProductCat';
import CartPage from './component/Page/Client/Cart/CartPage';
import Supplier from './component/Page/Admin/Supplier/Supplier';
import Receipt from './component/Page/Admin/Receipt/Receipt';
import ReceiptDetail from './component/Page/Admin/Receipt/ReceiptDetail';
import Banner from './component/Page/Admin/Banner/Banner';
import DashBoadCustom from './component/Page/Admin/Dashboard/DashBoad';
import BlogClient from './component/Page/Client/pageClient/BlogClient/BlogClient';
import BlogClientItem from './component/Page/Client/pageClient/BlogClient/BlogClientItem';
function App() {
    const token = localStorage.getItem('token');
    const router = createBrowserRouter([
        {
            path: '/Admin',
            element: <DefaultLayoutAdmin />,
            errorElement: <NotFound type={'notAccess'} />,
            // loader: rootLoader,
            children: [
                {
                    index: true,
                    element: <DashBoadCustom />,
                    errorElement: <NotFound type={'notRole'} />,
                    // loader: teamLoader,
                },
                {
                    path: 'Blog/listBlog',
                    element: <Blog />,
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
                {
                    path: 'Product',
                    element: <Product />,
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'Product/DetailProduct/:id',
                    element: <DetailProductCreate />,
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'Product/Category',
                    element: <ProductCategory />,
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'Supplier',
                    element: <Supplier />,
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'ImportFoods',
                    element: <Receipt />,
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'ImportFoods/:id',
                    element: <ReceiptDetail />,
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'Banner',
                    element: <Banner />,
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
            children: [
                {
                    index: true,
                    element: <HomeClient />,
                    errorElement: <NotFound type={'notRole'} />,
                    // loader: teamLoader,
                },

                {
                    path: '/chi-tiet-san-pham/:slug',
                    element: <DetailProductClient />,
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: '/:slug',
                    element: <ProductCat />,
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: '/Cart',
                    element: <CartPage />,
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: '/blog/:subjectId',
                    element: <BlogClient />,
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: '/:SujectId/:id',
                    element: <BlogClientItem />,
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: '/thanh-toan',
                    element: <CheckOut />,
                    errorElement: <NotFound type={'notAccess'} />,
                },
            ],
        },

        {
            path: '/signIn',
            element: <LoginClient />,
            errorElement: <NotFound type={'notRole'} />,
        },
    ]);
    return (
        <ChakraProvider>
            <div className="App">
                <RouterProvider router={router} />
            </div>
        </ChakraProvider>
    );
}

export default App;
