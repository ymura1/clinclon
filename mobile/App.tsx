/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp_Employer from './components/Authentication/SignUp_Employer';
import SignUp_Nanny from './components/Authentication/SignUp_Nanny';
import SignIn_Employer from './components/Authentication/SignIn_Employer';
import ServiceProviders from './components/Users/ServiceProviders';
import Start from './components/Start';
import Home_nanny from './components/Home_nanny';
import ForgotPassword from './components/Authentication/ForgotPassword';
import ResetPassword from './components/Authentication/ResetPassword';
import VerifyOTP from './components/Authentication/VerifyOTP';
import SignIn_Nanny from './components/Authentication/SignIn_Nanny';
import Home_Employer from './components/Home_Employer';
import Account from './components/Users/Account';
import Account_Admin from './components/Users/Account_Admin';
import AddServiceProvider_1 from './components/Users/AddServiceProvider_1';
import AddServiceProvider_2 from './components/Users/AddServiceProvider_2';
import AddServiceProvider_Review from './components/Users/AddServiceProvider_Review';
import EditNanny_username from './components/Users/EditNanny_username';
import EditNanny_schedule_home from './components/Users/EditNanny_schedule_home';
import EditNanny_schedule from './components/Users/EditNanny_schedule';
import EditNanny_review from './components/Users/EditNanny_review';
import AddNanny_schedule from './components/Users/AddNanny_schedule';
import ServiceProvider from './components/Users/ServiceProvider';
import CheckIn_out_complete from './components/Users/CheckIn_out_complete';
import {Button} from 'react-native';

function App(): JSX.Element {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} options={{title: ''}} />
        <Stack.Screen
          name="SignUp_Employer"
          component={SignUp_Employer}
          options={{title: '', gestureEnabled: false, headerLeft: () => null}}
        />
        <Stack.Screen
          name="SignUp_Nanny"
          component={SignUp_Nanny}
          options={{title: '', gestureEnabled: false}}
        />
        <Stack.Screen
          name="SignIn_Employer"
          component={SignIn_Employer}
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
          name="Home_Employer"
          component={Home_Employer}
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
          name="ServiceProviders"
          component={ServiceProviders}
          options={{
            title: 'Service Providers',
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
          name="AddServiceProvider_1"
          component={AddServiceProvider_1}
          options={{title: 'Add Service Provicer', gestureEnabled: false}}
        />
        <Stack.Screen
          name="AddServiceProvider_2"
          component={AddServiceProvider_2}
          options={{
            title: 'Add Service Provider',
            gestureEnabled: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="AddServiceProvider_Review"
          component={AddServiceProvider_Review}
          options={{
            title: 'Review',
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
          name="ServiceProvider"
          component={ServiceProvider}
          options={{
            title: 'Service Provider',
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
