import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, Item, Icon, Input, View, Label, Button } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from "react-native";
import axios from "axios";
import { api } from "./Constants/constants";
import styles from "../Styles/forgotPassStyles";
// import CustomButton from "./customButton";

function ChangeMyPin({ navigation, userId }) {  

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
      currentPin: "",
      newPin: "",
      confirmNewPin: "",
    },

    onSubmit: () => {      
      const updateInfo = {
        id: userId,
        oldPasscode: values.currentPin,
        passcode: values.newPin,        
      };

      axios
        .patch(`${api}/users/change_passcode`, updateInfo)
        .then((response) => {
          if (response.data.success) {               
            Alert.alert("PassCode changed!");            
            // setFieldValue("currentPin", "")
            // setFieldValue("newPin", "")
            // setFieldValue("confirmNewPin", "")                        
          } else {
            Alert.alert("Something went wrong");
          }
        })
        .catch((error) => Alert.alert("Something went wrong"));        
    },

    validate: (values) => {
      setInitialState(false);
      const errors = {};
      if (!values.currentPin || values.currentPin.length < 4)
        errors.currentPin = "Enter a 4 digit passcode.";
      if (!values.newPin || values.newPin.length < 4)
        errors.newPin = "Enter a 4 digit passcode.";
      if (!values.confirmNewPin || (values.confirmNewPin.length < 4) || (values.newPin !== values.confirmNewPin))
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
            Enter a new four digit Pin Code
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
              secureTextEntry={true}
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
              secureTextEntry={true}
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
              secureTextEntry={true}
            />
          </Item>
          <Text
            style={{
              color: "#e06d6d",
              marginHorizontal: 25,
            }}
          >
            {touched.confirmNewPin && errors.confirmNewPin}            
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
              <Text>RESET PIN CODE</Text>
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
export default ChangeMyPin;
