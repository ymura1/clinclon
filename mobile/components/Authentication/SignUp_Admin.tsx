import React, {useState} from 'react';
import axios from 'axios';
import {LOCAL_HOST_URL} from '../../config.js';
import validator from 'validator';
import {
  NativeBaseProvider,
  Box,
  Button,
  FormControl,
  Input,
  Heading,
  Divider,
  Text,
  Alert,
  Center,
} from 'native-base';
import {PASSWORD_RULES} from '../../config.js';

const SignUp_Admin = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [inputErrors, setInputErrors] = useState({
    type: '',
    msg: '',
  });

  const signUp = () => {
    if (!validateEmail() || !validatePassword()) {
      return;
    }
    axios
      .post(`${LOCAL_HOST_URL}/signUp_admin`, {
        email,
        password,
        status: 'active',
        createDate: new Date(),
      })
      .then(res => {
        navigation.navigate('SignIn_Admin');
      })
      .catch(err => {
        const errMsg = err.response.data.error;
        const error = {type: 'SIGN_UP_ERROR', msg: errMsg};
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

  const validatePassword = () => {
    let error = {type: '', msg: ''};
    if (!password.length || !confirmedPassword.length) {
      error.type = 'EMPTY_PASSWORD';
      error.msg = 'Password is required';
    }
    if (!validator.isStrongPassword(password, PASSWORD_RULES)) {
      error.type = 'WEAK_PASSWORD';
      error.msg =
        'Password must contain 8 characters, 1 number, 1 upper, 1 lower';
    }
    if (password !== confirmedPassword) {
      error.type = 'PASSWORD_MISMATCH';
      error.msg = 'Password does not match';
    }
    setInputErrors(error);
    return error.type.length === 0 && error.msg.length === 0;
  };

  const alertSignUpError = () => {
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
      {inputErrors.type === 'SIGN_UP_ERROR' && alertSignUpError()}
      <Box m="5%">
        <Heading size="md">Sign Up</Heading>
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
              isInvalid={
                inputErrors.type === 'EMPTY_PASSWORD' ||
                inputErrors.type === 'WEAK_PASSWORD'
              }>
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
              <FormControl.HelperText>
                At least: 8 characters, 1 numbers, 1 upper, 1 lower
              </FormControl.HelperText>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={
                inputErrors.type === 'EMPTY_PASSWORD' ||
                inputErrors.type === 'PASSWORD_MISMATCH'
              }>
              <FormControl.Label>Confirm Password</FormControl.Label>
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
          <Button onPress={() => signUp()} w="150" mb={4}>
            Sign Up
          </Button>
        </Center>
        <Divider
          my="2"
          _light={{
            bg: 'muted.400',
          }}
        />
        <Box>
          <Text fontSize="xs">Already have an account?</Text>
          <Text
            underline
            fontSize="sm"
            onPress={() => navigation.navigate('SignIn_Admin')}>
            Sign In
          </Text>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default SignUp_Admin;
