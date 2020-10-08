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
import * as Font from 'expo-font';


export default Position = ({ navigation }) => {
  const [fontLoaded, setFontLoaded]= useState(false)
useEffect(() => {
  if (!fontLoaded){
    Font.loadAsync({
      BreeSerifRegular: require('../assets/fonts/BreeSerif-Regular.ttf'),
    })
  }
})

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
          <Text style={styles.textAvatar}>Welcome</Text>
          <Avatar
            size="large"
            icon={{ name: "user", type: "font-awesome" }}
            // onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            containerStyle={{
              backgroundColor: "gray",
              alignSelf: "center",
              marginBottom: 50,
              marginTop: -60,
            }}
          />
        </View>
        <Text style={styles.moneySection}>Name of User</Text>
      </View>

      <View style={styles.cardPosition}>
        <CardPosition />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center"
        }}
      >
        <View style={styles.buttonLogOut} >
          <CustomButton
            style={{}}
            title="LOG OUT"
            onPress={handleLogOut}
          />
        </View>
      </View>


      {/* <View style={styles.transaction}>
        <Transaction />
      </View> */}
      <View style={styles.menuOp}>
        <MenuOperation />
      </View>
    </SafeAreaView>
  );
};
