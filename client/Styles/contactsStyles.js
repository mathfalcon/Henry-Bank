import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
    flex: 1,
  },
  header: {
    backgroundColor: "#ffff57",
    display: "flex",
  },
  headerTitle: {
    color: "black",
    alignSelf: "center",
    width: "100%",
  },
  backTextWhite: {
    color: "white",
  },
  backTextBlack: {
    color: "black",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "whitesmoke",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 100,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#151515",
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "whitesmoke",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "#151515",
    right: 0,
    
  },
  textAddContact: {
    fontSize: 12,
    color: "white",
    alignSelf: "flex-end",
    marginRight: 5,
    color: "black",
  },

  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: 300,
    width: 300,
    backgroundColor: "whitesmoke",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttoms: {
    flexDirection: "row",
    flex: 1,
  },
  openButton: {
    color: "black",
    flex: 0.5,
    margin: 5,
    marginTop: 15,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    color: "#ffff57",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: -10,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  error: {
    alignSelf: "center",
    color: "red",
    fontSize: 15,
  },
});
