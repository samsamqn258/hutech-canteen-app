import { View, Text, Image } from 'react-native';
import React from 'react';
import Row from '@/src/components/Row';

const Info = ({ user }) => {
    const getGreeting = () => {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            return {
                greeting: 'Chào buổi sáng nhé!',
                image: 'https://cdn3d.iconscout.com/3d/premium/thumb/sunrise-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--sky-morning-sun-spring-and-summer-pack-seasons-illustrations-4431746.png',
            };
        } else if (currentHour >= 12 && currentHour < 18) {
            return {
                greeting: 'Đặt đồ ăn thôi!',
                image: 'https://static.vecteezy.com/system/resources/thumbnails/020/981/896/small_2x/3d-rendering-school-lunch-box-cartoon-style-3d-render-illustration-png.png',
            };
        } else {
            return {
                greeting: 'Chúc bạn ngủ ngon!',
                image: 'https://static.vecteezy.com/system/resources/thumbnails/024/984/126/small/3d-weather-forecast-icons-night-with-moon-and-clouds-on-a-rainy-day-3d-illustration-png.png',
            };
        }
    };
    const { greeting, image } = getGreeting();

    return (
        <Row>
            <Image source={{ uri: image }} className="h-10 w-10 object-cover" />
            <Text className="text-dark font-semibold text-lg">
                {user?.user.name} ơi, {greeting}
            </Text>
        </Row>
    );
};

export default Info;
