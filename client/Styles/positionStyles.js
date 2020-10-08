import { StyleSheet } from "react-native";
import { Row } from "native-base";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    flexDirection: "column",
  },

  headerSection: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: 15,
    paddingTop: 25,
    paddingBottom: 25,
    backgroundColor: "#151515",
    width: "100%",
  },

  avatarSection: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  moneySection: {
    alignSelf: "center",
    marginBottom: 5,
    color: "whitesmoke",
  },

  cardPosition: {
    flex: 6.5,
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-around",
    paddingTop: 75,
    backgroundColor: 'whitesmoke'
  },

  menuOp: {
    flex: 1,
  },
  contentButton: {
    marginLeft: "50%",
  },
  nameSection: {
    justifyContent: "center",
    flex: 4,
    flexDirection: "column",
    paddingRight: 45,
  },
  buttonsView: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    justifyContent: "space-evenly",
  },
  sendMoneyButton: {
    flexDirection: "row",
    backgroundColor: "#151515",
    height: 50,
    width: 175,
    justifyContent: "center",
  },
  sendMoneyText: {
    alignSelf: "center",
    color: "whitesmoke",
  },
});
