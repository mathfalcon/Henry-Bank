import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, Item, Icon, Input, View, Label } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Image } from "react-native";
import { api } from "./Constants/constants";
import styles from "../Styles/forgotPassStyles";
import CustomButton from "./customButton";
import { CheckBox } from "react-native-elements";
import axios from 'axios';

export default ForgotPass = ({ navigation }) => {
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
    },
    onSubmit: async (value) => {
      const response = await axios.post(`${api}/auth/reset_password`, {email: values.user});
      response.data.success ? Alert.alert('Success', response.data.message) : Alert.alert('Failure', 'The provided email does not exist.')
      navigation.navigate("resetPassword")
    },
    validate: (values) => {
      const errors = {};
      if (values.user.length <= 2) errors.user = "The email is invalid";
      return errors;
    },
  });
  const [check, setCheck] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View>
          <Image
            source={require("../assets/henryLogoBlack.jpg")}
            style={styles.logoImg}
          />
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address associated to your account below and we
            will send you a password reset link.
          </Text>
          <Item
            error={errors.user ? true : false}
            style={{
              marginLeft: 25,
              marginRight: 25,
              marginTop: 25,
              marginBottom: 5,
            }}
            floatingLabel
          >
            <Icon
              active
              name="envelope"
              type="FontAwesome5"
              style={{
                fontSize: 20,
                color: "#151515",
              }}
            />
            <Label>Email Address</Label>
            <Input
              onBlur={handleBlur("user")}
              name="user"
              onChangeText={(text) => setFieldValue("user", text)}
              value={values.user}
              keyboardType="email-address"
            />
          </Item>
          <Text
            style={{
              color: "#e06d6d",
              marginHorizontal: 25,
            }}
          >
            {touched.user && errors.user}
          </Text>
          <View style={{ marginHorizontal: 20 }}>
            <CheckBox
              center
              title="I am not a Robot"
              checked={check}
              onPress={() => setCheck(!check)}
              containerStyle={{
                backgroundColor: "#ffff57",
                borderRadius: 10,
                width: "70%",
                alignSelf: "center",
                marginVertical: 20,
              }}
              textStyle={{ color: "black" }}
              checkedColor="black"
              uncheckedColor="#2b2b2b"
            />
            <CustomButton
              style={styles.buttonRequest}
              title="REQUEST RESET LINK"
              onPress={handleSubmit}
            />
          </View>
          <Text style={{ alignSelf: "center", marginTop: 30 }}>
            <Text>Back to </Text>
            <Text
              style={{ fontWeight: "bold" }}
              onPress={() => navigation.navigate("login")}
            >
              Log In
            </Text>
          </Text>
          <Text style={{ alignSelf: "center", marginTop: 10 }}>
            <Text style={{ fontSize: 14 }}>Don't you have an account? </Text>
            <Text
              style={{ fontWeight: "bold", fontSize: 14 }}
              onPress={() => navigation.navigate("sign")}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
