import React from "react";
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

export default CardPosition = ({ navigation, userLogged }) => {
  console.log(userLogged)
  return (
    <Card>
      <CardItem header bordered>
        <Body>
          <Text>Account Balance: $ {userLogged.user.account.balance}</Text>
        </Body>
        <Text onPress={() => navigation.navigate("accountHistory", userLogged)}>
          Account movements
        </Text>
      </CardItem>

    </Card>
  );
};
