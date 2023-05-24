import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
// import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { useFonts } from 'expo-font';

import RegistrationScreen from './src/Screens/RegistrationScreen';
import LoginScreen from './src/Screens/LoginScreen';
import HomeScreen from './src/Screens/HomeScreen';
import CommentsScreen from './src/Screens/CommentsScreen';
import MapScreen from './src/Screens/MapScreen';

// key=API_KEY
// AIzaSyCLuOsIsAWcS8KuTSEyluVh_Z0WpCrNckc

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

  const MainStack = createStackNavigator();

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="LoginScreen">
        <MainStack.Screen
          options={{ headerShown: false }}
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <MainStack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <MainStack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <MainStack.Screen
          options={{ title: 'Comments', headerTitleAlign: 'center' }}
          name="CommentsScreen"
          component={CommentsScreen}
        />
        <MainStack.Screen
          options={{ title: 'Map', headerTitleAlign: 'center' }}
          name="MapScreen"
          component={MapScreen}
        />
      </MainStack.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// { fontFamily: 'Inter-Black', fontSize: 30 }
