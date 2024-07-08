import React from 'react';
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

const EditServiceProvider_review = ({route, navigation}: any) => {
  console.log('final route params', route.params.params);
  const {params, getServiceProviders, setErrors} = route.params;

  const submitForm = () => {
    axios
      .post(`${LOCAL_HOST_URL}/edit/serviceProvider`, {
        params,
      })
      .then(res => {
        getServiceProviders();
        setErrors({status: 'success', msg: 'Successfully edited!'});
        // navigation.navigate('Home_Employer', {updatedEmail});
      })
      .catch(err => {
        setErrors({status: 'error', msg: 'Failed to edit. Please try again!'});
        // navigation.navigate('Home_Employer', {updatedEmail});
      });
  };

  return (
    <NativeBaseProvider>
      <Box m="5%">
        <Heading>Review Changes</Heading>
        <VStack my={4}>
          {route.params.params.first_name && (
            <Box>
              <HStack space={3}>
                <Text w="30%">First Name</Text>
                <Text w="30%">{`${route.params.params.first_name}`}</Text>
                <Text w="30%" color="#3b5998" underline>
                  Modify
                </Text>
              </HStack>
              <Divider />
            </Box>
          )}
          {route.params.params.last_name && (
            <Box>
              <HStack space={3}>
                <Box w="30%">
                  <Text fontSize={13}>Last Name</Text>
                </Box>
                <Box w="43%">
                  <Text
                    fontSize={13}>{`${route.params.params.last_name}`}</Text>
                </Box>
                <Box w="20%">
                  <Text
                    color="#3b5998"
                    underline
                    textAlign="right"
                    fontSize={13}>
                    Modify
                  </Text>
                </Box>
              </HStack>
              <Divider />
            </Box>
          )}
          {route.params.params.email_address && (
            <Box>
              <HStack space={3}>
                <Box w="30%">
                  <Text fontSize={13}>Email Address</Text>
                </Box>
                <Box w="43%">
                  <Text
                    fontSize={
                      13
                    }>{`${route.params.params.email_address}`}</Text>
                </Box>
                <Box w="20%">
                  <Text
                    color="#3b5998"
                    underline
                    textAlign="right"
                    fontSize={13}>
                    Modify
                  </Text>
                </Box>
              </HStack>
              <Divider />
            </Box>
          )}
          {route.params.params.status && (
            <Box>
              <HStack space={3}>
                <Text>Status</Text>
                <Text>{`${route.params.params.status}`}</Text>
                <Text color="#3b5998" underline>
                  Modify
                </Text>
              </HStack>
              <Divider />
            </Box>
          )}
          {route.params.params.shifts && (
            <Box>
              {route.params.params.shifts.map((s, index) => (
                <HStack space={3} key={index}>
                  <Box w="30%">
                    <Text fontSize={13}>Shifts</Text>
                  </Box>
                  <Box w="43%">
                    <Text fontSize={13}>{`${s.day}   ${s.start_time} - ${s.end_time}`}</Text>
                  </Box>
                </HStack>
              ))}
            </Box>
          )}
        </VStack>
        {/* <Box>
          <Text>Working Days / Hours</Text>
          {finalShifts.map((f, index) => (
            <Box key={index}>
              <Text>
                {'\u2B24'} {`${f.day}   ${f.start_time} - ${f.end_time}`}
              </Text>
            </Box>
          ))}
        </Box> */}
        <HStack space={2} mt={10} justifyContent="center">
          <Button
            w="40%"
            variant="subtle"
            borderRadius={20}
            onPress={() => navigation.goBack()}>
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

export default EditServiceProvider_review;
