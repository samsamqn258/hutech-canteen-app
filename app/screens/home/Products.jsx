import { FlatList } from 'react-native';
import ProductItem from './ProductItem';

const Products = ({ products, numColumn = 1 }) => {
  const renderItem = ({ item }) => {
    return <ProductItem item={item} numColumn={numColumn} />;
  };

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item, index) => item._id || index.toString()}
      numColumns={numColumn}
      className="mt-4"
      maxToRenderPerBatch={5}
      initialNumToRender={10}
      windowSize={5}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={numColumn > 1 ? { justifyContent: 'space-between' } : ''}
      removeClippedSubviews={true}
      nestedScrollEnabled={true}
    />
  );
};

export default Products;
