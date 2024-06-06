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
  const correctOtp = route.params.otp;
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [otpError, setOtpError] = useState<null | string>(null);
  const otpBoxReference = useRef([]);

  useEffect(() => {
    if (otp.join("").length === 6) {
      if (Number(otp.join("")) === correctOtp) {
        navigation.navigate('ResetPassword', {email: route.params.email})
      } else {
        setOtpError('Wrong OTP, please check again');
      }
    } else {
      setOtpError(null)
    }
  }, [otp])

  const handleChange = (value: string, index: number) => {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < 5) {
      otpBoxReference.current[index + 1].focus();
    }
  };

  const handleBackspaceAndEnter = (e, index) => {
    const key = e.nativeEvent.key;
    console.log('event: ', e.nativeEvent);
    if (key === 'Backspace' && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (key === 'Enter' && e.target.value && index < 5) {
      otpBoxReference.current[index + 1].focus();
    }
  };

  const resendOtp = () => {
    axios
      .post(`${LOCAL_HOST_URL}/otp/resend`, {email: route.params.email})
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
          {otp.map((digit, index) => (
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
        {setOtpError !== null && <Text color="#ff0000" >{otpError}</Text>}
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
