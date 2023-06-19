export const covertCreateAt = (createAt: string) => {
    const createdAt = new Date(createAt);
    const localTime = createdAt.toLocaleString();
    return localTime;
};
