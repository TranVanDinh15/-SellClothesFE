import { createRoomMessage, getAdmin, getMessageByRoom, getRooms, getUserRoleId } from '../../../utils/Api/Api';
import { message } from 'antd';
import { ListRooms, adminAppIf } from './ChatClient';
import { promises } from 'dns';

export const handleGetadminApp = async (
    setAdminApp: React.Dispatch<React.SetStateAction<adminAppIf[] | undefined>>,
): Promise<void> => {
    const respone = await getUserRoleId(process.env.REACT_APP__ROLE__ADMIN ? process.env.REACT_APP__ROLE__ADMIN : '');
    if (respone && respone.status == 200) {
        // setAdminApp(respone.data?.data);
        const mapData = respone.data?.data
            ? respone.data?.data.map((item: any) => {
                  return {
                      label: item?.fullName,
                      value: item?.id,
                  };
              })
            : [];
        mapData && setAdminApp(mapData);
    } else {
        message.error('Đã có lỗi xảy ra');
    }
};
export const handleCreateRoom = async (
    data: { userTwoId: number },
    setListRoomChat: React.Dispatch<React.SetStateAction<ListRooms[] | undefined>>,
): Promise<void> => {
    const response = await createRoomMessage(data);
    console.log(response);
    if (response && response.status == 201) {
        handleGetRoom(setListRoomChat);
    } else {
        message.error('Đã có lỗi xảy ra');
    }
};
export const handleGetRoom = async (
    setListRoom: React.Dispatch<React.SetStateAction<ListRooms[] | undefined>>,
): Promise<void> => {
    const response = await getRooms();
    if (response && response.status == 200) {
        setListRoom(response.data);
    }
};
// export const handleOnChangeSelect=async (data: { userTwoId: number }): Promise<void>=>{

// }
export const handleGetMess = async (
    id: number,
    setMessageByRoom: React.Dispatch<React.SetStateAction<adminAppIf[] | null>>,
): Promise<void> => {
    const response = await getMessageByRoom(id);
    if (response && response.status == 200) {
    }
};
export const handleGetAdmin = async (setListAdmin: React.Dispatch<React.SetStateAction<any>>) => {
    const response = await getAdmin();
    if (response && response.status == 200) {
        console.log(response);
        const mapData = await response?.data?.data.map((item: any) => {
            return {
                value: item?.id,
                label: item?.fullName,
            };
        });
        setListAdmin(mapData);
    }
};
