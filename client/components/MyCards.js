import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { CardView } from "react-native-credit-card-input";
import ClientCard from "./ClientCard";
import MenuCards from "./MenuCards";

function MyCards() {
  return (
    <View style={styles.container}>
      <View style={styles.blackMenu}>
        <Text style={styles.title}>My Cards</Text>
      <View style={styles.menu}>
        <MenuCards/>
      </View>
      </View>
      <View style={styles.card}>
        <CardView
          onFocused
          appStack
          cvc="123" // Epale revisa esto. Ese numero no esta saliendo por ningun lado
          brand="henry"
          name="DR Oliver"
          number="12345678"
          expiry="13/20"
          scale={1.25}
          imageFront={require("../assets/yellowBackground.png")}
          imageBack={require("../assets/cardBackOk.png")}
        />
      </View>
        <ClientCard/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBD43B",
    flex: 1,
  },
  card: {
    zIndex: 2,
  },
  blackMenu: {
    bottom: "1.2%",
    width:500,
    height: 160,
    backgroundColor: "black",
    zIndex: 2,
  },
  title: {
    color: "white",
    fontSize: 40,
    left: 160,
    top: "30%",
  },
  menu: {
  top: 685,
  zIndex: 4
  },
});

export default MyCards;