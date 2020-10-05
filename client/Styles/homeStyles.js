import { StyleSheet } from "react-native";

export default StyleSheet.create({
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