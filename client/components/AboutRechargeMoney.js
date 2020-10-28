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
    title: "How can I add money to my Henry Bank?",
    content:
      "You can add money to your Henry Bank with cash at any charging point, through your unique code to recharge. You can also deposit money through a transfer from another user.",
  },
  {
    title: "How long does it take for the new money to be added to my account?",
    content:
      "Accreditation may take a maximum of up to 48 business hours after it is done.",
  },
  {
    title: "How much does it cost to recharge money?",
    content: "Charging your Henry Bank is totally free.",
  },
  {
    title: "Is there a minimum amount to load my balance to my Henry Bank?",
    content: "The minimum amount to load balance to your Henry Bank is 1USD.",
  },
];

export default class AbboutRechargeMoney extends Component {
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
              Recharge Money
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
