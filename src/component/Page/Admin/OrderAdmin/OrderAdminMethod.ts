import { orderAdminIF } from '../../../Table/TableInterface';
import { getAllOrder, getStatusOrder, updateStatusOrder } from '../../../utils/Api/Api';
import { listValuesOrder } from './OrderAdmin';

export const handleGetOrderAdmin = async (
    currentPage: number,
    pageSize: number,
    setListOrder: React.Dispatch<React.SetStateAction<[]>>,
    setTotal: React.Dispatch<React.SetStateAction<number | undefined>>,
    code: string,
): Promise<void> => {
    const response = await getAllOrder(currentPage, pageSize, code);
    console.log(response);
    if (response && response.status == 200) {
        console.log(response);
        setListOrder(response.data?.data);
        setTotal(response.data?.meta?.totalItems);
    }
};
export const handleGetOrderStatus = async (
    setListSelectOrder: React.Dispatch<React.SetStateAction<listValuesOrder[] | null>>,
): Promise<void> => {
    const response = await getStatusOrder();
    if (response && response.status == 200) {
        console.log(response);
        if (response.data?.data && response.data?.data.length > 0) {
            const mapData = response.data?.data.map((item: any) => {
                return {
                    value: item?.code,
                    label: item?.value,
                };
            });
            if (mapData) {
                setListSelectOrder(mapData);
            }
        }
    }
};
export const handleUpdateOrderAdmin = async (
    id: number,
    data: {
        statusId: string;
    },
    setIsLoadOrder: React.Dispatch<React.SetStateAction<boolean>>,
    setIsOpenUpdateOrder: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
    const response = await updateStatusOrder(id, data);
    console.log(response);
    if (response && response.status == 200) {
        setIsLoadOrder((isLoadOrder) => !isLoadOrder);
        setIsOpenUpdateOrder(false);
    }
};
