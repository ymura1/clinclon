import React, {useState, useEffect} from 'react';
import {
  NativeBaseProvider,
  Box,
  Button,
  FormControl,
  Input,
  Select,
  HStack,
  Center,
} from 'native-base';
import axios from 'axios';
import {LOCAL_HOST_URL} from '../../config.js';
import validator from 'validator';

const AddServiceProvider_1 = ({route, navigation}: any) => {
  const {employerEmail, setErrors, getServiceProviders} = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [serviceProviderEmail, setServiceProviderEmail] = useState('');
  const [rate, setRate] = useState(0);
  const [rateType, setRateType] = useState('');
  const [inputErrors, setInputErrors] = useState({
    type: '',
    msg: '',
  });

  const validateName = (): boolean => {
    if (!firstName.length) {
      setInputErrors({
        type: 'EMPTY_FIRST_NAME',
        msg: 'First name is required',
      });
      return false;
    }
    if (!lastName.length) {
      setInputErrors({
        type: 'EMPTY_LAST_NAME',
        msg: 'Last name is required',
      });
      return false;
    }
    return true;
  };

  const validateEmail = async () => {
    if (serviceProviderEmail.length === 0) {
      setInputErrors({
        type: 'EMPTY_EMAIL',
        msg: 'Email is required',
      });
      return false;
    }
    if (!validator.isEmail(serviceProviderEmail)) {
      setInputErrors({
        type: 'INVALID_EMAIL_FORMAT',
        msg: 'Email is not valid',
      });
      return false;
    }
    return true;
  };

  const validateRate = () => {
    if (typeof rate !== 'string') return false;
    if (isNaN(rate) && isNaN(parseFloat(rate))) {
      setInputErrors({
        type: 'INVALID_RATE_FORMAT',
        msg: 'Rate must be a  number',
      });
      return false;
    }
    if (Number(rate) < 0 || Number(rate) > 32767) {
      setInputErrors({
        type: 'INVALID_NUMBER',
        msg: 'Number is invalid',
      });
      return false;
    }
    return true;
  };

  const navigateToNext = () => {
    if (!validateName() || !validateEmail() || !validateRate()) return;
    navigation.navigate('AddServiceProvider_2', {
      employerEmail,
      serviceProviderEmail,
      firstName, 
      lastName,
      rate,
      rateType,
      getServiceProviders,
      setErrors,
    });
  };

  return (
    <NativeBaseProvider>
      <Box m="5%">
        <Box mt={10}>
          <FormControl
            isRequired
            isInvalid={inputErrors.type === 'EMPTY_FIRST_NAME'}>
            <FormControl.Label>First Name</FormControl.Label>
            <Input
              onChangeText={val => setFirstName(val)}
              autoCorrect={false}
            />
            <FormControl.ErrorMessage>
              {inputErrors.msg}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={inputErrors.type === 'EMPTY_LAST_NAME'}>
            <FormControl.Label>Last Name</FormControl.Label>
            <Input onChangeText={val => setLastName(val)} autoCorrect={false} />
            <FormControl.ErrorMessage>
              {inputErrors.msg}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={
              inputErrors.type === 'EMPTY_EMAIL' ||
              inputErrors.type === 'INVALID_EMAIL_FORMAT'
            }>
            <FormControl.Label>Email Address</FormControl.Label>
            <Input
              onChangeText={val => setServiceProviderEmail(val)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormControl.ErrorMessage>
              {inputErrors.msg}
            </FormControl.ErrorMessage>
          </FormControl>
          <HStack space={2} justifyContent="center">
            <FormControl
              w="49%"
              isInvalid={
                inputErrors.type === 'INVALID_RATE_FORMAT' ||
                inputErrors.type === 'INVALID_NUMBER'
              }>
              <FormControl.Label>Rate ($)</FormControl.Label>
              <Input
                keyboardType="numeric"
                onChangeText={val => setRate(val)}
              />
              <FormControl.ErrorMessage>
                {inputErrors.msg}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl w="49%">
              <FormControl.Label>Rate Type</FormControl.Label>
              <Select onValueChange={val => setRateType(val)}>
                <Select.Item label="hourly" value="hourly" />
                <Select.Item label="daily" value="daily" />
              </Select>
            </FormControl>
          </HStack>
        </Box>
        <Center my={8}>
          <Button onPress={navigateToNext} borderRadius={20} w="60%">
            Next
          </Button>
        </Center>
      </Box>
    </NativeBaseProvider>
  );
};

export default AddServiceProvider_1;
