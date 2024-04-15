import React, { useMemo, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import Pagination from '@components/Pagination/Pagination';
import { products } from '@mocks/mock_products';
import { Label } from '@shared/enums/labels';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface ProductListProps {
  route: any;
}

const ProductListScreen: React.FC<ProductListProps> = (props) => {
  const { route } = props;
  const { searchKey, category } = route.params;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const filteredProducts = useMemo(() => {
    if (!searchKey && !category) {
      return products;
    }
    return products.filter((product) => {
      const nameMatches =
        !searchKey || product.name.toLowerCase().includes(searchKey.toLowerCase());
      const categoryMatches =
        !category || product.category.toLowerCase().includes(category.toLowerCase());
      return nameMatches && categoryMatches;
    });
  }, [searchKey, category]);

  // Function to handle displaying of label if no products are available
  const renderNoProductsMessage = () => (
    <View style={styles.noProductsContainer}>
      <Text style={styles.noProductsText}>{Label.NO_AVAILABLE_PRODUCTS}</Text>
    </View>
  );

  // Function to handle pagination - Go to specific page
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Render item function for FlatList
  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      <Text style={styles.itemPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {filteredProducts.length === 0 ? (
        renderNoProductsMessage()
      ) : (
        <>
          <FlatList
            data={filteredProducts.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          {/* Pagination controls */}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
        </>
      )}
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
});
