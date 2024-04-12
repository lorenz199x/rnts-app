import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { categories } from '@mocks/mock_products';

// Define types for category items
interface CategoryItem {
  id: number;
  label: string;
  image: string;
}

const HomeScreen: React.FC = () => {
  const onPressItem = (label: string) => console.log('press', label);

  // Inside your component...
  const renderCategoryItem = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity style={styles.button} onPress={() => onPressItem(item.label)}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.buttonText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories as CategoryItem[]}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 150, // Adjusted height to accommodate image and text
    backgroundColor: '#ccc8c8',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5, // Added margin top to separate image and text
  },
  categoryImage: {
    width: 80, // Adjust as needed
    height: 80, // Adjust as needed
    marginBottom: 5, // Added margin bottom to separate image and text
  },
});

export default HomeScreen;
