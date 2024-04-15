import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from '@components/Icon/Icon';
import SearchBar from '@components/SearchBar/SearchBar';
import Navigation from '@navigation/Navigation';

interface HeaderProps {
  searchKey: string;
  setSearchKey: any;
  clearSearchKey: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { searchKey, setSearchKey, clearSearchKey } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          clearSearchKey();
          Navigation.goBack();
        }}
        style={styles.backButton}
      >
        <Icon type={'Feather'} icon={'arrow-left'} size={24} color={'#555'} />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <SearchBar value={searchKey} onChangeText={setSearchKey} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    marginRight: 16,
  },
  searchContainer: {
    flex: 1,
  },
});
