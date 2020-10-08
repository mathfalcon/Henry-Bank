import React from "react";
import { Container, Content, Card, CardItem, Text, Body, Left, Button, Icon, Right } from "native-base";

export default CardPosition = () => {

  return (
    <Container>
      <Content padder style={{
        backgroundColor: "#e6ebed"
      }}>
        <Card >
          <CardItem header bordered >
            <Left>
              <Body>
                <Text>Start</Text>
              </Body>
            </Left>
            <Text>Account movements</Text>
          </CardItem>
          <CardItem cardBody>
            <Body style={{ flex: 1, alignItems: "center" }}>
              <Text >Consolidated position</Text>
              <Text style={{ fontSize: 33 }}>$$$</Text>
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
}
