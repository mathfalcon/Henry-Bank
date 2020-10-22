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
import { getAccountHistory } from "../redux/actions/accountActions";
import styles from "../Styles/historyStyles.js";
import MenuOperation from "./MenuOperation";

export default AccountHistory = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [dataFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [userId, setUserId] = useState("");
  const [theFilter, setTheFilter] = useState(true);

  // const { accountHistory } = useSelector((state) => state.accountInfo);
  const userLogged = useSelector((state) => state.auth.user);
  // ver como diferenciar envios y cargas / saldo positivo y saldo negativo
  const accountHistory = [
    {
      email: "alinfierno@gmail.com",
      contact: "Adolf Hitler",
      money: "1500",
      date: "06/10/2020",
      saldo: "$30000",
      key: 1,
    },
    {
      email: "desgracia@gmail.com",
      contact: "Nicolas Maduro",
      money: "-1000",
      date: "10/10/2020",
      saldo: "$29000",
      key: 2,
    },
    {
      email: "elcartel@gmail.com",
      contact: "Pablo Escobar",
      money: "3000",
      date: "13/10/2020",
      saldo: "$32000",
      key: 3,
    },
    {
      email: "muerte@gmail.com",
      contact: "Mussolini",
      money: "-1000",
      date: "08/12/2020",
      saldo: "$1000",
      key: 4,
    },
  ];

  useEffect(() => {
    const userId = route.params.user.id;
    setUserId(userId);
    const createdAt = new Date(route.params.user.createdAt);
    const today = new Date();
    console.log("createdAt", createdAt);
    console.log("today", today);
    console.log("user", userId);
    // dispatch(getAccountHistory(userId, createdAt, today));
  }, []);

  const setFilter = () => {
    // dispatch(getAccountHistory( userId, dataFrom, dateTo)); // Que formato
    // Validar fecha date sea menos a fecha to Date
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        {theFilter ? (
          <Container>
            <Header style={styles.header}>
              <Left>
                <Button
                  style={{backgroundColor: "black"}}
                  onPress={() => navigation.navigate("position")}
                >
                  <Icon style={{ color: "white" }} name="arrow-back" />
                </Button>
              </Left>
              <Body>
                <Title style={styles.headerTitle}>
                  ${userLogged.account.balance}
                </Title>
              </Body>
              <Right />
            </Header>

            <Content style={styles.container}>
              <Image
                style={styles.background}
                source={require("../assets/RectangleOne.png")}
              />
              <View style={styles.headerMovement}>
                <Left>
                  <Text>Movements</Text>
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
                  accountHistory.map((e) => (
                    <>
                      <ListItem itemDivider style={styles.divider} />
                      <ListItem key={e.id}>
                      <Icon type="AntDesign" name={ e.money > 0 ? "upcircleo" : "downcircleo"} style={{color:'orange'}}/>
                    <List style={styles.list}>
                    {accountHistory.map( e => (
                        <View key={e.key}>
                            <ListItem itemDivider style={styles.divider} />
                            <ListItem>
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
                        </View>
                    ))}
                    </List>                
                </Content>                
            </Container>
        
        </KeyboardAwareScrollView>
                <View style={styles.menuOp}>
                    <MenuOperation navigation={navigation} screen={'accounts'} />
                </View>
    </SafeAreaView>
  );
};
