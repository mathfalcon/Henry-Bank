import { StyleSheet } from "react-native";

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
        // justifyContent:'center',
        // alignItems:'center',
        fontSize: 25,
        color:'blue',
        marginRight: 10,
        paddingLeft:16,
        backgroundColor: 'whitesmoke',
        borderRadius:100,
    },
    keyboard:{
        flex: 6,
        marginTop:-10,        
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
        marginTop: 50,
        width: 200,
        maxHeight:30,
        borderRadius: 5,
        padding: 10, 
        paddingBottom:35,       
      },
});

// Modificar en la libreria

// VirtualKeyboard.js
// onPress(val) {
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
// 		fontSize: 30,
// 		color:'white',
// 		textAlign: 'center',		
// 	},
// 	backspace: {
// 		flex: 1,		
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		backgroundColor:'blue',
// 		marginRight:15,
// 		maxWidth: 75,		
// 		borderRadius: 100,
// 		color:'black',
// 	},
// 	cell: {		
// 		flex: 1,		
// 		justifyContent: 'center',
// 		backgroundColor:'blue',
// 		maxWidth: 75,
// 		marginRight:10,
// 		borderRadius: 100,
// 	},
// });