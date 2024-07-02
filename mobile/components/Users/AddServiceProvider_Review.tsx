import React, {useState, useEffect} from 'react';
import {
  NativeBaseProvider,
  Box,
  Button,
  HStack,
  VStack,
  Heading,
  Text,
  Divider,
} from 'native-base';
import axios from 'axios';
import {LOCAL_HOST_URL} from '../../config.js';

const AddServiceProvider_Review = ({route, navigation}: any) => {
  const {
    employerEmail,
    firstName,
    lastName,
    rate,
    rateType,
    lists,
    serviceProviderEmail,
    getServiceProviders,
    setErrors,
  } = route.params;

  const submitForm = () => {
    axios
      .post(`${LOCAL_HOST_URL}/addServiceProvider`, {
        firstName,
        lastName,
        serviceProviderEmail,
        employerEmail,
        rate,
        rateType,
        lists,
      })
      .then(res => {
        setErrors({status: 'success', msg: `Successfully added ${firstName} ${lastName}!`});
        getServiceProviders();
        navigation.navigate('Home_Employer', {employerEmail});
      })
      .catch(err => {
        setErrors({
          status: 'error',
          msg: `Failed to add ${firstName} ${lastName}. Please try again.`,
        });
        navigation.navigate('Home_Employer', {employerEmail});
      });
  };

  return (
    <NativeBaseProvider>
      <Box m="5%">
        <Heading>Review</Heading>
        <VStack>
          <HStack>
            <Text>Email address: </Text>
            <Text>{`${serviceProviderEmail}`}</Text>
          </HStack>
          <HStack>
            <Text>First Name: </Text>
            <Text>{`${firstName}`}</Text>
          </HStack>
          <HStack>
            <Text>Last Name: </Text>
            <Text>{`${lastName}`}</Text>
          </HStack>
          <HStack>
            <Text>Rate ($): </Text>
            <Text>{`${rate}`}</Text>
          </HStack>
          <HStack>
            <Text>Rate Type: </Text>
            <Text>{`${rateType}`}</Text>
          </HStack>
        </VStack>
        <Box>
          <Text>Working Days / Hours</Text>
          {lists.map((list, index) => (
            <Box key={index}>
              <Text>
                {'\u2B24'} {`${list.day}   ${list.start} - ${list.end}`}
              </Text>
            </Box>
          ))}
        </Box>
        <Divider
            my="4"
            _light={{
              bg: 'muted.800',
            }}
            _dark={{
              bg: 'muted.50',
            }}
          />
        <HStack space={2} w="100%" justifyContent="space-around">
          <Button w="40%" borderRadius={20} onPress={() => navigation.goBack()}>
            Go Back
          </Button>
          <Button w="40%" borderRadius={20} onPress={submitForm}>
            Add
          </Button>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default AddServiceProvider_Review;
