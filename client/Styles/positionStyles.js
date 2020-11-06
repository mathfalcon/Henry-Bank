import { StyleSheet } from "react-native";

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
    color: "whitesmoke",
    fontFamily: "Poppins",
    fontSize: 23,
    textAlign: "right",
  },

  cardPosition: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#151515",
    alignSelf: 'center',
  },
  menuOp: {
    flex: 0.8,
    height: 60,
  },
  contentButton: {
    marginLeft: "50%",
  },
  nameSection: {
    justifyContent: "center",
  },
  buttonsView: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    flexWrap: "wrap",
    marginHorizontal: 45, 
  },
  sendMoneyButton: {
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: "#2D2D2D",
    height: 50,
    width: 150,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 12,
    },
    shadowOpacity: 0.9,
    shadowRadius: 12.35,

    elevation: 10,
  },
  sendMoneyText: {
    marginLeft: 5,
    alignSelf: "center",
    color: "whitesmoke",
    fontSize: 15
  },
  adminPanelText: {
    borderRadius: 10,
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: "#2D2D2D",
    height: 50,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 12,
    },
    shadowOpacity: 0.9,
    shadowRadius: 12.35,
    elevation: 10,
    width: '100%'
  },
  logoImg: {
    height: 100,
    width: 100,
    alignSelf: "center",
    borderRadius: 10,
  },
});
