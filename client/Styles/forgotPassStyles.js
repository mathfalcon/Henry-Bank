import { StyleSheet } from "react-native";
//
export default StyleSheet.create({
  container: {
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
    marginTop: 30,
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
    color: "white",
    fontSize: 19,
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "black",
  },
  buttonChange: {
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  buttonEnabled: {
    opacity:1,        
  },
  buttonDisabled: {   
    opacity:.5,            
},
  logoImg: {
    marginTop: 40,
    height: 60,
    width: 60,
    alignSelf: "center",
    borderRadius: 10,
  },
});
