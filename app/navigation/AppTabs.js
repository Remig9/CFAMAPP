import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';

import Dashboard from '../screens/home/Dashboard';
import Bible from '../screens/bible/Bible';
import {OfferingStack} from '../navigation/OfferingStack';
import Chat from '../screens/chat/Chat';
import {OtherStack} from '../navigation/OtherStack';
import {ChatStack} from '../navigation/ChatStack';
import {DashboardStack} from '../navigation/DashboardStack';

import Help from '../../assets/images/help.svg';
import Tithe from '../../assets/images/tithe.svg';
import Home from '../../assets/images/home.svg';
import MoreIcon from '../../assets/images/more.svg';
import BibleIcon from '../../assets/images/bible.svg';
import {BibleStack} from './BibleStack';

//stacks component

const Tabs = createBottomTabNavigator();
export const AppTabs = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          tabBarIcon: () => (
            <Image
              style={styles.iconStyle}
              source={require('../../assets/images/home-icon.png')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Bible"
        component={BibleStack}
        options={{
          tabBarIcon: () => <BibleIcon />,
        }}
      />
      <Tabs.Screen
        name="Offering"
        component={OfferingStack}
        options={{
          tabBarIcon: () => <Tithe />,
        }}
      />
      <Tabs.Screen
        name="Chat"
        component={ChatStack}
        options={{
          tabBarIcon: () => <Help />,
        }}
      />
      <Tabs.Screen
        name="More"
        component={OtherStack}
        options={{
          tabBarIcon: () => <MoreIcon />,
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    height: 26,
    width: 26,
  },
});
