import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Position from "../Position";
import UserStats from "../UserStats";
import MyCards from "../MyCards";
import AccountHistory from "../AccountHistory";
import Contacts from "../Contacts";
import Invitation from "../Invitation";
const Stack = createStackNavigator();

export default function HomePosition() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="position" component={Position} />

      <Stack.Screen name="userStats" component={UserStats} />

      <Stack.Screen name="myCards" component={MyCards} />

      <Stack.Screen name="accountHistory" component={AccountHistory} />

      <Stack.Screen name="contacts" component={Contacts} />
      <Stack.Screen name="invitation" component={Invitation} />
    </Stack.Navigator>
  );
}