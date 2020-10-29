import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon,
  DatePicker,
  View,
  Button,
  Body,
  Title,
} from "native-base";
import { TouchableOpacity, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { getAccountHistory, filterAccountHistory } from "../redux/actions/accountActions";
import styles from "../Styles/historyStyles.js";
import MenuOperation from "./MenuOperation";

export default AccountHistory = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [userId, setUserId] = useState("");
  const [theFilter, setTheFilter] = useState(true);

  const userLogged = useSelector((state) => state.auth.user);
  const accountHistory = useSelector((state) => state.accountInfo.accountHistory.transactions);
  
  useEffect(() => {
    const userId = userLogged.id;
    setUserId(userId);
    const createdAt = new Date(userLogged.createdAt);
    const today = new Date();
    dispatch(getAccountHistory(userId));
  }, []);

  const setFilter = () => {
    dispatch(filterAccountHistory(userId, dateFrom, dateTo));
    setTheFilter(true)
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        {theFilter ? (
          <Container>
            <Header style={styles.header}>
              <Left style={{flex: 1}}>
                <Button
                  style={{ backgroundColor: "#151515" }}
                  onPress={() => navigation.navigate("position")}
                >
                  <Icon style={{ color: "white" }} name="arrow-back" />
                </Button>
              </Left>
              <Body style={{flex: 3}}>
                <Title style={styles.headerTitle}>
                  Current Balance: ${userLogged.account.balance}
                </Title>
              </Body>
            </Header>

            <Content style={styles.container}>
              <Image
                style={styles.background}
                source={require("../assets/RectangleOne.png")}
              />
              <View style={styles.headerMovement}>
                <Left>
                  <Text>Latest Movements</Text>
                </Left>
                <Right>
                  <Button transparent onPress={() => setTheFilter(false)}>
                    <Icon
                      style={{ color: "black" }}
                      type="AntDesign"
                      name="filter"
                    />
                  </Button>
                </Right>
              </View>

              {/* Aqui va el corte */}

              <List style={styles.list}>
                {accountHistory &&
                  accountHistory.map((e, index) => { 
                    e.senderId === userLogged.id ? e.amount = -Math.abs(e.amount): null
                    return (
                    <>
                      <ListItem key={e.id}>
                        <Icon
                          type="AntDesign"
                          name={e.amount > 0 ? "downcircleo" : "upcircleo"}
                          style={{ color: "#FBC02D" }}
                        />
                        <Left style={styles.card}>
                          <Text style={styles.myName}>{e.sender.name ? `${e.sender.name} ${e.sender.surname}` :'Account balance recharge'}</Text>
                          <Text style={styles.item}>{new Date (e.createdAt).toDateString()}</Text>
                          <Text style={styles.item}>{e.sender.email}</Text>
                        </Left>
                        <Right>
                          <Icon name="arrow-forward" />
                          <Text
                            style={
                              e.amount > 0
                                ? [styles.money, styles.moneyP]
                                : [styles.money, styles.moneyN]
                            }
                          >
                            ${e.amount}
                          </Text>
                        </Right>
                      </ListItem>
                    </>
                  )})}
              </List>
            </Content>
          </Container>
        ) : (
          <Container>
            <Header style={styles.header}>
              <Left>
                <Button
                  style={{ backgroundColor: "#151515" }}
                  onPress={() => setTheFilter(true)}
                >
                  <Icon style={{ color: "white" }} name="arrow-back" />
                </Button>
              </Left>
              <Right />
            </Header>

            <Content style={styles.container2}>
              <Image
                style={styles.background}
                source={require("../assets/RectangleOne.png")}
              />
              <Text style={styles.title}>Search Transaction</Text>
            </Content>
            {/* Aqui va el corte */}

            <View style={styles.datePicker}>
              <View style={styles.fromTo}>
                <Text style={styles.date}>From Date</Text>
                <DatePicker
                  defaultDate={new Date()} //Manejar from date y to date
                  // maximumDate={new Date(2020, 6, 6)}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Select From Date"
                  textStyle={{ color: "black" }}
                  placeHolderTextStyle={{ color: "black" }}
                  onDateChange={(date) => setDateFrom(date)}
                  disabled={false}
                />
              </View>

              <View style={styles.fromTo}>
                <Text style={styles.date}>To Date </Text>

                <DatePicker
                  placeHolderText="To Date"
                  defaultDate={new Date()}
                  minimumDate={new Date(dateFrom)}
                  // maximumDate={new Date(2020, 6, 6)}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Select To Date"
                  textStyle={{ color: "black" }}
                  placeHolderTextStyle={{ color: "black" }}
                  onDateChange={(date) => setDateTo(date)}
                  disabled={false}
                />
              </View>
            </View>
            <TouchableOpacity onPress={setFilter} style={styles.filterButtom}>
              <Text style={styles.filterText}>SET FILTER</Text>
            </TouchableOpacity>
          </Container>
        )}
      </KeyboardAwareScrollView>
      <View style={styles.menuOp}>
        <MenuOperation navigation={navigation} userLogged={userLogged} screen ='accounts' />
      </View>
    </SafeAreaView>
  );
};
