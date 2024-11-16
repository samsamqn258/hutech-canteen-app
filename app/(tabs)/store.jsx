import React from 'react';

import { ScrollView } from 'react-native';
import Container from '@/components/Container';
import HeaderStore from '../screens/store/HeaderStore';
import Stores from '../screens/store/Stores';
import useStores from '../screens/store/useStores';
import Loading from '@/components/Loading';

const Store = () => {
  const { stores, isPending } = useStores();

  if (isPending) return <Loading />;

  return (
    <ScrollView className="bg-darkLight">
      <Container>
        {/* Header */}
        <HeaderStore />

        <Stores stores={stores} />
      </Container>
    </ScrollView>
  );
};

export default Store;
