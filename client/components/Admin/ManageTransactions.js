import React from "react";
import { Container, Header, Left, Right, Icon, View, Button, Body, Title, Text } from 'native-base';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/adminPanelStyles";

export default ManageTransactions = ({ navigation }) => {    
  
    return (
        <SafeAreaView>
            <KeyboardAwareScrollView>

                <Container>
                    <Header style={styles.header}>
                        <Left>
                            <Button transparent onPress={() => navigation.navigate('adminPanel')}>
                            <Icon style={{ color: "black" }} name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                        <Title style={styles.headerTitle}>MANAGE TRANSACTIONS</Title>
                        </Body>
                        <Right />              
                    </Header>
                    <Text>MANAGE TRANSACTIONS</Text>

                               
            </Container>
        
        </KeyboardAwareScrollView>
    </SafeAreaView>
    );
}