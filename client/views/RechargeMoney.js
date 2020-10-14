import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "native-base";
import { Card, CardItem, Body, Text } from "native-base";
import QRCode from "react-native-qrcode-svg";

export default RechargeMoney = () => {
  let logo = require("../assets/henryLogoBlack.jpg");
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <Text style={styles.title}>Recharge Money</Text>
        <Card style={styles.card}>
          <CardItem>
            <Body style={{ alignItems: "center" }}>
              <Text style={styles.textStart}>
                Use this code at any recharge point to add money to your
                account.
              </Text>
              <Text>The minimum amount is $ 10</Text>
              {/*               <Card style={styles.cardNumber}>
                <Text style={styles.code}>432356463456</Text>
              </Card> */}
              <Card style={styles.cardQr}>
                <QRCode
                  value="http://shouldconfirmrecharge.qr"
                  logo={logo}
                  logoBorderRadius="3"
                  logoSize="30"
                />
              </Card>
              <Text style={styles.textStart}>
                Show this code to your charging point
              </Text>
              <Button dark block onPress={() => Alert.alert("Confirmed")}>
                <Text>CONFIRMAR RECARGA</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  code: {
    fontWeight: "bold",
    color: "black",
    fontSize: 24,
    textAlign: "center",
  },
  cardQr: {
    alignItems: "center",
    backgroundColor: "#ffff57",
    height: 110,
    width: 110,
    alignSelf: "center",
    justifyContent: "center",
  },
  cardNumber: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff57",
    height: 50,
    width: 250,
    alignSelf: "center",
  },
  textStart: {
    textAlignVertical: "top",
    marginBottom: 60,
  },
  card: {
    width: 300,
    height: 400,
    justifyContent: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    color: "white",
    fontSize: 35,
    alignSelf: "center",
    marginTop: 50,
    fontWeight: "bold",
  },
});
