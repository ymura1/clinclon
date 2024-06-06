import React, {useState, useEffect} from 'react';
import {
  Heading,
  Box,
  Button,
  VStack,
  HStack,
  NativeBaseProvider,
  IconButton,
  Text,
  Center,
  Divider,
} from 'native-base';
import axios from 'axios';
import {LOCAL_HOST_URL} from '../config.js';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Home_nanny = ({navigation, route}: any) => {
  const {username} = route.params;
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<string | Date | undefined>(
    undefined,
  );
  const [endTime, setEndTime] = useState<string | undefined>(undefined);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    getTodaysRecord();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const startRecord = () => {
    const checkedInTime = moment().format();
    setStartTime(checkedInTime);

    axios
      .post(`${LOCAL_HOST_URL}/startRecord`, {username, checkedInTime})
      .then(() => {
        navigation.navigate('CheckIn_out_complete', {
          type: 'Checked In',
          time: checkedInTime,
        });
      })
      .catch(err => {});
  };

  const endRecord = () => {
    const checkedOutTime = moment().format();
    setEndTime(checkedOutTime);
    
    axios
      .post(`${LOCAL_HOST_URL}/endRecord`, {username, checkedOutTime})
      .then(() => {
        navigation.navigate('CheckIn_out_complete', {
          type: 'Checked Out',
          time: checkedOutTime,
        });
      })
      .catch(err => {});
  };

  const getTodaysRecord = () => {
    axios
      .get(`${LOCAL_HOST_URL}/getTodaysRecord/${username}`)
      .then(res => {
        const data = res.data;
        if (data.length === 0) {
          setStartTime(undefined);
          setEndTime(undefined);
          return;
        }
        const start = data[0].start_time;
        const end = data[0].end_time;
        start == null ? setStartTime(undefined) : setStartTime(start);
        end == null ? setEndTime(undefined) : setEndTime(end);
      })
      .catch(err => console.log(err));
  };

  return (
    <NativeBaseProvider>
      <Button
        w="90"
        borderRadius={20}
        mt={4}
        position="relative"
        left="38%"
        onPress={() => navigation.navigate('Account', {username: username})}>
        Account
      </Button>
      <VStack>
        <Heading size="lg" mb={2} mt={4} textAlign="center">
          Hello {username} !
        </Heading>
        <Heading size="sm" mb={4} textAlign="center">
          {moment(currentTime).format('dddd, MMMM D, h:mm:ss a')}
        </Heading>
      </VStack>
      <Center m="5%" mt={10}>
        <HStack space={2} justifyContent="space-between">
          <Button
            w="45%"
            isDisabled={startTime !== undefined}
            onPress={startRecord}
            backgroundColor="#9acd32"
            borderRadius={10}
            p={4}>
            <IconButton
              isDisabled={startTime !== undefined}
              onPress={startRecord}
              _icon={{
                as: AntDesign,
                name: 'clockcircleo',
                color: '#fff',
                size: 10,
              }}
            />
            <Text color="#fff" textAlign="center" bold>
              Check In
            </Text>
          </Button>
          <Button
            w="45%"
            backgroundColor="#A9A9A9"
            borderRadius={10}
            p={4}
            isDisabled={startTime === undefined || endTime !== undefined}>
            <IconButton
              isDisabled={startTime === undefined || endTime !== undefined}
              onPress={endRecord}
              _icon={{
                as: AntDesign,
                name: 'logout',
                color: '#fff',
                size: 10,
              }}
            />
            <Text color="#fff" textAlign="center" bold>
              Check Out
            </Text>
          </Button>
        </HStack>
      </Center>
      <Box m="10%">
        <Text fontSize="md" mb={2} bold>
          Today's record
        </Text>
        <VStack>
          <HStack space={2} justifyContent="space-between">
            <Text color="#9acd32" bold>
              Checked In
            </Text>
            <Text>
              {startTime ? moment(startTime).format('LT') : 'Not registered'}
            </Text>
          </HStack>
        </VStack>
        <Divider my="2" />
        <VStack>
          <HStack space={2} justifyContent="space-between">
            <Text color="#ff8c00" bold>
              Checked Out
            </Text>
            <Text>{endTime ? moment(endTime).format('LT') : 'Not registered'}</Text>
          </HStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default Home_nanny;
