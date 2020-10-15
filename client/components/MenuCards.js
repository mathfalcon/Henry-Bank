import React from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
function MenuCards() {
    return (
      <Container>
        <Header />
        <Content />
        <Footer>
          <FooterTab style={{backgroundColor: 'black'}}>
            <Button vertical>
              <Icon name="download" style={{ color: 'white' }} />
              <Text style={{ color: 'white' }}>recharge</Text>
            </Button>
            <Button vertical >
              <Icon active name="send" style={{ color: 'white' }} />
              <Text style={{ color: 'white' }}>Send</Text>
            </Button>
            <Button vertical>
              <Icon name="trending-up" style={{ color: 'white' }} />
              <Text style={{ color: 'white' }}>Statistics</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
}

export default MenuCards;