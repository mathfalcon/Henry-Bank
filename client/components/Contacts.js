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
import { Avatar } from "react-native-elements";
import PhoneNumberInput from "./PhoneNumberInput";
import axios from "axios";
import { api } from "./Constants/constants";

export default Contacts = ({ navigation }) => {
  const [input, setInput] = useState({
    id: "",
    name: "",
    email: "",    
    phoneNumber: "",
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
    dispatch(getContactList(userLogged.id));
  }, []);

  useEffect(() => {    
    setListData(
      Array(1)
        .fill("")
        .map((_, i) => ({
          title: `Contacts`,
          data: userContacts.map((i) => ({
            email: `${i.user.email}`,
            alias: `${i.alias}`,
            value: i.is_contact_of,
            photo: i.user.documentPhoto,
            id: i.id
          })),
        }))
    );
  }, [userContacts]);

  const modifyRow = (rowMap, rowKey, id, email) => {    
    setInput({
      ...input,
      id: id,
      email: email,      
    });
    closeRow(rowMap, rowKey)
    setModify(true);
    setModalVisible(true);    
  };

  const deleteRow = (rowMap, rowKey, id) => {    
    Alert.alert(
      "DELETE CONTACT",
      "Delete this contact?",      
      [
        {
          text: "Yes, Delete",          
          onPress: () => {
            axios.delete(`${api}/contacts/delete/${id}`).then((response) => {                            
              if (response.data.success) {                                
                dispatch(getContactList(userLogged.id));                
                closeRow(rowMap, rowKey);
              } else {
                Alert.alert(
                  "Error",
                  "Something went wrong",
                  [
                    {
                      text: "Understood",
                      onPress: () => closeRow(rowMap, rowKey)
                    },
                  ],
                  { cancelable: false }
                );
              }
            });
          },
        },
        { text: "No, Leave it", onPress: () => closeRow(rowMap, rowKey) },
      ],
      { cancelable: false }
    );        
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
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
      <View style={{ alignSelf: "flex-start", flexDirection: "row" }}>
        <View style={{ flex: 0.5 }}>
          <Avatar
            size="large"
            source={{
              uri: `data:image/jpeg;base64,${data.item.photo}`,
            }}
            activeOpacity={0.7}
            containerStyle={{
              alignSelf: "center",
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="address-book"
              // onPress={() => navigation.navigate("myCards")}
              style={{ color: "black", fontSize: 20 }}
              type="FontAwesome5"
            />
            <Text style={{ paddingHorizontal: 15 }}>{data.item.alias}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="envelope"
              // onPress={() => navigation.navigate("myCards")}
              style={{ color: "black", fontSize: 17 }}
              type="FontAwesome5"
            />
            <Text style={{ paddingHorizontal: 15 }}>{data.item.email}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        onPress={() =>{
          closeRow(rowMap, data.item.key)
          navigation.navigate("sendMoney", {
            contact: data.item.email,
            userId: data.item.value,
            fromContacts: true,
          })
           }
        }
      >
        <Text style={{ color: "#ffff8b" }}>Send Money</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => modifyRow(rowMap, data.item.key, data.item.id, data.item.email)}
      >
        <Text style={styles.backTextBlack}>Modify</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key, data.item.id)}
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
        axios
        .put(`${api}/contacts/update/${input.id}`, {
          alias: input.name,
        })
        .then((response) => {
          if (response.data.success) {  
            Alert.alert("Success", response.data.message); 
            dispatch(getContactList(userLogged.id));
            setModalVisible(!modalVisible) 
            setInput({
              name: "",
              email: "",
              phoneNumber: "",
            }); 
          } else {              
            Alert.alert("Failure", response.data.message);                        
          }        
        })
        .catch( err => console.log( err ));
    
      } else {
        axios
          .post(`${api}/contacts/create`, {
            userId: userLogged.id,
            alias: input.name,
            emailOfContact: input.email,
          })
          .then((response) => {
            if (response.data.success) {              
              Alert.alert("Success", response.data.message);
              setInput({
                name: "",
                email: "",
                phoneNumber: "",
              });
              dispatch(getContactList(userLogged.id));
              setModalVisible(!modalVisible)             
            } else if (response.data.code === "not_client") {
              Alert.alert("Invite your contact", response.data.message, [
                {
                  text: "Maybe later",                  
                  onPress: () => {
                    setModalVisible(!modalVisible)
                  }
                },
                {
                  text: "Sounds good",
                  onPress: () => {
                    setModalVisible(!modalVisible);                    
                    navigation.navigate("invitation");
                  },
                },
              ]);
              setInput({
                name: "",
                email: "",
                phoneNumber: "",
              });
            } else {              
              Alert.alert("Failure", response.data.message);   
              dispatch(getContactList(userLogged.id));           
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={() => navigation.navigate("position")}>
            <Icon style={{ color: "black" }} name="arrow-back" />
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
        leftOpenValue={115}
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

                <Item floatingLabel>
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

                {/* <Item floatingLabel last>
                  <Label>Phone Number</Label>
                  <Input
                    name="phoneNumber"
                    value={input.phoneNumber}
                    onChangeText={(text) => handleChange("phoneNumber", text)}
                  />
                </Item>
                <PhoneNumberInput 
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChangeText={(text) => handleChange("phoneNumber", text)}
                />
                {error.phoneNumber && (
                  <Text style={styles.error}>Must fill this field</Text>
                )} */}

                <View style={styles.buttoms}>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#151515" }}
                    onPress={() => {
                      setInput({
                        name: "",
                        email: "",
                        phoneNumber: "",
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

      <View style={styles.menuOp}>
        <MenuOperation navigation={navigation} screen={"contacts"} />
      </View>
    </View>
  );
};
