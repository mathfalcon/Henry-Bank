import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from "../Styles/signInStyles.js";
import {  
  Text,
  Label,
  Form,  
  Item,  
  Input,
  Icon,
  Button,
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
} from "native-base";
import { CheckBox } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import { Alert } from "react-native";
import axios from "axios";
import { api } from "./Constants/constants";

export default ThirdPageForm = ({ route, navigation }) => {

  const personalInfo = route.params.personalInfo;
  const locationInfo = route.params.locationInfo;

  const [ initialState, setInitialState ] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [showconfirmPass, setShowconfirmPass] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [check, setCheck] = useState(false);

  const {
    values,
    isSubmitting,
    setFieldValue,
    handleSubmit,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {      
      password: "",
      confirmPassword: "",
      passcode: "",
      role: "client",
    },

    onSubmit: async (values) => {      

      const accountInfo = {
        email: personalInfo.email,
        password: values.password,
        passcode: values.passcode,
        docType: personalInfo.docType,
        docNumber: personalInfo.docNumber,
        name: personalInfo.name,
        surname: personalInfo.surname,
        birth: personalInfo.birth,
        phone: personalInfo.phone,
        street: locationInfo[1],
        streetNumber: locationInfo[0],
        locality: locationInfo[4],
        state: locationInfo[7],
        country: locationInfo[9],
        role: 'client',
      }

      // console.log('accountInfo',accountInfo);

      try {
        const response = await axios.post(`${api}/users/create`, accountInfo);
        response.data.success
          ? Alert.alert(
            "Complete",
            'Your account has been created successfully',
            [
              {
                text: "Understood",
                onPress: () => navigation.navigate("login")
              },
            ],
            { cancelable: false }
          )
          : Alert.alert(
              "Error",
              response.data.message,
              [
                {
                  text: "Understood",

                },
              ],
              { cancelable: false }
            );
      } catch (err) {
        Alert.alert(
          "Error",
          err,
          [
            {
              text: "Understood",
            },
          ],
          { cancelable: false }
        );
      }
    },
    
    validate: (values) => {

    setInitialState(false);
    const errors = {};    
      if (!/^(?=.*\d)(?=.*[A-Za-z])[A-Za-z0-9]{5,20}$/.test(values.password))
        errors.password = "Must contain: 5-20 digits, A-Z and a-z.";
      if (values.confirmPassword !== values.password || !values.confirmPassword)
        errors.confirmPassword = "Must the same password.";
      if (!values.passcode) errors.passcode = "Must be a valid passcode.";
      return errors;
    },
  });
  
  const confirmCancel = () =>{
    Alert.alert(
      "Cancel Registration",
      "Really want to cancel?",
      [
        {
          text: "Yes, I'll do it later",
          onPress: () => navigation.navigate("home"),
          style: "cancel"
        },
        { text: "No, I want to continue", onPress: () => console.log("") }        
      ],
      { cancelable: false }
    );
  }
  
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
                
      <Container>
          <Header>
          <Left>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
            <Title style={{alignSelf:'center'}}>SECURITY INFO</Title>
            </Body>
            <Right>
              <Button transparent onPress={confirmCancel}>
                <Text>Cancel</Text>
              </Button>
            </Right>
          </Header>  

          <Form style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          
          <Item floatingLabel error={ touched.password && errors.password ? true : false}>
          <Label>Password</Label>
            <Input
              secureTextEntry={!showPass}
              // placeholder="Password"
              onBlur={handleBlur("password")}
              name="password"
              onChangeText={(text) => setFieldValue("password", text)}
              value={values.password}
            />
            <Icon
                name={showPass ? 'eye' : 'eye-slash'}
                style={{color:"grey", fontSize:15}}
                type= "FontAwesome5"
                onPress={() => setShowPass(!showPass)}
          />
          </Item>
          <Text style={{marginBottom: -20, alignSelf:'center', color: "#e06d6d" }}>
            {touched.password && errors.password}
          </Text>
          
          <Item floatingLabel error={ touched.confirmPassword && errors.confirmPassword ? true : false}>
          <Label>Confirm Password</Label>
            <Input
              secureTextEntry={!showconfirmPass}
              // placeholder="Confirm Password"
              onBlur={handleBlur("confirmPassword")}
              name="confirmPassword"
              onChangeText={(text) => setFieldValue("confirmPassword", text)}
              value={values.confirmPassword}
            />
            <Icon
                name={showconfirmPass ? 'eye' : 'eye-slash'}
                style={{color:"grey", fontSize:15}}
                type= "FontAwesome5"                
                onPress={() => setShowconfirmPass(!showconfirmPass)}
            />
          </Item>
          <Text style={{marginBottom: -20, alignSelf:'center', color: "#e06d6d" }}>
            {touched.confirmPassword && errors.confirmPassword}
          </Text>

          <Item floatingLabel error={ touched.passcode && errors.passcode ? true : false}>
          <Label>Passcode</Label>
            <Input
              secureTextEntry={!showPasscode}
              // placeholder="Passcode"
              onBlur={handleBlur("passcode")}
              name="passcode"
              onChangeText={(text) => setFieldValue("passcode", text)}
              value={values.passcode}
            />
            <Icon
                name={showPasscode ? 'eye' : 'eye-slash'}
                style={{color:"grey", fontSize:15}}
                type= "FontAwesome5"               
                onPress={() => setShowPasscode(!showPasscode)}
          />
          </Item>
          <Text style={{marginBottom: 0, alignSelf:'center', color: "#e06d6d" }}>
            {touched.passcode && errors.passcode}
          </Text>

          <CheckBox
            center
            title="I accept the Terms of Use & Privacy Policy"
            checked={check}
            onPress={() => setCheck(!check)}
          />
          <Button
            onPress={handleSubmit}
            disabled={ initialState || !Object.values(errors).length === 0 ? true : false}
            block            
            style={ initialState
                  ?
                    styles.buttonDisabled
                  :
                    Object.values(errors).length === 0
                    ?
                      styles.buttonEnabled
                    :
                      styles.buttonDisabled
                  }
            >
            <Text>CREATE ACCOUNT</Text>
          </Button>
        </Form>
        </Container>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
