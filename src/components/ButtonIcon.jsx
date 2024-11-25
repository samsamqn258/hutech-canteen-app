import { Pressable } from 'react-native';
import React from 'react';

const ButtonIcon = ({ children, type, onPress }) => {
    const base = 'pr-3 pl-3 shadow-sm flex item-center justify-center ';
    const styles = {
        rounded: base + ' bg-white rounded-full pt-2 pb-2',
        square: base + ' bg-secondary rounded-md pt-3 pb-3',
        outline: 'p-2 w-14 items-center justify-center',
    };

    return (
        <Pressable className={styles[type]} onPress={onPress}>
            {children}
        </Pressable>
    );
};

export default ButtonIcon;
