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
    Icon,
    Header,
    Left,  
    Right,
    Title,
} from 'native-base';

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBox } from "react-native-elements";
import { sendMoney } from "../redux/actions/accountActions";
import { getContactList } from "../redux/actions/contactsActions";
// import { getUserLogged } from "../redux/actions/authActions";
import styles from "../Styles/sendMoneyStyles.js";
import { Alert } from "react-native";

export default SendMoney = ({ navigation, route }) => {    
    
    const [selectContact, setSelectContact] = useState("");
    const [inputMoney, setInputMoney] = useState("");
    const [check, setCheck] = useState(false);
    const [error, setError] = useState(false);
    const [fromContacts, setFromContacts]  =  useState(false);   

    // const contacts = useSelector((state) => state.contacts);
    const { responseSent } = useSelector((state) => state.accountInfo);
    const userLogged = useSelector((state) => state.auth);

    const dispatch = useDispatch();    
    
    
    useEffect(()=>{
      if(route.params){
        // console.log('from contact!')
        setSelectContact(route.params.contact)
        setFromContacts(true)
      }
    }, [])

    // useEffect(() => 
        // dispatch(getUserLogged())
        // dispatch(getContactList())
        // dispatch(verifyFunds())                
    // , []);

    const userContacts = useSelector((state) => state.contacts.contacts);
    const handleSubmit = () => {
        
        if (inputMoney === '' || selectContact === '') return setError(true);    
        
        setError(false);
        if ( inputMoney > userLogged.user.account.balance ) return Alert.alert('Do not have funds enough')

        // dispatch(sendMoney( userLogged.user.id, selectContact.id ))
        
        if (responseSent.success === true) {
            Alert.alert(`${responseSent.message}`);            
        } else if ( responseSent.success === false) {
            Alert.alert(`${responseSent.message}`);
          } else {
            Alert.alert("Su transaccion esta siendo procesada");
        }        

        setInputMoney("");
        setSelectContact("");
    }

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView>
          {/* <Text style={styles.title}>Send Money</Text> */}
          <Header style={styles.header}>
            <Left>
              <Button transparent onPress={() => navigation.navigate("position")}>
                <Icon style={{ color: "black" }} name="arrow-back" />
                {/* <Text>Back</Text> */}
              </Button>
            </Left>
            <Body>
            <Title style={styles.headerTitle}>SEND MONEY</Title>
            </Body>
            <Right />        
          </Header>

            <View style={styles.picker}>
                <Picker
                    mode="dropdown"
                    enabled={!fromContacts}                                        
                    selectedValue={selectContact}
                    onValueChange={setSelectContact}
                    itemStyle={styles.pickerItem}                        
                >                    
                <Picker.Item label={userContacts.length < 1 ? 'You need at least one contact to send money': 'Select a Contact...'} value='' />                    
                { userContacts.map( (e, key) => (                        
                    <Picker.Item label={e.alias} value={e.user.email} key={key} />                        
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