import React, { useEffect } from "react";
import {
  StyleSheet,
  Button,
  View,
  Image,
  Text,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "./customButton";
import styles from "../Styles/homeStyles.js";
import axios from "axios";
import { api } from "./Constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogged } from "../redux/actions/authActions";
import { StatusBar } from "expo-status-bar";
import { loadAsync } from "expo-font";

function Home({ navigation }) {
  const userLogged = useSelector((state) => state.auth);

  loadAsync({
    // Load a font `Microgramma` from a static resource
    Microgramma: require("../assets/fonts/Microgramma.ttf"),
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      {userLogged.success ? (
        navigation.navigate("position")
      ) : (
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={require("../assets/mainBg.jpg")}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
            }}
          >
            <StatusBar hidden></StatusBar>
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/henryLogoBlack.jpg")}
                style={styles.logoImg}
              />
              <Text style={styles.titleText}>Henry Bank</Text>
              <Text style={styles.logoText}>Your E-Wallet</Text>
            </View>
            <View style={styles.mainTitleContainer}></View>
            <View style={styles.mainButtonsContainer}>
              <Text style={styles.welcomeText}>Welcome!</Text>
              <CustomButton
                style={styles.buttonLogIn}
                title="LOG IN"
                onPress={() => navigation.navigate("login")}
              />
              <CustomButton
                style={styles.buttonSignUp}
                title="SIGN UP"
                onPress={() => navigation.navigate("sign")}
              />
              <TouchableOpacity onPress={() => navigation.navigate("support")}>
                <Text style={styles.supportText}>Need support?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>  
      )}    
    </SafeAreaView>
  );
}

export default Home;
