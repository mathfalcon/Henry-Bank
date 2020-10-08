import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 10,
    height: 1100,
    backgroundColor: "#eef0f2",
    flexDirection: "column",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  containerForm: {
    marginTop: -100,
  },
  form: {
    height: 45,
    width: 1000,
    borderRadius: 5,
    backgroundColor: "white",
    marginBottom: 20,
    paddingLeft: 20,
    fontSize: 20,
  },
  logoImg: {
    marginTop: 40,
    marginBottom: 60,
    height: 60,
    width: 60,
    alignSelf: "center",
    borderRadius: 10,
  },
  tittle: {
    color: "black", //de momento negro. Hace falta un fondo tipo henry
    fontSize: 35,
    alignSelf: "center",
    marginTop: 50,
    fontWeight: "bold",
  },
  buttonLogin: {
    color: "white",
    borderWidth: 0.2,
    borderColor: "#ffff57",
    backgroundColor: "black",
    height: 10,
  },
  signuptext: {
    color: "red",
    alignSelf: "center",
  },
  select: {
    width: 100,
    backgroundColor: "red",
  },
  imagen: {
    width: 411,
    height: 150,
  },
  forgotPass: {
    alignSelf: "center",
    marginBottom: 10,
    fontSize: 15,
    color: "blue",
  },
  containerPass: {
    flexDirection: "row",
  },
  eyeIcon: {
    alignSelf: "center",
    // marginLeft: -25,
    // marginBottom: 15
  },
});
