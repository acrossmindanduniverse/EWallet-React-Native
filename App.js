import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import { HomeHeader, TopUpHeader, TransferHeader } from './src/screens/Components/Header';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import TopUp from './src/screens/TopUp';
import Foundation from 'react-native-vector-icons/Foundation';
import Profile from './src/screens/Profile';
import SignIn from './src/screens/SignIn';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Deals from './src/screens/Deals';
import Finance from './src/screens/Finance';
import {
  HomeHeader,
  TopUpHeader,
  TransferHeader,
  HistoryHeader,
  VoucherHeader,
  ProfileHeader,
} from './src/screens/Components/Header';
import Voucher from './src/screens/Voucher';
import VoucherDetail from './src/screens/VoucherDetail';
import Transfer from './src/screens/Transfer';
// import OtherMethods from './src/screens/OtherMethods';
import OnePlatform from './src/screens/OnePlatform';
import History from './src/screens/History';
import SplashScreen from './src/screens/Components/SplashScreen';
import HistoryDetail from './src/screens/HistoryDetail';
import EditProfile from './src/screens/EditProfile';
import EditEmail from './src/screens/EditEmail';
import EditPhone from './src/screens/EditPhone';
import OTP from './src/screens/OTP';
import SignUp from './src/screens/SignUp';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {height: 70},
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Foundation
              style={styles.scanText}
              name="home"
              color={focused ? 'rgb(86, 36, 179)' : 'grey'}
              size={35}
            />
          ),
        }}
        component={HomeScreen}
        name="Home"
      />
      <Tab.Screen
        name="Deals"
        component={Deals}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome
              style={styles.scanText}
              name="tag"
              color={focused ? 'rgb(86, 36, 179)' : 'grey'}
              size={35}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <View style={styles.scanBg}>
              <Ionicons name="scan-circle" color="rgb(86, 36, 179)" size={70} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Finance"
        component={Finance}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              backgroundColor={focused ? 'rgb(86, 36, 179)' : 'grey'}
              style={styles.financeBg}>
              <Text style={styles.financeText}>Rp</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ProfileHeader,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="person-circle"
              color={focused ? 'rgb(86, 36, 179)' : 'grey'}
              size={37}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = props => {
  const {home} = props.user;
  console.log(props.auth, 'test auth');
  return (
    <NavigationContainer>
      {props.auth.info !== null ? (
        <Stack.Navigator style={styles.tabContainer}>
          {!home && (
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              component={SplashScreen}
              name="splash"
            />
          )}
          <Stack.Screen
            options={{
              header: HomeHeader,
            }}
            component={MainStack}
            name="home"
          />
          <Stack.Screen
            options={{
              header: ProfileHeader,
            }}
            component={EditProfile}
            name="editProfile"
          />
          <Stack.Screen
            options={{
              header: ProfileHeader,
            }}
            component={EditEmail}
            name="editEmail"
          />
          <Stack.Screen
            options={{
              header: ProfileHeader,
            }}
            component={EditPhone}
            name="editPhone"
          />
          <Stack.Screen
            options={{
              header: TransferHeader,
            }}
            component={Transfer}
            name="transfer"
          />
          <Stack.Screen
            options={{
              header: TransferHeader,
            }}
            component={OnePlatform}
            name="onePlatform"
          />
          <Stack.Screen
            options={{header: HistoryHeader}}
            component={History}
            name="history"
          />
          <Stack.Screen
            options={{headerShown: false}}
            component={HistoryDetail}
            name="historyDetail"
          />
          <Stack.Screen
            options={{
              header: VoucherHeader,
            }}
            component={Voucher}
            name="voucher"
          />
          <Stack.Screen
            options={{
              header: VoucherHeader,
            }}
            component={VoucherDetail}
            name="voucherDetail"
          />
          <Stack.Screen
            options={{
              header: TopUpHeader,
            }}
            component={TopUp}
            name="topUp"
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="auth"
            component={SignIn}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            component={SignUp}
            name="signUp"
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scanBg: {
    width: 75,
    height: 75,
    bottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  financeBg: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    justifyContent: 'center',
  },
  financeText: {
    fontFamily: 'Poppins-Black',
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
  },
  iconText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  scanText: {
    borderColor: '#fff',
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, null)(App);
