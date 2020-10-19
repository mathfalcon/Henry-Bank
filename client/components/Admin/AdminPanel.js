import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Header, Left, Right, Icon, View, Button, Body, Title, Text } from 'native-base';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider } from 'react-native-elements';
import { getUserLogged } from "../../redux/actions/authActions";
import styles from "../../Styles/adminPanelStyles";

import CustomButton from "../customButton";
import axios from "axios";
import { api } from "../Constants/constants";

export default AdminPanel = ({ navigation }) => {   
    
    const dispatch = useDispatch();

    const handleLogOut = async () => {
        const response = await axios(`${api}/auth/logout`);
        dispatch(getUserLogged());
        response.data.success
        // ? navigation.navigate("home")
        ? console.log('Signed Out')
        : Alert.alert("Error", "Something went wrong, try again");          
    };  
  
    return (
        <SafeAreaView>
            <KeyboardAwareScrollView>

                <Container>
                    <Header style={styles.header}>
                        <Left />
                            <Body>
                                <Title style={styles.headerTitle}>ADMIN PANEL</Title>
                            </Body>
                        <Right />              
                    </Header>
                    <Text>Admin panel</Text>

                    <Divider style={{ backgroundColor: 'black' }} />

                    <CustomButton
                        style={{
                        color: "black",
                        backgroundColor: "#ffff6d",
                        fontSize: 18,
                        }}
                        title="LOG OUT"
                        onPress={handleLogOut}
                    />

                    <Divider style={{ backgroundColor: 'black' }} />

                    <CustomButton
                        style={{
                        color: "black",
                        backgroundColor: "#ffff6d",
                        fontSize: 18,
                        }}
                        title="MANAGE USERS"
                        onPress={() => navigation.navigate("manageUsers")}
                    />

                    <Divider style={{ backgroundColor: 'black' }} />

                    <CustomButton
                        style={{
                        color: "black",
                        backgroundColor: "#ffff6d",
                        fontSize: 18,
                        }}
                        title="MANAGE ACCOUNTS"
                        onPress={() => navigation.navigate("manageAccounts")}
                    />

                    <Divider style={{ backgroundColor: 'black' }} />

                    <CustomButton
                        style={{
                        color: "black",
                        backgroundColor: "#ffff6d",
                        fontSize: 18,
                        }}
                        title="MANAGE TRANSACTIONS"
                        onPress={() => navigation.navigate("manageTransactions")}
                    />

                    <Divider style={{ backgroundColor: 'black' }} />

                    <CustomButton
                        style={{
                        color: "black",
                        backgroundColor: "#ffff6d",
                        fontSize: 18,
                        }}
                        title="SEE STATS"
                        onPress={() => navigation.navigate("seeStats")}
                    />

                    <Divider style={{ backgroundColor: 'black' }} />
                               
            </Container>
        
        </KeyboardAwareScrollView>
    </SafeAreaView>
    );
}