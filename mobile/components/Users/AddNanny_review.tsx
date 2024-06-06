import React, {useState, useEffect} from 'react';
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

const AddNanny_review = ({route, navigation}: any) => {
  const {
    username,
    rate,
    rateType,
    lists,
    ownerEmail,
    getUsers,
    setErrors,
  } = route.params;

  const submitForm = () => {
    axios
      .post(`${LOCAL_HOST_URL}/user`, {
        ownerEmail,
        username,
        rate,
        rateType,
        lists,
      })
      .then(res => {
        setErrors({status: 'success', msg: `Successfully added ${username}!`});
        getUsers();
        navigation.navigate('Home_admin', {username});
      })
      .catch(err => {
        setErrors({
          status: 'error',
          msg: `Failed to add ${username}. Please try again.`,
        });
        navigation.navigate('Home_admin', {username});
      });
  };

  return (
    <NativeBaseProvider>
      <Box m="5%">
        <Heading>Review</Heading>
        <VStack>
          <HStack>
            <Text>Username: </Text>
            <Text>{`${username}`}</Text>
          </HStack>
          <HStack>
            <Text>Rate: </Text>
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
        <HStack space={2}>
          <Button borderRadius={20} onPress={() => navigation.goBack()}>
            Go Back
          </Button>
          <Button borderRadius={20} onPress={submitForm}>
            Add
          </Button>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default AddNanny_review;
