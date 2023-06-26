import {createStackNavigator} from '@react-navigation/stack';
import {Artist, Login, SearchDefault, SearchFocused, SearchResult, SignIn} from '../screens';
import FONTS from '../constants/fonts';
import {SignUp} from '../screens/SignUp/SignUp';

const Stack = createStackNavigator();

export function RootNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          presentation: 'transparentModal',
          title: 'TẠO TÀI KHOẢN',
          headerStyle: {
            backgroundColor: 'black',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontFamily: FONTS.RadioCanada.Medium,
            fontSize: 24,
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          presentation: 'transparentModal',
          title: 'ĐĂNG NHẬP',
          headerStyle: {
            backgroundColor: 'black',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontFamily: FONTS.RadioCanada.Medium,
            fontSize: 24,
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Artist"
        component={Artist}
        options={{
          presentation: 'transparentModal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchDefault"
        component={SearchDefault}
        options={{
          presentation: 'transparentModal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchFocused"
        component={SearchFocused}
        options={{
          presentation: 'transparentModal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{
          presentation: 'transparentModal',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
