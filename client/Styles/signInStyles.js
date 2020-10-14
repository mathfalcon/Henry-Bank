import { AppLoading } from "expo";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
      buttonEnabled: {
        marginTop: 6,
        marginBottom: 20,
        marginHorizontal: 20,
      },
      buttonDisabled: {
        borderRadius: 5,
        marginTop: 10,
        opacity:.5,        
        marginBottom: 20,
        marginHorizontal: 20
    },
    header: {
      backgroundColor: '#ffff57',
      display: 'flex'
    },
    headerTitle: {
      color:'black',
      alignSelf: 'center',
      width: '100%',
    },
    headerText: {
      color:'black'
    },
    logoView:{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoViewText: {
      paddingTop: 15
    },
    form: {
      paddingHorizontal: 20, 
    },
    formItem: {
      marginVertical: 20,
      padding: 5
    },
    logoImg: {
      marginTop: 40,

      height: 60,
      width: 60,
      alignSelf: "center",
      borderRadius: 10,
    }
  });