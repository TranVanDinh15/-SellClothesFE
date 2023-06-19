import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
interface typeProps{
    type: String
}
const NotFound = ({ type}: typeProps) => (
    <>
        {type == 'notRole' && (
            <Result
                status="403"
                title="403"
                subTitle="Xin lỗi, bạn không có quyền truy cập vào trang này."
                extra={
                    <Button type="primary">
                        {' '}
                        <Link to={'/'}>Trở Về</Link>
                    </Button>
                }
            />
        )}
        {type == 'notAccess' && (
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi trang này không tồn tại."
                extra={
                    <Button type="primary">
                        <Link to={'/'}>Trở Về</Link>
                    </Button>
                }
            />
        )}
    </>
);
export default NotFound;
