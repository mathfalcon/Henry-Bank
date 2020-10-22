import React, { useState } from "react";
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

export default MenuOperation = ({ navigation, screen }) => {  

console.log('route.params', screen);

  return (
    <FooterTab style={{ backgroundColor: "#151515" }}>

      <Button
        vertical
        onPress={() => navigation.navigate("position")}        
      >
      <Icon
        name="home"
        type="FontAwesome5"        
        style={screen !== 'position' ? {color: "white"} : {color: "yellow"}}
      />
      <Text style={{ color: "white" }}>HOME</Text>
      </Button>

      <Button
        vertical
        onPress={() => navigation.navigate("userStats")}
      >
      <Icon
        name="chart-bar"
        type="FontAwesome5"        
        style={screen !== 'stats' ? {color: "white"} : {color: "yellow"}}
      />
      <Text style={{ color: "white" }}>STATS</Text>
      </Button>

      <Button
        vertical
        onPress={() => navigation.navigate("myCards")}
      >
      <Icon
        name="card"                
        style={screen !== 'cards' ? {color: "white"} : {color: "yellow"}}
      />
      <Text style={{ color: "white" }}>Cards</Text>
      </Button>

      <Button
        vertical
        onPress={() => navigation.navigate("accountHistory")}
      >
      <Icon
        style={screen !== 'accounts' ? {color: "white"} : {color: "yellow"}}          
        type="FontAwesome"
        name="dollar"
      />
      <Text style={{ color: "white" }}>Moves</Text>
      </Button>
      
      <Button
        vertical
        onPress={() => navigation.navigate("contacts")}
      >
      <Icon        
        name="users"
        type="FontAwesome5"
        style={screen !== 'contacts' ? {color: "white"} : {color: "yellow"}}
      />
      <Text style={{ color: "white" }}>Friend</Text>
      </Button>

    </FooterTab>
  );
};
