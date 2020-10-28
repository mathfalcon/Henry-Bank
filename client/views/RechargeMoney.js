import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Clipboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Input } from "native-base";
import { Card, CardItem, Body, Text, Form, Item } from "native-base";
import QRCode from "react-native-qrcode-svg";
import { api } from "../components/Constants/constants";
import axios from "axios";
import { getUserLogged } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";

export default RechargeMoney = ({ route }) => {
  const [amount, setAmount] = useState(0);
  let logo = require("../assets/henryLogoBlack.jpg");
  const userLogged = route.params.userLogged.user;
  const navigation = route.params.navigation;
  const dispatch = useDispatch();

  const handleRecharge = () => {
    axios
      .put(`${api}/transactions/account/recharge/${userLogged.id}`, {
        amount: +amount,
      })
      .then((data) => {
        dispatch(getUserLogged());
        Alert.alert(
          "Success",
          "Your recharge has been sucessfully added to your account's balance"
        );
        navigation.navigate('position')
      });
  };
  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "#ffff57", flex: 1 }}>
      <View style={styles.mainView}>
        <View style={styles.firstView}>
          <View style={styles.titleView}>
            <Text style={styles.title}>Recharge Money</Text>
          </View>
          <View style={styles.description}>
            <Text style={styles.textDescription}>
              Show this code to the cashier to recharge balance into your
              account. The minimum amount is $ 10
            </Text>
          </View>
        </View>
        <View style={styles.secondView}>
          <QRCode
            size={250}
            value={`${api}/transactions/account/recharge/${userLogged.passcodeSalt}`}
            logo={logo}
            logoBorderRadius="3"
            logoSize="30"
          />
          <TouchableOpacity
            onPress={() => Clipboard.setString(userLogged.passcodeSalt)}
          >
            <View>
              <Text style={styles.textDescription}>
                If the QR code is not working, you can also provide this code,
                touch it to copy it.
              </Text>
              <Text
                style={{
                  color: "#151515",
                  fontSize: 14,
                  fontStyle: "bold",
                  textAlign: "center",
                  margin: 5,
                }}
              >
                {userLogged.passcodeSalt}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ width: 200, alignSelf: "center", margin: 15 }}>
            <Form>
              <Item>
                <Text>$</Text>
                <Input
                  placeholder="Amount to charge"
                  onChangeText={(value) => setAmount(value)}
                  keyboardType="number-pad"
                />
              </Item>
            </Form>
            <Button dark block onPress={() => handleRecharge()}>
              <Text>CONFIRMAR RECARGA</Text>
            </Button>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  code: {
    fontWeight: "bold",
    color: "black",
    fontSize: 12,
    textAlign: "center",
  },
  cardQr: {
    alignItems: "center",
    backgroundColor: "yellow",
    height: 260,
    width: 260,
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
  card: {
    width: 300,
    height: 400,
    justifyContent: "center",
  },
  container: {},
  title: {
    color: "white",
    fontSize: 35,
    alignSelf: "center",
    marginTop: 25,
    fontWeight: "bold",
  },
  titleView: {
    flex: 1,
    padding: 15,
    width: 1500,
    backgroundColor: "black",
  },
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffff57",
  },
  firstView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  secondView: {
    flex: 2,
    width: "100%",
    alignItems: "center",
  },
  description: {
    flex: 1,
  },
  textDescription: {
    textAlign: "center",
    margin: 15,
    fontSize: 17,
  },
});
