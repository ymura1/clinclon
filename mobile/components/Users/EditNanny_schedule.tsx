import React, {useState, useEffect, useRef} from 'react';
import {
  NativeBaseProvider,
  Box,
  HStack,
  Heading,
  Text,
  Button,
  Center,
  FormControl,
  Select,
  CheckIcon,
} from 'native-base';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const EditNanny_schedule = ({route, navigation}: any) => {
  const {item, finalShifts, setFinalShifts} = route.params;
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const [selectedDay, setSelectedDay] = useState(item.day);
  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [endTimeOpen, setEndTimeOpen] = useState(false);
  const [startTime, setStartTime] = useState<string | Date>(item.start_time);
  const [endTime, setEndTime] = useState<string | Date>(item.end_time);
  const [inputErrors, setInputErrors] = useState({
    type: '',
    msg: '',
  });

  const convertFormat = (time: string | Date) => {
    return typeof time === 'string' ? time : moment(time).format('LT');
  };

  const validateInput = () => {
    let error = {type: "", msg: ""};
    if (startTime >= endTime) {
      error.type = 'START_END_SET_ERROR';
      error.msg = 'Please set the start time before the end time';
    }
    setInputErrors(error);
    return error.type.length === 0 && error.msg.length === 0;
  };

  const saveChanges = () => {
    if (!validateInput()) return;
    const updated = {
      day: selectedDay,
      start_time: convertFormat(startTime),
      end_time: convertFormat(endTime),
    };
    const value = finalShifts.filter(
      s =>
        s.day !== item.day &&
        s.start_time !== item.start_time &&
        s.end_time !== item.end_time,
    );
    value.push(updated);
    setFinalShifts(value);

    navigation.goBack();
  };

  return (
    <NativeBaseProvider>
      <Box m="5%">
        <Center mt={6}>
          <Text mb={6} bold fontSize={18}>{`${selectedDay.substring(
            0,
            3,
          )} : ${convertFormat(startTime)} - ${convertFormat(endTime)}`}</Text>
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
                  Modify start time
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
                <Text textAlign="center">{convertFormat(startTime)}</Text>
              </FormControl>
            </Center>
            <Center>
              <FormControl
                isRequired
                isInvalid={inputErrors.type == 'START_END_SET_ERROR'}>
                <Button variant="link" onPress={() => setEndTimeOpen(true)}>
                  Modify end time
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
                <FormControl.ErrorMessage>
                  {inputErrors.msg}
                </FormControl.ErrorMessage>
                <Text textAlign="center">{convertFormat(endTime)}</Text>
              </FormControl>
            </Center>
          </Box>
          <HStack space={2} mt={10}>
            <Button
              w="40%"
              borderRadius={20}
              variant="subtle"
              onPress={() => navigation.goBack()}>
              Back
            </Button>
            <Button w="40%" borderRadius={20} onPress={saveChanges}>
              Save
            </Button>
          </HStack>
        </Center>
      </Box>
    </NativeBaseProvider>
  );
};

export default EditNanny_schedule;
