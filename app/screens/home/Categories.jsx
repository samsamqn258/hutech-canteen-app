import { View } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '@/constants/theme';

import CategoryItem from './CategoryItem';
import Row from '@/components/Row';

import ButtonIcon from '@/components/ButtonIcon';
import SearchInput from '@/components/SearchInput';
import { router } from 'expo-router';
const Categories = ({ categories }) => {
  return (
    <View className="mt-6 rounded-xl bg-white shadow-3xl p-4">
      <Row>
        <SearchInput onPress={() => router.push('/search/Search')} />
        <ButtonIcon type="square">
          <AntDesign name="hearto" size={24} color={theme.colors.primary} />
        </ButtonIcon>
      </Row>

      <CategoryItem categories={categories} />
    </View>
  );
};

export default Categories;
