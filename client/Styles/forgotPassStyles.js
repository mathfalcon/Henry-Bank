import { StyleSheet } from "react-native";
// 
export default StyleSheet.create({
    firstContainer: {
      backgroundColor: "black",
      height: 788,
    },
    container: {
      marginTop: "11%",
      marginLeft: 30,
      width: 350,
      height: "75%",
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: 'center',
      borderRadius: 20,
      opacity: 0.94,

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
     width:"70%",
     backgroundColor: "#fffb57",
     padding: 20,
     borderRadius: 5,
    marginTop: 30
   },
   buttonDisabled: {
    width:"70%",
    backgroundColor: "orange",
    padding: 20,
    borderRadius: 5,
    opacity:.5,
    marginTop: 30
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
      width: 10,
      height: 40,
      borderRadius: 5,
      paddingLeft: 20,
    },
    titulo: {      
      color: "black",    
      fontSize: 30,
      alignSelf: "center", 
      marginBottom: "45%"
    },
    select: {
      width: 100,
      backgroundColor: "red",
    },
    imagen: {
      width: 411,
      height: 250,
    },
    cBox: {
      marginBottom: 10
    },
    errorMessage: {
      color: "red",
      marginBottom: 30
    },
    menuOp:{
      marginTop: 100  
    },
    logoImg: {
      height: 100,
      width: 100,
      alignSelf: "center",
      marginTop: "-35%",
      marginBottom: "10%"
    },
  });