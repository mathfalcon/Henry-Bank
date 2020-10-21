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
    <Container
      style={{
        backgroundColor: "whitesmoke",
        flex: 1,
        flexDirection: "row",
      }}
    >
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Left>
              <Body>
                <Text>Account Balance</Text>
              </Body>
            </Left>            
            <Text onPress={() => navigation.navigate('accountHistory', userLogged)}>Account movements</Text>
          </CardItem>
          <CardItem cardBody>
            <Body style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 33, padding:15 }}>
                ${userLogged.user.account.balance}
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>Last movements</Text>
              </Button>
            </Left>
            <Right>
              <Text>8th Oct</Text>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};
