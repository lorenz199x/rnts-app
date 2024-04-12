import React from 'react';
import { StyleProp, StyleSheet, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from '@components/Icon/Icon';
import Navigation from '@navigation/Navigation';
import { Screen } from '@shared/enums/screen';

interface SearchBarProps {
  /**
   * indicates if searchbar will transfer to search screen
   */
  isTouchableRespond?: boolean;

  /**
   * Custom style in appHeader(optional)
   */
  searchStyle?: StyleProp<ViewStyle>;

  /**
   * Value of input
   */
  value?: string;

  /**
   * Function that changes value
   */
  onChangeText?: any;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { value, onChangeText } = props;

  const handleSearch = () => {
    Navigation.navigate(Screen.PRODUCT_SCREEN, { value });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={onChangeText}
        value={value}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Icon type={'Feather'} icon={'search'} size={30} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 30,
    paddingRight: 40,
    paddingLeft: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  searchButton: {
    marginLeft: 10,
  },
});
