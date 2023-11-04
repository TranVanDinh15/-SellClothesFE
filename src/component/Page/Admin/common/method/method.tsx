export const covertCreateAt = (createAt: string) => {
    const createdAt = new Date(createAt);
    const localTime = createdAt.toLocaleString();
    return localTime;
};
export const convertVND = (number: number) => {
    if (!number) {
        return;
    }
    if (number == 0) {
        return 0;
    }
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
