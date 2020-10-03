import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from "react-redux";
import store from "./redux/store"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import LogIn from './components/LogIn';
import SignIn from "./components/SignIn";
import ForgotPass from "./components/ForgotPass";


const Stack = createStackNavigator();

export default function App() {
  return (
    // <Provider store={store}>
      <NavigationContainer>      
        <Stack.Navigator>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="log" component={LogIn} />  
            <Stack.Screen name="sign" component={SignIn} />  
            <Stack.Screen name="forgotPass" component={ForgotPass} />       
        </Stack.Navigator>    
      </NavigationContainer>
    // </Provider>
  );
}
