import React from "react";
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
} from "native-base";
import CustomButton from "./customButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from "react-native";

export default SignupForm = () => {
  const {
    values,
    isSubmitting,
    setFieldValue,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues: {
      name: "",
      surname: "",
      docType: "",
      docNumber: "",
      birth: "",
      phone: "",
      email: "",
      country: "",
      state: "",
      locality: "",
      street: "",
      streetNumber: "",
      password: "",
      confirmPassword: "",
      passcode: "",
      role: "client",
    },
    onSubmit: (values) => {
      //Send values to database
      console.log(values);
    },
    validate: (values) => {
      const errors = {};
      if (values.name.length <= 2) errors.name = "Must be a valid name";
      if (values.surname.length <= 2)
        errors.surname = "Must be a valid surname";
      if (!/^(?=.*\d)[0-9]{8,10}$/.test(values.docNumber))
        errors.docNumber = "Must be a valid document number";
      if (!values.phone && values.phone.length >= 10)
        errors.phone = "Must be a valid phone number";
      if (!values.birth) errors.birth = "Must be a valid birthdate";
      if (
        !values.email.trim() ||
        !/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(values.email)
      )
        errors.email = "Must be a valid email";
      if (!values.country) errors.country = "Must be a valid country";
      if (!values.state) errors.state = "Must be a valid state";
      if (!values.locality) errors.locality = "Must be a valid locality";
      if (!values.street) errors.street = "Must be a valid street";
      if (!values.streetNumber)
        errors.streetNumber = "Must be a valid street number";
      if (!/^(?=.*\d)(?=.*[A-Za-z])[A-Za-z0-9]{5,20}$/.test(values.password))
        errors.password = "Must contain: 5-20 digits, A-Z and a-z";
      if (values.confirmPassword !== values.password)
        errors.confirmPassword = "Must the same pass";
      if (!values.passcode) errors.passcode = "Must be a valid passcode";
      return errors;
    },
  });
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <Form>
          <Item error={errors.name ? true : false}>
            <Label>Name: </Label>
            <Input
              onChangeText={(text) => setFieldValue("name", text)}
              value={values.firstName}
            />
            <Text
              style={{
                marginRight: 18,
                color: "#e06d6d",
              }}
            >
              {errors.name ? errors.name : ""}
            </Text>
          </Item>
          <Item error={errors.surname ? true : false}>
            <Label>Surname: </Label>
            <Input
              onChangeText={(text) => setFieldValue("surname", text)}
              value={values.surname}
            />
            <Text style={{ marginRight: 18, color: "#e06d6d" }}>
              {errors.surname ? errors.surname : ""}
            </Text>
          </Item>
          <Item>
            <Label>Document Type: </Label>
            {/*             <Input
              onChangeText={(text) => setFieldValue("docType", text)}
              value={values.docType}
            /> */}
            <Picker
              onValueChange={(value) => setFieldValue("docType", value)}
              selectedValue={values.docType}
            >
              <Picker.Item label="DNI" value="dni" />
              <Picker.Item label="Passport" value="passport" />
            </Picker>
          </Item>
          <Item error={errors.docNumber ? true : false}>
            <Label>Document Number: </Label>
            <Input
              onChangeText={(text) => setFieldValue("docNumber", text)}
              value={values.docNumber}
            />
            <Text style={{ marginRight: 18, color: "#e06d6d" }}>
              {errors.docNumber ? errors.docNumber : ""}
            </Text>
          </Item>
          <Item error={errors.birth ? true : false}>
            <Label>Birthdate: </Label>
            <Input
              onChangeText={(text) => setFieldValue("birth", text)}
              value={values.birth}
            />
            <Text style={{ marginRight: 18, color: "#e06d6d" }}>
              {errors.birth ? errors.birth : ""}
            </Text>
          </Item>
          <Item error={errors.phone ? true : false}>
            <Label>Phone Number: </Label>
            <Input
              onChangeText={(text) => setFieldValue("phone", text)}
              value={values.phone}
            />
            <Text style={{ marginRight: 18, color: "#e06d6d" }}>
              {errors.phone ? errors.phone : ""}
            </Text>
          </Item>
          <Item error={errors.email ? true : false}>
            <Label>Email: </Label>
            <Input
              onChangeText={(text) => setFieldValue("email", text)}
              value={values.email}
            />
            <Text style={{ marginRight: 18, color: "#e06d6d" }}>
              {errors.email ? errors.email : ""}
            </Text>
          </Item>
          <Item error={errors.country ? true : false}>
            <Label>Country: </Label>
            <Input
              onChangeText={(text) => setFieldValue("country", text)}
              value={values.country}
            />
            <Text style={{ marginRight: 18, color: "#e06d6d" }}>
              {errors.country ? errors.country : ""}
            </Text>
          </Item>
          <Item error={errors.state ? true : false}>
            <Label>State: </Label>
            <Input
              onChangeText={(text) => setFieldValue("state", text)}
              value={values.state}
            />
            <Text style={{ marginRight: 18, color: "#e06d6d" }}>
              {errors.state ? errors.state : ""}
            </Text>
          </Item>
          <Item error={errors.locality ? true : false}>
            <Label>Locality: </Label>
            <Input
              onChangeText={(text) => setFieldValue("locality", text)}
              value={values.locality}
            />
            <Text style={{ marginRight: 18, color: "#e06d6d" }}>
              {errors.locality ? errors.locality : ""}
            </Text>
          </Item>
          <Item error={errors.street ? true : false}>
            <Label>Street: </Label>
            <Input
              onChangeText={(text) => setFieldValue("street", text)}
              value={values.street}
            />
            <Text style={{ marginRight: 18, color: "#e06d6d" }}>
              {errors.street ? errors.street : ""}
            </Text>
          </Item>
          <Item error={errors.streetNumber ? true : false}>
            <Label>Street Number: </Label>
            <Input
              onChangeText={(text) => setFieldValue("streetNumber", text)}
              value={values.streetNumber}
            />
            <Text style={{ marginRight: 18, color: "#e06d6d" }}>
              {errors.streetNumber ? errors.streetNumber : ""}
            </Text>
          </Item>
          <Item error={errors.password ? true : false}>
            <Label>Password: </Label>
            <Input
              onChangeText={(text) => setFieldValue("password", text)}
              value={values.password}
            />
            <Text style={{ marginRight: 18, color: "#e06d6d" }}>
              {errors.password ? errors.password : ""}
            </Text>
          </Item>
          <Item error={errors.confirmPassword ? true : false}>
            <Label>Confirm Pass: </Label>
            <Input
              onChangeText={(text) => setFieldValue("confirmPassword", text)}
              value={values.confirmPassword}
            />
          </Item>
          <Text style={{ marginRight: 18, color: "#e06d6d" }}>
            {errors.confirmPassword ? errors.confirmPassword : ""}
          </Text>
          <Item error={errors.passcode ? true : false}>
            <Label>Passcode: </Label>
            <Input
              onChangeText={(text) => setFieldValue("passcode", text)}
              value={values.passcode}
            />
            <Text style={{ marginRight: 18, color: "#e06d6d" }}>
              {errors.passcode ? errors.passcode : ""}
            </Text>
          </Item>
          <Button onPress={handleSubmit}>
            <Text>SIGN IN</Text>
          </Button>
        </Form>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
