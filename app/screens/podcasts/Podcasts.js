import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Header, Content, Tab, Tabs} from 'native-base';
import Video from './Video';
import Audio from './Audio';
import {AppHeader2} from '../../components/components';
import Colors from '../../helpers/colors';

export default function Podcasts({navigation}) {
  return (
    <Container>
      <AppHeader2
        lefticon="arrow-back"
        title="Podcasts"
        onBack={() => navigation.goBack()}
      />
      <Tabs tabBarUnderlineStyle={{backgroundColor: Colors.red}}>
        <Tab
          tabStyle={{backgroundColor: '#fff'}}
          activeTabStyle={{backgroundColor: '#fff'}}
          heading="Audio"
          textStyle={{backgroundColor: '#fff'}}
          activeTextStyle={{backgroundColor: '#fff'}}>
          <Audio navigation={navigation} />
        </Tab>
        <Tab
          tabStyle={{backgroundColor: '#fff'}}
          activeTabStyle={{backgroundColor: '#fff'}}
          textStyle={{backgroundColor: '#fff'}}
          activeTextStyle={{backgroundColor: '#fff'}}
          heading="Video">
          <Video navigation={navigation} />
        </Tab>
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
