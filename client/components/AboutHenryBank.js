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
    title: "What is Henry Bank?",
    content:
      "Henry Bank is an international Mastercard piggy card and app. It allows you to manage and control your expenses easier. With Henry Bank you can buy at any merchant and website in the world that accepts Mastercard. In addition, you can send and receive money to other Uala users. We also help you control your expenses, through income and money outflow statistics.",
  },
  {
    title: "What services does Henry Bank provide?",
    content:
      "Henry Bank is a financial institution that provides financial services.",
  },
  {
    title: "What type of legal structure does Henry Bank have?",
    content:
      "Henry Bank complies with all obligations imposed by law to function as such.",
  },
  {
    title: "Where can I use my card?",
    content:
      "You can use your Henry card at any store or website that accepts Mastercard as a means of payment.",
  },
  {
    title: "How does Henry Bank protect the data of its users?",
    content:
      "Henry Bank handles all your sensitive data by encryptions and maximum security protocols, guaranteeing the protection of the data of all its users.",
  },
];

export default class AboutHenryBank extends Component {
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
              About Henry Bank
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
