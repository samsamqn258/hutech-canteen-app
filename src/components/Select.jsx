import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { theme } from '../constants/theme';

import { hp } from '@/src/helpers/common';

const Select = ({ value, options, onChange }) => {
    return (
        <View style={styles.container}>
            <Picker style={styles.picker} onValueChange={onChange} selectedValue={value}>
                {options.map((option) => (
                    <Picker.Item
                        label={option.label}
                        value={option.value}
                        key={option.value}
                        style={styles.pickerItem}
                    />
                ))}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: theme.colors.text,
        borderRadius: theme.radius.xxl,
        overflow: 'hidden',
    },
    picker: {
        borderRadius: theme.radius.xxl,
    },
    pickerItem: {
        fontSize: hp(1.8),
        color: theme.colors.text,
    },
});

export default Select;
