import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import PostsScreen from './screens/PostsScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import Default from "./screens/Default"

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Default" component={Default} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Posts" component={PostsScreen} />
            <Stack.Screen name="CreatePost" component={CreatePostScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
