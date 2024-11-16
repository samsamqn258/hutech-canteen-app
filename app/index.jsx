import React from 'react';
import { Redirect } from 'expo-router';
import ScreenWrapper from '@/components/ScreenWrapper';

const Index = () => {
  return (
    <ScreenWrapper>
      <Redirect href={'auth/welcome'} />
    </ScreenWrapper>
  );
};

export default Index;
