import { StyleSheet } from "react-native";

export default StyleSheet.create({
    mainView:{
        display:'flex',
        flexDirection:'column',
        flex: 10,
        alignItems:'center',
        justifyContent:"space-around",
        backgroundColor:'#333',
        borderRadius:50,

    },
    image:{
        flex:6,
        width:250,
        maxHeight:250,
    },
    buttoms:{
        flexDirection:'row',  
        alignSelf: "center",
    },
    textOtra:{
        fontSize: 25,        
        color: 'red',
    },
    textCargar:{
        fontSize: 25,        
        color: 'red',
    },
    buttonOtra:{
        backgroundColor:'grey',
        padding:15,
        marginRight:20,
        borderRadius:50,     
    },
    buttonCargar:{   
        backgroundColor:'grey',     
        padding:15,        
        borderRadius:50,
    },
});