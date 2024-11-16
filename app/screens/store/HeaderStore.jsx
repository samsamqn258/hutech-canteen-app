import { View, Text, Image } from 'react-native';
import React from 'react';

import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { theme } from '@/constants/theme';
import Row from '@/components/Row';
import ButtonIcon from '@/components/ButtonIcon';
import Header from '@/components/Header';

const HeaderStore = () => {
  return (
    <Header bg="bg-white">
      <Text className="text-3xl font-medium">Cửa hàng</Text>
      <Row>
        <ButtonIcon type="rounded">
          <Row>
            <AntDesign name="tagso" size={24} color={theme.colors.primary} />
            <Text className="text-dark font-semibold text-lg">8</Text>
          </Row>
        </ButtonIcon>
        <ButtonIcon type="rounded">
          <Feather name="bell" size={22} color="black" />
        </ButtonIcon>
      </Row>
    </Header>
  );
};

export default HeaderStore;
