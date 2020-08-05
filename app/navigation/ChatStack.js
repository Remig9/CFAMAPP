import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Chat from '../screens/chat/Chat';
import ChatRoom from '../screens/chat/ChatRoom';

const Stack = createStackNavigator();

export const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName="Chat">
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
};
