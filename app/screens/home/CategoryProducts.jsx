import useProductsInCategory from '../product/useProductsInCategory';
import Loading from '@/src/components/Loading';

import { Text, View } from 'react-native';
import Products from './Products';

const CategoryProducts = ({ categoryId, onOpenModalProduct }) => {
    const { isPending, products } = useProductsInCategory(categoryId);

    if (isPending) return <Loading />;

    return (
        <View className="mt-10 px-4 ">
            <Text className="text-xl font-bold">{products.metaData.category_name}</Text>
            <Products
                products={products.metaData.products}
                numColumn={2}
                onOpenModalProduct={onOpenModalProduct}
            />
        </View>
    );
};

export default CategoryProducts;
