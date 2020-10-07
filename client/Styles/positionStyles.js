import { StyleSheet } from "react-native";
import { Row } from "native-base";

export default StyleSheet.create({
    container: {
      flex:15,
      backgroundColor: '#fff',      
      height: 300,
      backgroundColor: "#eef0f2",
      flexDirection: "column",
      justifyContent: 'center',    
    },

    headerSection:{
        flex: 3,
        flexDirection: 'row',
        justifyContent:"space-between",
        marginHorizontal:25,
        paddingTop:15,
        paddingBottom:30,
    },

    avatarSection:{
        flexDirection: 'column',
    },

    textAvatar:{
        marginBottom:65,
    },


    moneySection:{
        alignSelf:'center',
    },

    cardPosition:{
        flex: 6,
        padding:25,
    },

    menuOp:{
        flex: 3,
    },

    transaction:{
        flex: 1,
        paddingBottom:30,
    },
  });