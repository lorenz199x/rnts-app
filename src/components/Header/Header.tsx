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
        style={styles.button}
      >
        <Icon type={'Feather'} icon={'arrow-left'} size={25} color={'black'} />
      </TouchableOpacity>
      <SearchBar value={searchKey} onChangeText={setSearchKey} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
  },
  button: {
    marginLeft: 10,
  },
});
