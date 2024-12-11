import useProductsInCategory from '../product/useProductsInCategory';
import Loading from '@/src/components/Loading';

import { Text, View } from 'react-native';
import Products from './Products';

const CategoryProducts = ({ categoryId, bottomSheetRef }) => {
    const { isPending, products } = useProductsInCategory(categoryId);

    if (isPending) return <Loading />;

    if (!products) return;
    return (
        <View className="mt-10">
            <Text className="text-xl font-bold">{products?.metaData.category_name}</Text>
            <Products
                products={products?.metaData.products}
                numColumn={2}
                bottomSheetRef={bottomSheetRef}
            />
        </View>
    );
};

export default CategoryProducts;
