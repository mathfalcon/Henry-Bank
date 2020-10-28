import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Icon,
  Accordion,
  Text,
  View,
  Left,
  Body,
  Title,
  Button,
  H1,
} from "native-base";
import * as Linking from "expo-linking";

const dataArray = [
  {
    title: "What is a Henry Bank transfer?",
    content:
      "A Henry Bank transfer is a transfer to another Henry Bank user through the app. These are immediate and free.",
  },
  {
    title: "How do I make a transfer through the Henry Bank app?",
    content:
      "If the person you want to transfer to has Henry Bank, go to the Henry Bank app. Enter the transfers section, enter the email of the user you want to transfer to, and the amount of money. If the person you want to transfer to does not have Henry Bank, you can invite him through an invitation by whatsapp.",
  },
  {
    title: "How many transfers can I make per day from the Henry Bank app?",
    content: "Everithing you want.",
  },
  {
    title: "How long do transfers take? Do they have any cost?",
    content:
      "All transfers are free and instant. However, if any delay occurs, please allow 48 hours to contact us.",
  },
];

export default class AboutTransactions extends Component {
  _handlePress = () => {
    Linking.openURL("mailto:support@henrybank.com");
    this.props.onPress && this.props.onPress();
  };
  _renderHeader(item, expanded) {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ffffb7",
          marginTop: 12,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,
        }}
      >
        <Text style={{ fontWeight: "600", width: "75%" }}> {item.title}</Text>
        {expanded ? (
          <Icon style={{ fontSize: 18 }} name="remove-circle" />
        ) : (
          <Icon style={{ fontSize: 18 }} name="add-circle" />
        )}
      </View>
    );
  }
  _renderContent(item) {
    return (
      <Text
        style={{
          backgroundColor: "#ffffdb",
          padding: 10,
          fontStyle: "italic",
        }}
      >
        {item.content}
      </Text>
    );
  }
  render() {
    return (
      <Container>
        <Header
          transparent
          style={{ backgroundColor: "#ffff57", display: "flex" }}
        >
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{ color: "black" }} name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 2 }}>
            <Title style={{ color: "black" }}>Need Support?</Title>
          </Body>
        </Header>
        <Content padder style={{ backgroundColor: "#161616" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignSelf: "center",
            }}
          >
            <Icon
              type="FontAwesome5"
              name="credit-card"
              style={{
                fontSize: 35,
                alignSelf: "center",
                color: "#ffff7f",
              }}
            />
            <Text
              style={{
                color: "whitesmoke",
                textAlign: "center",
                marginVertical: 15,
                marginLeft: 10,
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              Transactions
            </Text>
          </View>
          <Accordion
            dataArray={dataArray}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            style={{ backgroundColor: "##161616" }}
          />
        </Content>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            flex: 0.15,
            backgroundColor: "#ffff7f",
          }}
        >
          <Text>Do you need more help? </Text>
          <Text style={{ fontWeight: "bold" }} onPress={this._handlePress}>
            Contact us:
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontStyle: "italic",
            }}
            onPress={this._handlePress}
          >
            support@henrybank.com
          </Text>
        </View>
      </Container>
    );
  }
}
<br />;
