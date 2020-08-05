import React, {useContext} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import SelectChurch from '../screens/onboard/SelectChurch';
import JoinChurch from '../screens/onboard/JoinChurch';

const Stack = createStackNavigator();

export const OnboardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="JoinChurch"
        options={{headerShown: false}}
        component={JoinChurch}
      />

      <Stack.Screen
        name="SelectChurch"
        options={{headerShown: false}}
        component={SelectChurch}
      />
    </Stack.Navigator>
  );
};
