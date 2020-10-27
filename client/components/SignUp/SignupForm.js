import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import FirstPageForm from "./FirstPageForm";
import SecondPageForm from "./SecondPageForm";
import ThirdPageForm from "./ThirdPageForm";
import FourthPageForm from "./FourthPageForm";
import TakePhoto from "./TakePhoto";
import Photo from "./Photo";

const Stack = createStackNavigator();

export default function SignupForm() {
  return (
    <Stack.Navigator
      initialRouteName='first'
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="first" component={FirstPageForm} />
      <Stack.Screen name="second" component={SecondPageForm} />
      <Stack.Screen name="third" component={ThirdPageForm} />
      <Stack.Screen name="fourth" component={FourthPageForm} />      
      <Stack.Screen name="takePhoto" component={TakePhoto} />
      <Stack.Screen name="photo" component={Photo} />

    </Stack.Navigator>
  );
}
