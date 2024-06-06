/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp_Admin from './components/Authentication/SignUp_Admin';
import SignUp_Nanny from './components/Authentication/SignUp_Nanny';
import SignIn_Admin from './components/Authentication/SignIn_Admin';
import Users from './components/Users/Users';
import Start from './components/Start';
import Home_nanny from './components/Home_nanny';
import ForgotPassword from './components/Authentication/ForgotPassword';
import ResetPassword from './components/Authentication/ResetPassword';
import VerifyOTP from './components/Authentication/VerifyOTP';
import SignIn_Nanny from './components/Authentication/SignIn_Nanny';
import Home_admin from './components/Home_admin';
import Account from './components/Users/Account';
import Account_Admin from './components/Users/Account_Admin';
import AddNanny_1 from './components/Users/AddNanny_1';
import AddNanny_2 from './components/Users/AddNanny_2';
import AddNanny_review from './components/Users/AddNanny_review';
import EditNanny_username from './components/Users/EditNanny_username';
import EditNanny_schedule_home from './components/Users/EditNanny_schedule_home';
import EditNanny_schedule from './components/Users/EditNanny_schedule';
import EditNanny_review from './components/Users/EditNanny_review';
import AddNanny_schedule from './components/Users/AddNanny_schedule';
import User from './components/Users/User';
import CheckIn_out_complete from './components/Users/CheckIn_out_complete';
import {Button} from 'react-native';

function App(): JSX.Element {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} options={{title: ''}} />
        <Stack.Screen
          name="SignUp_Admin"
          component={SignUp_Admin}
          options={{title: '', gestureEnabled: false, headerLeft: () => null}}
        />
        <Stack.Screen
          name="SignUp_Nanny"
          component={SignUp_Nanny}
          options={{title: '', gestureEnabled: false}}
        />
        <Stack.Screen
          name="SignIn_Admin"
          component={SignIn_Admin}
          options={{title: '', gestureEnabled: false}}
        />
        <Stack.Screen
          name="SignIn_Nanny"
          component={SignIn_Nanny}
          options={{title: '', gestureEnabled: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            title: 'Forgot Password',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="VerifyOTP"
          component={VerifyOTP}
          options={{
            title: 'Forgot Password',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="Home_admin"
          component={Home_admin}
          options={({navigation}) => ({
            headerTitle: 'Home',
            gestureEnabled: false,
            headerLeft: () => null,
            headerRight: () => (
              <Button
                title="Sign Out"
                onPress={() => navigation.navigate('Start')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Users"
          component={Users}
          options={{
            title: 'Users',
            gestureEnabled: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{title: 'Account', gestureEnabled: false}}
        />
        <Stack.Screen
          name="Account_Admin"
          component={Account_Admin}
          options={{title: 'Account', gestureEnabled: false}}
        />
        <Stack.Screen
          name="Home_nanny"
          component={Home_nanny}
          options={({navigation}) => ({
            headerTitle: 'Home',
            gestureEnabled: false,
            headerLeft: () => null,
            headerRight: () => (
              <Button
                title="Sign Out"
                onPress={() => navigation.navigate('Start')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddNanny_1"
          component={AddNanny_1}
          options={{title: 'Add Nanny', gestureEnabled: false}}
        />
        <Stack.Screen
          name="AddNanny_2"
          component={AddNanny_2}
          options={{
            title: 'Add Nanny',
            gestureEnabled: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="AddNanny_review"
          component={AddNanny_review}
          options={{
            title: 'Add Nanny',
            gestureEnabled: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="EditNanny_username"
          component={EditNanny_username}
          options={{title: 'Edit Nanny', gestureEnabled: false}}
        />
        <Stack.Screen
          name="EditNanny_schedule_home"
          component={EditNanny_schedule_home}
          options={{
            title: 'Edit Nanny',
            gestureEnabled: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="EditNanny_schedule"
          component={EditNanny_schedule}
          options={{
            title: 'Edit Nanny',
            gestureEnabled: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="EditNanny_review"
          component={EditNanny_review}
          options={{
            title: 'Edit Nanny',
            gestureEnabled: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={{
            title: 'User',
            gestureEnabled: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="AddNanny_schedule"
          component={AddNanny_schedule}
          options={{
            title: '',
            gestureEnabled: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="CheckIn_out_complete"
          component={CheckIn_out_complete}
          options={{title: '', gestureEnabled: false, headerLeft: () => null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
