import { getRoomsAdmin } from '../../../utils/Api/Api';
import { ListRooms } from './ChatAdmin';

export const handleGetRoomsAdmin = async (
    setListRoom: React.Dispatch<React.SetStateAction<ListRooms[] | undefined>>,
): Promise<void> => {
    const response = await getRoomsAdmin();
    if (response && response.status == 200) {
        console.log(response);
        setListRoom(response.data);
    }
};
