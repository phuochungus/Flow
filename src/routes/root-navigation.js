import { createStackNavigator } from '@react-navigation/stack';
import { Login, SignIn } from '../screens';
import FONTS from '../constants/fonts';

const Stack = createStackNavigator();

export function RootNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{
        title: 'ĐĂNG NHẬP',
        headerStyle: {
          backgroundColor: 'black',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,

        },
        headerTitleStyle:
        {
          fontFamily: FONTS.RadioCanada.Medium,
          fontSize: 24
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center'
      }} />
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

