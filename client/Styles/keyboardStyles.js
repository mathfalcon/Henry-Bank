import { StyleSheet, Dimensions } from "react-native";

// Aca estan los estilos del teclado
// client\node_modules\react-native-virtual-keyboard\src\VirtualKeyboard.style.js

export default StyleSheet.create({

    // centeredView:{

    // },
    modalView:{
        display:'flex',
        flexDirection:'column',
        flex: 13,
        backgroundColor: "rgba(0, 0, 0, 0.85)",             
		justifyContent: 'center',
		alignItems: 'center',
        // backgroundColor: '#F5FCFF',
        height:150,
        width:370,        
        borderRadius: 75,
        padding: 25,        
    },
    modalText:{
        flex: 2,
        color:'yellow',
        fontSize: 25,
        marginTop:25,
    },
    inputs:{
        flex: 3,
        flexDirection:'row',
        width:230,
        // justifyContent:'center',        
    },
    textInput: {        
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').width * 0.1,
        fontSize: 20,
        color:'blue',
        marginRight: 12,
        paddingLeft:17,
        backgroundColor: 'whitesmoke',        
    },
    keyboard:{
        flex: 6,
        marginTop:-25,        
    },
    textStyle: {
        color: "white",        
        fontWeight: "bold",
        alignSelf:'center',                       
    },
    backButtom: {
        flex:2,
        // flexDirection:'column',
        backgroundColor: "blue",                              
        marginTop: 60,
        width: 200,
        maxHeight:30,
        borderRadius: 5,
        padding: 10,
        paddingBottom:35,       
      },
      viewWrongPasscode:{
        // marginBottom:-30
      },    
      textWrongPasscode:{       
        color:'red',
      }
});

// Modificar en la libreria

// VirtualKeyboard.js
// onPress(val) {		
//     if (this.state.text.length === 4) return this.setState({ text: '' });
//     if (this.props.pressMode === 'string') {
//         let curText = this.state.text;
//         if (isNaN(val)) {				
//             if (val === 'back') {
//                 curText = curText.slice(0, -1);
//             } else if (this.state.text < 9999) {
//                 curText += val;				
//             }
//         } else if (this.state.text < 9999) {
//             curText += val;								
//         }
//         this.setState({ text: curText });
//         this.props.onPress(curText);
//     } else /* if (props.pressMode == 'char')*/ {
//         this.props.onPress(val);
//     }
//     if (this.state.text.length === 3) this.setState({ text: '' });
// }


// VirtualKeyboard.styles.js
// import { StyleSheet, Dimensions, Platform } from 'react-native';
// const { height, width } = Dimensions.get('window');

// module.exports = StyleSheet.create({
// 	container: {
// 		marginTop: 20,
// 		marginLeft: 30,
// 		marginRight: 30,
// 		alignItems: 'flex-start',
// 	},
// 	row: {		
// 		flexDirection: 'row',		
// 		marginTop: 15,
// 	},
// 	number: {		
// 		fontSize: 15,
// 		color:'white',
// 		textAlign: 'center',		
// 	},
// 	backspace: {
// 		flex: 1,		
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		backgroundColor:'blue',
// 		marginRight:10,
// 		maxWidth: 75,		
// 		borderRadius: 100,
// 		color:'black',
// 	},
// 	cell: {		
// 		flex: 1,	
// 		borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
//         width: Dimensions.get('window').width * 0.2,
//         height: Dimensions.get('window').width * 0.1,	
// 		justifyContent: 'center',
// 		backgroundColor:'blue',		
// 		marginRight:10,		
// 	},
// });