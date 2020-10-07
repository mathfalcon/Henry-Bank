import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity, SafeAreaView } from "react-native";
import { Avatar } from "react-native-elements";
import CardPosition from "./CardPosition";
import MenuOperation from "./MenuOperation";
import Transaction from "./Transaction";
import {
  View,
  Text,
  Form,
  Label,
  Item,
  Input,  
  Button,  
} from "native-base";
import styles from "../Styles/positionStyles";

export default Position = () => {

    // const dispatch = useDispatch();

    // useEffect(() => {         
    //   }, []);

    return (
      <SafeAreaView style={styles.container}>

          <View style={styles.headerSection}>
              <View style={styles.avatarSection}>
                    <Text style={styles.textAvatar}>Welcome User</Text>
                    <Avatar
                    size="large"                          
                    icon={{name: 'user', type: 'font-awesome'}}
                    // onPress={() => console.log("Works!")}
                    activeOpacity={0.7}          
                    containerStyle={{backgroundColor:"gray", alignSelf: "center", marginBottom: 50, marginTop:-50, }}
                    />
                </View>
            <Text style={styles.moneySection}>Dinero Disponible</Text>
        </View>

        <View style={styles.cardPosition}>
            <CardPosition />
        </View>

        <View style={styles.menuOp}>
            <MenuOperation />
        </View>

        <View style={styles.transaction}>
            <Transaction />
        </View>

      </SafeAreaView>
    );
}