import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Tooltip } from "react-native-elements";
import { getUsers } from "../../redux/actions/actions";
import axios from "axios";
import { api } from "../Constants/constants";
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
  Form,
  Input,
  Label,
  Content,
} from "native-base";

import { SwipeListView } from "react-native-swipe-list-view";
import styles from "../../Styles/manageUserStyles";

export default ManageUsers = ({ navigation }) => {
  const [input, setInput] = useState({
    id: "",
    name: "",
    surname: "",
    docNumber: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState({
    name: false,
    surname: false,
    docNumber: false,
    email: false,
    phone: false,
  });

  const [listData, setListData] = useState();
  const [modalVisible, setModalVisible] = useState(false);  

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    let filterUsers = users.filter( user => user.email !== 'bankhenry@recharges.com');

    setListData(
      Array(1)
        .fill("")
        .map((_, i) => ({
          title: `Users`,
          data: filterUsers.map((i) => ({
            key: i.id,
            name: i.name,
            surname: i.surname,
            docNumber: i.docNumber,
            email: i.email,
            phone: i.phone,
            role: i.role,
            account: i.account,
          })),
        }))
    );
  }, [users]);

  const promoteRow = (rowMap, rowKey) => {
    Alert.alert(
      "PROMOTE USER",
      "Promote this user?",
      [
        {
          text: "Yes, Promote",
          onPress: () => {
            // dispatch(promoteUser(rowKey));
            axios.patch(`${api}/users/promote/${rowKey}`).then((response) => {
              if (response.data.success) {
                closeRow(rowMap, rowKey);
                dispatch(getUsers());
              } else {
                Alert.alert(
                  "Error",
                  "Something went wrong",
                  [
                    {
                      text: "Understood",
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

  const deleteRow = (rowMap, rowKey) => {
    Alert.alert(
      "DELETE USER",
      "Delete this user?",
      [
        {
          text: "Yes, Delete",
          // dispatch(deleteUser(rowKey));
          onPress: () => {
            axios.delete(`${api}/users/${rowKey}`).then((response) => {
              if (response.data.success) {
                closeRow(rowMap, rowKey);
                dispatch(getUsers());
              } else {
                Alert.alert(
                  "Error",
                  "Something went wrong",
                  [
                    {
                      text: "Understood",
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
      onPress={() => {
        setModalVisible(true);
        setInput({
          ...input,
          id: data.item.key,
          name: data.item.name,
          surname: data.item.surname,
          docNumber: data.item.docNumber,
          email: data.item.email,
          phone: data.item.phone,
        });
      }}
      style={styles.rowFront}
      underlayColor={"#AAA"}
    >
      <View style={{ alignSelf: "flex-start", marginLeft: 50 }}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Name:</Text>
          <Text style={{ fontStyle: "italic", color: "red" }}>
            {" "}
            {data.item.name} {data.item.surname}
          </Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Email:</Text>
          <Text style={{ fontStyle: "italic" }}> {data.item.email}</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Role:</Text>
          <Text style={{ fontStyle: "italic" }}> {data.item.role}</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Balance:</Text>
          <Text style={{ fontStyle: "italic" }}>
            {" "}
            ${data.item.account ? data.item.account.balance : null}
          </Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>CVU:</Text>
          <Text style={{ fontStyle: "italic" }}>
            {" "}
            ${data.item.account ? data.item.account.cvu : null}
          </Text>
        </Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>


      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => promoteRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextBlack}>Promote</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}
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

  const modifyUser = () => {
    const regex_email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (!input.name.trim()) return setError({ ...error, name: true });
    if (!input.surname.trim()) return setError({ ...error, surname: true });
    if (!input.docNumber.trim()) return setError({ ...error, docNumber: true });
    if (!input.phone.trim()) return setError({ ...error, phone: true });
    if (!input.email.trim() || !regex_email.test(input.email))
      return setError({ ...error, email: true });

    setError({
      name: false,
      surname: false,
      docNumber: false,
      email: false,
      phone: false,
    });

    if (
      !error.name &&
      !error.surname &&
      !error.docNumber &&
      !error.phone &&
      !error.email
    ) {
      const updateInfo = {
        email: input.email,
        docNumber: input.docNumber,
        name: input.name,
        surname: input.surname,
        phone: input.phone,
      };

      axios
        .put(`${api}/users/update/${input.id}`, updateInfo)
        .then((response) => {
          if (response.data.success) {
            Alert.alert("Se modifico el contacto");
            dispatch(getUsers());
            setModalVisible(false);
          } else {
            Alert.alert("Something went wrong");
          }
        })
        .catch((error) => Alert.alert("Something went wrong"));
    }
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        useSectionList
        sections={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        // renderSectionHeader={renderSectionHeader}
        disableRightSwipe
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
            <Text style={styles.modalText}>MODIFY USER</Text>
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
                  <Label>Surname</Label>
                  <Input
                    name="surname"
                    value={input.surname}
                    onChangeText={(text) => handleChange("surname", text)}
                  />
                </Item>
                {error.surname && (
                  <Text style={styles.error}>Must fill this field</Text>
                )}

                <Item floatingLabel>
                  <Label>Document Number</Label>
                  <Input
                    name="docNumber"
                    value={input.docNumber}
                    onChangeText={(text) => handleChange("docNumber", text)}
                  />
                </Item>
                {error.docNumber && (
                  <Text style={styles.error}>Must fill this field</Text>
                )}

                <Item floatingLabel>
                  <Label>Email</Label>
                  <Input
                    name="email"
                    value={input.email}
                    onChangeText={(text) => handleChange("email", text)}
                  />
                </Item>
                {error.email && (
                  <Text style={styles.error}>Must fill this field</Text>
                )}

                <Item floatingLabel>
                  <Label>Phone</Label>
                  <Input
                    name="phone"
                    value={input.phone}
                    onChangeText={(text) => handleChange("phone", text)}
                  />
                </Item>
                {error.phone && (
                  <Text style={styles.error}>Must fill this field</Text>
                )}

                <View style={styles.buttoms}>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#151515" }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      // setError(false);
                    }}
                  >
                    <Text style={styles.textStyle}>CANCEL</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#151515" }}
                    onPress={modifyUser}
                  >
                    <Text style={styles.textStyle}>MODIFY</Text>
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