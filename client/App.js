// import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getUserLogged } from "./redux/actions/authActions";
import store from "./redux/store";
// import Index from "./components";
import * as Font from 'expo-font';
import CreditCard from './components/MyCards';

const Stack = createStackNavigator();

export default function App() {
  
  useEffect(() => {
    (async () => await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    }))();
     }, [])

  return (
    <Provider store={store}>
      <CreditCard />
    </Provider>
  );
}
