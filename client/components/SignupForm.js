import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FirstPageForm from "./FirstPageForm";
import SecondPageForm from "./SecondPageForm";
import ThirdPageForm from "./ThirdPageForm";
import TakePhoto from "./TakePhoto";
import Photo from "./Photo";

const Stack = createStackNavigator();

export default function SignupForm() {
  return (          
        <Stack.Navigator headerMode="none">          
          <Stack.Screen name="first" component={FirstPageForm} />
          <Stack.Screen name="second" component={SecondPageForm} />
          <Stack.Screen name="third" component={ThirdPageForm} />
          <Stack.Screen name="takePhoto" component={TakePhoto} />
          <Stack.Screen name="photo" component={Photo} />
        </Stack.Navigator>      
  );
}
