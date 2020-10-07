import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { Avatar } from "react-native-elements";
import CardPosition from "./CardPosition";
import MenuOperation from "./MenuOperation";
import Transaction from "./Transaction";
import { View, Text, Form, Label, Item, Input, Button } from "native-base";
import styles from "../Styles/positionStyles";
import CustomButton from "./customButton";
import axios from "axios";
import { api } from "./Constants/constants";
import { getUserLogged } from "../redux/actions/authActions";

export default Position = ({ navigation }) => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   }, []);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    const response = await axios(`${api}/auth/logout`);
    dispatch(getUserLogged())
    response.data.success
      ? navigation.navigate("home")
      : Alert.alert("Error", "Something went wrong, try again");
  };

  useEffect(() => dispatch(getUserLogged()), [])

  const userLogged = useSelector((state) => state.auth);
  console.log(userLogged);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.avatarSection}>
          <Text style={styles.textAvatar}>Welcome User</Text>
          <Avatar
            size="large"
            icon={{ name: "user", type: "font-awesome" }}
            // onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            containerStyle={{
              backgroundColor: "gray",
              alignSelf: "center",
              marginBottom: 50,
              marginTop: -50,
            }}
          />
        </View>
        <Text style={styles.moneySection}>Dinero Disponible</Text>
      </View>

      <View style={styles.cardPosition}>
        <CardPosition />
        <CustomButton
          style={{
            color: "white",
            backgroundColor: 'dodgerblue',
            borderWidth: 1,
            borderColor: "white",
          }}
          title="LOG OUT"
          onPress={handleLogOut}
        />
      </View>

      <View style={styles.menuOp}>
        <MenuOperation />
      </View>

      <View style={styles.transaction}>
        <Transaction />
      </View>
    </SafeAreaView>
  );
};
