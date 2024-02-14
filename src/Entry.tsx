import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Entry = () => {
  return (
    <View style={styles.container}>
      <Text>Entry</Text>
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
