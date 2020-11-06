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
  Right,
  Button,
} from "native-base";
import { Avatar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Image } from "react-native";
import { api } from "./Constants/constants";
import styles from "../Styles/forgotPassStyles";
import CustomButton from "./customButton";
import { CheckBox } from "react-native-elements";
import { useSelector } from "react-redux";

export default UserPanel = ({ route, navigation }) => {
  const userName = route.params.userLogged.user.name;
  const userId = route.params.userLogged.user.id;

  const userLogged = route.params.userLogged;

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
          <Icon style={{ color: "#151515", fontSize: 25 }} name="arrow-back" />
        </Button>
        <Title style={{ color: "#151515", fontSize: 20 }}>
          Welcome to your user panel
        </Title>
      </Header>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Avatar
          size="large"
          source={{
            uri: `data:image/jpeg;base64,${userLogged.user.documentPhoto}`,
          }}
          activeOpacity={1}
          containerStyle={{
            alignSelf: "center",
            backgroundColor: 'whitesmoke',
            marginVertical:30,
            height:100,
            width:100
          }}
        />
        <Text
          style={{
            fontSize: 40,
            textAlign: "center",
            fontWeight: "bold",
            color: "whitesmoke",
            marginBottom: 30,
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
              backgroundColor: "whitesmoke",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            button
            onPress={() => navigation.navigate("security", { userId })}
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
              backgroundColor: "whitesmoke",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            button
            onPress={() => navigation.navigate("personalInfo", userLogged)}
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
              backgroundColor: "whitesmoke",
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
              backgroundColor: "whitesmoke",
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
