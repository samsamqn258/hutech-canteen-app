import { View, Pressable, Text } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
const Checkbox = ({ label }) => {
    const [checked, setChecked] = useState(false);
    return (
        <Pressable
            onPress={() => setChecked(!checked)}
            className="flex flex-row gap-4 items-center">
            <View
                className={`w-4 h-4 border-[1px] rounded ${
                    checked ? 'bg-primary border-primary' : 'bg-white border-gray-400'
                } flex items-center justify-center`}>
                {checked && <AntDesign name="check" size={12} color="white" />}
            </View>
            {label}
        </Pressable>
    );
};

export default Checkbox;
