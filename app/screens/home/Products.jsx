import { FlatList, View } from 'react-native';
import ProductItem from './ProductItem';

const Products = ({ products, numColumn = 1, bottomSheetRef }) => {
    return (
        <View className="flex flex-1 flex-wrap flex-row gap-x-4 mt-4">
            {products.map((item, index) => (
                <ProductItem
                    key={index}
                    item={item}
                    numColumn={numColumn}
                    bottomSheetRef={bottomSheetRef}
                />
            ))}
        </View>
    );
};

export default Products;
