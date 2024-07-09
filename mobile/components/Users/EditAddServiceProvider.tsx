import React, {useState, useEffect} from 'react';
import {
  NativeBaseProvider,
  Box,
  Center,
  Button,
  FormControl,
  Select,
  HStack,
  Heading,
  Text,
  CheckIcon,
  Divider,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const EditAddServiceProvider = ({route, navigation}: any) => {
const {params, shifts, getServiceProviders, setErrors} = route.params;
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const [selectedDay, setSelectedDay] = useState('');
  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [endTimeOpen, setEndTimeOpen] = useState(false);
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  const [endTime, setEndTime] = useState<Date | undefined>(undefined);
  const [lists, setLists] = useState([]);
  const [inputErrors, setInputErrors] = useState({
    type: '',
    msg: '',
  });

  const validateInput = () => {
    let error = {type: '', msg: ''};
    if (startTime >= endTime) {
      error.type = 'START_END_SET_ERROR';
      error.msg = 'Please set the start time before the end time';
    }
    setInputErrors(error);
    return error.type.length === 0 && error.msg.length === 0;
  };

  const clearInput = () => {
    setSelectedDay('');
    setStartTime(undefined);
    setEndTime(undefined);
    setInputErrors({type: '', msg: ''});
  };

  const addToLists = () => {
    if (!validateInput()) {
      return;
    }

    const data = {
      day: selectedDay,
      start: moment(startTime).format('LT'),
      end: moment(endTime).format('LT'),
    };
    setLists(l => [...l, data]);
    clearInput();
  };

  const deleteList = list => {
    setLists(l =>
      l.filter(
        item =>
          item.day !== list.day &&
          item.start !== list.start &&
          item.end !== list.end,
      ),
    );
  };

  const navigateToNext = () => {
    navigation.navigate('EditServiceProvider_3', {
    //   employerEmail,
    //   serviceProviderEmail,
    //   firstName,
    //   lastName,
    //   rate,
    //   rateType,
    //   lists,
    //   getServiceProviders,
    //   setErrors,
    });
  };

  return (
    <NativeBaseProvider>
      <Box m="5%">
        <Heading>Assign schedule</Heading>
        <Text mt={2}>Select a day, then start time and end time</Text>
        <Center mt={8}>
          <Box maxW="300">
            <Center>
              <FormControl isRequired>
                <Select
                  mb={4}
                  selectedValue={selectedDay}
                  minWidth="200"
                  accessibilityLabel="Choose Day"
                  placeholder="Choose Day"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={itemValue => setSelectedDay(itemValue)}>
                  {days.map((d, index) => (
                    <Select.Item key={index} label={d} value={d} />
                  ))}
                </Select>
              </FormControl>
            </Center>
            <Center>
              <FormControl isRequired>
                <Button variant="link" onPress={() => setStartTimeOpen(true)}>
                  Pick start time
                </Button>
                <DatePicker
                  modal
                  mode="time"
                  open={startTimeOpen}
                  date={new Date()}
                  onConfirm={time => {
                    setStartTimeOpen(false);
                    setStartTime(time);
                  }}
                  onCancel={() => {
                    setStartTimeOpen(false);
                  }}
                />
                {startTime && (
                  <Text textAlign="center">
                    {moment(startTime).format('LT')}
                  </Text>
                )}
                <FormControl.ErrorMessage>
                  {inputErrors.msg}
                </FormControl.ErrorMessage>
              </FormControl>
            </Center>
            <Center>
              <FormControl
                isRequired
                isInvalid={inputErrors.type == 'START_END_SET_ERROR'}>
                <Button variant="link" onPress={() => setEndTimeOpen(true)}>
                  Pick end time
                </Button>
                <DatePicker
                  modal
                  mode="time"
                  open={endTimeOpen}
                  date={new Date()}
                  onConfirm={time => {
                    setEndTimeOpen(false);
                    setEndTime(time);
                  }}
                  onCancel={() => {
                    setEndTimeOpen(false);
                  }}
                />
                {endTime && (
                  <Text textAlign="center">{moment(endTime).format('LT')}</Text>
                )}
                <FormControl.ErrorMessage>
                  {inputErrors.msg}
                </FormControl.ErrorMessage>
              </FormControl>
            </Center>
            {selectedDay && startTime && endTime && (
              <Button onPress={addToLists} borderRadius={20} my={4}>
                Add
              </Button>
            )}
          </Box>
          <Divider
            my="2"
            _light={{
              bg: 'muted.800',
            }}
            _dark={{
              bg: 'muted.50',
            }}
          />
          <ScrollView>
            {lists.map((list, index) => (
              <HStack key={index}>
                <Text p={4}>
                  {'\u2B24'} {`${list.day}   ${list.start} - ${list.end}`}
                </Text>
                <Text
                  p={4}
                  underline
                  color="#0e7490"
                  onPress={() => deleteList(list)}>
                  Delete
                </Text>
              </HStack>
            ))}
          </ScrollView>
          <HStack space={2} my={4} w="90%" justifyContent="space-around">
            <Button
              borderRadius={20}
              onPress={() => navigation.goBack()}
              w="40%">
              Go Back
            </Button>
            <Button borderRadius={20} onPress={navigateToNext} w="40%">
              Next
            </Button>
          </HStack>
        </Center>
      </Box>
    </NativeBaseProvider>
  );
};

export default EditAddServiceProvider;
