import { TextInput, View } from 'react-native';
import React from 'react';
import { theme } from '../constants/theme';

const Input = (props) => {
    const base = 'flex flex-row items-center justify-stretch';
    const styles = {
        input: base + 'h-16 p-4 gap-4 !border-[1px] !border-dark !rounded-2xl',
        search: base + 'h-14 bg-darkLight gap-2 rounded-xl p-3 flex-1',
    };
    return (
        <View className={styles[props.type]}>
            {props.icon && props.icon}
            <TextInput
                style={{ flex: 1 }}
                placeholderTextColor={theme.colors.textLight}
                placeholderStyle={{ fontSize: 20 }}
                value={props.value}
                onChangeText={props.onChange}
                onBlur={props.onBlur}
                onPress={props.onPress}
                keyboardType={props.keyboardType}
                {...props}
            />
        </View>
    );
};

export default Input;
