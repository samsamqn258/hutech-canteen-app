import { View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hp } from '@/helpers/common';
const ScreenWrapper = ({ children, bg }) => {
    const { top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 5 : 30;
    return (
        <View
            style={{ flex: 1, paddingTop, backgroundColor: bg, height: hp(100) }}
            className="px-4">
            {children}
        </View>
    );
};

export default ScreenWrapper;
