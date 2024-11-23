import { View } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '@/src/constants/theme';

import CategoryItem from './CategoryItem';
import Row from '@/src/components/Row';

import ButtonIcon from '@/src/components/ButtonIcon';
import SearchInput from '@/src/components/SearchInput';
import { router, useRouter } from 'expo-router';
const Categories = ({ categories }) => {
    const router = useRouter();

    return (
        <View className="mt-6 rounded-xl bg-white shadow-sm p-4">
            <Row>
                <SearchInput onPress={() => router.push('/screens/search/Search')} />
                <ButtonIcon
                    type="square"
                    onPress={() => router.push('/screens/favourite/FavouriteScreen')}>
                    <AntDesign name="hearto" size={24} color={theme.colors.primary} />
                </ButtonIcon>
            </Row>

            <CategoryItem categories={categories} />
        </View>
    );
};

export default Categories;
