import React from 'react';
import { Image } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import logo from '../assets/instagram.png';
import Feed from '../pages/Feed';

const App = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Voltar',
        headerStyle: { backgroundColor: '#f5f5f5' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        cardStyle: { backgroundColor: '#fff' },
        headerTitle: () => {
          return <Image source={logo} />;
        },
        headerTitleAlign: 'center',
      }}
    // initialRouteName="Local"
    >
      <App.Screen name="Feed" component={Feed} options={{ title: 'Feed' }} />
    </App.Navigator>
  );
};

export default Routes;
