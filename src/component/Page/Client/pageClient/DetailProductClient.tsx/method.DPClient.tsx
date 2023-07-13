export const onChangeSliderSize = (value: number | [number, number]) => {
    console.log('onChange: ', value);
};

export const onAfterChangeSliderSize = (value: number | [number, number]) => {
    console.log('onAfterChange: ', value);
};
