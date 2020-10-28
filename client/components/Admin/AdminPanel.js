import React from 'react';
import { Container, Header, Left, Right, Icon, View, Button, Body, Title, Text, Tab, Tabs, ScrollableTab } from 'native-base';
import ManageUsers from "./ManageUsers";
import ManageAccounts from "./ManageAccounts";
import ManageTransactions from "./ManageTransactions";
import SeeStats from "./SeeStats";
import styles from "../../Styles/adminPanelStyles";

export default AdminPanel = ({ navigation }) => {
  return (
      <Container>
        <Header style={styles.header}>
            <Left style={{ flex: 1 }}>
                <Button transparent onPress={() => navigation.navigate('position')}>
                    <Icon style={{ color: "black" }} name="arrow-back" />
                </Button>
            </Left>
            <Body>
                <Title style={styles.headerTitle}>ADMIN PANEL</Title>
            </Body>
            <Right />              
        </Header>

        <Tabs            
            renderTabBar={()=> <ScrollableTab />}
            locked={true}
        >
          <Tab heading="Users">
            <ManageUsers />
          </Tab>
          <Tab heading="Accounts">
            <ManageAccounts />
          </Tab>
          <Tab heading="Transactions">
            <ManageTransactions />
          </Tab>
          <Tab heading="Stats">
            <SeeStats />
          </Tab>          
        </Tabs>
      </Container>
    );
}