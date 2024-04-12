import React, { useRef, useState } from 'react';
import Header from '@components/Header/Header';
import Icon from '@components/Icon/Icon';
import SearchBar from '@components/SearchBar/SearchBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/Home/HomeScreen';
import ProductListScreen from '@screens/Product/ProductListScreen';
import ProfileScreen from '@screens/Profile/ProfileScreen';
import SettingsScreen from '@screens/Settings/SettingsScreen';
import { Screen } from '@shared/enums/screen';

import Navigation, { navigationRef } from './Navigation';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Icon
              type={'MaterialCommunity'}
              icon={'home'}
              size={30}
              color={focused ? 'blue' : 'black'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused }) => (
            <Icon type={'Feather'} icon={'settings'} size={30} color={focused ? 'blue' : 'black'} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Icon
              type={'MaterialCommunity'}
              icon={'account-outline'}
              size={30}
              color={focused ? 'blue' : 'black'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const AppNavigator = () => {
  const routeNameRef = useRef();

  const rootScreenOption = {
    animationEnabled: true,
    headerShown: true,
  };
  const onStateChange = () => {
    const currentRouteName = navigationRef.getCurrentRoute().name;
    routeNameRef.current = currentRouteName;
  };

  const onReady = () => {
    routeNameRef.current = navigationRef.getCurrentRoute().name;
  };

  const [searchKey, setSearchKey] = useState('');
  const clearSearchKey = () => {
    setSearchKey('');
  };

  return (
    <NavigationContainer
      ref={(navigatorRef: any) => Navigation.setTopLevelNavigator(navigatorRef)}
      onReady={onReady}
      onStateChange={onStateChange}
    >
      <RootStack.Navigator initialRouteName={Screen.TAB_BAR} screenOptions={rootScreenOption}>
        <RootStack.Screen
          name={Screen.TAB_BAR}
          component={TabBar}
          options={{
            header: () => (
              <SearchBar
                // searchStyle={styles.searchStyle}
                value={searchKey}
                onChangeText={(text: string) => setSearchKey(text)}
              />
            ),
          }}
        />
        <RootStack.Screen
          name={Screen.PRODUCT_SCREEN}
          component={ProductListScreen}
          options={() => ({
            header: (props) => (
              <Header
                searchKey={searchKey}
                setSearchKey={(text: string) => setSearchKey(text)}
                {...props}
                clearSearchKey={() => clearSearchKey()}
              />
            ),
          })}
          initialParams={{ searchKey }}
        />
      </RootStack.Navigator>
      {/* <TabBar /> */}
    </NavigationContainer>
  );
};

export default AppNavigator;
