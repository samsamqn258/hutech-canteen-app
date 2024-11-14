import useProductsInCategory from '@/app/product/useProductsInCategory';
import Products from './Products';
import Loading from '../Loading';
import { Text, View } from 'react-native';

const CategoryProducts = ({ categoryId }) => {
    const { isPending, products } = useProductsInCategory(categoryId);

    if (isPending) return <Loading />;

    return (
        <View>
            <Text>{products.metaData.category_name}</Text>
            <Products products={products.metaData.products} />
        </View>
    );
};

export default CategoryProducts;
