import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../Styles/signInStyles.js";
import {  
  Text,
  Form,  
  Item,
  Icon,
  Input,
  Picker,
  Button,
  DatePicker,
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

export default FirstPageForm = ({ navigation }) => {

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
      name: "",
      surname: "",
      docType: "",
      docNumber: "",
      birth: "",
      phone: "",
      email: "",
    },

    onSubmit: (values) => {

        navigation.navigate("second", values);
    },
    validate: (values) => {

      const  mayority = ( birth ) => {
        var today = new Date();
        var birthDate = new Date(birth);
        var age = today.getFullYear() - birthDate.getFullYear();        
        if ( age < 16 ) return false;          
        return true;
      }  

      const errors = {};
      if (values.name.length <= 2) errors.name = "Must be a valid name";
      if (values.surname.length <= 2)
        errors.surname = "Must be a valid surname";
      if (!/^(?=.*\d)[0-9]{8,10}$/.test(values.docNumber))
        errors.docNumber = "Must be a valid document number";
      if (values.phone.length <= 10)
        errors.phone = "Must be a valid phone number";
      if (!values.birth || !mayority(values.birth) ) errors.birth = "Must be over 18 years old";
      if (
        !values.email.trim() ||
        !/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(values.email)
      )
        errors.email = "Must be a valid email.";
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
              <Title style={{alignSelf:'center'}}>PERSONAL INFO</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => navigation.navigate("home")}>
                <Text>Cancel</Text>
              </Button>
            </Right>
          </Header>        

        <Form style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <Item error={errors.name ? true : false}>
            <Input
              placeholder="Name"
              onBlur={handleBlur("name")}
              name="name"
              onChangeText={(text) => setFieldValue("name", text)}
              value={values.name}
              style={{marginVertical: 0}}               
            />
            {!errors.name ? <Icon style={{color:'green'}} name='checkmark-circle' /> : <Icon style={{color:'red'}} name='close-circle' />}
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.name && errors.name}
          </Text>
          <Item error={errors.surname ? true : false}>
            <Input
              placeholder="Surname"
              onBlur={handleBlur("surname")}
              name="surname"
              onChangeText={(text) => setFieldValue("surname", text)}
              value={values.surname}
              style={{marginVertical: -5}}               
            />
            {!errors.surname ? <Icon style={{color:'green'}} name='checkmark-circle' /> : <Icon style={{color:'red'}} name='close-circle' />}
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.surname && errors.surname}
          </Text>
          <Item>
            <Picker
              onValueChange={(value) => setFieldValue("docType", value)}
              selectedValue={values.docType}
              style={{marginVertical: -10}}
            >
              <Picker.Item label="DNI" value="dni" />
              <Picker.Item label="Passport" value="passport" />
            </Picker>
          </Item>
          <Item error={errors.docNumber ? true : false}>
            <Input
              placeholder="Document Number"
              onBlur={handleBlur("docNumber")}
              name="docNumber"
              onChangeText={(text) => setFieldValue("docNumber", text)}
              value={values.docNumber}
              style={{marginVertical: 5}}                
            />
            {!errors.docNumber ? <Icon style={{color:'green'}} name='checkmark-circle' /> : <Icon style={{color:'red'}} name='close-circle' />}
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.docNumber && errors.docNumber}
          </Text>
          <Item error={errors.birth ? true : false}>
            <DatePicker              
              defaultDate={new Date(2020, 6, 6)}
              maximumDate={new Date(2020, 6, 6)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select birthdate"
              textStyle={{ color: "black" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={(date) =>
                setFieldValue("birth", date.toString().substr(4, 12))
              }
              disabled={false}
            />
            <Text>Date: {values.birth}</Text>            
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.birth && errors.birth}
          </Text>          
          <Item error={errors.phone ? true : false}>
            <Input
              placeholder="Phone Number"
              onBlur={handleBlur("phone")}
              name="phone"
              onChangeText={(text) => setFieldValue("phone", text)}
              value={values.phone}
              style={{marginVertical: -5}}               
            />
            {!errors.phone ? <Icon style={{color:'green'}} name='checkmark-circle' /> : <Icon style={{color:'red'}} name='close-circle' />}
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.phone && errors.phone}
          </Text>
          <Item error={errors.email ? true : false}>
            <Input
              placeholder="Email"
              onBlur={handleBlur("email")}
              name="email"
              onChangeText={(text) => setFieldValue("email", text)}
              value={values.email}
              style={{marginVertical: -5}}               
            />
            {!errors.email ? <Icon style={{color:'green'}} name='checkmark-circle' /> : <Icon style={{color:'red'}} name='close-circle' />}
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.email && errors.email}
          </Text>
          
          <Button
            onPress={handleSubmit}
            disabled={Object.values(errors).length > 0 ? true : false}
            block            
            style={Object.values(errors).length > 0 ? styles.buttonDisabled : styles.buttonEnabled}
          >
            <Text>CONTINUAR</Text>
          </Button>
        </Form>
        </Container>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};