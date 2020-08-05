import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Header, Content, Tab, Tabs} from 'native-base';
import ChurchEvents from './ChurchEvents';
import GlobalEvents from './GlobaEvents';
import {AppHeader2} from '../../components/components';

export default function Events({navigation}) {
  return (
    <Container>
      <AppHeader2
        lefticon="arrow-back"
        title="Events"
        onBack={() => navigation.goBack()}
      />
      <Tabs tabBarUnderlineStyle={{backgroundColor: 'red'}}>
        <Tab
          tabStyle={{backgroundColor: '#fff'}}
          activeTabStyle={{backgroundColor: '#fff'}}
          heading="Church Events"
          textStyle={{backgroundColor: '#fff'}}
          activeTextStyle={{backgroundColor: '#fff'}}>
          <ChurchEvents navigation={navigation} />
        </Tab>
        <Tab
          tabStyle={{backgroundColor: '#fff'}}
          activeTabStyle={{backgroundColor: '#fff'}}
          textStyle={{backgroundColor: '#fff'}}
          activeTextStyle={{backgroundColor: '#fff'}}
          heading="Global Events">
          <GlobalEvents navigation={navigation} />
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
