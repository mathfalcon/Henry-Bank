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
        alignSelf: "flex-start",
      },
      logoContainer: {
        marginTop: 40,
        marginLeft: 20,
        flex: 3,
      },
      logoText: {
        color: "black",
        alignSelf: "flex-start",
        fontSize: 15,
        paddingTop: 10,
        letterSpacing: 4,
        fontWeight: 'bold',
        opacity: 0.7,
      },
      mainTitleContainer: {
        flex: 2.5,
        justifyContent: "center",
      },
      titleText: {
        color: "black",
        alignSelf:'flex-start',
        fontFamily:'Microgramma',
        marginTop: 25,
        fontSize: 25,
        textTransform: "uppercase",
      },
      mainButtonsContainer: {
        flex: 4.5,
        width: '100%',
        alignItems: "flex-end",
      },
      buttonLogIn: {
        color: "white",
        width: 175,
        borderWidth: 1,
        borderColor: "white",
        margin: 10,
      },
      buttonSignUp: {
        color: "#ffff57",
        borderWidth: 1,
        borderColor: "#ffff57",
        margin: 10,
        width: 175,
      },
      welcomeText: {
        color: "white",
        padding: 10,
        opacity: 0.7,
        fontSize: 27,
      },
      supportText: {
        color: "white",
        padding: 10,
        opacity: 0.5,
        fontSize: 15,
      },
  });