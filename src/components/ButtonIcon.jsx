import { Pressable } from 'react-native';
import React from 'react';

const ButtonIcon = ({ children, type }) => {
    const base = 'pr-3 pl-3 shadow-lg inline-block';
    const styles = {
        rounded: base + 'bg-white rounded-full pt-2 pb-2',
        square: base + 'bg-secondary rounded-md pt-3 pb-3',
    };
    return <Pressable className={styles[type]}>{children}</Pressable>;
};

export default ButtonIcon;
