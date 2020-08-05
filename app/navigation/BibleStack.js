import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BibleRead from '../screens/bible/BibleRead';
import Bible from '../screens/bible/Bible';

const Stack = createStackNavigator();

export const BibleStack = () => {
  return (
    <Stack.Navigator initialRouteName="Bible">
      <Stack.Screen
        name="Bible"
        component={Bible}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
