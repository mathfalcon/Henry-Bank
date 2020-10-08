import { StyleSheet } from "react-native";
import { Row } from "native-base";

export default StyleSheet.create({
    container: {
        flex: 15,
        backgroundColor: '#fff',
        height: 300,
        backgroundColor: "#eef0f2",
        flexDirection: "column",
        justifyContent: 'center',
    },

    headerSection: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: "space-between",
        marginHorizontal: 25,
        paddingTop: 5,
        paddingBottom: 30,
    },

    avatarSection: {
        marginTop:30,
        flexDirection: 'column',
        backgroundColor:"#6d756d",
        paddingTop:5,
    },

    textAvatar: {
        marginBottom: 65,
        color:"white",
        paddingLeft:20,
        paddingRight:20
    },


    moneySection: {
        alignSelf: 'center',
    },

    cardPosition: {
        flex: 6,
        padding: 25,
    },

    menuOp: {
        flex: 1,
    },

    transaction: {
        flex: 1,
        paddingBottom: 30,
    },
    contentButton: {
        marginLeft: "50%"
    },
    buttonLogOut: {
        borderRadius: 10,
        backgroundColor: 'dodgerblue',
        borderWidth: 1,
        borderColor: "white",
        width: "50%",
    },
});