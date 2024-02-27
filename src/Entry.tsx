import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from '@components/Icon/Icon';

const Entry = () => {
  return (
    <View style={styles.container}>
      <Text>Entry</Text>
      <Icon type={'MaterialCommunity'} icon={'arrow-left'} size={34} color={'red'} />
    </View>
  );
};

export default Entry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
