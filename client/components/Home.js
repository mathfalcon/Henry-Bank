import React from "react";
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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#0A0A0A',
  },
  logoImg: {
    height: 100,
    width: 100,
    alignSelf: "center",
  },
  logoContainer: {
    marginTop: 45,
    flex: 3,
  },
  logoText: {
    color: "white",
    alignSelf: "center",
    fontSize: 15,
    paddingTop: 10,
    letterSpacing: 3.5,
    opacity: 0.7,
  },
  mainTitleContainer: {
    flex: 2.5,
    justifyContent: "center",
  },
  titleText: {
    color: "white",
    alignSelf: "center",
    fontSize: 35,
    letterSpacing: 5.5,
  },
  mainButtonsContainer: {
    flex: 4.5,
    alignItems: "center",
  },
  buttonLogIn: {
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    margin: 5,
  },
  buttonSignUp: {
    color: "#ffff57",
    borderWidth: 1,
    borderColor: "#ffff57",
    margin: 10,
  },
  welcomeText: {
    color: "white",
    padding: 10,
    opacity: 0.4,
    fontSize: 27,
  },
  supportText: {
    color: "white",
    padding: 10,
    opacity: 0.3,
    fontSize: 15,
  },
});
export default Home;