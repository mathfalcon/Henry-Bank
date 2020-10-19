import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {  
  Text,
  Form,  
  Item,
  Icon,
  Input,  
} from "native-base";

import CustomButton from "./customButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Image } from "react-native";
import axios from "axios";
import { api } from "./Constants/constants";
import { getUserLogged } from "../redux/actions/authActions";
import styles from "../Styles/logInStyles";

export default LogInForm = ({ navigation }) => {  
  const [showPass, setShowPass] = useState(false);

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
      user: "",
      password: "",
    },
    onSubmit: async (values) => {
      //Send values to database
      try {
        const response = await axios.post(`${api}/auth/login`, {
          email: values.user,
          password: values.password,
        });
        response.data.success
          ? Alert.alert(
              "Success",
              "Your have logged in succesfully, you will now see your account details",
              [
                {
                  text: "Understood",                  
                  // onPress: () => navigation.navigate("position"),
                  onPress: () => dispatch(getUserLogged()),               
                },
              ],
              { cancelable: false }
            )
          : Alert.alert(
              "Error",
              response.data.message || response.data.info.message,
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
      if (values.user.length <= 2) errors.user = "The email is invalid";
      if (values.password.length <= 2)
        errors.password = "You must enter the password";
      return errors;
    },
  });

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <Form style={{ padding: 18 }}>
          <Text style={styles.tittle}>Welcome!</Text>
          <Image
            source={require("../assets/henryLogoBlack.jpg")}
            style={styles.logoImg}
          />
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
              secureTextEntry={!showPass}
              placeholder="Password"
              onBlur={handleBlur("password")}
              name="password"
              onChangeText={(text) => setFieldValue("password", text)}
              value={values.password}
            />
            <Icon
              name={showPass ? "eye" : "eye-slash"}
              style={{ color: "grey", fontSize: 15 }}
              type="FontAwesome5"
              onPress={() => setShowPass(!showPass)}
            />
          </Item>
          <Text style={{ marginLeft: 18, color: "#e06d6d", marginBottom: 20 }}>
            {touched.user && errors.password}
          </Text>

          {/* <Button onPress={handleSubmit} block style={{ marginLeft: 15 }}>
            <Text>LOGIN</Text>
          </Button> */}
          <CustomButton
            style={styles.buttonLogin}
            title="LOGIN"
            onPress={handleSubmit}
          />
        </Form>
        <Text style={{ alignSelf: "center", marginTop: 100 }}>
          <Text>Don't you have an account? </Text>
          <Text
            style={{ fontWeight: "bold" }}
            onPress={() => navigation.navigate("sign")}
          >
            Sign Up
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
