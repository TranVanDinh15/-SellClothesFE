import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import NotFound from '../Page/Admin/common/NotFound/NotFound';
// import NotFound from '../NotFound/NotFound';
export interface useRedux {
    reduxAuth: {
        isAuthenticate: boolean;
        user: any;
        isLoading: boolean;
        isfail: boolean;
    };
}
interface propsFuntion {
    children: ReactNode;
}
function RoleBaseRole({ children }: propsFuntion) {
    // const isAdminRoute = location.pathname.startsWith('/Admin');
    // Get User Hiện tại
    const user = useSelector((state: useRedux) => state.reduxAuth.user);
    console.log(user);
    const userRole = user?.roleId;
    if (userRole == 'ADMIN') {
        return <>{children}</>;
    }
    return <NotFound type={'notRole'} />;
}
export default function ProtectedRoute({ children }: propsFuntion) {
    const isAuthenticate = useSelector((state: useRedux) => state?.reduxAuth?.isAuthenticate);
    console.log(isAuthenticate);
    return isAuthenticate ? (
        <>
            <RoleBaseRole>{children}</RoleBaseRole>
        </>
    ) : (
        <Navigate to={'/login'} replace />
    );
}
