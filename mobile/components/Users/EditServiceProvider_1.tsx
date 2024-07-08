import React, {useState} from 'react';
import {
  Box,
  FormControl,
  Input,
  Select,
  Button,
  NativeBaseProvider,
  HStack,
  Center,
} from 'native-base';
import validator from 'validator';

const EditServiceProvider_1 = ({route, navigation}: any) => {
  const {ownerEmail, getServiceProviders, setErrors} = route.params;
  const {
    first_name,
    last_name,
    email_address,
    rate,
    rate_type,
    status,
    shifts,
  } = route.params.user;
  const [updatedFirstName, setUpdatedFirstName] = useState(first_name);
  const [updatedLastName, setUpdatedLastName] = useState(last_name);
  const [updatedEmail, setUpdatedEmail] = useState(email_address);
  const [updatedRate, setUpdatedRate] = useState<number>(rate);
  const [updatedRateType, setUpdatedRateType] = useState(rate_type);
  const [updatedStatus, setUpdatedStatus] = useState(status);
  const [inputErrors, setInputErrors] = useState({
    type: '',
    msg: '',
  });

  const validateInput = async () => {
    let error = {type: '', msg: ''};
    if (updatedFirstName.length === 0) {
      error.type = 'EMPTY_FIRST_NAME';
      error.msg = 'First name is required';
    }
    if (updatedLastName.length === 0) {
      error.type = 'EMPTY_LAST_NAME';
      error.msg = 'Last name is required';
    }
    if (updatedEmail.length === 0) {
      error.type = 'EMPTY_EMAIL';
      error.msg = 'Email Address is required';
    }
    if (!validator.isEmail(updatedEmail)) {
      error.type = 'INVALID_EMAIL';
      error.msg = 'Email format is invalid';
    }
    if (updatedStatus.length === 0) {
      error.type = 'EMPTY_STATUS';
      error.msg = 'Status is required';
    }
    if (typeof updatedRate !== 'number') {
      error.type = 'DATA_TYPE_MISMATCH';
      error.msg = 'This field has to be numbers';
    }
    if (
      (updatedRate !== 0 && !updatedRateType) ||
      (updatedRate === 0 && updatedRateType)
    ) {
      error.type = 'MISSING_INPUT';
      error.msg = 'Please specify both rate and rate type';
    }
    setInputErrors(error);
    return error.type.length === 0 && error.msg.length === 0;
  };

  const setParams = () => {
    let params: any = {};
    if (updatedFirstName !== first_name) {
      params.first_name = updatedFirstName;
    }
    if (updatedLastName !== last_name) {
      params.last_name = updatedLastName;
    }
    if (updatedEmail !== email_address) {
      params.email_address = updatedEmail;
    }
    if (updatedRate !== rate) {
      params.rate = updatedRate;
    }
    if (updatedRateType !== rate_type) {
      params.rate_type = updatedRateType;
    }
    if (updatedStatus !== status) {
      params.status = updatedStatus;
    }
    return params;
  }

  const navigateToNext = () => {
    if (!validateInput()) return;
    const params = setParams();
    navigation.navigate('EditServiceProvider_2', {
      params,
      shifts,
      getServiceProviders,
      setErrors,
    });
  };

  return (
    <NativeBaseProvider>
      <Box m="5%">
        <Center mt={10}>
          <FormControl
            isRequired
            isInvalid={inputErrors.type == 'EMPTY_FIRST_NAME'}>
            <FormControl.Label>First Name</FormControl.Label>
            <Input
              onChangeText={val => setUpdatedFirstName(val)}
              autoCorrect={false}
              defaultValue={first_name}
            />
            <FormControl.ErrorMessage>
              {inputErrors.msg}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={inputErrors.type == 'EMPTY_LAST_NAME'}>
            <FormControl.Label>Last Name</FormControl.Label>
            <Input
              onChangeText={val => setUpdatedLastName(val)}
              autoCorrect={false}
              defaultValue={last_name}
            />
            <FormControl.ErrorMessage>
              {inputErrors.msg}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={
              inputErrors.type == 'EMPTY_EMAIL' ||
              inputErrors.type === 'INVALID_EMAIL'
            }>
            <FormControl.Label>Email Address</FormControl.Label>
            <Input
              onChangeText={val => setUpdatedEmail(val)}
              autoCapitalize="none"
              autoCorrect={false}
              defaultValue={email_address}
            />
            <FormControl.ErrorMessage>
              {inputErrors.msg}
            </FormControl.ErrorMessage>
          </FormControl>
          <HStack space={2} justifyContent="space-between">
            <FormControl
              w="48%"
              isInvalid={
                inputErrors.type == 'DATA_TYPE_MISMATCH' ||
                inputErrors.type === 'MISSING_INPUT'
              }>
              <FormControl.Label>Rate($)</FormControl.Label>
              <Input
                value={updatedRate.toString()}
                onChangeText={val => setUpdatedRate(Number(val))}
              />
              <FormControl.ErrorMessage>
                {inputErrors.msg}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              w="48%"
              isInvalid={inputErrors.type === 'MISSING_INPUT'}>
              <FormControl.Label>Rate Type</FormControl.Label>
              <Select
                selectedValue={updatedRateType}
                onValueChange={val => setUpdatedRateType(val)}>
                <Select.Item label="hourly" value="hourly" />
                <Select.Item label="daily" value="daily" />
              </Select>
            </FormControl>
          </HStack>
          <FormControl
            isRequired
            isInvalid={inputErrors.type == 'EMPTY_STATUS'}>
            <FormControl.Label>Status</FormControl.Label>
            <Select
              selectedValue={updatedStatus}
              onValueChange={val => setUpdatedStatus(val)}>
              <Select.Item label="active" value="active" />
              <Select.Item label="inactive" value="inactive" />
            </Select>
            <FormControl.ErrorMessage>
              {inputErrors.msg}
            </FormControl.ErrorMessage>
          </FormControl>
        </Center>
        <Button mt="4" onPress={navigateToNext}>
          Next
        </Button>
      </Box>
    </NativeBaseProvider>
  );
};

export default EditServiceProvider_1;
