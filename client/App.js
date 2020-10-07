// import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getUserLogged } from "./redux/actions/authActions";
import store from "./redux/store";
import Index from "./components";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}
