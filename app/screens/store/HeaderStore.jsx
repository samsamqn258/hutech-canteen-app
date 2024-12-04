import { View, Text, Image } from 'react-native';
import React from 'react';

import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { theme } from '@/src/constants/theme';
import Row from '@/src/components/Row';
import ButtonIcon from '@/src/components/ButtonIcon';
import Header from '@/src/components/Header';
import Entypo from '@expo/vector-icons/Entypo';

const HeaderStore = ({ setOpenMap, openMap }) => {
    const handleToggleMap = () => {
        setOpenMap((open) => !open);
    };
    return (
        <Header bg="bg-white">
            <Text className="text-3xl font-medium">Cửa hàng</Text>

            <ButtonIcon type="rounded" onPress={handleToggleMap}>
                {!openMap ? (
                    <Row>
                        <Entypo name="map" size={20} color="black" />
                        <Text className="text-dark font-semibold text-lg">Bản đồ</Text>
                    </Row>
                ) : (
                    <Row>
                        <Feather name="list" size={20} color="black" />
                        <Text className="text-dark font-semibold text-lg">Danh sách</Text>
                    </Row>
                )}
            </ButtonIcon>
        </Header>
    );
};

export default HeaderStore;
