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
  IconButton,
  Select,
  CheckIcon,
  Divider,
} from 'native-base';
import axios from 'axios';
import {LOCAL_HOST_URL} from '../../config.js';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Account_Admin = ({route}: any) => {
  const username = route.params.user_name;
  const { rate, rate_type } = route.params;
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [history, setHistory] = useState<[] | undefined>(undefined);

  useEffect(() => {
    getRecord();
  }, []);

  const setYearPicker = () => {
    const yearArray = [];
    for (let year = 1950; year <= currentYear; year++) {
      yearArray.push(year);
    }
    return yearArray;
  };

  const get1DayWorkingHours = (start, end) => {
    const elapsed = new Date(end) - new Date(start);
    const hour = (elapsed / (1000 * 60 * 60)).toFixed(1);
    return hour;
  }

  const getTotalHoursSalary = () => {
    if (history == undefined || !history.length) return;
    let totalHours = 0;
    history.map((h, idx) => {
        const elapsed = new Date(h.end_time) - new Date(h.start_time);
        const hour = (elapsed / (1000 * 60 * 60)).toFixed(1);
        totalHours += Number(hour);
    })
    const salary = getSalary(rate, rate_type, totalHours);
    return { total: totalHours, salary: salary }; 
  }

  const getSalary = (rate: number, rateType: string, totalHours: number) => {
    let salary = 0;
    if (rateType === 'hourly') {
        salary = rate * totalHours;
    }
    if (rateType === 'daily') {
        // fix later
        salary = 0;
    }
    return salary
  }

  const getRecord = () => {
    axios
      .get(`${LOCAL_HOST_URL}/getRecord/${username}`)
      .then(res => {
        setHistory(res.data);
      })
      .catch(err => {
        setHistory(undefined);
      });
  };

  const searchRecord = () => {
    if (!month || !year) return;
    axios
      .post(`${LOCAL_HOST_URL}/searchByDateYear`, {
        month,
        year,
        username,
      })
      .then(res => {
        setHistory(res.data);
      })
      .catch(() => {
        setHistory(undefined);
      });
  };

  return (
    <NativeBaseProvider>
      <Box m="5%">
        <Heading size="md" mb={2}>
          Timesheets
        </Heading>
        <HStack space={3} mb={2}>
          <Box w="40%">
            <Text>Month</Text>
            <Select
              selectedValue={month.toString()}
              minWidth="100"
              accessibilityLabel="Pick Month"
              placeholder="Pick Month"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="2" />,
              }}
              mt={1}
              onValueChange={itemValue => setMonth(Number(itemValue))}>
              {months.map((m, idx) => (
                <Select.Item label={m.toString()} value={m.toString()} />
              ))}
            </Select>
          </Box>
          <Box w="40%">
            <Text>Year</Text>
            <Select
              selectedValue={year.toString()}
              minWidth="100"
              accessibilityLabel="Pick Year"
              placeholder="Pick Year"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="2" />,
              }}
              mt={1}
              onValueChange={itemValue => setYear(Number(itemValue))}>
              {setYearPicker().map(y => (
                <Select.Item label={y.toString()} value={y.toString()}>
                  {y}
                </Select.Item>
              ))}
            </Select>
          </Box>
          <Box w="14%">
            <IconButton
              mt={4}
              backgroundColor="#1E90FF"
              borderRadius="22"
              onPress={searchRecord}
              _icon={{
                as: AntDesign,
                name: 'search1',
                color: '#fff',
                size: 6,
              }}
            />
          </Box>
        </HStack>
        <VStack mt={6} mb={2}>
          <HStack space={4} backgroundColor="#ddd" borderRadius={20}>
            <Text bold w="25%" ml={4}>
              Date
            </Text>
            <Text bold w="18%" color="#228B22">
              In
            </Text>
            <Text bold w="18%" color="#FF8C00">
              Out
            </Text>
            <Text bold w="18%" color="#B22222">
              Total
            </Text>
          </HStack>
        </VStack>
        {history ? (
          history.map((h, idx) => (
            <VStack key={idx} my={1}>
              <HStack space={4}>
                <Text w="25%" textAlign="center">
                  {moment(h.start_time).format('YYYY/MM/DD')}
                </Text>
                <Text w="18%" textAlign="center">
                  {/* {h.start_time.slice(0, -3)} */}
                  {moment(h.start_time).format('LT')}
                </Text>
                <Text w="18%" textAlign="center">
                  {h.end_time ? moment(h.end_time).format('LT') : 'NA'}
                </Text>
                <Text w="18%" textAlign="center">
                  {get1DayWorkingHours(h.start_time, h.end_time)} h
                </Text>
              </HStack>
              <Divider
                my="1"
                thickness={idx === history.length - 1 ? 3 : 1}
                _light={{
                  bg: '#DCDCDC',
                }}
              />
            </VStack>
          ))
        ) : (
          <Text textAlign="center">Not registered</Text>
        )}
        <HStack w={200} space={2}>
          <Text bold>Total: {getTotalHoursSalary()?.total} h</Text>
          <Text size="md" bold>Salary: {getTotalHoursSalary()?.salary}</Text>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default Account_Admin;
