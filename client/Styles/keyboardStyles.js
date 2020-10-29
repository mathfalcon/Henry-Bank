import { StyleSheet } from "react-native";

// Aca estan los estilos del teclado
// client\node_modules\react-native-virtual-keyboard\src\VirtualKeyboard.style.js

export default StyleSheet.create({
  modalView: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff8b",
    width: "100%",
    padding: 25,
    paddingTop: 50
  },
  modalText: {
    color: "#151515",
    fontSize: 20,
    marginTop: 25,
    textAlign: "center",
  },
  inputs: {
    flex: 1.5,
    flexDirection: "row",
    width: 230,
    height: 500,
    // justifyContent:'center',
  },
  textInput: {
    // justifyContent:'center',
    // alignItems:'center',
    fontSize: 25,
    color: "whitesmoke",
    marginRight: 10,
    paddingLeft: 16,
    backgroundColor: "#151515",
    borderRadius: 15,
  },
  keyboard: {
    flex: 4,
    marginTop: -10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
  backButton: {
    // flexDirection:'column',
    backgroundColor: "#151515",
    width: 200,
    maxHeight: 30,
    borderRadius: 5,
    padding: 10,
    paddingBottom: 40,
  },
  backButtonView: {
    flex: 2,
  },
  logoImg: {
    height: 60,
    width: 60,
    alignSelf: "center",
    borderRadius: 10,
  },
  logoView:{
    marginBottom:30,
  },
  textWrongPasscode:{       
    color:'red',
  },
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
