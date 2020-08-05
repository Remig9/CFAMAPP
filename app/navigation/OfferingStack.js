import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Offering from '../screens/offering/Offering';
import OfferingForm from '../screens/offering/OfferingForm';
import AddChurch from '../screens/offering/AddChurch';
import Summary from '../screens/offering/Summary';
import colors from '../helpers/colors';

const Stack = createStackNavigator();

export const OfferingStack = () => {
  return (
    <Stack.Navigator initialRouteName="Offering">
      <Stack.Screen
        name="Offering"
        component={Offering}
        options={{
          title: 'Offering',
          headerStyle: {
            backgroundColor: colors.mainColor,
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            // fontWeight: 'bold',
            fontFamily: 'Helvetica-Bold',
          },
        }}
      />
      <Stack.Screen
        name="OfferingForm"
        component={OfferingForm}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
