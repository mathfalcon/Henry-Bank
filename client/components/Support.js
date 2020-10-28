import React from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Left,
  Button,
  Body,
  View,
  Title,
  H1,
} from "native-base";
import * as Linking from "expo-linking";

export default Support = ({ navigation }) => {
  return (
    <Container>
      <Header
        transparent
        style={{ backgroundColor: "#ffff57", display: "flex" }}
      >
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={() => navigation.navigate("home")}>
            <Icon style={{ color: "black" }} name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title style={{ color: "black" }}>Welcome to Henry Bank</Title>
        </Body>
        <Right></Right>
      </Header>
      <View
        style={{
          flex: 20,
          backgroundColor: "#161616",
          justifyContent: "space-evenly",
        }}
      >
        <H1
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
            color: "whitesmoke",
          }}
        >
          How can we help you today?
        </H1>
        <Card
          style={{
            backgroundColor: "#151515",
            borderColor:'#151515',
            paddingHorizontal: 10
          }}
        >
          <CardItem
            style={{
              justifyContent: "space-between",
              marginVertical:10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            button
            onPress={() => navigation.navigate("aboutHenryBank")}
          >
            <Icon active name="credit-card" type="FontAwesome5" style={{width: 30}}/>
            <Text style={{ paddingHorizontal: 5 }}>
              <Text style={{ fontWeight: "bold" }}>About Henry Bank{"\n"}</Text>
              <Text>What is henry bank and how does it work</Text>
            </Text>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>

          <CardItem
            style={{
              justifyContent: "space-between",
              marginBottom: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            button
            onPress={() => navigation.navigate("usersAndAccounts")}
          >
            <Icon active name="user" type="FontAwesome5" style={{width: 30}}/>
            <Text>
              <Text style={{ fontWeight: "bold" }}>User and Account{"\n"}</Text>
              <Text>Get started with Henry Bank</Text>
            </Text>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>

          <CardItem
            style={{
              justifyContent: "space-between",
              marginBottom: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            button
            onPress={() => navigation.navigate("aboutRechargeMoney")}
          >
            <Icon name="wallet" type="FontAwesome5" />
            <Text>
              <Text style={{ fontWeight: "bold" }}>
                Charge money
                {"\n"}
              </Text>
              <Text>All your money in one place.</Text>
            </Text>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>

          <CardItem
            style={{
              justifyContent: "space-between",
              marginBottom: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            button
            onPress={() => navigation.navigate("aboutPasswords")}
          >
            <Icon name="shield-alt" type="FontAwesome5" />
            <Text style={{ marginLeft: 5 }}>
              <Text style={{ fontWeight: "bold" }}>
                Passwords and security
                {"\n"}
              </Text>
              <Text>Feel safe while handling your money.</Text>
            </Text>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>

          <CardItem
            style={{
              justifyContent: "space-between",
              marginBottom: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            button
            onPress={() => navigation.navigate("aboutTransactions")}
          >
            <Icon name="hand-holding-usd" type="FontAwesome5" />
            <Text style={{ marginLeft: 5 }}>
              <Text style={{ fontWeight: "bold" }}>
                Transactions
                {"\n"}
              </Text>
              <Text>Receive and send money at any time.</Text>
            </Text>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
        </Card>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
        >
          <Text style={{ color: "whitesmoke" }}>Do you need more help? </Text>
          <Text
            style={{ fontWeight: "bold", color: "whitesmoke" }}
            onPress={() => {
              Linking.openURL("mailto:support@henrybank.com");
            }}
          >
            Contact us:
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontStyle: "italic",
              color: "whitesmoke",
            }}
            onPress={() => {
              Linking.openURL("mailto:support@henrybank.com");
            }}
          >
            support@henrybank.com
          </Text>
        </View>
      </View>
    </Container>
  );
};
