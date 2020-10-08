import React, { Component } from 'react';
import { Container, Button, Icon, Segment, Content, Text } from 'native-base';

export default Transaction = () => {
  
    return (
      <Container>
        <Segment>
          <Button first>
            <Text>Tax</Text>
          </Button>
          <Button last active>
            <Text>Payments</Text>
          </Button>
        </Segment>
      </Container>
    );
}
