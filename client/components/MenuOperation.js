import React from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
} from "native-base";

export default MenuOperation = ({ navigation }) => {
  return (
    <FooterTab style={{ backgroundColor: "#151515" }}>
      <Button vertical onPress={() => navigation.navigate("userStats")}>
        <Icon name="chart-bar" type="FontAwesome5" style={{ color: "white" }} />
        <Text style={{ color: "white" }}>STATS</Text>
      </Button>
      <Button vertical>
        <Icon
          name="card"
          onPress={() => navigation.navigate("myCards")}
          style={{ color: "white" }}
        />
        <Text style={{ color: "white" }}>Cards</Text>
      </Button>
      <Button
        vertical
        active
        style={{ backgroundColor: "#ffff6d" }}
        onPress={() => navigation.navigate("accountHistory")}
      >
        <Icon
          style={{ color: "black" }}
          active
          type="FontAwesome"
          name="dollar"
        />
        <Text style={{ color: "black" }}>dashboard</Text>
      </Button>
      <Button vertical onPress={() => navigation.navigate("contacts")}>
        <Icon type="FontAwesome" name="users" style={{ color: "white" }} />
        <Text style={{ color: "white" }}>Contacts</Text>
      </Button>
    </FooterTab>
  );
};
