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
        <Header style={{backgroundColor: '#151515'}}>
            <Left style={{ flex: 1 }}>
                <Button transparent onPress={() => navigation.navigate('position')}>
                    <Icon style={{ color: "whitesmoke" }} name="arrow-back" />
                </Button>
            </Left>
            <Body>
                <Title style={styles.headerTitle}>ADMIN PANEL</Title>
            </Body>
            <Right />              
        </Header>

        <Tabs            
            renderTabBar={()=> <ScrollableTab style={{backgroundColor: '#151515'}}/>}
            locked={true}
        >
          <Tab heading="Users" tabStyle={{backgroundColor: '#151515'}} activeTabStyle={{backgroundColor: '#151515'}} activeTextStyle={{color: '#ffff8b'}} textStyle={{color: 'whitesmoke', opacity: 0.7}}>
            <ManageUsers />
          </Tab>
          {/* <Tab heading="Accounts" tabStyle={{backgroundColor: '#151515'}} activeTabStyle={{backgroundColor: '#151515'}} activeTextStyle={{color: '#ffff8b'}} textStyle={{color: 'whitesmoke', opacity: 0.7}}>
            <ManageAccounts />
          </Tab> */}
          <Tab heading="Transactions" tabStyle={{backgroundColor: '#151515'}} activeTabStyle={{backgroundColor: '#151515'}} activeTextStyle={{color: '#ffff8b'}} textStyle={{color: 'whitesmoke', opacity: 0.7}}>
            <ManageTransactions />
          </Tab>
          {/* <Tab heading="Stats" tabStyle={{backgroundColor: '#151515'}} activeTabStyle={{backgroundColor: '#151515'}} activeTextStyle={{color: '#ffff8b'}} textStyle={{color: 'whitesmoke', opacity: 0.7}}>
            <SeeStats />
          </Tab>           */}
        </Tabs>
      </Container>
    );
}