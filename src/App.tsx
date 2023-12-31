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
import VoucherAdmin from './component/Page/Admin/VoucherAdmin/VoucherAdmin';
import SearchPage from './component/Page/Client/SearchPage/SearchPage';
import TypeVoucher from './component/Page/Admin/VoucherAdmin/TypeVoucher';
import Profile from './component/Page/Client/Profile/Profile';
import Account from './component/Page/Client/Profile/Account';
import VerifyMail from './component/Page/Client/Profile/VerifyMail';
import Address from './component/Page/Client/Profile/Address';
import VoucherClient from './component/Page/Client/VoucherClient/VoucherClient';
import VoucherUser from './component/Page/Client/Profile/VoucherUser';
import ChangPassword from './component/Page/Client/Profile/ChangPassword';
import HistoryOrder from './component/Page/Client/Profile/historyOrder';
import DetailHistoryOrder from './component/Page/Client/Profile/detailHistoryOrder';
import OrderAdmin from './component/Page/Admin/OrderAdmin/OrderAdmin';
import RegisterClient from './component/Page/Client/Register/Register';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
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
                    element: (
                        <ProtectedRoute>
                            <DashBoadCustom />
                        </ProtectedRoute>
                    ),
                    errorElement: <NotFound type={'notRole'} />,
                    // loader: teamLoader,
                },
                {
                    path: 'Blog/listBlog',
                    element: (
                        <ProtectedRoute>
                            <Blog />
                        </ProtectedRoute>
                    ),
                    errorElement: <NotFound type={'notRole'} />,
                },

                {
                    path: 'User/listUser',
                    element: (
                        <ProtectedRoute>
                            <ListUser />
                        </ProtectedRoute>
                    ),
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'TradeMark',
                    element: (
                        <ProtectedRoute>
                            <TrademarkManage />
                        </ProtectedRoute>
                    ),
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'Product',
                    element: (
                        <ProtectedRoute>
                            <Product />
                        </ProtectedRoute>
                    ),
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'Product/DetailProduct/:id',
                    element: (
                        <ProtectedRoute>
                            <DetailProductCreate />
                        </ProtectedRoute>
                    ),
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'Product/Category',
                    element: (
                        <ProtectedRoute>
                            <ProductCategory />
                        </ProtectedRoute>
                    ),
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'Supplier',
                    element: (
                        <ProtectedRoute>
                            <Supplier />
                        </ProtectedRoute>
                    ),
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'ImportFoods',
                    element: (
                        <ProtectedRoute>
                            <Receipt />
                        </ProtectedRoute>
                    ),
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'ImportFoods/:id',
                    element: (
                        <ProtectedRoute>
                            <ReceiptDetail />
                        </ProtectedRoute>
                    ),
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'Banner',
                    element: (
                        <ProtectedRoute>
                            <Banner />
                        </ProtectedRoute>
                    ),
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'Voucher',
                    element: (
                        <ProtectedRoute>
                            <VoucherAdmin />
                        </ProtectedRoute>
                    ),
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'kieu-voucher',
                    element: (
                        <ProtectedRoute>
                            <TypeVoucher />
                        </ProtectedRoute>
                    ),
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: 'Order',
                    element: (
                        <ProtectedRoute>
                            <OrderAdmin />
                        </ProtectedRoute>
                    ),
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
                {
                    path: '/tim-kiem',
                    element: <SearchPage />,
                    errorElement: <NotFound type={'notAccess'} />,
                },
                {
                    path: '/Profile',
                    element: <Profile />,
                    errorElement: <NotFound type={'notAccess'} />,
                    children: [
                        {
                            index: true,
                            // path: 'account',
                            element: <Account />,
                            errorElement: <NotFound type={'notAccess'} />,
                        },
                        {
                            path: 'Address',
                            element: <Address />,
                            errorElement: <NotFound type={'notAccess'} />,
                        },
                        {
                            path: 'Voucher',
                            element: <VoucherUser />,
                            errorElement: <NotFound type={'notAccess'} />,
                        },
                        {
                            path: 'historyOrder',
                            element: <HistoryOrder />,
                            errorElement: <NotFound type={'notAccess'} />,
                        },
                        {
                            path: 'detailOrder/:id',
                            element: <DetailHistoryOrder />,
                            errorElement: <NotFound type={'notAccess'} />,
                        },
                    ],
                },
                {
                    path: '/Giam-gia',
                    element: <VoucherClient />,
                    errorElement: <NotFound type={'notAccess'} />,
                },
                {
                    path: '/signIn',
                    element: <LoginClient />,
                    errorElement: <NotFound type={'notRole'} />,
                },
                {
                    path: '/signUp',
                    element: <RegisterClient />,
                    errorElement: <NotFound type={'notRole'} />,
                },
            ],
        },

        {
            path: '/verify/:token',
            element: <VerifyMail />,
            errorElement: <NotFound type={'notAccess'} />,
        },
        {
            path: '/confirm/:token',
            element: <ChangPassword />,
            errorElement: <NotFound type={'notAccess'} />,
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
