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

export default CardPosition = (props) => {
  console.log(props.user);
  return (
        <Card>
          <CardItem header bordered>
              <Body>
                <Text>Account Balance: ${props.user.user.account.balance}</Text>
              </Body>
          </CardItem>
        </Card>
  );
};
