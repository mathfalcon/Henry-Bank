import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, Item, Icon, Input, View, Label } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from "react-native";
import { api } from "./Constants/constants";
import styles from "../Styles/forgotPassStyles";
import CustomButton from "./customButton";
import { CheckBox } from "react-native-elements";
import { useSelector } from "react-redux";
import axios from "axios";

function ChangeMyPass({ navigation }) {
  const userLogged = useSelector((state) => state.auth.user);

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
      currentPass: "",
      newPass: "",
      confirmNewPass: "",
    },
    onSubmit: () => {
      axios
        .put(`${api}/auth/change-password/user`, {
          currentPw: values.currentPass,
          newPw: values.newPass,
          userId: userLogged.id,
        })
        .then((response) => {
          if (response.data.success) {
            Alert.alert("Success", response.data.message);
          } else Alert.alert("Failure", response.data.message);
        })
        .catch((err) => console.log(err));
    },
    validate: (values) => {
      const errors = {};
      if (!/^(?=.*\d)(?=.*[A-Za-z])[A-Za-z0-9]{5,20}$/.test(values.currentPass))
        errors.newPass = "Must contain: 5-20 digits, A-Z and a-z.";
      if (!/^(?=.*\d)(?=.*[A-Za-z])[A-Za-z0-9]{5,20}$/.test(values.newPass))
        errors.newPass = "Must contain: 5-20 digits, A-Z and a-z. ";
      if (values.confirmNewPass !== values.newPass || !values.confirmNewPass)
        errors.confirmNewPass = "Must be the same password.";

      return errors;
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View>
          <Text style={styles.title}>Change your password</Text>
          <Text style={styles.subtitle}>
            In order to protect your account, make sure your password must
            contain 5-20 digits, A-Z and a-z.
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
              name="lock"
              type="FontAwesome5"
              style={{
                fontSize: 20,
                color: "#151515",
              }}
            />
            <Label>Current Password</Label>
            <Input
              onBlur={handleBlur("currentPass")}
              name="currentPass"
              onChangeText={(text) => setFieldValue("currentPass", text)}
              value={values.currentPass}
              secureTextEntry
            />
          </Item>
          <Text
            style={{
              color: "#e06d6d",
              marginHorizontal: 25,
            }}
          >
            {touched.currentPass && errors.currentPass}
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
              name="edit"
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
              secureTextEntry
            />
          </Item>
          <Text
            style={{
              color: "#e06d6d",
              marginHorizontal: 25,
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
              name="check-circle"
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
              secureTextEntry
            />
          </Item>
          <Text
            style={{
              color: "#e06d6d",
              marginHorizontal: 25,
            }}
          >
            {touched.confirmNewPass && errors.confirmNewPass}
          </Text>
          <View style={{ marginHorizontal: 20 }}>
            <CustomButton
              style={styles.buttonRequest}
              title="RESET PASSWORD"
              onPress={handleSubmit}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
export default ChangeMyPass;
