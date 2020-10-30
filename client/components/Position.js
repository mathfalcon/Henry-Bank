import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
  Dimensions,
} from "react-native";
import { Avatar, Divider } from "react-native-elements";
import CardPosition from "./CardPosition";
import MenuOperation from "./MenuOperation";

import { View, Text, Container, Card, CardItem, Icon } from "native-base";
import styles from "../Styles/positionStyles";
import CustomButton from "./customButton";
import axios from "axios";
import { api } from "./Constants/constants";
import { getUserLogged } from "../redux/actions/authActions";
import { getContactList } from "../redux/actions/contactsActions";
import * as Font from "expo-font";
import { BarChart } from "react-native-chart-kit";
import AccountMovementsChart from "./AccountsChart";

export default Position = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    if (!fontLoaded) {
      Font.loadAsync({
        BreeSerifRegular: require("../assets/fonts/BreeSerif-Regular.ttf"),
      });
    }
  }, []);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    const response = await axios(`${api}/auth/logout`);
    dispatch(getUserLogged());
    response.data.success
      ? // ? navigation.navigate("home")
        console.log("Signed Out")
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
                size={100}
                activeOpacity={0.7}
                containerStyle={{
                  alignSelf: "center",
                }}
                source={{
                  uri: `data:image/jpeg;base64,${userLogged.user.documentPhoto}`,
                }}
              />
            </View>
            <View style={styles.nameSection}>
              <Text
                style={styles.moneySection}
              >{`Hello ${userLogged.user.name} ${userLogged.user.surname}`}</Text>

              <TouchableOpacity
                style={{
                  color: "black",
                  backgroundColor: "#ffff6d",
                  fontSize: 18,
                  borderRadius: 10,
                  flexDirection: "row",
                  height: 50,
                  paddingHorizontal: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 3,
                    height: 12,
                  },
                  shadowOpacity: 0.9,
                  shadowRadius: 12.35,

                  elevation: 10,
                }}
                title="LOG OUT"
                onPress={handleLogOut}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  LOG OUT
                </Text>
                <Icon
                  active
                  name="sign-out-alt"
                  type="FontAwesome5"
                  style={{ color: "black", fontSize: 23, marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cardPosition}>
            <View style={{ flex: 3 }}>
              <View style={{ marginHorizontal: 15 }}>
                <CardPosition userLogged={userLogged} navigation={navigation} />
              </View>
              <View style={{ marginHorizontal: 15 }}>
                <Card>
                  <AccountMovementsChart userLogged={userLogged} />
                </Card>
              </View>
              <View style={styles.buttonsView}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("sendMoney")}
                  style={styles.sendMoneyButton}
                >
                  <Icon
                    active
                    name="paper-plane"
                    type="FontAwesome5"
                    style={{ color: "#ffff8b", fontSize: 19 }}
                  />
                  <Text style={styles.sendMoneyText}>SEND MONEY</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("recharge", { userLogged, navigation })
                  }
                  style={styles.sendMoneyButton}
                >
                  <Icon
                    active
                    name="wallet"
                    type="FontAwesome5"
                    style={{ color: "#ffff8b", fontSize: 19 }}
                  />
                  <Text style={styles.sendMoneyText}>RECHARGE MONEY</Text>
                </TouchableOpacity>

                {userLogged.user.role === "admin" ? (
                  <>
                    <View style={{ marginVertical: 10 }}>
                      <CustomButton
                        style={{
                          color: "white",
                          backgroundColor: "#151515",
                          fontSize: 15,
                          width: 150,
                        }}
                        title="ADMIN PANEL"
                        onPress={() =>
                          navigation.navigate("adminPanel", {
                            userLogged,
                            navigation,
                          })
                        }
                      />
                    </View>
                  </>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("userPanel", {
                        userLogged,
                        navigation,
                      })
                    }
                    style={styles.adminPanelText}
                  >
                    <Icon
                      active
                      name="user-cog"
                      type="FontAwesome5"
                      style={{ color: "#ffff8b", fontSize: 19 }}
                    />
                    <Text style={styles.sendMoneyText}>USER PANEL</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          <View style={styles.menuOp}>
            <MenuOperation
              navigation={navigation}
              screen={"position"}
              userLogged={userLogged}
            />
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
