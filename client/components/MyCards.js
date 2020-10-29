import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { CardView } from "react-native-credit-card-input";
import ClientCard from "./ClientCard";
import MenuCards from "./MenuCards";
import { useSelector } from "react-redux";
import CreditCardDisplay from "react-native-credit-card-display";

function MyCards({ navigation }) {
  const userLogged = useSelector((state) => state.auth.user);
  return (
    <View style={styles.container}>
      <View style={styles.blackMenu}>
        <View>
          <Image
            source={require("../assets/henryLogoBlack.jpg")}
            style={styles.logoImg}
          />
        </View>
        <View>
          <Text style={styles.title}>MY CARDS</Text>
        </View>
      </View>
      <View style={styles.card}>
        <CardView
          onFocused
          appStack
          requiresCVC={true}
          placeholder={{
            cvc: "123",
          }}
          cvc="11111"
          brand="henry"
          name={`${userLogged.name} ${userLogged.surname}`}
          number={userLogged.account.card.number}
          expiry={userLogged.account.card.expiration_date.split('T')[0]}
          scale={1.3}
          imageFront={require("../assets/yellowBackground.png")}
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
    backgroundColor: "#ffff8b",
    flex: 18,
  },
  card: {
    // zIndex: 2,
    flex: 10,
    alignSelf: "center",
    alignItems:'center',
    justifyContent: 'center'
  },
  blackMenu: {
    // bottom: "1.2%",
    // width:500,
    // height: 160,
    backgroundColor: "#151515",
    // zIndex: 2,
    flex: 2,
    justifyContent: "space-around",
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    color: "#ffff8b",
    alignSelf: "flex-end",
    fontSize: 30,
    marginRight: 15,
  },
  menu: {
    // top: 685,
    flex: 2,
    // zIndex: 4,
  },
  menuOp: {
    height: 50,
    backgroundColor: "black",
  },
  logoImg: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
});
export default MyCards;
