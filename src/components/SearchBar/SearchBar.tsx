import React from 'react';
import { StyleProp, StyleSheet, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from '@components/Icon/Icon';
import Navigation from '@navigation/Navigation';
import { Screen } from '@shared/enums/screen';

interface SearchBarProps {
  isTouchableRespond?: boolean;
  searchStyle?: StyleProp<ViewStyle>;
  value?: string;
  onChangeText?: any;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { value, onChangeText } = props;

  const handleSearch = () => {
    Navigation.navigate(Screen.PRODUCT_SCREEN, { value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={onChangeText}
          value={value}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Icon type={'Feather'} icon={'search'} size={24} color={'#777'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    padding: 12,
  },
});
