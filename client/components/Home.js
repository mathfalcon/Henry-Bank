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

function Home({ navigation }) {

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View
        style={{
          flex: 1,
          width: "60%",
        }}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/henryLogo.jpg")}
            style={styles.logoImg}
          />
          <Text style={styles.logoText}>Your E-Wallet</Text>
        </View>
        <View style={styles.mainTitleContainer}>
          <Text style={styles.titleText}>Henry Bank</Text>
        </View>
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
          <TouchableOpacity>
            <Text style={styles.supportText}>Need support?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;
