import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../screens/home/Dashboard';
import colors from '../helpers/colors';

const Stack = createStackNavigator();

export const DashboardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CAFAM"
        options={{
          title: 'CAFAM Church',
          headerStyle: {
            backgroundColor: colors.mainColor,
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 24,
            fontFamily: 'Helvetica-Bold',
          },
        }}
        component={Dashboard}
      />
    </Stack.Navigator>
  );
};
