import React from "react";
import { Container, Header, Left, Right, Icon, View, Button, Body, Title, Text } from 'native-base';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider } from 'react-native-elements';
import styles from "../../Styles/adminPanelStyles";
import CustomButton from "../customButton";


export default AdminPanel = ({ navigation }) => {   
  
    return (
        <SafeAreaView>
            <KeyboardAwareScrollView>

                <Container>
                    <Header style={styles.header}>
                        <Left style={{ flex: 1 }}>
                            <Button transparent onPress={() => navigation.goBack()}>
                                <Icon style={{ color: "black" }} name="arrow-back" />
                            </Button>
                        </Left>
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