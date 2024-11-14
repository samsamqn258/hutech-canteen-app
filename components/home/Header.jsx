import { View, Text, Image } from 'react-native';
import React from 'react';
import Info from './Info';
import Row from '../Row';
import ButtonIcon from '../ButtonIcon';
import AntDesign from '@expo/vector-icons/AntDesign';
import tailwind from 'tailwind-rn';
import Feather from '@expo/vector-icons/Feather';
import { theme } from '@/constants/theme';

const Header = ({ user }) => {
  return (
    <View className="absolute top-0 left-0 right-0 z-10 bg-header flex flex-row items-center justify-between pt-14 pb-4 pl-3 pr-3">
      <Row>
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dkxoatxjl/image/upload/v1730511866/product_images/1730511861041.png',
          }}
          className="h-10 w-10 object-cover"
        />
        <Info user={user} />
      </Row>
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
    </View>
  );
};

export default Header;
