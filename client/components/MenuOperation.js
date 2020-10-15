import React from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';


export default MenuOperation = ({navigation}) => {
  
    return (      
        <Footer>
          <FooterTab style={{backgroundColor: '#151515'}}>
            <Button vertical>
              <Icon name="apps" style={{ color: 'white' }} />
              <Text style={{ color: 'white' }}>Apps</Text>
            </Button>
            <Button vertical>
              <Icon name="card" style={{ color: 'white' }}/>
              <Text style={{ color: 'white' }}>Cards</Text>
            </Button>
            <Button vertical active style={{backgroundColor:'#ffff6d'}}>
              <Icon style={{color:'black'}} active type='FontAwesome' name="user" />
              <Text style={{color:'black'}}>Account</Text>
            </Button>
            <Button vertical onPress={() => navigation.navigate('contacts')}>
              <Icon type='FontAwesome' name="users" style={{ color: 'white' }} />
              <Text style={{ color: 'white' }}>Contacts</Text>
            </Button>
          </FooterTab>
        </Footer>
   );
}

