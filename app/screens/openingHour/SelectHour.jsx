import Select from '@/src/components/Select';
import { theme } from '@/src/constants/theme';
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { G } from 'react-native-svg';

const SelectHour = ({ data, onConfirm }) => {
    const [selectedDay, setSelectedDay] = useState('Today' || 'Tomorrow');
    const [selectedTime, setSelectedTime] = useState(null);
    console.log(selectedDay);
    // Gán lại giá trị ban đầu cho selectedTime khi data , selectedDay thay đổi
    useEffect(() => {
        if (selectedDay && data[selectedDay]) {
            if (selectedDay === 'Today') {
                setSelectedTime(null);
            } else {
                const firstTime = Object.values(data[selectedDay])[0];
                setSelectedTime(firstTime);
            }
        }
    }, [selectedDay, data]);

    const handleDayChange = (itemValue) => {
        setSelectedDay(itemValue);
        setSelectedTime(null);
    };

    const handleTimeChange = (itemValue) => {
        setSelectedTime(itemValue);
    };

    const dayOptions = Object.keys(data).map((day) => {
        let label = day;
        switch (day) {
            case 'Today':
                label = 'Hôm nay';
                break;
            case 'Tomorrow':
                label = 'Ngày mai';
                break;
            case 'InTwoDays':
                label = 'Ngày mốt';
                break;
            default:
                label = day;
        }
        return { label, value: day };
    });

    const timeOptions =
        selectedDay && data[selectedDay]
            ? selectedDay === 'Today'
                ? [
                      { label: 'Càng sớm càng tốt', value: null },
                      ...Object.keys(data[selectedDay]).map((time) => ({
                          label: time,
                          value: data[selectedDay][time],
                      })),
                  ]
                : Object.keys(data[selectedDay]).map((time) => ({
                      label: time,
                      value: data[selectedDay][time],
                  }))
            : [];

    const selectedDayLabel =
        dayOptions.find((option) => option.value === selectedDay)?.label || 'Hôm nay';
    const selectedTimeLabel =
        timeOptions.find((option) => option.value === selectedTime)?.label || 'Càng sớm càng tốt';
    console.log(selectedTimeLabel);

    const handleConfirm = () => {
        if (selectedDay && selectedTime && selectedTimeLabel) {
            onConfirm(selectedDay, selectedTime, selectedTimeLabel);
        }
    };
    return (
        <View>
            {/* Header */}
            <View>
                <View className="flex flex-col items-center">
                    <Text className="text-text">Thời gian nhận</Text>
                    <Text className="font-bold text-lg">
                        {selectedDayLabel} - {selectedTimeLabel}
                    </Text>
                </View>
            </View>

            {/* Container for Dropdowns */}
            <View className="flex flex-row justify-between items-center">
                <View className="w-1/2">
                    <Select value={selectedDay} options={dayOptions} onChange={handleDayChange} />
                </View>
                <View className="w-1/2">
                    <Select
                        value={selectedTime}
                        options={timeOptions}
                        onChange={handleTimeChange}
                    />
                </View>
            </View>

            <Pressable onPress={handleConfirm} className="bg-primary flex-1 p-4 rounded-lg mt-10">
                <Text className="text-white text-xl font-semibold text-center">Xác nhận</Text>
            </Pressable>
        </View>
    );
};

export default SelectHour;
