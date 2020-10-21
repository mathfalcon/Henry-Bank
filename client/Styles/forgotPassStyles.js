import { StyleSheet } from "react-native";
//
export default StyleSheet.create({
  container: {
    marginHorizontal: "10%",
    marginVertical: "10%",
    flex: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  title: {
    color: "black", //de momento negro. Hace falta un fondo tipo henry
    fontSize: 28,
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: 40,
  },
  subtitle: {
    marginVertical: 20,
    color: "#5e5e5e", //de momento negro. Hace falta un fondo tipo henry
    fontSize: 16,
    marginHorizontal: 30,
    textAlign: "center",
    fontWeight: "normal",
  },
  buttonRequest: {
    color: "#ffdd3c",
    fontSize: 19,
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "black",
  },
});
