import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, Item, Icon, Input, View, Label,Button } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from "react-native";
import { api } from "./Constants/constants";
import styles from "../Styles/forgotPassStyles";
import CustomButton from "./customButton";
import { CheckBox } from "react-native-elements";
import axios from "axios";

export default ResetPassowrd = ({ navigation }) => {
  const [showPass, setShowPass] = useState(false);
  const [initialState, setInitialState] = useState(true);
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
      token: "",
      newPass: "",
      confirmNewPass: "",
    },
    onSubmit: async (values) => {
      const response = await axios.put(`${api}/auth/change-password`, {
        newResetToken: values.token,
        newPw: values.newPass,
      });
      console.log(response);
      response.data.success
        ? Alert.alert("Success", response.data.message, [
            {
              text: "Understood",
              onPress: () => navigation.navigate("login"),
              style: "cancel",
            },
          ])
        : Alert.alert("Failure", response.data.message);
    },
    validate: (values) => {
      setInitialState(false);
      const errors = {};
      if (!/^(?=.*\d)(?=.*[A-Za-z])[A-Za-z0-9]{5,20}$/.test(values.newPass))
        errors.newPass = "Must contain: 5-20 digits, A-Z and a-z.";
      if (values.confirmNewPass !== values.newPass || !values.confirmNewPass)
        errors.confirmNewPass = "Must be the same password.";
      return errors;
    },
  });
  const [check, setCheck] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View>
          <Text style={{ alignSelf: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 14 }}>Don't you have an account? </Text>
            <Text
              style={{ fontWeight: "bold", fontSize: 14 }}
              onPress={() => navigation.navigate("sign")}
            >
              Sign Up
            </Text>
          </Text>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            You will shortly receive an email to the provided address where you
            will find the reset token needed to continue.
            {"\n"}
            {"\n"}
            In order to protect your account, make sure your password must
            contain 5-20 digits, A-Z and a-z.
          </Text>
          <Item
            error={errors.user ? true : false}
            style={{
              marginLeft: 25,
              marginRight: 25,
              marginTop: 25,
            }}
            floatingLabel
          >
            <Icon
              active
              name="key"
              type="FontAwesome5"
              style={{
                fontSize: 20,
                color: "#151515",
              }}
            />
            <Label>Reset Token</Label>
            <Input
              onBlur={handleBlur("token")}
              name="token"
              onChangeText={(text) => setFieldValue("token", text)}
              value={values.token}
              keyboardType="email-address"
            />
          </Item>
          <Item
            error={errors.user ? true : false}
            style={{
              marginLeft: 25,
              marginRight: 25,
              marginTop: 25,
            }}
            floatingLabel
          >
            <Icon
              active
              name="lock"
              type="FontAwesome5"
              style={{
                fontSize: 20,
                color: "#151515",
              }}
            />
            <Label>New Password</Label>
            <Input
              onBlur={handleBlur("newPass")}
              name="newPass"
              onChangeText={(text) => setFieldValue("newPass", text)}
              value={values.newPass}
              secureTextEntry={showPass}
            />
            <Icon
              name={showPass ? "eye" : "eye-slash"}
              style={{ color: "grey", fontSize: 15 }}
              type="FontAwesome5"
              onPress={() => setShowPass(!showPass)}
            />
          </Item>
          <Text
            style={{
              color: "#e06d6d",
              marginHorizontal: 25,
              marginBottom: 20,
            }}
          >
            {touched.newPass && errors.newPass}
          </Text>
          <Item
            error={errors.user ? true : false}
            style={{
              marginLeft: 25,
              marginRight: 25,
            }}
            floatingLabel
          >
            <Icon
              active
              name="pen"
              type="FontAwesome5"
              style={{
                fontSize: 20,
                color: "#151515",
              }}
            />
            <Label>Confirm New Password</Label>
            <Input
              onBlur={handleBlur("confirmNewPass")}
              name="confirmNewPass"
              onChangeText={(text) => setFieldValue("confirmNewPass", text)}
              value={values.confirmNewPass}
              secureTextEntry={showPass}
            />
          </Item>
          <Text
            style={{
              color: "#e06d6d",
              marginHorizontal: 25,
              marginBottom: 20,
            }}
          >
            {touched.confirmNewPass && errors.confirmNewPass}
          </Text>
          <View style={{ marginHorizontal: 20 }}>
            <Button
              dark
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
                  ? [styles.buttonChange, styles.buttonEnabled]
                  : [styles.buttonChange, styles.buttonDisabled]
              }
            >
              <Text>RESET PASSWORD</Text>
            </Button>
          </View>
          <Text style={{ alignSelf: "center", marginTop: 20 }}>
            <Text>Back to </Text>
            <Text
              style={{ fontWeight: "bold" }}
              onPress={() => navigation.navigate("login")}
            >
              Log In
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
