import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogged } from "../redux/actions/authActions";

/* ------------------------------- COMPONENTS ------------------------------- */
import AccountHistory from "./AccountHistory";
import Contacts from "./Contacts";
import ForgotPass from "./ForgotPass";
import Home from "./Home";
import LogIn from "./LogIn";
import MyCards from './MyCards';
import Position from "./Position";
import RechargeMoney from "../views/RechargeMoney";
import SendMoney from './SendMoney';
import SignupForm from "./SignupForm";

const Stack = createStackNavigator();

export default function Index() {
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.auth);

  useEffect(() => dispatch(getUserLogged()), []);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="accountHistory" component={AccountHistory} />
        <Stack.Screen name="contacts" component={Contacts} />
        <Stack.Screen name="forgotPass" component={ForgotPass} />
        <Stack.Screen name="login" component={LogIn} />
        <Stack.Screen name="myCards" component={MyCards} />
        <Stack.Screen name="position" component={Position} />
        <Stack.Screen name="recharge" component={RechargeMoney} />
        <Stack.Screen name="sendMoney" component={SendMoney} />
        <Stack.Screen name="sign" component={SignupForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
