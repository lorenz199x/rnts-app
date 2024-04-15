import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { categories } from '@mocks/mock_products';
import Navigation from '@navigation/Navigation';
import { Screen } from '@shared/enums/screen';

// Define types for category items
interface CategoryItem {
  id: number;
  label: string;
  image: string;
}

const HomeScreen: React.FC = () => {
  const onPressItem = (label: string) => {
    Navigation.navigate(Screen.PRODUCT_SCREEN, { category: label });
    console.log('press', label);
  };

  const renderCategoryItem = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity style={styles.categoryContainer} onPress={() => onPressItem(item.label)}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryLabel}>{item.label}</Text>
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  gridContainer: {
    paddingBottom: 16,
  },
  categoryContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333333',
  },
});
