import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {LOCAL_HOST_URL} from '../../config.js';
import {
  NativeBaseProvider,
  Box,
  Heading,
  Input,
  HStack,
  Text,
} from 'native-base';

const VerifyOTP = ({route, navigation}: any) => {
  const { firstName, lastName, email, password, otp } = route.params;
  const [input, setInput] = useState(new Array(6).fill(''));
  const [inputError, setInputError] = useState<null | string>(null);
  const otpBoxReference = useRef([]);
  console.log(typeof otp)

  useEffect(() => {
    if (input.join("").length === 6) {
      if (input.join("") === otp) {
        signUp();
      } else {
        setInputError('Wrong OTP, please check again');
      }
    } else {
      setInputError(null)
    }
  }, [input])

  const signUp = () => {
    axios.post(`${LOCAL_HOST_URL}/signUp`, {
      firstName, lastName, email, password
    })
    .then((res) => {
      navigation.navigate('Home', {firstName, lastName, email})
    })
  }

  const handleChange = (value: string, index: number) => {
    let newArr = [...input];
    newArr[index] = value;
    setInput(newArr);

    if (value && index < 5) {
      otpBoxReference.current[index + 1].focus();
    }
  };

  const handleBackspaceAndEnter = (e, index) => {
    const key = e.nativeEvent.key;

    if (key === 'Backspace' && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (key === 'Enter' && e.target.value && index < 5) {
      otpBoxReference.current[index + 1].focus();
    }
  };

  const resendOtp = () => {
    axios
      .post(`${LOCAL_HOST_URL}/resendOTP`, {email: route.params.email})
      .then(() => {})
      .catch(() => {});
  };

  return (
    <NativeBaseProvider>
      <Box m="5%" h="100%">
        <Heading size="lg" h="10%">
          Verification code
        </Heading>
        <Text>We have sent the verification code to your email address</Text>
        <HStack
          space={6}
          justifyContent="center"
          alignItems="center"
          mt={8}
          h="10%">
          {input.map((digit, index) => (
            <Input
              key={index}
              value={digit}
              w="10%"
              h="70%"
              fontSize={18}
              onChangeText={e => handleChange(e, index)}
              onKeyPress={e => handleBackspaceAndEnter(e, index)}
              ref={reference => (otpBoxReference.current[index] = reference)}
            />
          ))}
        </HStack>
        {inputError !== null && <Text color="#ff0000" >{inputError}</Text>}
        <Text my={4}>
          Didn't receive a code?{' '}
          <Text underline color="#1E90FF" onPress={resendOtp}>
            Resend
          </Text>
        </Text>
      </Box>
    </NativeBaseProvider>
  );
};

export default VerifyOTP;
