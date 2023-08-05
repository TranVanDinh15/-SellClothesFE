import { getAmountTotalUser, getAmountUserOnline } from '../../../utils/Api/Api';
export const handleGetTotalUser = async (
    setTotalAmountUser: React.Dispatch<React.SetStateAction<number | undefined>>,
): Promise<void> => {
    const response = await getAmountTotalUser();
    if (response && response.status == 200) {
        console.log(response);
        setTotalAmountUser(response?.data);
    }
};
export const handleGetUserOnline = async (
    setTotalAmountUser: React.Dispatch<React.SetStateAction<number | undefined>>,
): Promise<void> => {
    const response = await getAmountUserOnline();
    if (response && response.status == 200) {
        console.log(response);
        setTotalAmountUser(response?.data);
    }
};
