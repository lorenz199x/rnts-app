import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';
import logger from '@utils/logger';

const Entry = () => {
  useEffect(() => {
    console.log(Config.NODE_ENV);
    logger(Config.NODE_ENV);
  });

  return (
    <View style={styles.container}>
      <Text>Entry: {Config.NODE_ENV}</Text>
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
