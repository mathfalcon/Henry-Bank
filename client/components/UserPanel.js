import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Text,
  Item,
  Icon,
  Input,
  View,
  Label,
  Content,
  Header,
  Left,
  Body,
  Title,
  Avatar,
  Right,
  Button,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Image } from "react-native";
import { api } from "./Constants/constants";
import styles from "../Styles/forgotPassStyles";
import CustomButton from "./customButton";
import { CheckBox } from "react-native-elements";

export default UserPanel = ({ route, navigation }) => {
  const userName = route.params.userLogged.user.name;
  const userId = route.params.userLogged.user.id;

  return (
    <View
      style={{
        backgroundColor: "#151515",
        flex: 10,
      }}
    >
      <Header
        transparent
        style={{
          backgroundColor: "#ffff8b",
          alignItems: "center",

          justifyContent: "flex-start",
        }}
      >
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon style={{ color: "black", fontSize: 35 }} name="arrow-back" />
        </Button>
        <Title style={{ color: "black" }}>Welcome to your user panel</Title>
      </Header>
      {/*       <Avatar
        size={115}
        rounded
        activeOpacity={0.7}
        containerStyle={{
          backgroundColor: "#ffdd3c",
          alignSelf: "center",
          shadowColor: "red",
          padding: 2,
        }}
                source={
          img
            ? {
                uri: `data:image/jpeg;base64,${route.params.userLogged.user.documentPhoto}`,
              }
            : null
        } 
      /> */}
      <View
        style={{
          flexDirection: "column",
          marginVertical: 40,
        }}
      >
        <Image
          source={require("../assets/henryLogo.jpg")}
          style={{
            height: 60,
            width: 60,
            alignSelf: "center",
            borderRadius: 10,
            marginVertical: 10,
          }}
        />
        <Text
          style={{
            fontSize: 40,
            textAlign: "center",
            fontWeight: "bold",
            color: "whitesmoke",
            marginVertical: 10,
          }}
        >
          Hi {userName}!
        </Text>
        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Item
            style={{
              width: 130,
              height: 130,
              backgroundColor: "#ffff8b",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            button
            onPress={() => navigation.navigate("security", {userId})}
          >
            <View>
              <Icon
                style={{ color: "black", fontSize: 35 }}
                name="shield-alt"
                type="FontAwesome5"
              />
            </View>
            <View>
              <Text style={{ fontSize: 22, textAlign: "center" }}>
                Security
              </Text>
            </View>
          </Item>

          <Item
            style={{
              width: 130,
              height: 130,
              backgroundColor: "#ffff8b",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            button
            onPress={() => navigation.navigate("support")}
          >
            <View>
              <Icon
                style={{ color: "black", fontSize: 35 }}
                name="user-cog"
                type="FontAwesome5"
              />
            </View>
            <View>
              <Text style={{ fontSize: 22, textAlign: "center" }}>
                Personal Info
              </Text>
            </View>
          </Item>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: 25,
          }}
        >
          <Item
            style={{
              width: 130,
              height: 130,
              backgroundColor: "#ffff8b",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            button
            onPress={() => navigation.navigate("support")}
          >
            <View>
              <Icon
                style={{
                  color: "black",
                  fontSize: 35,
                  flexDirection: "column",
                }}
                name="headset"
                type="FontAwesome5"
              />
            </View>
            <View>
              <Text style={{ fontSize: 22, textAlign: "center" }}>
                Need Support?
              </Text>
            </View>
          </Item>
          <Item
            style={{
              width: 130,
              height: 130,
              backgroundColor: "#ffff8b",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            button
            onPress={() => navigation.navigate("support")}
          >
            <View>
              <Icon
                style={{ color: "black", fontSize: 35 }}
                name="comments"
                type="FontAwesome5"
              />
            </View>
            <View>
              <Text style={{ fontSize: 22 }}>Feedback</Text>
            </View>
          </Item>
        </View>
      </View>
    </View>
  );
};
