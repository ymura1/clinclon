import React from 'react';
import {
  NativeBaseProvider,
  Box,
  Button,
  HStack,
  VStack,
  Heading,
  Text,
} from 'native-base';
import axios from 'axios';
import {LOCAL_HOST_URL} from '../../config.js';

const EditNanny_review = ({route, navigation}: any) => {
  const {
    finalShifts,
    ownerEmail,
    user_name,
    updatedUsername,
    updatedRate,
    updatedRateType,
    updatedStatus,
    getServiceProviders,
    setErrors,
  } = route.params;

  const submitForm = () => {
    axios
      .post(`${LOCAL_HOST_URL}/edit/user`, {
        ownerEmail,
        user_name,
        updatedUsername,
        updatedRate,
        updatedRateType,
        updatedStatus,
        finalShifts,
      })
      .then(res => {
        getServiceProviders();
        setErrors({ status: "success", msg: "Successfully edited!"})
        navigation.navigate('Home_Employer', {updatedUsername});
      })
      .catch(err => {
        setErrors({ status: "error", msg: "Failed to edit. Please try again!"})
        navigation.navigate('Home_Employer', {updatedUsername});
      });
  };

  return (
    <NativeBaseProvider>
      <Box m="5%">
        <Heading>Review</Heading>
        <VStack>
          <HStack>
            <Text>Username: </Text>
            <Text>{`${updatedUsername}`}</Text>
          </HStack>
          <HStack>
            <Text>Rate: </Text>
            <Text>{`$${updatedRate}`}</Text>
          </HStack>
          <HStack>
            <Text>Rate Type: </Text>
            <Text>{`${updatedRateType}`}</Text>
          </HStack>
          <HStack>
            <Text>Status: </Text>
            <Text>{`${updatedStatus}`}</Text>
          </HStack>
        </VStack>
        <Box>
          <Text>Working Days / Hours</Text>
          {finalShifts.map((f, index) => (
            <Box key={index}>
              <Text>
                {'\u2B24'} {`${f.day}   ${f.start_time} - ${f.end_time}`}
              </Text>
            </Box>
          ))}
        </Box>
        <HStack space={2} mt={10} justifyContent="center">
          <Button w="40%" variant="subtle" borderRadius={20} onPress={() => navigation.goBack()}>
            Go Back
          </Button>
          <Button w="40%" borderRadius={20} onPress={submitForm}>
            Confirm
          </Button>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default EditNanny_review;
