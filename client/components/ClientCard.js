import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

function ClientCard() {
  return (
      <View style={styles.client}>
      <Image
          style={styles.img}
          source={require('../assets/userDemo.webp')}
        />
        <Text style={styles.text}>Roberto Bolañez</Text>
        <Text style={styles.text}>$400.231,58</Text> 
      </View>

  );
}

const styles = StyleSheet.create({
  client: {
    // top: "43%",
    width: 350,
    height: 150,
    backgroundColor: "#fb5f3b",
    zIndex: 2,
    justifyContent: "center",
    opacity: 0.77,
  },
  img: {
    width: 66,
    height: 66,
    borderRadius: 50,
    top: 30,
    left: "7%"
  },
  text: {
    alignSelf: "center",
    color: "white",
    fontSize: 24,
    left: "15%",
    bottom: "25%"
  },
});

export default ClientCard;


