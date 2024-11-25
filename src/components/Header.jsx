import { View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({ children, bg }) => {
    const { top } = useSafeAreaInsets();

    const paddingTop = top > 0 ? top + 5 : 30;

    return (
        <View
            className={` ${bg} pb-5 flex flex-row items-center justify-between px-5 mx-[-20px]`}
            style={{
                marginTop: -paddingTop,
                paddingTop,
            }}>
            {children}
        </View>
    );
};

export default Header;
