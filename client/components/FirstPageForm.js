import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../Styles/signInStyles.js";
import {
  Text,
  Label,
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
import { Alert } from "react-native";

export default FirstPageForm = ({ navigation }) => {
  const [initialState, setInitialState] = useState(true);
  const [focus, setFocus] = useState({
    name: false,
    surname: false,
    docNumber: false,
    birth: false,
    phone: false,
    email: false,
  });

  const {
    values,
    isSubmitting,
    setFieldValue,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    handleChange,
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
      setInitialState(false);
      const errors = {};
      const mayority = (birth) => {
        var today = new Date();
        var birthDate = new Date(birth);
        var age = today.getFullYear() - birthDate.getFullYear();
        if (age < 16) return false;
        return true;
      };

      if (values.name.length <= 2) errors.name = "Must be a valid name";
      if (values.surname.length <= 2)
        errors.surname = "Must be a valid surname";
      if (!/^(?=.*\d)[0-9]{8,10}$/.test(values.docNumber))
        errors.docNumber = "Must be a valid document number";
      if (values.phone.length <= 10)
        errors.phone = "Must be a valid phone number";
      if (!values.birth || !mayority(values.birth))
        errors.birth = "Must be over 18 years old";
      if (
        !values.email.trim() ||
        !/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(values.email)
      )
        errors.email = "Must be a valid email.";
      return errors;
    },
  });

  const confirmCancel = () => {
    Alert.alert(
      "Cancel Registration",
      "Really want to cancel?",
      [
        {
          text: "Yes, I'll do it later",
          onPress: () => navigation.navigate("home"),
          style: "cancel",
        },
        { text: "No, I want to continue", onPress: () => console.log("") },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={{ alignSelf: "center" }}>PERSONAL INFO</Title>
            </Body>
            <Right>
              <Button transparent onPress={confirmCancel}>
                <Text>Cancel</Text>
              </Button>
            </Right>
          </Header>

          <Form style={{ paddingHorizontal: 20 }}>
            <Item
              floatingLabel
              error={touched.name && errors.name ? true : false}
            >
              <Label>Name</Label>
              <Input
                // placeholder="Name"
                onBlur={handleBlur("name")}
                name="name"
                onChangeText={handleChange("name")}
                onFocus={() =>
                  setFocus({
                    name: true,
                    surname: false,
                    docNumber: false,
                    birth: false,
                    phone: false,
                    email: false,
                  })
                }
                value={values.name}
                // style={{marginVertical: -5}}
                // placeholderTextColor={focus.name ? 'red' : 'blue'}
                // placeHolderTextStyle={}
                // placeHolderText={{marginVertical:100}}
              />

              {touched.name && !errors.name ? (
                <Icon style={{ color: "green" }} name="checkmark-circle" />
              ) : touched.name && errors.name ? (
                <Icon style={{ color: "red" }} name="close-circle" />
              ) : null}
            </Item>
            <Text
              style={{
                marginBottom: -20,
                alignSelf: "center",
                color: "#e06d6d",
              }}
            >
              {touched.name && errors.name}
            </Text>

            <Item
              floatingLabel
              error={touched.surname && errors.surname ? true : false}
            >
              <Label>Surname</Label>

              <Input
                // placeholder="Surname"
                onBlur={handleBlur("surname")}
                name="surname"
                onChangeText={handleChange("surname")}
                onFocus={() =>
                  setFocus({
                    name: false,
                    surname: true,
                    docNumber: false,
                    birth: false,
                    phone: false,
                    email: false,
                  })
                }
                value={values.surname}
              />

              {touched.surname && !errors.surname ? (
                <Icon style={{ color: "green" }} name="checkmark-circle" />
              ) : touched.surname && errors.surname ? (
                <Icon style={{ color: "red" }} name="close-circle" />
              ) : null}
            </Item>
            <Text
              style={{
                marginBottom: -20,
                alignSelf: "center",
                color: "#e06d6d",
              }}
            >
              {touched.surname && errors.surname}
            </Text>

            <Item>
              <Picker
                onValueChange={(value) => {
                  if (value !== 0) setFieldValue("docType", value);
                }}
                selectedValue={values.docType}
                style={{ marginVertical: -10 }}
              >
                <Picker.Item
                  label="Please select a document type..."
                  value="0"
                />
                <Picker.Item label="DNI" value="dni" />
                <Picker.Item label="Passport" value="passport" />
              </Picker>
            </Item>

            <Item
              floatingLabel
              error={touched.docNumber && errors.docNumber ? true : false}
            >
              <Label>Document Number</Label>
              <Input
                // placeholder="Document Number"
                onBlur={handleBlur("docNumber")}
                name="docNumber"
                onChangeText={handleChange("docNumber")}
                onFocus={() =>
                  setFocus({
                    name: false,
                    surname: false,
                    docNumber: true,
                    birth: false,
                    phone: false,
                    email: false,
                  })
                }
                value={values.docNumber}
              />

              {touched.docNumber && !errors.docNumber ? (
                <Icon style={{ color: "green" }} name="checkmark-circle" />
              ) : touched.docNumber && errors.docNumber ? (
                <Icon style={{ color: "red" }} name="close-circle" />
              ) : null}
            </Item>
            <Text
              style={{
                marginBottom: -20,
                alignSelf: "center",
                color: "#e06d6d",
              }}
            >
              {touched.docNumber && errors.docNumber}
            </Text>

            <Item
              style={{ marginTop: 10, marginBottom: 0 }}
              error={touched.birth && errors.birth ? true : false}
            >
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
            <Text
              style={{
                marginBottom: -20,
                alignSelf: "center",
                color: "#e06d6d",
              }}
            >
              {touched.birth && errors.birth}
            </Text>

            <Item
              floatingLabel
              error={touched.phone && errors.phone ? true : false}
            >
              <Label>Phone Number</Label>
              <Input
                // placeholder="Phone Number"
                onBlur={handleBlur("phone")}
                onFocus={() =>
                  setFocus({
                    name: false,
                    surname: false,
                    docNumber: false,
                    birth: false,
                    phone: true,
                    email: false,
                  })
                }
                name="phone"
                onChangeText={handleChange("phone")}
                value={values.phone}
              />

              {touched.phone && !errors.phone ? (
                <Icon style={{ color: "green" }} name="checkmark-circle" />
              ) : touched.phone && errors.phone ? (
                <Icon style={{ color: "red" }} name="close-circle" />
              ) : null}
            </Item>
            <Text
              style={{
                marginBottom: -20,
                alignSelf: "center",
                color: "#e06d6d",
              }}
            >
              {touched.phone && errors.phone}
            </Text>

            <Item
              floatingLabel
              error={touched.email && errors.email ? true : false}
            >
              <Label>Email</Label>
              <Input
                // placeholder="Email"
                onBlur={handleBlur("email")}
                name="email"
                onChangeText={handleChange("email")}
                onFocus={() =>
                  setFocus({
                    name: false,
                    surname: false,
                    docNumber: false,
                    birth: false,
                    phone: false,
                    email: true,
                  })
                }
                value={values.email}
              />
              {touched.email && !errors.email ? (
                <Icon style={{ color: "green" }} name="checkmark-circle" />
              ) : touched.email && errors.email ? (
                <Icon style={{ color: "red" }} name="close-circle" />
              ) : null}
            </Item>
            <Text
              style={{ marginBottom: 0, alignSelf: "center", color: "#e06d6d" }}
            >
              {touched.email && errors.email}
            </Text>

            <Button
              onPress={handleSubmit}
              disabled={
                initialState || !Object.values(errors).length === 0
                  ? true
                  : false
              }
              block
              style={
                initialState
                  ? styles.buttonDisabled
                  : Object.values(errors).length === 0
                  ? styles.buttonEnabled
                  : styles.buttonDisabled
              }
            >
              <Text>CONTINUAR</Text>
            </Button>
          </Form>
        </Container>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
