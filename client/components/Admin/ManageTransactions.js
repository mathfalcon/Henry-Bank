import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {     
    Content,
    Button,
    List,
    ListItem,
    Text,
    Left,    
    View,    
    Picker,
} from 'native-base';
import { Divider } from 'react-native-elements';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getAllTransactions } from "../../redux/actions/transactionsActions";
import { getUsers } from "../../redux/actions/actions";
import { CheckBox } from "react-native-elements";
import styles from "../../Styles/manageTransactionStyles";

export default ManageTransactions = ({ navigation }) => {

    const dispatch = useDispatch();
    const [selectUser, setSelectUser] = useState("");    
    const [check, setCheck] = useState({
        sender: false,
        receiver: false,
    });
    const [showTransactions, setShowTransactions] = useState();

    const { allTransactions } = useSelector((state) => state.transactions);
    const { users } = useSelector((state) => state.users);        
    
    useEffect(() => {
        dispatch(getUsers());
        dispatch(getAllTransactions());        
    },[]);

    useEffect(() => {
        setShowTransactions(allTransactions);      
    },[allTransactions]);


    const handlerFilter = () => {          
        if ( selectUser ) {
            if ( check.sender && !check.receiver ){
                let filterTransactions = allTransactions.filter( t => t.senderId === selectUser );
                setShowTransactions(filterTransactions);
            } else if ( !check.sender && check.receiver ){
                let filterTransactions = allTransactions.filter( t => t.receiverId === selectUser );
                setShowTransactions(filterTransactions);                    
                } else {
                    let filterTransactions = allTransactions.filter( t => t.senderId === selectUser || t.receiverId === selectUser);
                    setShowTransactions(filterTransactions);  
                }            
        }    
    };
    
    const handlerCleanFilter = () => {        
        setShowTransactions(allTransactions);
        setSelectUser("");
        setCheck({
            sender: false,
            receiver: false,
        });
    }
  
    return (
        
            <KeyboardAwareScrollView>
                <Content style={styles.container}>
                    <View style={styles.filter}>

                        <View style={styles.picker}>
                            <Picker
                            mode="dropdown"                            
                            selectedValue={selectUser}
                            onValueChange={setSelectUser}
                            itemStyle={styles.pickerItem}
                            >
                            <Picker.Item
                                label={
                                users.length < 1
                                    ? "There's not users yet"
                                    : "Select a User..."
                                }
                                value=""
                            />
                            {users.map( e => (
                                <Picker.Item label={e.email} value={e.id} key={e.id} />
                            ))}
                            </Picker>
                        </View>
                        <View style={styles.checks}>
                            <CheckBox
                                disabled={ !selectUser ? true : false }
                                containerStyle={{
                                    backgroundColor:'transparent',
                                    borderWidth:0
                                }}
                                title="Sender"
                                checked={check.sender}
                                onPress={() => setCheck({...check, sender:!check.sender})}
                            />
                            <CheckBox
                                disabled={ !selectUser ? true : false }
                                containerStyle={{
                                    backgroundColor:'transparent',
                                    borderWidth:0
                                }}
                                title="Receiver"
                                checked={check.receiver}
                                onPress={() => setCheck({...check, receiver:!check.receiver})}
                            />
                        </View>
                        <View style={styles.buttons}>
                            <Button
                                dark
                                onPress={handlerFilter}                            
                                style={styles.buttonFilter}
                                >                            
                                <Text>SET FILTER</Text>
                            </Button>
                            <Button
                                dark
                                onPress={handlerCleanFilter}                            
                                style={styles.buttonFilter}
                                >                            
                                <Text>CLEAN FILTER</Text>
                            </Button>
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: 'blue', height:3 }} />
                    <List style={styles.list}>    

                    {showTransactions && showTransactions.map( e => (
                        <Fragment key={e.id}>
                        <ListItem itemDivider style={styles.divider} />
                        <ListItem>
                            <Left style={styles.card}>
                                <Text style={styles.item}><Text style={{fontWeight:'bold'}}>Sender:</Text><Text style={{fontStyle:'italic', color:'red'}}> {e.sender.email}</Text></Text>
                                <Text style={styles.item}><Text style={{fontWeight:'bold'}}>Receiver:</Text><Text style={{fontStyle:'italic'}}> {e.receiver.email}</Text></Text>
                                <Text style={styles.item}><Text style={{fontWeight:'bold'}}>Date:</Text><Text style={{fontStyle:'italic'}}> {e.createdAt.split('T')[0]}</Text></Text>
                                <Text style={styles.item}><Text style={{fontWeight:'bold'}}>Amount:</Text><Text style={{fontStyle:'italic'}}> {e.amount}</Text></Text>
                                <Text style={styles.item}><Text style={{fontWeight:'bold'}}>State:</Text><Text style={{fontStyle:'italic'}}> {e.state}</Text></Text>
                            </Left>                        
                        </ListItem>
                        </Fragment>
                    ))}
                    </List>
                </Content>
        </KeyboardAwareScrollView>    
    );
}