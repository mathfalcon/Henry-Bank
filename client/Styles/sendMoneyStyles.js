import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        display:'flex',  
        flexDirection:'column',
        flex:10,        
        backgroundColor: "black",        
        padding: 15,
    },
    card: {
        flex: 8,
        padding:5, 
        borderRadius:15,   
    },
    title: {
        flex:1,
        color: "white",
        fontSize: 35,      
        fontWeight: "bold",        
        alignSelf:'center',
        marginBottom:10,
    },
    picker:{
        flex:1,
        backgroundColor:"white",
        margin:4,
        borderRadius:12,
    },
    pickerItem:{ 
        backgroundColor:'red',
    },
    label:{
        marginTop:10,
    },
    error:{
        color:'red',
    },
    input:{

    },
    textArea:{
        width:275,
        marginBottom:10,
        borderRadius:5,
    },
    check:{
        backgroundColor:'red',
    },
    buttom:{
        padding:20,
        margin: 20,
        marginTop:50,
    }
  });