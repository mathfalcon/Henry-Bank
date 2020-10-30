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
import axios from 'axios'

export default PersonalInfo = ({ navigation, route }) => {

  const {user} = route.params;

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
    onSubmit: () => {
        // axios.put(`${api}/users/update/`)
    },
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
          <Text style={{ alignSelf: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 14 }}>To change your password press here </Text>
            <Text
              style={{ fontWeight: "bold", fontSize: 14 }}             
            >
              Change Password
            </Text>
          </Text>
          <Text style={styles.title}>PERSONAL INFO</Text>          
          <Item
            error={errors.user ? true : false}
            style={{
              marginLeft: 25,
              marginRight: 25,
              marginTop: 25,
            }}
            floatingLabel
          >
            <Label>Name</Label>
            <Input
              onBlur={handleBlur("newPass")}
              name="newPass"
              onChangeText={(text) => setFieldValue("newPass", text)}
              value={user.name}
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
            <Label>Surname</Label>
            <Input
              onBlur={handleBlur("newPass")}
              name="newPass"
              onChangeText={(text) => setFieldValue("newPass", text)}
              value={user.surname}
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

            <Label>Document Number</Label>
            <Input
              onBlur={handleBlur("confirmNewPass")}
              name="confirmNewPass"
              onChangeText={(text) => setFieldValue("confirmNewPass", text)}
              value={user.docNumber}
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

          <Item
            error={errors.user ? true : false}
            style={{
              marginLeft: 25,
              marginRight: 25,
            }}
            floatingLabel
          >

            <Label>Phone</Label>
            <Input
              onBlur={handleBlur("confirmNewPass")}
              name="confirmNewPass"
              onChangeText={(text) => setFieldValue("confirmNewPass", text)}
              value={user.phone}
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

          <Item
            error={errors.user ? true : false}
            style={{
              marginLeft: 25,
              marginRight: 25,
            }}
            floatingLabel
          >

            <Label>CVU</Label>
            <Input
              onBlur={handleBlur("confirmNewPass")}
              name="confirmNewPass"
              onChangeText={(text) => setFieldValue("confirmNewPass", text)}
              value={user.account.cvu}
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

          <Item
            error={errors.user ? true : false}
            style={{
              marginLeft: 25,
              marginRight: 25,
            }}
            floatingLabel
          >

            <Label>Country</Label>
            <Input
              onBlur={handleBlur("confirmNewPass")}
              name="confirmNewPass"
              onChangeText={(text) => setFieldValue("confirmNewPass", text)}
              value={user.country}
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

          <Item
            error={errors.user ? true : false}
            style={{
              marginLeft: 25,
              marginRight: 25,
            }}
            floatingLabel
          >

            <Label>State</Label>
            <Input
              onBlur={handleBlur("confirmNewPass")}
              name="confirmNewPass"
              onChangeText={(text) => setFieldValue("confirmNewPass", text)}
              value={user.state}
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

          <Item
            error={errors.user ? true : false}
            style={{
              marginLeft: 25,
              marginRight: 25,
            }}
            floatingLabel
          >

            <Label>Locality</Label>
            <Input
              onBlur={handleBlur("confirmNewPass")}
              name="confirmNewPass"
              onChangeText={(text) => setFieldValue("confirmNewPass", text)}
              value={user.locality}
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

          <Item
            error={errors.user ? true : false}
            style={{
              marginLeft: 25,
              marginRight: 25,
            }}
            floatingLabel
          >

            <Label>Street</Label>
            <Input
              onBlur={handleBlur("confirmNewPass")}
              name="confirmNewPass"
              onChangeText={(text) => setFieldValue("confirmNewPass", text)}
              value={user.street}
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

          <Item
            error={errors.user ? true : false}
            style={{
              marginLeft: 25,
              marginRight: 25,
            }}
            floatingLabel
          >

            <Label>Street Number</Label>
            <Input
              onBlur={handleBlur("confirmNewPass")}
              name="confirmNewPass"
              onChangeText={(text) => setFieldValue("confirmNewPass", text)}
              value={user.streetNumber}
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
              title="UPDATE INFO"
              // onPress={handleSubmit}
            />
          </View>
          <Text style={{ alignSelf: "center", marginTop: 80 }}>
            <Text>Back to </Text>
            <Text
              style={{ fontWeight: "bold" }}
              // onPress={() =>
              //   navigation.navigate("userPanel", {
              //     userLogged,
              //     navigation,
              //   })
              // }
            >
              User Panel
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};