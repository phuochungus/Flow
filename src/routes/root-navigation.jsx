import {createStackNavigator} from '@react-navigation/stack';
import {Artist, Login, SignIn, AllAlbum, Splash, Album, Home, Playing, SearchDefault, SearchFocused, SearchResult} from '../screens';
import FONTS from '../constants/fonts';
import {SignUp} from '../screens/SignUp/SignUp';
import {Dimensions} from 'react-native';
const Stack = createStackNavigator();

export function RootNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          presentation: 'transparentModal',
          headerShown: false,
        }}
      />
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
        name = "Home"
        component={ Home }
        options={{
          presentation: 'transparentModal',
          headerTransparent: true,
          headerTintColor: 'white',
          title: null,
        }}
        />
        <Stack.Screen
          name = "Album"
          component={ Album }
          options={{
            presentation: 'transparentModal',
            headerTransparent: true,
            headerTintColor: 'white',
            title: null,
          }}
          />
      <Stack.Screen
        name="Artist"
        component={Artist}
        options={{
          presentation: 'transparentModal',
          headerTransparent: true,
          headerTintColor: 'white',
          title: null,
        }}
      />
      <Stack.Screen
        name="AllAlbum"
        component={AllAlbum}
        options={{
          presentation: 'transparentModal',
          headerTintColor: 'white',
          headerTitle: 'Danh sách Album',
          headerTitleAlign: 'center',
          headerTitleContainerStyle: {width: Dimensions.get('window').width},
          headerTitleStyle: {
            fontFamily: FONTS.RadioCanada.Medium,
            fontSize: 24,
            textTransform: 'uppercase',
            textAlign: 'center',
          },
          headerStyle: {
            backgroundColor: '#121212',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
      />
      <Stack.Screen
        name="Playing"
        component={Playing}
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
