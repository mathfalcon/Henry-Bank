import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Input,    
    Text,
    Textarea,
    Item,    
    View,
    Button,
    Body,    
    Card,
    CardItem,
    Picker,   
} from 'native-base';

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBox } from "react-native-elements";
import { verifyFunds, sendMoney } from "../redux/actions/accountActions";
import { getContactList } from "../redux/actions/contactsActions";
import styles from "../Styles/sendMoneyStyles.js";
import { Alert } from "react-native";

export default SendMoney = ({ navigation, route }) => {    
    
    const [selectContact, setSelectContact] = useState("");
    const [inputMoney, setInputMoney] = useState("");
    const [check, setCheck] = useState(false);
    const [error, setError] = useState(false);
    const [fromContacts, setFromContacts]  =  useState(false);   

    // const contacts = useSelector((state) => state.contacts);
    // const { funds, responseSent } = useSelector((state) => state.accountInfo);

    // const contactMail = route.params;
    // if ( contactMail ){
    //     console.log(contactMail);
    //     setSelectContact(contactMail);
    //     setFromContacts(true);
    // }
    
    const dispatch = useDispatch();

    // useEffect(() => 
    //     dispatch(getContactList()),
    //     dispatch(verifyFunds())
    // , []);

    const contacts = [
        { name: "Simon Mignolet", email: "mignolet@gmail.com" },
        { name: "Nathaniel Clyne", email: "clyne@gmail.com" },
        { name: "Dejan Lovren", email: "lovren@gmail.com" },
        { name: "Mama Sakho", email: "sakho@gmail.com" },
        { name: "Alberto Moreno", email: "moreno@gmail.com" },
        { name: "Emre Can", email: "can@gmail.com" },
        { name: "Joe Allen", email: "allen@gmail.com" },
        { name: "Phil Coutinho", email: "coutinho@gmail.com" },
      ]

    const handleSubmit = () => {
        
        if (inputMoney === '' || selectContact === '') return setError(true);
        
        setError(false);
        if ( inputMoney > funds ) return Alert.alert('Do not have funds enough')
        // dispatch(sendMoney())

        // responseSent ? true
        if ( true ) Alert.alert('Transaction done!')
        setInputMoney("");
        setSelectContact("");
    }

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView>
          <Text style={styles.title}>Send Money</Text>

                <View style={styles.picker}>
                    <Picker
                        mode="dropdown"
                        disabled={fromContacts}                                           
                        selectedValue={selectContact}
                        onValueChange={setSelectContact}
                        itemStyle={styles.pickerItem}                        
                    >                    
                    <Picker.Item label='Select a Contact...' value='' />                    
                    { contacts.map( (e, key) => (                        
                        <Picker.Item label={e.name} value={e.email} key={key} />                        
                    ))}                        
                    </Picker>
                </View>

          <Card style={styles.card}>
            <CardItem>
              <Body style={{ alignItems: "center" }}>

              {error && (
                  <Text style={styles.error}>Select a Contact and enter an ammount</Text>
              )}

                <Text style={styles.label}>Enter the ammount to send</Text>
                <Item rounded>
                    <Input
                        placeholder='Minimun $50'                        
                        keyboardType="numeric"
                        name="money"
                        value={inputMoney}
                        onChangeText={(value) => setInputMoney(value)}
                        style={styles.input}                        
                    />
                </Item>

                <Text style={styles.label}>Send a Messagge</Text>
                <Textarea style={styles.textArea} rowSpan={2} bordered placeholder="Messagge..." />
                <CheckBox                    
                    title="Send email to the contact"
                    checked={check}
                    onPress={() => setCheck(!check)}
                    style={styles.check}
                />

                <Button style={styles.buttom} dark block onPress={handleSubmit}>
                  <Text>SEND MONEY</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  };