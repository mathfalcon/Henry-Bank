import React, { useState, useEffect } from "react";
import VirtualKeyboard from 'react-native-virtual-keyboard';
import { Modal, View, TouchableHighlight, Alert } from "react-native";
import axios from "axios";
import { api } from "./Constants/constants";
import styles from "../Styles/keyboardStyles";
import {
  Container,
  Header,
  Content,
  Footer,   
  Input,
  FooterTab,
  Button,
  Icon,
  Text,
} from "native-base";

export default MenuOperation = ({ navigation, screen, userLogged }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [inputKeyboard, setInputKeyboard] = useState("");  
  
  useEffect(() => {
    if ( inputKeyboard.length === 4 ){      
      let values = {
        userId: userLogged.user.id,
        passcode: inputKeyboard,
      }     
      
      axios
      .post(`${api}/auth/check-passcode`,values)
        .then((response) => {          
          if(response.data.success){             
            setInputKeyboard("");
            setModalVisible(false);                   
            navigation.navigate("myCards")            
          }       
        })
        .catch(error => console.log("Something went wrong"));
      } 
  }, [inputKeyboard]);

  return (
    <>
      <FooterTab style={{ backgroundColor: "#151515" }}>
        <Button vertical onPress={() => navigation.navigate("userStats")}>
          <Icon
            name="chart-bar"
            type="FontAwesome5"
            style={screen !== "stats" ? { color: "white" } : { color: "#ffff6d" }}
          />
          <Text style={{ color: "white" }}>STATS</Text>
        </Button>

        <Button vertical onPress={() => setModalVisible(!modalVisible)}>
          <Icon
            name="card"
            style={screen !== "cards" ? { color: "white" } : { color: "#ffff6d" }}
          />
          <Text style={{ color: "white" }}>Cards</Text>
        </Button>
        <Button vertical onPress={() => navigation.navigate("position")}>
          <Icon
            name="home"
            type="FontAwesome5"
            style={
              screen !== "position" ? { color: "white" } : { color: "#ffff6d" }
            }
          />
          <Text style={{ color: "white" }}>HOME</Text>
        </Button>

        <Button vertical onPress={() => navigation.navigate("accountHistory")}>
          <Icon
            style={
              screen !== "accounts" ? { color: "white" } : { color: "#ffff6d" }
            }
            type="FontAwesome"
            name="dollar"
          />
          <Text style={{ color: "white" }}>History</Text>
        </Button>

        <Button vertical onPress={() => navigation.navigate("contacts")}>
          <Icon
            name="users"
            type="FontAwesome5"
            style={
              screen !== "contacts" ? { color: "white" } : { color: "#ffff6d" }
            }
          />
          <Text style={{ color: "white" }}>Friend</Text>
        </Button>
      </FooterTab>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Close modal first");
        }}
      >                        
        <View style={styles.modalView}>

        <Text style={styles.modalText}>Enter your PassCode</Text>  
          
          <View style={styles.inputs}>
            <Input
              secureTextEntry={true}    
              disabled={true}
              rounded
              name="inputKeyboard[0]"
              value={inputKeyboard[0]}              
              style={styles.textInput}     
            />
            <Input
              secureTextEntry={true}   
              disabled={true}
              rounded
              name="inputKeyboard[1]"
              value={inputKeyboard[1]}               
              style={styles.textInput}     
            />
            <Input
              secureTextEntry={true}  
              disabled={true}
              rounded
              name="inputKeyboard[2]"
              value={inputKeyboard[2]}                
              style={styles.textInput}     
            />
            <Input
              secureTextEntry={true}  
              disabled={true}
              rounded
              name="inputKeyboard[3]"
              value={inputKeyboard[3]}               
              style={styles.textInput}     
            />
          </View>

          <VirtualKeyboard
            color='white'
            pressMode='string'
            onPress={(val) => setInputKeyboard(val)}  
            style={styles.keyboard}         
          />

          <TouchableHighlight
            style={styles.backButtom}
            onPress={() => {
              setInputKeyboard("");
              setModalVisible(!modalVisible)
              }
            }
          >
            <Text style={styles.textStyle}>
              BACK
            </Text>
          </TouchableHighlight>

        </View>
      </Modal>                        
    </>
  );
};