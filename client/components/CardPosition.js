import React, { Fragment } from "react";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Left,
  Button,
  Icon,
  Right,
} from "native-base";
import { View } from "react-native";

export default CardPosition = ({ navigation, userLogged }) => {
  return (
    <Fragment>
      <View
        style={{
          marginHorizontal: 45,
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "Poppins", color: "#ffff8e", fontSize: 17 }}>
          Account Balance
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 45,
          borderColor: "#ffff8e",
          borderWidth: 1,
          borderRadius: 10,
          alignItems: "center",
          padding: 10
        }}
      >
        <Text style={{ fontFamily: "Poppins", color: "#FFFFFF", fontSize: 17 }}>
          ARS
        </Text>
        <Text style={{ fontSize: 17, fontFamily: "Poppins", color: "#ffff8e" }}>
          $ {userLogged.user.account.balance}
        </Text>
      </View>
    </Fragment>
  );
};
