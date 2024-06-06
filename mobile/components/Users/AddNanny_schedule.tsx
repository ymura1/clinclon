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
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const AddNanny_schedule = ({route, navigation}: any) => {
  const {finalShifts, setFinalShifts} = route.params;
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
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [endTimeOpen, setEndTimeOpen] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    type: '',
    msg: '',
  });

  const validateInput = () => {
    let error = {type: '', msg: ''};
    if (selectedDay.length < 1) {
      error.type = 'EMPTY_DAY';
      error.msg = 'Please set the day';
    }
    if (startTime.length < 1) {
      error.type = 'EMPTY_START_TIME';
      error.msg = 'Please set the start time';
    }
    if (endTime.length < 1) {
      error.type = 'EMPTY_END_TIME';
      error.msg = 'Please set the end time';
    }
    if (startTime >= endTime) {
      error.type = 'START_END_SET_ERROR';
      error.msg = 'Please set the start time before the end time';
    }
    if (isDayDuplicated(finalShifts)) {
      error.type = 'DUPLICATE_INPUT';
      error.msg = `${selectedDay} is already registered.`;
    }
    setInputErrors(error);
    return error.type.length === 0 && error.msg.length === 0;
  };

  const isDayDuplicated = shifts => {
    return finalShifts.some(e => e.day === selectedDay);
  };

  const convertFormat = (time: string | Date) => {
    return typeof time === 'string' ? time : moment(time).format('LT');
  };

  const addSchedule = () => {
    if (!validateInput()) return;
    const newValue = {
      day: selectedDay,
      start_time: convertFormat(startTime),
      end_time: convertFormat(endTime),
    };
    setFinalShifts(s => [...s, newValue]);

    navigation.goBack();
  };

  return (
    <NativeBaseProvider>
      <Box m="5%">
        <Heading>Add Nanny's schedule</Heading>
        <Text mt={2}>Select a day, then start time and end time</Text>
        <Center mt={8}>
          <Box maxW="300">
            <Center>
              <FormControl
                isRequired
                isInvalid={
                  inputErrors.type === 'EMPTY_DAY' ||
                  inputErrors.type === 'DUPLICATE_INPUT'
                }>
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
                <FormControl.ErrorMessage>
                  {inputErrors.msg}
                </FormControl.ErrorMessage>
              </FormControl>
            </Center>
            <Center>
              <FormControl isRequired isInvalid={startTime.length < 1}>
                <Button variant="link" onPress={() => setStartTimeOpen(true)}>
                  Pick start time
                </Button>
                <FormControl.ErrorMessage>
                  {inputErrors.msg}
                </FormControl.ErrorMessage>
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
                  <Text textAlign="center">{convertFormat(startTime)}</Text>
                )}
              </FormControl>
            </Center>
            <Center>
              <FormControl
                isRequired
                isInvalid={
                  inputErrors.type === 'EMPTY_END_TIME' ||
                  inputErrors.type == 'START_END_SET_ERROR'
                }>
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
                  <Text textAlign="center">{convertFormat(endTime)}</Text>
                )}
                <FormControl.ErrorMessage>
                  {inputErrors.msg}
                </FormControl.ErrorMessage>
              </FormControl>
            </Center>
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
          <HStack space={2} justifyContent="center" mt={10}>
            <Button
              w="40%"
              borderRadius={20}
              variant="subtle"
              onPress={() => navigation.goBack()}>
              Go Back
            </Button>
            <Button w="40%" borderRadius={20} onPress={addSchedule}>
              Add
            </Button>
          </HStack>
        </Center>
      </Box>
    </NativeBaseProvider>
  );
};

export default AddNanny_schedule;
