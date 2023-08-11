import { createVoucher, getTypeVoucher } from '../../../utils/Api/Api';
import type { Dayjs } from 'dayjs';
import { dataCreateVoucher } from '../../../utils/Api/ApiInterFace';
export const handleGetTypeVoucher = async (
    setTypeVoucher: React.Dispatch<React.SetStateAction<{ value: string; label: string }[] | null>>,
): Promise<void> => {
    const response = await getTypeVoucher();
    if (response && response.status == 200) {
        const maptData =
            response.data?.data &&
            response?.data?.data.map((item: any) => {
                return {
                    value: item?.id,
                    label: item?.value,
                };
            });
        setTypeVoucher(maptData);
    }
};
export const handleAddVoucher = async (data: dataCreateVoucher): Promise<void> => {
    const response = await createVoucher(data);
    if (response && response.status == 201) {
        console.log(response);
    }
};
