import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from '../screens';

const Stack = createStackNavigator();

export function RootNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

