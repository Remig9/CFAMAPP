import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import More from '../screens/others/More';
import Profile from '../screens/others/Profile';

const Stack = createStackNavigator();

export const OtherStack = () => {
  return (
    <Stack.Navigator screenOptions={{ header: () => null}} initialRouteName="More">
      <Stack.Screen name="More" component={More} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
