import React from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';


export default MenuOperation = ({navigation}) => {
  
    return (      
        <Footer>
          <FooterTab style={{backgroundColor: '#151515'}}>
            <Button vertical>
              <Icon name="apps" />
              <Text>Apps</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical active style={{backgroundColor:'#ffff6d'}}>
              <Icon style={{color:'black'}} active type='FontAwesome' name="user" />
              <Text style={{color:'black'}}>Account</Text>
            </Button>
            <Button vertical onPress={() => navigation.navigate('contacts')}>
              <Icon type='FontAwesome' name="users" />
              <Text>Contacts</Text>
            </Button>
          </FooterTab>
        </Footer>
   );
}
