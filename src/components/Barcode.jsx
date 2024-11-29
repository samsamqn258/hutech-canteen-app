import React, { useMemo } from 'react';
import Svg, { Rect } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { Base64 } from 'js-base64';
import { Text, View } from 'react-native';

const Barcode = () => {
    const user = useSelector((state) => state.auth.user.metaData.user);
    const value = user._id + 'nối thêm để cho barcode nó dài hơn thôi';

    const encodedUserId = Base64.encode(user._id).slice(0, 15);

    // Hàm tạo giá trị ngẫu nhiên trong khoảng
    const getRandomValue = (min, max) => Math.random() * (max - min) + min;

    // Sử dụng useMemo để ánh xạ ký tự -> chiều rộng
    const charWidthMap = useMemo(() => {
        const map = {};
        value.split('').forEach((char) => {
            if (!map[char]) {
                map[char] = getRandomValue(1, 6);
            }
        });
        return map;
    }, [value]);

    const totalWidth = 250;
    const spaceBetween = 1;

    const scaledWidths = value.split('').map((char) => charWidthMap[char]);

    const barHeight = 50;

    return (
        <View className="mt-4 bg-white rounded-lg pb-3 flex items-center justify-center ">
            <Svg height="100" width={totalWidth}>
                {value.split('').map((char, index) => {
                    const x = scaledWidths
                        .slice(0, index)
                        .reduce((acc, w) => acc + w + spaceBetween, 0);
                    return (
                        <Rect
                            key={index}
                            x={x}
                            y={30}
                            width={scaledWidths[index]}
                            height={barHeight}
                            fill={index % 2 === 0 ? 'black' : 'white'}
                        />
                    );
                })}
            </Svg>
            <Text className=" text-sm text-text font-medium">{encodedUserId}</Text>
        </View>
    );
};

export default Barcode;
