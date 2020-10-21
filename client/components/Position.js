import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity, SafeAreaView, Alert, StatusBar } from "react-native";
import { Avatar } from "react-native-elements";
import CardPosition from "./CardPosition";
import MenuOperation from "./MenuOperation";

import {
  View,
  Text,
  Container,
} from "native-base";
import styles from "../Styles/positionStyles";
import CustomButton from "./customButton";
import axios from "axios";
import { api } from "./Constants/constants";
import { getUserLogged } from "../redux/actions/authActions";
import { getContactList } from "../redux/actions/contactsActions";
import * as Font from "expo-font";

export default Position = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    if (!fontLoaded) {
      Font.loadAsync({
        BreeSerifRegular: require("../assets/fonts/BreeSerif-Regular.ttf"),
      });
    }
  });
  const dispatch = useDispatch();  

  const handleLogOut = async () => {
    const response = await axios(`${api}/auth/logout`);
    dispatch(getUserLogged());
    response.data.success
      // ? navigation.navigate("home")
      ? console.log('Signed Out')
      : Alert.alert("Error", "Something went wrong, try again");          
  };

  useEffect(() => {
    dispatch(getUserLogged());
    dispatch(getContactList());
  }, []);

  const userLogged = useSelector((state) => state.auth);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      {userLogged.success ? (
        <Container>
          <View style={styles.headerSection}>
            <View style={styles.avatarSection}>
              <Avatar
                size="large"
                icon={{ color: "black", name: "user", type: "font-awesome" }}
                activeOpacity={0.7}
                containerStyle={{
                  backgroundColor: "#ffff6d",
                  alignSelf: "center",
                }}
              />
            </View>
            <View style={styles.nameSection}>
              <Text
                style={styles.moneySection}
              >{`Hello ${userLogged.user.name} ${userLogged.user.surname}`}</Text>
              <CustomButton
                style={{
                  color: "black",
                  backgroundColor: "#ffff6d",
                  fontSize: 18,
                }}
                title="LOG OUT"
                onPress={handleLogOut}
              />
            </View>
          </View>

          <View style={styles.cardPosition}>
            <View style={{ flex: 3 }}>
              <CardPosition
                userLogged={userLogged}
                navigation={navigation}
                />
            </View>
            <View style={styles.buttonsView}>
              <TouchableOpacity
                onPress={() => navigation.navigate("sendMoney")}
                style={styles.sendMoneyButton}
              >
                <Text style={styles.sendMoneyText}>SEND MONEY</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("recharge", userLogged)}
                style={styles.sendMoneyButton}
              >
                <Text style={styles.sendMoneyText}>RECHARGE MONEY</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={styles.transaction}>
        <Transaction />
      </View> */}
          <View style={styles.menuOp}>
            <MenuOperation navigation={navigation} />
          </View>
        </Container>
      ) : (
        <View
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Wait for data to load...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
