import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Text,
  Textarea,
  Item,
  Button,
  Body,
  Card,
  CardItem,
  Picker,
  Icon,
  Header,
  Left,
  Right,
  Title,
  Form,
  Label,
  Footer,
} from "native-base";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBox } from "react-native-elements";
import { sendMoney } from "../redux/actions/accountActions";
import { getContactList } from "../redux/actions/contactsActions";
// import { getUserLogged } from "../redux/actions/authActions";
import styles from "../Styles/sendMoneyStyles.js";
import { Alert,View } from "react-native";
import { getUserLogged } from "../redux/actions/authActions";
import axios from "axios";
import { api } from "./Constants/constants";
import MenuOperation from "./MenuOperation";

export default SendMoney = ({ navigation, route }) => {
  const [selectContact, setSelectContact] = useState("");
  const [inputMoney, setInputMoney] = useState("");
  const [check, setCheck] = useState(false);
  const [error, setError] = useState(false);
  const [fromContacts, setFromContacts] = useState(false);
  const [message, setMessage] = useState("");
  const [passCode, setPassCode] = useState("");
  // const contacts = useSelector((state) => state.contacts);
  const userLogged = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params) {
      dispatch(getUserLogged());
      // console.log('from contact!')
      setSelectContact(route.params.contact);
      setFromContacts(true);
    }
  }, []);
  
  const userContacts = useSelector((state) => state.contacts.contacts);
  const handleSubmit = () => {
    if (inputMoney === "" || selectContact === "" || passCode === "") return setError(true);
    setError(false);

    if (inputMoney > Number(userLogged.user.account.balance))
      return Alert.alert("Do not have funds enough");

    axios
      .post(`${api}/transactions/${userLogged.user.id}/to/${selectContact}`, {
        amount: inputMoney,
        message: message,
        passcode: passCode.toString(),
      })
      .then((data) => {
        const response = data.data;
        setInputMoney("");
        setSelectContact("");
        setPassCode("");

        if (response.success) {
          Alert.alert(`${response.message}`);
          navigation.navigate("position");
        } else if (!response.success) {
          Alert.alert(`${response.message}`);
          navigation.navigate("position");
        } else {
          Alert.alert("Your transaction is being processed");
          navigation.navigate("position");
        }
      });
    // setInputMoney("");
    // setSelectContact("");
    // setPassCode("");
  };

  return (
    <KeyboardAwareScrollView style={{height: '100%', flex: 1}}>
      <View style={styles.main1}>
        <Header style={styles.header}>
          <Body
            style={{ flex: 1, flexDirection: "row", alignSelf: "flex-start" }}
          >
            <Button transparent onPress={() => {
                setError(false);
                setInputMoney("");
                setSelectContact("");
                setPassCode("");
                navigation.navigate("position");
                }
              }
            >
              <Icon style={{ color: "black" }} name="arrow-back" />
            </Button>
            <Title style={styles.headerTitle}>SEND MONEY</Title>
          </Body>
          <View style={styles.picker}>
            <Picker
              mode="dropdown"
              enabled={!fromContacts}
              selectedValue={selectContact}
              onValueChange={setSelectContact}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item
                label={
                  userContacts.length < 1
                    ? "You need at least one contact to send money"
                    : "Select a Contact..."
                }
                value=""
              />
              {userContacts.map((e, key) => (
                <Picker.Item label={e.alias} value={e.user.id} key={key} />
              ))}
            </Picker>
          </View>
          <Label style={{ textAlign: "center", paddingVertical: 5 }}>
            <Text>Select a contact</Text>
          </Label>
        </Header>
      </View>
      <View style={styles.main2}>
        {error && (
          <Text style={styles.error}>
            Please select a Contact and enter an amount
          </Text>
        )}
          <Item style={{ width: "100%" }}>
            <Input
              placeholder="Enter the amount to send (Minimum $10)"
              keyboardType="numeric"
              name="money"
              value={inputMoney}
              onChangeText={(value) => setInputMoney(value)}
              style={styles.input}
            />
          </Item>
          <Item style={{ height: 150 }}>
            <Input
              placeholder="Message"
              multiline={true}
              onChangeText={(value) => setMessage(value)}
            />
          </Item>
          <Item>
            <Input
              secureTextEntry={true}
              placeholder="Passcode"
              keyboardType="numeric"
              value={passCode}
              onChangeText={(value) => setPassCode(value)}
            />
          {error && (
            <Text style={styles.error}>
              PassCode is Required!
            </Text>
          )}
          </Item>
        <Button style={styles.buttom} dark block onPress={handleSubmit}>
          <Text>SEND MONEY</Text>
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};
