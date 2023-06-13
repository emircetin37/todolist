import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./src/pages/Login/Login";
import Register from "./src/pages/Register/Register";
import Dashboard from "./src/pages/Dashboard/Dashboard";
import { getUser } from "./src/asyncStorage";
import { Provider } from "react-redux";
import { createStore } from "redux"
import reducers from './src/redux'
const Stack = createNativeStackNavigator();

const App = () => {
  
  const store = createStore(reducers)
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content"></StatusBar>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen options={{ headerShown: false }} name="Dashboard" component={Dashboard} />
          <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
export default App