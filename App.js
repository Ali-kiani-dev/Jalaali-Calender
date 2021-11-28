import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import MCalender from './screens/MCalender'
import PCalender from './screens/PCalender'
import TodoScreen from './screens/TodoScreen';


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation : "fade"
        }}
      >
        <Stack.Screen name="Miladi" component={MCalender} />
        <Stack.Screen name="Shamsi" component={PCalender} />
        <Stack.Screen name="Todo" component={TodoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
