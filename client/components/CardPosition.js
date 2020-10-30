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
  return (
    <Card>
      <CardItem header bordered>
        <Body style={{justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:20, fontWeight: 'bold'}}>Account Balance</Text>
          <Text style={{fontSize:20, color: 'green', fontWeight: 'bold'}}>$ {userLogged.user.account.balance}</Text>
        </Body>
      </CardItem>
    </Card>
  );
};
