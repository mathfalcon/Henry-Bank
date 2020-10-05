import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    camera:{
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end'
      },
    buttonTake: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').width * 0.2,
        backgroundColor:'#f00',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonFlip:{        
        flex: 0.1,
        alignSelf: 'flex-end'          
    },
    textFlip:{
        fontSize: 18,
        marginBottom: 10,
        color: 'white',
    },
});