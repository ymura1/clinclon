import React, {useState} from 'react';
import axios from 'axios';
import {LOCAL_HOST_URL} from '../../config.js';
import validator from 'validator';
import {
  NativeBaseProvider,
  Box,
  FormControl,
  Input,
  Button,
  Heading,
  Text,
  Divider,
} from 'native-base';
import {PASSWORD_RULES} from '../../config.js';

const ResetPassword = ({route, navigation}: any) => {
  const ownerEmail = route.params.email;
  const [password, setPassword] = useState('');
  const [confirmdPassword, setConfirmedPassword] = useState('');
  const [inputErrors, setInputErrors] = useState({
    type: '',
    msg: '',
  });

  const validatePassword = (): boolean => {
    let error = {type: '', msg: ''};
    if (!password.length || !confirmdPassword.length) {
      error.type = 'EMPTY_PASSWORD';
      error.msg = 'Password is required';
    }
    if (!validator.isStrongPassword(password, PASSWORD_RULES)) {
      error.type = 'WEAK_PASSWORD';
      error.msg =
        'Password must contain 8 characters, 1 number, 1 upper, 1 lower';
    }
    if (password !== confirmdPassword) {
      error.type = 'PASSWORD_MISMATCH';
      error.msg = 'Password does not match';
    }
    setInputErrors(error);
    return error.type.length === 0 && error.msg.length === 0;
  };

  const resetNewPassword = () => {
    if (!validatePassword()) return;

    axios
      .post(`${LOCAL_HOST_URL}/reset/password`, {
        password,
        ownerEmail,
      })
      .then(() => {
        navigation.navigate('SignIn_Employer')
      })
      .catch(err => {
      });
  };

  return (
    <NativeBaseProvider>
      <Box m="5%">
        <Heading size="lg">Reset Password</Heading>
        <Box alignItems="center">
          <Box w="100%" maxWidth="300px" my="8">
            <FormControl
              isRequired
              isInvalid={
                inputErrors.type === 'EMPTY_PASSWORD' ||
                inputErrors.type === 'WEAK_PASSWORD'
              }>
              <FormControl.Label>New Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={val => setPassword(val)}
                placeholder="Your new password"
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
              <FormControl.Label>Confirm New Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={val => setConfirmedPassword(val)}
                placeholder="Your new password"
              />
              <FormControl.ErrorMessage>
                {inputErrors.msg}
              </FormControl.ErrorMessage>
            </FormControl>
          </Box>
          <Button onPress={resetNewPassword} w="250" borderRadius={20}>
            Reset Password
          </Button>
        </Box>
        <Divider
          my="4"
          _light={{
            bg: 'muted.400',
          }}
        />
        <Box mt="4">
          <Text fontSize="xs">
            Go back to{' '}
            <Text
              underline
              onPress={() => {
                navigation.navigate('SignIn_Employer');
              }}>
              Log in
            </Text>
          </Text>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default ResetPassword;
