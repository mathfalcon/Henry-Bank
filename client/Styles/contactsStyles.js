import { StyleSheet } from 'react-native';

export default StyleSheet.create({

   container: {
       backgroundColor: 'white',
       flex: 1,
   },
   backTextWhite: {
       color: '#FFF',
   },
   rowFront: {
       alignItems: 'center',
       backgroundColor: '#CCC',
       borderBottomColor: 'black',
       borderBottomWidth: 1,
       justifyContent: 'center',
       height: 50,
   },
   rowBack: {
       alignItems: 'center',
       backgroundColor: '#DDD',
       flex: 1,
       flexDirection: 'row',
       justifyContent: 'space-between',
       paddingLeft: 15,
   },
   backRightBtn: {
       alignItems: 'center',
       bottom: 0,
       justifyContent: 'center',
       position: 'absolute',
       top: 0,
       width: 75,
   },
   backRightBtnLeft: {
       backgroundColor: 'blue',
       right: 75,
   },
   backRightBtnRight: {
       backgroundColor: 'red',
       right: 0,
   },
   textAddContact:{
       fontSize:12,
       color:'white',
       alignSelf:'flex-end',
       marginRight:5,       
    },

    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',        
        justifyContent: "center",
        alignItems: "center",        
      },
      modalView: {                
        height: 300,
        width: 300,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,        
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      buttoms:{              
        flexDirection: 'row',
        flex: 1,             
      },
      openButton: {
        backgroundColor: "#F194FF",
        flex: .5,
        margin: 5,
        marginTop:15,
        borderRadius: 5,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",       
      },
      modalText: {
        marginBottom: -10,
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
      },
      error:{        
        alignSelf:"center",
        color: "red",
        fontSize: 15,
      }
});