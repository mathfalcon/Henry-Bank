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

function ChangeMyPass({ navigation }) {
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
      newPass: "",
      confirmNewPass: "",
    },
    onSubmit: () => Alert.alert("submited"),
    validate: (values) => {
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
          <Text style={styles.title}>Change my Password</Text>
          <Text style={styles.subtitle}>
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
              name="newPass"
              onChangeText={(text) => setFieldValue("newPass", text)}
              value={values.newPass}
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
              keyboardType="email-address"
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
              keyboardType="email-address"
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
            <CustomButton
              style={styles.buttonRequest}
              title="RESET PASSWORD"
              onPress={handleSubmit}
            />
          </View>
          <Text style={{ alignSelf: "center", marginTop: 80 }}>
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
}
export default ChangeMyPass;
