import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Header, Content, Tab, Tabs} from 'native-base';
import ChatRoom from '../chat/ChatRoom';
import {AppHeader2} from '../../components/components';
import Colors from '../../helpers/colors';

export default function Chat({navigation}) {
  return (
    <Container>
      <AppHeader2 title="Chat" />
      <Tabs tabBarUnderlineStyle={{backgroundColor: Colors.red}}>
        <Tab
          tabStyle={{backgroundColor: '#fff'}}
          activeTabStyle={{backgroundColor: '#fff'}}
          heading="Chat Rooms"
          textStyle={{backgroundColor: '#fff'}}
          activeTextStyle={{backgroundColor: '#fff'}}>
          <ChatRoom navigation={navigation} />
        </Tab>
        {/* <Tab
          tabStyle={{backgroundColor: '#fff'}}
          activeTabStyle={{backgroundColor: '#fff'}}
          textStyle={{backgroundColor: '#fff'}}
          activeTextStyle={{backgroundColor: '#fff'}}
          heading="Video Chat">
          <VideoRoom />
        </Tab> */}
      </Tabs>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  tabStyle: {
    backgroundColor: 'white',
  },
});
