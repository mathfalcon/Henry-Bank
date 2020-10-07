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
    buttons: {
     flexDirection:"row",
     justifyContent:'space-between',
     width:"80%"
   },
   containerForm:{
      marginTop:-100,
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
    titulo: {
      color: "white", //de momento negro. Hace falta un fondo tipo henry
      fontSize: 35,
      marginLeft: 80,
      marginTop: 30,
      bottom: 100
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
    containerPass:{      
      flexDirection: 'row',      
    },
    eyeIcon: {
      alignSelf:"center",
      // marginLeft: -25,      
      // marginBottom: 15
    }
  });