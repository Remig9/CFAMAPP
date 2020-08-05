import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import Welcome from '../screens/auth/Welcome';
import Forgot from '../screens/auth/Forgot';
import Confirm from '../screens/auth/ConfirmSignup';
import EnterCode from '../screens/auth/EnterCode';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Forgot" component={Forgot} />
      <Stack.Screen name="Confirm" component={Confirm} />
      <Stack.Screen name="EnterCode" component={EnterCode} />
    </Stack.Navigator>
  );
};
