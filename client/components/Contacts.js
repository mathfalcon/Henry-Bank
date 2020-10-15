import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getContactList,
  addContact,
  deleteContact,
  modifyContact,
} from "../redux/actions/contactsActions";
import {
  TouchableOpacity,
  TouchableHighlight,
  View,
  Alert,
  Modal,
} from "react-native";
import {
  Text,
  Item,
  Icon,
  Form,
  Input,
  Label,
  Content,
  Button,
  Header,
  Left,
  Body,
  Right,
  Title,
} from "native-base";

// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { SafeAreaView } from "react-native-safe-area-context";
import { SwipeListView } from "react-native-swipe-list-view";
import styles from "../Styles/contactsStyles";

export default Contacts = ({ navigation }) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    id: "",
  });
  const [error, setError] = useState({
    name: false,
    email: false,
  });
  const [listData, setListData] = useState();
  const [modify, setModify] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.auth.user);
  const userContacts = useSelector((state) => state.contacts.contacts);

  useEffect(() => {
    setListData(
      Array(1)
        .fill("")
        .map((_, i) => ({
          title: `Contacts`,
          data: userContacts.map((i) => ({
            key: `${i.user.email}`,
            text: `${i.alias}`,
            value: i.id,
          })),
        }))
    );
  }, []);

  useEffect(() => {
    dispatch(getContactList(userLogged.id));
  }, []);

  const closeRow = (rowMap, rowKey, id) => {
    setInput({
      ...input,
      email: rowKey,
      id: id,
    });
    setModify(true);
    setModalVisible(true);
    // console.log("rowKeymodify", rowKey);
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = async (rowMap, rowKey, id) => {
    await dispatch(deleteContact(id));
    dispatch(getContactList(userLogged.id));
    navigation.navigate("position");
  };

  const onRowDidOpen = (rowKey) => {
    // console.log("This row opened", rowKey);
  };

  const renderItem = (data) => (
    <TouchableHighlight
      // onPress={() => console.log("You touched me")}
      style={styles.rowFront}
      underlayColor={"#AAA"}
    >
      <View style={{ alignSelf: "flex-start", marginLeft: 50 }}>
        <Text>Contact: {data.item.text}</Text>
        <Text>Email: {data.item.key}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("sendMoney", {
            contact: data.item.key,
            fromContacts: true,
          })
        }
      >
        <Text>Send Money</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key, data.item.value)}
      >
        <Text style={styles.backTextWhite}>Modify</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key, data.item.value)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  // const renderSectionHeader = ({ section }) => <Text>{section.title}</Text>;

  const handleChange = (name, value) => {
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleContact = () => {
    const regex_email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (!input.name.trim()) return setError({ ...error, name: true });
    if (!input.email.trim() || !regex_email.test(input.email))
      return setError({ ...error, email: true });
    setError({
      name: false,
      email: false,
    });

    if (!error.name && !error.email) {
      if (modify) {
        dispatch(modifyContact(input.name, input.id));
      } else {
        dispatch(addContact(input.name, input.email, userLogged.id));
      }
      Alert.alert("Se agrego el nuevo contacto");
      dispatch(getContactList(userLogged.id));
      navigation.navigate("position");
    }
  };

  return (
    <View style={styles.container}>
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={() => navigation.navigate("position")}>
            <Icon style={{ color: "black" }} name="arrow-back" />
            {/* <Text>Back</Text> */}
          </Button>
        </Left>
        <Body>
          <Title style={styles.headerTitle}>CONTACTS</Title>
        </Body>
        <Right>
          <Button
            iconRight
            transparent
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textAddContact}>Add Contact</Text>

            <Icon
              name="user-plus"
              type="FontAwesome5"
              style={{ color: "black" }}
              // onPress={() => setShowconfirmPass(!showconfirmPass)}
            />
          </Button>
        </Right>
      </Header>

      <SwipeListView
        useSectionList
        sections={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        // renderSectionHeader={renderSectionHeader}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Close modal first");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {!modify ? "Add New Contact" : "Modify Contact Name"}
            </Text>
            <Content>
              <Form>
                <Item floatingLabel>
                  <Label>Name</Label>
                  <Input
                    name="name"
                    value={input.name}
                    onChangeText={(text) => handleChange("name", text)}
                  />
                </Item>
                {error.name && (
                  <Text style={styles.error}>Must fill this field</Text>
                )}

                <Item floatingLabel last>
                  <Label>Email</Label>
                  <Input
                    disabled={modify}
                    name="email"
                    value={input.email}
                    onChangeText={(text) => handleChange("email", text)}
                  />
                </Item>
                {error.email && (
                  <Text style={styles.error}>Enter a valid Email</Text>
                )}

                <View style={styles.buttoms}>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#151515" }}
                    onPress={() => {
                      setInput({
                        name: "",
                        email: "",
                      });
                      setError(false);
                      setModify(false);
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>CANCEL</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#151515" }}
                    onPress={handleContact}
                  >
                    <Text style={styles.textStyle}>
                      {!modify ? "ADD" : "MODIFY"}
                    </Text>
                  </TouchableHighlight>
                </View>
              </Form>
            </Content>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Se debe incluir las siguientes funcionalidades:

// Asociar Contacto: dar de alta un nuevo contacto cargando su nombre y mail: Validar que el nuevo contacto es cliente de Henry Bank por su mail.

// Modificar Contacto: poder cambiar el nombre solamente del contacto.

// Eliminar Contacto: dar de baja en contacto.
