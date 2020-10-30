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

function ChangeMyPin({ navigation }) {
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
      currentPin: "",
      newPin: "",
      confirmNewPin: "",
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
      if (!values.currentPin && values.currentPin.length < 4)
        errors.currentPin = "Enter a 4 digit passcode.";
      if (!values.newPin && values.newPin.length < 4)
        errors.newPin = "Enter a 4 digit passcode.";
      if (!values.confirmNewPin && values.confirmNewPin.length < 4)
        errors.confirmNewPin = "Enter a 4 digit passcode.";
      return errors;
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View>
          <Text style={styles.title}>Change my Pin Code</Text>
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
            <Label>Current Pin Code</Label>
            <Input
              onBlur={handleBlur("currentPin")}
              name="currentPin"
              onChangeText={(text) => setFieldValue("currentPin", text)}
              value={values.currentPin}
              keyboardType="numeric"
            />
          </Item>
          <Text
            style={{
              color: "#e06d6d",
              marginHorizontal: 25,
            }}
          >
            {errors.currentPin}
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
            <Label>New Pin Code</Label>
            <Input
              onBlur={handleBlur("newPin")}
              name="newPin"
              onChangeText={(text) => setFieldValue("newPin", text)}
              value={values.newPin}
              keyboardType="numeric"
            />
          </Item>
          <Text
            style={{
              color: "#e06d6d",
              marginHorizontal: 25,
            }}
          >
            {touched.newPin && errors.newPin}
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
            <Label>Confirm New Pin Code</Label>
            <Input
              onBlur={handleBlur("confirmNewPin")}
              name="confirmNewPin"
              onChangeText={(text) => setFieldValue("confirmNewPin", text)}
              value={values.confirmNewPin}
              keyboardType="numeric"
            />
          </Item>
          <Text
            style={{
              color: "#e06d6d",
              marginHorizontal: 25,
            }}
          >
            {touched.confirmNewPin && errors.confirmNewPin}
            {console.log(errors)}
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
export default ChangeMyPin;
