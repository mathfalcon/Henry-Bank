import React, { useState } from "react";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Text,
  Form,
  Label,
  Item,
  Input,
  Picker,
  Button,
  DatePicker,
} from "native-base";
import { CheckBox } from "react-native-elements";
import CustomButton from "./customButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Image } from "react-native";
import axios from "axios";
import { api } from "./Constants/constants";
import styles from '../Styles/logInStyles';

export default SignupForm = ({ navigation }) => {
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
      user: "",
      password: "",
    },
    onSubmit: async (values) => {
      //Send values to database
      try {
        const response = await axios.post(`${api}/auth/login`, {email: values.user, password: values.password});
        response.data.success
          ? Alert.alert(
            "Success",
            'Your have logged in succesfully, you will now see your account details',
            [
              {
                text: "Understood",
                onPress: () => navigation.navigate("position")
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
      if (values.user.length <= 2) errors.user = "The user is invalid";
      if (values.password.length <= 2)
        errors.password = "You must enter the password";
      return errors;
    },
  });
  
  return (
    <SafeAreaView>
        <Image
          style={styles.imagen}
          source={require("../image/headerRegistro.png")}
        />
        <Text style={styles.titulo}>Log In</Text>
      <KeyboardAwareScrollView>
        <Form style={{ padding: 18 }}>
          <Item error={errors.user ? true : false}>
            <Input
              placeholder="Email"
              onBlur={handleBlur("user")}
              name="user"
              onChangeText={(text) => setFieldValue("user", text)}
              value={values.user}
            />
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.user && errors.user}
          </Text>

          <Item error={errors.password ? true : false}>
            <Input
              placeholder="Password"
              onBlur={handleBlur("password")}
              name="password"
              onChangeText={(text) => setFieldValue("password", text)}
              value={values.password}
            />
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d" }}>
            {touched.user && errors.password}
          </Text>
  
          <Button
            onPress={handleSubmit}
            block
            style={{ marginTop: 6 }}
          >
            <Text>SIGN UP</Text>
          </Button>
        </Form>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
