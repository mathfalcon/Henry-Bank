import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getLocation } from "../redux/actions/actions.js";
import styles from "../Styles/signInStyles.js";
import {  
  Text,
  Form,  
  Item,
  Icon,
  Input,  
  Button,
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from "react-native";

export default SecondPageForm = ({ route, navigation }) => {

  const { responseLocation } = useSelector((state) => state.users);
  const personalInfo = route.params;
  const dispatch = useDispatch();  

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
      country: "",
      state: "",
      locality: "",
      street: "",
      streetNumber: "",      
    },

    onSubmit: async (values) => {
      //Send values to database

    dispatch(getLocation( values.country, values.state, values.locality, values.street, values.streetNumber ));    
    let locationInfo = responseLocation.data[0].display_name.split(',');

    if ( responseLocation.status === 200 ) {

      Alert.alert(
        "Confirm Location",
        `Address: ${locationInfo[1]} ${locationInfo[0]}\nCity: ${locationInfo[4]}\nState: ${locationInfo[7]}\nCountry: ${locationInfo[9]}`,
        [
          {
            text: "Cancel",
            // onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => navigation.navigate("third", {personalInfo, locationInfo}) }
        ],
        { cancelable: false }
      );
    }
    
    },
    validate: (values) => {
      const errors = {};
      if (!values.country) errors.country = "Must be a valid country.";
      if (!values.state) errors.state = "Must be a valid state.";
      if (!values.locality) errors.locality = "Must be a valid locality.";
      if (!values.street) errors.street = "Must be a valid street.";
      if (!values.streetNumber) errors.streetNumber = "Must be a valid street number.";      
      return errors;
    },
  });  
  
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
            <Title style={{alignSelf:'center'}}>LOCATION INFO</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => navigation.navigate("home")}>
                <Text>Cancel</Text>
              </Button>
            </Right>
          </Header>        

          <Form style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          
          <Item error={errors.country ? true : false}>
            <Input
              placeholder="Country"
              onBlur={handleBlur("country")}
              name="country"
              onChangeText={(text) => setFieldValue("country", text)}
              value={values.country}
            />
            {!errors.country ? <Icon style={{color:'green'}} name='checkmark-circle' /> : <Icon style={{color:'red'}} name='close-circle' />}
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.country && errors.country}
          </Text>
          <Item error={errors.state ? true : false}>
            <Input
              placeholder="State"
              onBlur={handleBlur("state")}
              name="state"
              onChangeText={(text) => setFieldValue("state", text)}
              value={values.state}
            />
            {!errors.state ? <Icon style={{color:'green'}} name='checkmark-circle' /> : <Icon style={{color:'red'}} name='close-circle' />}
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.state && errors.state}
          </Text>
          <Item error={errors.locality ? true : false}>
            <Input
              placeholder="Locality"
              onBlur={handleBlur("locality")}
              name="locality"
              onChangeText={(text) => setFieldValue("locality", text)}
              value={values.locality}
            />
            {!errors.locality ? <Icon style={{color:'green'}} name='checkmark-circle' /> : <Icon style={{color:'red'}} name='close-circle' />}
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.locality && errors.locality}
          </Text>
          <Item error={errors.street ? true : false}>
            <Input
              placeholder="Street"
              onBlur={handleBlur("street")}
              name="street"
              onChangeText={(text) => setFieldValue("street", text)}
              value={values.street}
            />
            {!errors.street ? <Icon style={{color:'green'}} name='checkmark-circle' /> : <Icon style={{color:'red'}} name='close-circle' />}
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.street && errors.street}
          </Text>
          <Item error={errors.streetNumber ? true : false}>
            <Input
              placeholder="Street Number"
              onBlur={handleBlur("streetNumber")}
              name="streetNumber"
              onChangeText={(text) => setFieldValue("streetNumber", text)}
              value={values.streetNumber}
            />
            {!errors.streetNumber ? <Icon style={{color:'green'}} name='checkmark-circle' /> : <Icon style={{color:'red'}} name='close-circle' />}
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.streetNumber && errors.streetNumber}
          </Text>
          
          <Button
            onPress={handleSubmit}
            disabled={Object.values(errors).length > 0 ? true : false}
            style={Object.values(errors).length > 0 ? styles.buttonDisabled : styles.buttonEnabled}
            block            
          >
            <Text>CONTINUAR</Text>
          </Button>
        </Form>
        </Container>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};