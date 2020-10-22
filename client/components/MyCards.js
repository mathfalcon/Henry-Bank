import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { CardView } from "react-native-credit-card-input";
import ClientCard from "./ClientCard";
import MenuCards from "./MenuCards";
import { useSelector } from "react-redux";
import CreditCardDisplay from "react-native-credit-card-display";

function MyCards({ navigation }) {
  const userLogged = useSelector((state) => state.auth.user);
  console.log(userLogged);
  return (
    <View style={styles.container}>
      <View style={styles.blackMenu}>
        <Text style={styles.title}>MY CARDS</Text>
      </View>
      <View style={styles.card}>
        <CardView
          onFocused
          appStack
          requiresCVC={true}
          placeholder={{
            cvc: "123",
          }}
          cvc="11111" // Epale revisa esto. Ese numero no esta saliendo por ningun lado
          brand="henry"
          name={`${userLogged.name} ${userLogged.surname}`}
          number="12345678"
          expiry="13/20"
          scale={1.2}
          imageFront={require("../assets/yellowBackground.png")}
          imageBack={require("../assets/cardBackOk.png")}
        />
      </View>
      <View style={styles.clientCard}>
        <ClientCard user={userLogged} />
      </View>
      <View style={styles.menu}>
        {/* <MenuCards /> */}
      </View>

      <View style={styles.menuOp}>
            <MenuOperation navigation={navigation} screen={'cards'} />
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
    backgroundColor: "#ffff57",
    flex: 18,
  },
  card: {
    // zIndex: 2,
    flex: 8,
    alignSelf: "center",
    marginTop:50
  },
  clientCard: {
    flex: 6,
  },
  blackMenu: {
    // bottom: "1.2%",
    // width:500,
    // height: 160,
    backgroundColor: "black",
    // zIndex: 2,
    flex: 2,
  },
  title: {
    color: "#ffff57",
    alignSelf: "center",
    fontSize: 30,
    marginTop: 10,
    padding: 5,
    // left: 160,
    // top: "30%",
  },
  menu: {
    // top: 685,
    flex: 2,
    // zIndex: 4,
  },
  menuOp:{
    height:50,    
    backgroundColor:"black",
  },
});
export default MyCards;
