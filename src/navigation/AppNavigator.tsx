import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import NativeModuleScreen from '@screens/NativeModuleScreen';
import VideoPlayerScreen from '@screens/VideoPlayerScreen';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="UI EXAM">
        <Drawer.Screen name="UI EXAM" component={VideoPlayerScreen} />
        <Drawer.Screen name="NATIVE MODULE EXAM" component={NativeModuleScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
