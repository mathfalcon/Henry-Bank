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
    title: "I lost my cellphone. What I have to do?",
    content:
      "If the Henry Bank app is open on your cell phone, write us an email so that we can close the app session on your lost cell phone.",
  },
  {
    title: "What can I do if I don't remember my password?",
    content:
      "If you don't remember your password for your Henry Bank account, you have to go through the password recovery process. Enter the app in Forgot Password, enter your e-mail, you will receive a code which you must enter, to be able to write the new password.",
  },
  {
    title:
      "I made a purchase through Henry Bank and they did not deliver my product.",
    content:
      "When you make a purchase, make sure it is from a trusted person, since Henry Bank is a means of payment and is not responsible for the transactions between the parties or for the delivery of the product or service.",
  },
  {
    title:
      "Someone contacted me through social networks asking for my Henry Bank account information, what should I do?",
    content:
      "Never share the data of your card, or show the numbers that are in front of and behind it. Also, do not respond to an email or phone call asking for your card details, even if it appears to come from Henry Bank.",
  },
];

export default class AboutPasswords extends Component {
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
              Passwords and Security
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
