import { View } from 'react-native';
import React from 'react';
import { theme } from '@/constants/theme';

const Header = ({ children, bg }) => {
  return (
    <View
      className={`${bg} absolute top-0 left-0 right-0 z-10  flex flex-row items-center justify-between pt-14 pb-4 pl-3 pr-3`}>
      {children}
    </View>
  );
};

export default Header;
