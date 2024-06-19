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

const EditNanny_username = ({route, navigation}: any) => {
  const {ownerEmail, getServiceProviders, setErrors} = route.params;
  const {user_name, rate, rate_type, status, shifts} = route.params.user;
  const [updatedUsername, setUpdatedUsername] = useState(user_name);
  const [updatedRate, setUpdatedRate] = useState<number>(rate);
  const [updatedRateType, setUpdatedRateType] = useState(rate_type);
  const [updatedStatus, setUpdatedStatus] = useState(status);
  const [inputErrors, setInputErrors] = useState({
    type: '',
    msg: '',
  });

  const validateInput = async () => {
    let error = {type: '', msg: ''};
    if (updatedUsername.length === 0) {
      error.type = 'EMPTY_USERNAME';
      error.msg = 'Username is required';
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

  const navigateToNext = () => {
    if (!validateInput()) return;
    navigation.navigate('EditNanny_schedule_home', {
      ownerEmail,
      user_name,
      updatedUsername,
      updatedRate,
      updatedRateType,
      updatedStatus,
      shifts,
      setErrors,
      getServiceProviders,
    });
  }

  return (
    <NativeBaseProvider>
      <Box m="5%">
        <Center mt={10}>
          <FormControl
            isRequired
            isInvalid={inputErrors.type == 'EMPTY_USERNAME'}>
            <FormControl.Label>User Name</FormControl.Label>
            <Input
              onChangeText={val => setUpdatedUsername(val)}
              autoCapitalize="none"
              autoCorrect={false}
              defaultValue={user_name}
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

export default EditNanny_username;
