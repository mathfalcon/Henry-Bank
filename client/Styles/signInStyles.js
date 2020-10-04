import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#eef0f2",
      flexDirection: "column",
      alignItems: "center",
    },
    containerForm: {
      bottom: 70,
    },
    form: {
      height: 45,
      width: 300,
      borderRadius: 5,
      backgroundColor: "white",
      marginBottom: 20,
      paddingLeft: 20,
      fontSize: 20,
    },
    titulo: {
      color: "white", //de momento negro. Hace falta un fondo tipo henry
      fontSize: 35,
      marginLeft: 80,
      marginTop: 30,
      bottom: 220,
    },
    imagen: {
      width: 411,
      height: 250,
    },
    label: {
      color: "#9EA0A4",
      fontSize: 20,
    },
    buttonDate: {
      width: 300,
      marginBottom: 20,
      color: "white",
    },
  });