import React, { useMemo, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import Pagination from '@components/Pagination/Pagination';
import { products } from '@mocks/mock_products';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string; // Image URL
}

interface ProductListProps {
  route: any;
}

const ProductListScreen: React.FC<ProductListProps> = (props) => {
  const { route } = props;
  const { searchKey } = route.params;
  console.log(searchKey);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Filter products based on searchKey
  const filteredProducts = useMemo(() => {
    if (!searchKey) {
      return products;
    }
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchKey.toLowerCase())
    );
  }, [searchKey]);

  // Function to handle pagination - Go to specific page
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Render item function for FlatList
  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.itemContainer}>
      {/* Left side: Image */}
      <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
      {/* Middle: Item details */}
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      {/* Right side: Item price */}
      <Text style={styles.itemPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {/* Pagination controls */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: 'green',
  },
  backButton: {
    // marginRight: 10,
    // paddingVertical: 5,
    // paddingHorizontal: 5,
  },
  searchBar: {
    flex: 1,
    marginLeft: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});
