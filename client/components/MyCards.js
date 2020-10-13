import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CreditCardInput, CardView } from "react-native-credit-card-input";

function CreditCard() {
  return (
    <View style={styles.container}>
      <CardView
        appStack
        brand="henry"
        name="DR Oliver"
        number="12345678"
        expiry="13/20"
        cvc="12"
        scale={1.25}
        imageFront={require("../assets/yellowBackground.png")}
        imageBack={require("./frontCard.png")}

      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default CreditCard;
