import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    mainView:{
        display:'flex',        
        flex:1,
    },
    camera:{
        flex: 1,
        flexDirection:'column',
        backgroundColor: 'transparent',
        justifyContent: 'flex-end'
      },
    outerButtonTake: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.16,
        height: Dimensions.get('window').width * 0.16,
        backgroundColor:'#cc0815',                
    },
    middleButtonTake: {        
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.14,
        height: Dimensions.get('window').width * 0.14,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        marginTop:3.5,        
        marginLeft:1,        
    },
    innerButtonTake: {        
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.12,
        height: Dimensions.get('window').width * 0.12,
        backgroundColor:'#f5402c',
        marginTop:3.5,              
    },
    buttonFlip:{        
        flex: 0.1,        
        alignSelf: 'flex-end',
        // backgroundColor: '#e3cccd',
        backgroundColor: 'transparent',
        borderColor: '#4057c9',
        borderWidth: 2,        
        borderRadius: 15,
        width: 100,
        marginBottom:-55,
        marginRight:10,
        justifyContent:'center',
    },
    textFlip:{
        fontSize: 20,
        fontWeight:"bold",
        textAlign:"center",                
        color:'#4057c9',
    },

    overlay:{
        display:'flex',
        flexDirection:'column',   
        flex:10,     
        backgroundColor:'#f1f7d2',
        maxWidth:700,
        maxHeight:420,        
    },
    image:{
        flex:6,        
        width:300,
        height:250,        
    },
    buttons:{
        flex:4,
        marginTop: -130,
    },
    textOtra:{
        textAlign:"center",
        fontSize: 20,        
        color: '#e82a35',
    },
    textCargar:{
        textAlign:"center",
        fontSize: 20,        
        color: '#e82a35',
    },
    buttonOtra:{         
        alignSelf: "center",              
        backgroundColor:'#abb8cc',
        padding:15,        
        borderRadius:50,        
        marginBottom: 10,
        width:250,        
    },
    buttonCargar:{          
        alignSelf: "center",                     
        backgroundColor:'#abb8cc',     
        padding:15,        
        borderRadius:50,
        width:250,
    },
});