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
} from 'native-base';
import validator from 'validator';

const ForgotPassword = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [inputErrors, setInputErrors] = useState({
    type: '',
    msg: '',
  });

  const validateEmail = (): boolean => {
    let error = {type: '', msg: ''};
    if (!email) {
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

  const sendPasswordResetCode = () => {
    if (!validateEmail()) return;
    axios
      .post(`${LOCAL_HOST_URL}/user/reset`, {email})
      .then((res) => {
        const otp = res.data.otp;
        navigation.navigate('VerifyOTP', {email, otp});
      })
      .catch((err) => {
        const errMsg = err.response.data.error;
        setInputErrors({type: 'EMAIL_NOT_REGISTERED', msg: errMsg});
      })
  };

  const alertError = () => {
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
      {inputErrors.type === 'EMAIL_NOT_REGISTERED' && alertError()}
      <Box m="5%">
        <Heading size="lg">Reset Password</Heading>
        <Box alignItems="center">
          <Box w="100%" maxWidth="300px" my="8">
            <FormControl
              isRequired
              isInvalid={
                inputErrors.type === 'EMPTY_EMAIL' ||
                inputErrors.type === 'INVALID_EMAIL_FORMAT'
              }>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                onChangeText={val => setEmail(val)}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <FormControl.ErrorMessage>
                {inputErrors.msg}
              </FormControl.ErrorMessage>
            </FormControl>
          </Box>
          <Button
            onPress={sendPasswordResetCode}
            w="250"
            borderRadius={20}
            mb={8}>
            Send Password Reset Code
          </Button>
        </Box>
        <Divider
          my="2"
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
                navigation.navigate('SignIn');
              }}>
              Sign in
            </Text>
          </Text>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default ForgotPassword;
