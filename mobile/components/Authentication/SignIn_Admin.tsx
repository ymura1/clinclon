import React, {useState} from 'react';
import axios from 'axios';
import {LOCAL_HOST_URL} from '../../config.js';
import {
  NativeBaseProvider,
  Box,
  FormControl,
  Input,
  Button,
  Heading,
  Text,
  Divider,
  Alert,
  HStack,
  Center,
} from 'native-base';
import validator from 'validator';

const SignIn_Admin = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputErrors, setInputErrors] = useState({
    type: '',
    msg: '',
  });

  const signIn = () => {
    if (!validateEmail() || !validatePassword()) {
      return;
    }
    axios
      .post(`${LOCAL_HOST_URL}/signIn_admin`, {
        email,
        password,
      })
      .then(() => {
        navigation.navigate('Home_admin', {ownerEmail: email});
      })
      .catch(err => {
        const errMsg = err.response.data.error;
        const error = {type: 'SIGN_IN_ERROR', msg: errMsg};
        setInputErrors(error);
      });
  };

  const validateEmail = (): boolean => {
    let error = {type: '', msg: ''};
    if (email.length === 0) {
      error.type = 'EMPTY_EMAIL';
      error.msg = 'Email is required';
    }
    if (!validator.isEmail(email)) {
      error.type = 'INVALID_EMAIL_FORMAT';
      error.msg = 'Email is not valid';
    }
    setInputErrors(error);
    return error.type.length === 0 && error.msg.length === 0;
  };

  const validatePassword = (): boolean => {
    let error = {type: '', msg: ''};
    if (password.length === 0) {
      error.type = 'EMPTY_PASSWORD';
      error.msg = 'Password is required';
    }
    setInputErrors(error);
    return error.type.length === 0 && error.msg.length === 0;
  };

  const alertSignInError = () => {
    return (
      <Alert status="error" w="100%">
        <Alert.Icon mt="1" />
        <Text fontSize="md" color="coolGray.800">
          {inputErrors.msg}
        </Text>
      </Alert>
    );
  };

  return (
    <NativeBaseProvider>
      {inputErrors.type === 'SIGN_IN_ERROR' && alertSignInError()}
      <Box m="5%">
        <Heading size="md">Sign In (Admin)</Heading>
        <Center>
          <Box w="100%" maxWidth="300px" my="6">
            <FormControl
              isRequired
              isInvalid={
                inputErrors.type === 'EMPTY_EMAIL' ||
                inputErrors.type === 'INVALID_EMAIL_FORMAT'
              }>
              <FormControl.Label>Email Address</FormControl.Label>
              <Input
                onChangeText={val => setEmail(val)}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <FormControl.ErrorMessage>
                {inputErrors.msg}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={inputErrors.type === 'EMPTY_PASSWORD'}>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={val => setPassword(val)}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <FormControl.ErrorMessage>
                {inputErrors.msg}
              </FormControl.ErrorMessage>
            </FormControl>
          </Box>
          <Button borderRadius={20} onPress={signIn} w="150" mb={4}>
            Sign In
          </Button>
        </Center>
        <Divider
          my="2"
          _light={{
            bg: 'muted.400',
          }}
        />
        <HStack space={2} justifyContent="space-between">
          <Box>
            <Text fontSize="xs">New user?</Text>
            <Text
              underline
              fontSize="sm"
              onPress={() => navigation.navigate('SignUp_Admin')}>
              Sign Up
            </Text>
          </Box>
          <Box>
            <Text fontSize="xs">Forget Password?</Text>
            <Text
              underline
              fontSize="sm"
              onPress={() => navigation.navigate('ForgotPassword')}>
              Reset password
            </Text>
          </Box>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default SignIn_Admin;
