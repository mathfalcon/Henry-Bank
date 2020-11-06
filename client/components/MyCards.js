import React from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { CardView } from "react-native-credit-card-input";
import { useSelector } from "react-redux";

function MyCards({ navigation }) {
  const userLogged = useSelector((state) => state.auth.user);
  console.log(userLogged.account);
  return (
    <View style={styles.container}>
      <View style={styles.blackMenu}>
        <Text style={styles.title}>Account Details</Text>
      </View>
      <View style={{ justifyContent: "center", flex: 2 }}>
        <ScrollView>
          <View
            style={{
              marginHorizontal: 45,
              alignItems: "center",
              marginTop:25
            }}
          >
            <Text
              style={{ fontFamily: "Poppins", color: "#ffff8e", fontSize: 17 }}
            >
              Account Details
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 45,
              borderColor: "#ffff8e",
              borderWidth: 1,
              borderRadius: 10,
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text
              style={{ fontFamily: "Poppins", color: "#FFFFFF", fontSize: 17 }}
            >
              CVU
            </Text>
            <Text
              style={{ fontSize: 17, fontFamily: "Poppins", color: "#ffff8e" }}
            >
              {userLogged.account.cvu}
            </Text>
            <Text
              style={{ fontFamily: "Poppins", color: "#FFFFFF", fontSize: 17 }}
            >
              TYPE
            </Text>
            <Text
              style={{ fontSize: 17, fontFamily: "Poppins", color: "#ffff8e" }}
            >
              {userLogged.account.type}
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.card}>
        <CardView
          onFocused
          appStack
          requiresCVC={true}
          placeholder={{
            cvc: "***",
          }}
          brand="henry"
          name={`${userLogged.name} ${userLogged.surname}`}
          number={userLogged.account.card.number
            .replace(/(.{4})/g, "$1 ")
            .trim()}
          expiry={userLogged.account.card.expiration_date.split("T")[0]}
          scale={1.1}
          imageFront={require("../assets/yellowBackground1.png")}
          imageBack={require("../assets/cardBackOk.png")}
        />
      </View>

      <View style={styles.menuOp}>
        <MenuOperation navigation={navigation} screen={"cards"} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "space-evenly",
    backgroundColor: "#2D2D2D",
    flex: 1,
  },
  card: {
    // zIndex: 2,
    flex: 2.5,
    alignSelf: "center",
    alignItems: "center",
  },
  blackMenu: {
    backgroundColor: "#151515",
    flex: 0.8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    color: "white",
    fontSize: 30,
    fontFamily: "Poppins",
  },
  menu: {
    // top: 685,
    flex: 2,
    // zIndex: 4,
  },
  menuOp: {
    height: 60,
    backgroundColor: "black",
  },
  logoImg: {
    height: 80,
    width: 80,
  },
});
export default MyCards;
