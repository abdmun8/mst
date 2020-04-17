import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// screen
import TCARHeader from './form/TCARHeader';
// stack
const Stack = createStackNavigator();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TCARHeader">
        <Stack.Screen
          name="TCARHeader"
          component={TCARHeader}
          options={{title: 'TCAR'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
