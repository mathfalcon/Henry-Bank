import React from "react";
import { createStackNavigator, CardStyleInterpolators, } from "@react-navigation/stack";
import FirstPageForm from "./FirstPageForm";
import SecondPageForm from "./SecondPageForm";
import ThirdPageForm from "./ThirdPageForm";
// import TakePhoto from "./TakePhoto";
// import Photo from "./Photo";

const Stack = createStackNavigator();

export default function SignupForm() {
  return (          
        <Stack.Navigator
          headerMode="none"
          screenOptions={{               
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >               
          <Stack.Screen
            name="first"
            component={FirstPageForm}
          />

        <Stack.Screen
          name="second"
          component={SecondPageForm}
        />
        
        <Stack.Screen
          name="third" 
          component={ThirdPageForm}
        />
        
        {/* <Stack.Screen
          name="takePhoto"
          component={TakePhoto}
          options={{
            transitionSpec: {
            open: config,
            close: config,
            },
          }}
        />
        
        <Stack.Screen
          name="photo"
          component={Photo}
          options={{
            transitionSpec: {
            open: config,
            close: config,
            },
          }}
        /> */}
                
        </Stack.Navigator>      
  );
}