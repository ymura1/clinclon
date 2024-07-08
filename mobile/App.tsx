/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from './components/Authentication/SignUp';
import SignIn from './components/Authentication/SignIn';
import ServiceProviders from './components/Users/ServiceProviders';
import Home_nanny from './components/Home_nanny';
import ForgotPassword from './components/Authentication/ForgotPassword';
import ResetPassword from './components/Authentication/ResetPassword';
import VerifyOTP from './components/Authentication/VerifyOTP';
import Home_Employer from './components/Home_Employer';
import Account from './components/Users/Account';
import Account_Admin from './components/Users/Account_Admin';
import AddServiceProvider_1 from './components/Users/AddServiceProvider_1';
import AddServiceProvider_2 from './components/Users/AddServiceProvider_2';
import AddServiceProvider_Review from './components/Users/AddServiceProvider_Review';
import EditServiceProvider_1 from './components/Users/EditServiceProvider_1';
import EditServiceProvider_2 from './components/Users/EditServiceProvider_2';
import EditServiceProvider_3 from './components/Users/EditServiceProvider_3';
import EditServiceProvider_review from './components/Users/EditServiceProvider_review';
import EditAddServiceProvider from './components/Users/EditAddServiceProvider';
import ServiceProvider from './components/Users/ServiceProvider';
import CheckIn_out_complete from './components/Users/CheckIn_out_complete';
import {Button} from 'react-native';

function App(): JSX.Element {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{title: '', gestureEnabled: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{title: '', gestureEnabled: false, headerLeft: () => null}}
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
          name="EditServiceProvider_1"
          component={EditServiceProvider_1}
          options={{title: 'Edit Service Provider', gestureEnabled: false}}
        />
        <Stack.Screen
          name="EditServiceProvider_2"
          component={EditServiceProvider_2}
          options={{
            title: 'Edit Service Provider',
            gestureEnabled: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="EditServiceProvider_3"
          component={EditServiceProvider_3}
          options={{
            title: 'Edit Service Provider',
            gestureEnabled: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="EditServiceProvider_review"
          component={EditServiceProvider_review}
          options={{
            title: 'Edit Service Provider',
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
          name="CheckIn_out_complete"
          component={CheckIn_out_complete}
          options={{title: '', gestureEnabled: false, headerLeft: () => null}}
        />
        <Stack.Screen
          name="EditAddServiceProvider"
          component={EditAddServiceProvider}
          options={{title: '', gestureEnabled: false, headerLeft: () => null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
