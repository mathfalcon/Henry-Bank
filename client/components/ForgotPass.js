import React, { useState } from "react";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from "react-native";
import {   
  Text,
  Form,
  Label,
  Item,
  Input,  
} from "native-base";
// import CustomButton from "./customButton";
import { CheckBox } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../Styles/forgotPassStyles.js";

export default ForgotPass = () => {

  const [check, setCheck] = useState(false);
  const {
    values,    
    setFieldValue,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    } = useFormik({
    initialValues: {
      email: "",      
    },

    onSubmit: (values) => {
      //Send values to database
      console.log(values);
    },

    validate: (values) => {
      const errors = {};
      if (
        !values.email.trim() ||
        !/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(values.email)
      ) errors.email = "Must be a valid email";      
      
      return errors;
    },
  });

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
      <Text style={styles.titulo}>Resetear Contraseña</Text>  
        <Form style={styles.container}>
          <Item error={errors.email ? true : false}>
            {/* <Label>Email: </Label> */}
            <Icon
            name={"envelope"}
            size={15}
            color="grey"
          />
            <Input
              name='email'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder='Enter email'
            />
          </Item>
          <Text style={{ color: "#e06d6d" }}>
              {touched.email && errors.email}
          </Text>

          <CheckBox
            center
            title="I am not a robot"
            checked={check}
            onPress={() => setCheck(!check)}
          />

          <TouchableOpacity
            disabled={!check}
            onPress={handleSubmit}
            style={check ? styles.buttonEnabled : styles.buttonDisabled}
          >
              <Text style={styles.buttonText}>RESET PASSWORD</Text>
          </TouchableOpacity>

          {/* <CustomButton style={styles.button}>
            <Text>RESET PASSWORD</Text>
          </CustomButton> */}

        </Form>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}