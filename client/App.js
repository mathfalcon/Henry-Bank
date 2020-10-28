import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
// import { getUserLogged } from "./redux/actions/authActions";
import store from "./redux/store";
// import Index from "./components";
import * as Font from 'expo-font';
import Index from "./components/index";

export default function App() {
  useEffect(() => {
    (async () =>
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      }))();
  }, []);


  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}
