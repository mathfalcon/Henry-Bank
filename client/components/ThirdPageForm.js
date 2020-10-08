import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../Styles/signInStyles.js";
import {
  Text,
  Form,
  Item,
  Input,
  Button,
  Container,
  Header,
  Left,
  Icon,
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
  const locationInfo = route.params.values;

  const [showPass, setShowPass] = useState(false);
  const [showconfirmPass, setShowconfirmPass] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);

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
        street: locationInfo.street,
        streetNumber: locationInfo.streetNumber,
        locality: locationInfo.locality,
        state: locationInfo.state,
        country: locationInfo.country,
        role: "client",
      };
      
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
      const errors = {};
      if (!/^(?=.*\d)(?=.*[A-Za-z])[A-Za-z0-9]{5,20}$/.test(values.password))
        errors.password = "Must contain: 5-20 digits, A-Z and a-z.";
      if (values.confirmPassword !== values.password || !values.confirmPassword)
        errors.confirmPassword = "Must the same password.";
      if (!values.passcode) errors.passcode = "Must be a valid passcode.";
      return errors;
    },
  });
  const [check, setCheck] = useState(false);

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
              <Title style={{ alignSelf: "center" }}>SECURITY INFO</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => navigation.navigate("home")}>
                <Text>Cancel</Text>
              </Button>
            </Right>
          </Header>

          <Form style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
            <Item error={errors.password ? true : false}>
              <Input
                secureTextEntry={!showPass}
                placeholder="Password"
                onBlur={handleBlur("password")}
                name="password"
                onChangeText={(text) => setFieldValue("password", text)}
                value={values.password}
              />
              <Icon
                type="Ionicons"
                name={showPass ? "eye" : "eye-off"}
                size={15}
                color="grey"
                onPress={() => setShowPass(!showPass)}
              />
            </Item>
            <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
              {touched.password && errors.password}
            </Text>
            <Item error={errors.confirmPassword ? true : false}>
              <Input
                secureTextEntry={!showconfirmPass}
                placeholder="Confirm Password"
                onBlur={handleBlur("confirmPassword")}
                name="confirmPassword"
                onChangeText={(text) => setFieldValue("confirmPassword", text)}
                value={values.confirmPassword}
              />
              <Icon
                type="Ionicons"
                name={showconfirmPass ? "eye" : "eye-off"}
                size={15}
                color="grey"
                onPress={() => setShowconfirmPass(!showconfirmPass)}
              />
            </Item>
            <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
              {touched.confirmPassword && errors.confirmPassword}
            </Text>
            <Item error={errors.passcode ? true : false}>
              <Input
                secureTextEntry={!showPasscode}
                placeholder="Passcode"
                onBlur={handleBlur("passcode")}
                name="passcode"
                onChangeText={(text) => setFieldValue("passcode", text)}
                value={values.passcode}
              />
              <Icon
                type="Ionicons"
                name={showPasscode ? "eye" : "eye-off"}
                size={15}
                color="grey"
                onPress={() => setShowPasscode(!showPasscode)}
              />
            </Item>
            <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
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
              disabled={Object.values(errors).length > 0 ? true : false}
              style={
                Object.values(errors).length > 0
                  ? styles.buttonDisabled
                  : styles.buttonEnabled
              }
              block
            >
              <Text>CREATE ACCOUNT</Text>
            </Button>
          </Form>
        </Container>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
