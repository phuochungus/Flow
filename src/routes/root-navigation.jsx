import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Artist,
  Login,
  SignIn,
  AllAlbum,
  Splash,
  Album,
  Home,
  Playing,
  SearchDefault,
  SearchFocused,
  SearchResult,
  Favourite,
  SignUp,
} from '../screens';
import FONTS from '../constants/fonts';
import {Dimensions, View} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={Splash}
      sceneContainerStyle={{
        backgroundColor: 'transparent',
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Favourite') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <MaskedView
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingBottom: 0,
                marginBottom: 0,
              }}
              maskElement={
                <View
                  style={{
                    backgroundColor: 'transparent',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Icons name={iconName} size={28} color="white" />
                </View>
              }>
              <LinearGradient
                colors={
                  focused ? ['#0085FF', '#E70DFB'] : ['#B1B5BB', '#B1B5BB']
                }
                locations={[0, 1]}
                angleCenter={{x: 0.5, y: 0.5}}
                useAngle={true}
                angle={55.82}
                style={{flex: 1}}
              />
            </MaskedView>
          );
        },
        tabBarStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          borderTopWidth: 0,
          backgroundColor: '#121212',
        },
        headerTitleAlign: 'center',
        tabBarShowLabel: false,
        tabBarItemStyle: {
          marginHorizontal: 5,
        },
      })}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{presentation: 'transparentModal', headerShown: false}}
      />
      <Tab.Screen
        name="Search"
        component={SearchDefault}
        options={{presentation: 'transparentModal', headerShown: false}}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          presentation: 'transparentModal',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

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
        name="Home"
        component={TabNavigation}
        options={{
          presentation: 'transparentModal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Album"
        component={Album}
        options={{
          presentation: 'transparentModal',
          headerShown: false,
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
        component={TabNavigation}
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
