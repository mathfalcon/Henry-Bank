import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      marginTop: 10,
      height: 1100,
      backgroundColor: "#eef0f2",
      flexDirection: "column",
      alignItems: "center",
    },
    buttonEnabled: {
     flexDirection:"row",
     justifyContent:'space-between',
     width:"80%",
     backgroundColor: "yellow",
     padding: 20,
     borderRadius: 5,
   },
   buttonDisabled: {
    flexDirection:"row",
    justifyContent:'space-between',
    width:"80%",
    backgroundColor: "yellow",
    padding: 20,
    borderRadius: 5,
    opacity:.3
  },
   buttonText: {
    fontSize: 20,
    color: 'red',
  },
  containerForm:{
      marginTop:-100,
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
      bottom: 220
    },
    select: {
      width: 100,
      backgroundColor: "red",
    },
    imagen: {
      width: 411,
      height: 250,
    },
    error:{
      color: "red",
      fontSize: 15,
    }
  });