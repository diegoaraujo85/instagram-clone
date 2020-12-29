import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

const App: React.FC = () => {
  /** Auto Update */
  useEffect(() => {
    async function updateApp(): Promise<void> {
      try {
        if (!__DEV__) {
          const { isAvailable } = await Updates.checkForUpdateAsync();
          if (isAvailable) {
            console.log('Baixando nova atualização.');

            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
          }
        }
      } catch (error) {
        console.log('Erro de atualização automática: ', error);
      }
    }

    updateApp();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" backgroundColor="#f5f5f5" />
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Routes />
      </View>
    </NavigationContainer>
  );
};
export default App;
