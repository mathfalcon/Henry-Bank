import React, { useState, useEffect } from "react";
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon, DatePicker, View, Button, Body, Title } from 'native-base';
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { getAccountHistory } from "../redux/actions/accountActions";
import styles from "../Styles/historyStyles.js";

export default AccountHistory = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const [ dataFrom, setDateFrom ] = useState("");
    const [ dateTo, setDateTo ] = useState("");
    // const accountHistory = useSelector((state) => state.accountInfo);       

// ver como diferenciar envios y cargas / saldo positivo y saldo negativo
    const accountHistory = [
            {
                contact: 'contact Name1',
                money: '$1500',
                date: '06/10/2020',
                saldo: '$30000',
                key:1,
            },
            {
                contact: 'contact Name2',
                money: '-$1000',
                date: '10/10/2020',
                saldo: '$29000',
                key:2,                
            },
            {
                contact: 'contact Name3',
                money: '$3000',
                date: '13/10/2020',
                saldo: '$32000',
                key:3,
            },
    ]    

    // useEffect(() => {
        const userId = route.params.user.id;
    //     const createdAt = new Date(route.params.user.createdAt);
    //     const today = new Date();
    //     console.log('createdAt', createdAt);
    //     console.log('today', today);
    //     console.log('user', userId);
    //     dispatch(getAccountHistory());
    //     },
    // []);

    const setFilter = () =>{        
            dispatch(getAccountHistory( userId, dataFrom, dateTo));
    }    

    return (
        <SafeAreaView>
            <KeyboardAwareScrollView>

                <Container>
                    <Header style={styles.header}>
                    <Left>
                        <Button transparent onPress={() => navigation.navigate('position')}>
                        <Icon style={{ color: "black" }} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    <Title style={styles.headerTitle}>ACCOUNT MOVEMENTS</Title>
                    </Body>
                    <Right />              
                    </Header>

                <Content style={styles.container}>
                <Text style={styles.textFilter}>Filter Date</Text>

                    <View style={styles.datePicker}>
                        <View style={styles.fromTo}>
                            <Text style={styles.date}>From Date</Text>
                            
                            <DatePicker              
                            defaultDate={new Date(2020, 6, 6)}
                            maximumDate={new Date(2020, 6, 6)}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="Select From Date"
                            textStyle={{ color: "black" }}
                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                            onDateChange={(date) => setDateFrom(date)}
                            disabled={false}
                            />                                        
            {/*             
                        <Text style={{marginBottom: -20, alignSelf:'center', color: "#e06d6d" }}>
                            {touched.birth && errors.birth}
                        </Text> */}
                        </View>
                        <View style={styles.fromTo}>

                            <Text style={styles.date}>To Date</Text>                          
                            
                            <DatePicker
                            placeHolderText="To Date"           
                            defaultDate={new Date(2020, 6, 6)}
                            maximumDate={new Date(2020, 6, 6)}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="Select To Date"
                            textStyle={{ color: "black" }}
                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                            onDateChange={(date) => setDateTo(date)}
                            disabled={false}
                            />                        
                        {/* <Text style={{marginBottom: -20, alignSelf:'center', color: "#e06d6d" }}>
                            {touched.birth && errors.birth}
                        </Text> */}
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={setFilter}
                        style={styles.filterButtom}
                    >
                        <Text style={styles.filterText}>SET FILTER</Text>
                    </TouchableOpacity>            

                    <List style={styles.list}>
                    {accountHistory.map( e => (
                        <>
                        <ListItem itemDivider style={styles.divider} />
                        <ListItem key={e.id}>
                        <Left style={styles.card}>
                            <Text style={styles.item}>Contacto: {e.contact}</Text>
                            <Text style={styles.item}>Importe: {e.money}</Text>
                            <Text style={styles.item}>Fecha: {e.date}</Text>
                            <Text style={styles.item}>Saldo: {e.saldo}</Text>
                        </Left>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                        </ListItem>
                        </>
                    ))}
                    </List>
                </Content>
            </Container>
        
        </KeyboardAwareScrollView>
    </SafeAreaView>
    );
}