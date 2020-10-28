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
    title: "What do I need to download the Henry Bank app?",
    content:
      "You must have a cell phone with an Android operating system (version 4.4 or higher) or iOS (version 9 or higher) and a WiFi internet connection or mobile network.",
  },
  {
    title: "How much does it cost to download the Henry Bank app?",
    content:
      "None. In addition, the Henry Bank Mastercard that you are going to obtain is free of issuance, maintenance or closing.",
  },
  {
    title: "How do I register with Henry Bank?",
    content:
      "1. Download the app. 2. Enter the app, and press Sign Up. 3.Fill in the requested data. 4. We will ask for your e-mail to confirm and validate that it is yours. 5. Take a photo of yourself from the front. 6. Be over 16 years old.",
  },
  {
    title: "Why do they ask me for my photos?",
    content:
      "At Henry Bank we prioritize your safety. That is why we are going to ask you for a photo to make sure that it is you and thus approve your account. If the photo looks bad we will not be able to move forward with your validation.",
  },
];

export default class AboutRechargeMoney extends Component {
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
              Users and Accounts
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
