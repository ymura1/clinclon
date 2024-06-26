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
  Alert,
  Center,
  Divider,
  HStack,
} from 'native-base';

const SignIn_Nanny = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputErrors, setInputErrors] = useState({type: '', msg: ''});

  const validateUsername = (): boolean => {
    let error = {type: '', msg: ''};
    if (username.length === 0) {
      error.type = 'EMPTY_USERNAME';
      error.msg = 'Username is required';
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

  const signIn = () => {
    if (!validateUsername() || !validatePassword()) {
      return;
    }
    axios
      .post(`${LOCAL_HOST_URL}/signIn_nanny`, {username, password})
      .then(res => {
        navigation.navigate('Home_nanny', {username});
        setInputErrors({type: '', msg: ''});
      })
      .catch(err => {
        const errMsg = err.response.data.error;
        setInputErrors({type: 'SIGN_IN_ERROR', msg: errMsg});
      });
  };

  const alertSignInFailure = () => {
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
      {inputErrors.type === 'SIGN_IN_ERROR' && alertSignInFailure()}
      <Box m="5%">
        <Heading size="md">Sign In (Nanny)</Heading>
        <Center>
          <Box w="100%" maxWidth="300px" my="6">
            <FormControl
              isRequired
              isInvalid={inputErrors.type === 'EMPTY_USERNAME'}>
              <FormControl.Label>Username</FormControl.Label>
              <Input
                onChangeText={val => setUsername(val)}
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
              onPress={() => navigation.navigate('SignUp_Nanny')}>
              Set password
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

export default SignIn_Nanny;
