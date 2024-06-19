import React, {useState, useEffect} from 'react';
import {
  NativeBaseProvider,
  Box,
  Container,
  Heading,
  Button,
  Text,
  HStack,
  Icon,
  VStack,
  Center,
  ScrollView,
  Flex,
  Alert,
} from 'native-base';
import axios from 'axios';
import {LOCAL_HOST_URL} from '../../config.js';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';

const Account = ({route}: any) => {
  const username = route.params.username;
  const [userInfo, setUserInfo] = useState([]);
  const [history, setHistory] = useState<[] | undefined>(undefined);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [from, setFrom] = useState<string | undefined>(undefined);
  const [to, setTo] = useState<string | undefined>(undefined);
  const [inputErrors, setInputErrors] = useState({type: '', msg: ''});

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    axios
      .get(`${LOCAL_HOST_URL}/getUserInfo/${username}`)
      .then(res => {
        setUserInfo(res.data);
      })
      .catch(err => console.log(err));
  };

  const searchByPeriod = () => {
    if (!validateInput()) return;

    axios
      .post(`${LOCAL_HOST_URL}/searchByPeriod`, {
        from,
        to,
        username,
      })
      .then(res => {
        setHistory(res.data);
        setInputErrors({type: '', msg: ''});
      })
      .catch(err => {
        console.log(err);
      });
  };

  const validateInput = () => {
    let error = {type: '', msg: ''};
    const current = moment().format('YYYY-MM-DD');
    if (!from && !to) {
      error.type = 'EMPTY_FIELD';
      error.msg = 'Please specify the date';
    }
    if (!from) {
      setFrom(current);
    }
    if (!to) {
      setTo(current);
    }
    setInputErrors(error);
    return error.type.length === 0 && error.msg.length === 0;
  };

  const alertError = () => {
    return (
      <Alert status="error" w="100%">
        <Alert.Icon mt="1" />
        <Text fontSize="md" color="coolGray.800">
          {inputErrors.msg}
        </Text>
      </Alert>
    );
  };

  return (
    <NativeBaseProvider>
      {inputErrors.type === 'EMPTY_FIELD' && alertError()}
      <Box m="5%">
        <Box
          p={3}
          mb={4}
          borderColor="#babec5"
          borderWidth={1}
          borderRadius={8}>
          <Text bold>Working schedule</Text>
          {userInfo.map((user, index) => (
            <Text
              key={index}
              fontSize={
                13
              }>{`  ${user.day} ${user.start_time} - ${user.end_time}`}</Text>
          ))}
          <Text bold>Pay</Text>
          {userInfo.length && (
            <Text fontSize={13}>{` $${userInfo[0].rate} / ${
              userInfo[0].rate_type === 'daily' ? 'day' : 'hour'
            }`}</Text>
          )}
        </Box>
        <Box>
          <Heading size="md" mb={2}>
            Timesheets
          </Heading>
          <HStack space={3}>
            <VStack w="45%">
              <Text>From</Text>
              <Button
                backgroundColor="#F5F5F5"
                borderColor="#babec5"
                borderWidth={1}
                onPress={() => setShowFromDatePicker(true)}>
                <HStack space={2}>
                  <Text color="#808080" fontSize="12" backgroundColor="#ddd">
                    {from && `${from}`}
                  </Text>
                  <Icon
                    as={AntDesign}
                    name="down"
                    color="#000"
                    position="relative"
                    left={from ? '4' : '12'}
                  />
                </HStack>
              </Button>
              <DatePicker
                modal
                mode="date"
                open={showFromDatePicker}
                date={new Date()}
                onConfirm={time => {
                  const format = moment(time).format('YYYY-MM-DD');
                  setShowFromDatePicker(false);
                  setFrom(format);
                }}
                onCancel={() => {
                  setShowFromDatePicker(false);
                }}
              />
            </VStack>
            <VStack>
              <Text></Text>
              <Text>&#12316;</Text>
            </VStack>
            <VStack w="45%">
              <Text>To</Text>
              <Button
                backgroundColor="#F5F5F5"
                borderColor="#babec5"
                borderWidth={1}
                onPress={() => setShowToDatePicker(true)}>
                <HStack space={2}>
                  <Text color="#808080" fontSize="12" backgroundColor="#ddd">
                    {to && `${to}`}
                  </Text>
                  <Icon
                    as={AntDesign}
                    name="down"
                    color="#000"
                    position="relative"
                    left={to ? '4' : '12'}
                  />
                </HStack>
              </Button>
              <DatePicker
                modal
                mode="date"
                open={showToDatePicker}
                date={new Date()}
                onConfirm={time => {
                  const format = moment(time).format('YYYY-MM-DD');
                  setShowToDatePicker(false);
                  setTo(format);
                }}
                onCancel={() => {
                  setShowToDatePicker(false);
                }}
              />
            </VStack>
          </HStack>
          <Center>
            <Button w="50%" borderRadius={20} mt={4} onPress={searchByPeriod}>
              Search
            </Button>
          </Center>
          <VStack mt={6}>
            <HStack space={4} backgroundColor="#ddd" borderRadius={20}>
              <Text bold w="30%" ml={4}>
                Date
              </Text>
              <Text bold w="30%" color="#228B22">
                In
              </Text>
              <Text bold w="30%" color="#FF8C00">
                Out
              </Text>
            </HStack>
          </VStack>
          {history && !history.length && (
            <Center mt={4}>
              <Text>Not found</Text>
            </Center>
          )}
          {history &&
            history.map((h, index) => (
              <VStack key={index}>
                <HStack space={4}>
                  <Text w="30%">
                    {moment(h.record_date).format('YYYY/MM/DD')}
                  </Text>
                  <Text w="30%">
                    {h.start_time
                      ? moment(h.start_time).format('LT')
                      : 'Not registered'}
                  </Text>
                  <Text w="30%">
                    {h.end_time
                      ? moment(h.end_time).format('LT')
                      : 'Not registered'}
                  </Text>
                </HStack>
              </VStack>
            ))}
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default Account;
