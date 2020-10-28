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
    filter:{
        
    },
    picker:{
        paddingHorizontal: 15,
    },
    checks:{
        flexDirection:'row',
        marginLeft:10,
        marginTop:-10,
    },
    buttons:{
        flexDirection:'row',
    },  
    buttonFilter:{        
        marginLeft: 30,
        marginBottom:10,
        height: 30,              
    },    
    card:{
        flexDirection:'column', 
        marginTop:-30,       
    },
    item:{
        alignSelf:'flex-start',
        marginLeft:15,        
        lineHeight: 20,
        fontSize: 15,
    },    
})