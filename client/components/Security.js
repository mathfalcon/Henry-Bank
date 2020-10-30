import React from "react";
import {
  Container,
  Header,
  Left,
  Right,
  Icon,
  View,
  Button,
  Body,
  Title,
  Text,
  Tab,
  Tabs,
  ScrollableTab,
} from "native-base";
import styles from "../Styles/adminPanelStyles";
import ResetPassword from "./ResetPassword";
import ChangeMyPass from "./ChangeMyPass";
import ChangeMyPin from "./ChangeMyPin";

export default Security = ({ navigation }) => {
  return (
    <Container>
      <Header style={{ backgroundColor: "#151515" }}>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={() => navigation.navigate("userPanel")}>
            <Icon style={{ color: "whitesmoke" }} name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={styles.headerTitle}>SECURITY</Title>
        </Body>
        <Right />
      </Header>

      <Tabs
        renderTabBar={() => (
          <ScrollableTab style={{ backgroundColor: "#151515" }} />
        )} /* locked={true} */
      >
        <Tab
          heading="Password"
          tabStyle={{ backgroundColor: "#151515" }}
          activeTabStyle={{ backgroundColor: "#151515" }}
          activeTextStyle={{ color: "#ffff8b" }}
          textStyle={{ color: "whitesmoke", opacity: 0.7 }}
        >
          <ChangeMyPass />
        </Tab>
        <Tab
          heading="Passcode"
          tabStyle={{ backgroundColor: "#151515" }}
          activeTabStyle={{ backgroundColor: "#151515" }}
          activeTextStyle={{ color: "#ffff8b" }}
          textStyle={{ color: "whitesmoke", opacity: 0.7 }}
        >
          <ChangeMyPin />
        </Tab>
      </Tabs>
    </Container>
  );
};
