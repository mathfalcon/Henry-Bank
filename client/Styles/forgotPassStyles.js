import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      marginTop: 10,
      height: 300,
      backgroundColor: "#eef0f2",
      flexDirection: "column",
      justifyContent: 'center',
      alignItems: "center",
    },


    // button:{
    //   color:"white",
    //   backgroundColor:"blue",
    //   borderWidth:0,
    //   borderColor:"black",
    //   padding:0,
    //   margin:0,
    //   letterSpacing:1,
    // },

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
    color: 'black',
  },
  containerForm:{
      marginTop:-100,
      alignSelf: 'center'
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
      color: "black", //de momento negro. Hace falta un fondo tipo henry      
      fontSize: 30,
      alignSelf: "center",      
      // marginLeft: 80,
      marginTop: 30,
      // bottom: 220
    },
    select: {
      width: 100,
      backgroundColor: "red",
    },
    imagen: {
      width: 411,
      height: 250,
    },
  });