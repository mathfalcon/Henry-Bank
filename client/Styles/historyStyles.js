import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "whitesmoke",
        paddingVertical: 12,
    },    
    header: {
        backgroundColor: '#ffff57',
        display: 'flex'
    },
    headerTitle:{
        color:'black',
        alignSelf: 'center',
        width: '100%',
    },
    textFilter:{
        alignSelf:'center',
        fontSize: 20,
        marginBottom:5,       
    },
    datePicker:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom: 0,      
    },
    fromTo:{
        flexDirection:'column',
    },
    date:{
        alignSelf:'center',
    },
    list:{
        marginBottom:45
    },
    card:{
        flexDirection:'column',
        marginVertical: -10,             
    },
    item:{
        alignSelf:'flex-start',
        marginLeft:10,        
        lineHeight: 20
    },
    menuOp:{        
        height:50,
        marginTop:-30,        
        backgroundColor:"black",
    }
    // divider:{        
    // },
})