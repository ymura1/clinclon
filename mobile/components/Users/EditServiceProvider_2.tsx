import React, {useState} from 'react';
import {
  NativeBaseProvider,
  Box,
  HStack,
  Heading,
  Text,
  Button,
} from 'native-base';

interface dayTimeObject {
  day: string;
  start_time: string;
  end_time: string;
}

const EditServiceProvider_2 = ({route, navigation}: any) => {
  const {
    params,
    shifts,
    getServiceProviders,
    setErrors,
  } = route.params;
  const [finalShifts, setFinalShifts] = useState(shifts);

  const navigateToEditPage = (item: dayTimeObject) => {
    navigation.navigate('EditServiceProvider_3', {
      item,
      finalShifts,
      setFinalShifts,
    });
  };

  const navigateToAddPage = () => {
    navigation.navigate('EditAddServiceProvider', {params, shifts, getServiceProviders, setErrors});
  };

  const navigateToReviewPage = () => {
    setParams();
    navigation.navigate('EditServiceProvider_review', {
      params,
      getServiceProviders,
      setErrors,
    });
  };

  const deleteList = (item: dayTimeObject) => {
    const result = finalShifts.filter(
      (s: dayTimeObject) => JSON.stringify(s) !== JSON.stringify(item),
    );
    setFinalShifts(result);
  };

  const setParams = () => {
    const original = sortDays(shifts);
    const updated = sortDays(finalShifts);
    if (JSON.stringify(original) !== JSON.stringify(updated)) {
      params.shifts = updated;
    }
    return params;
  }

  const sortDays = (shifts: any) => {
    if (shifts == undefined || shifts[0].day === null) return;
    const sorter = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 7,
    };
    return shifts.sort((a, b) => {
      return sorter[a.day] - sorter[b.day];
    });
  };

  return (
    <NativeBaseProvider>
      <Box m="5%">
        <Heading mb={8}>Edit schedule</Heading>
        <Button borderRadius={20} w="50%" mb={6} onPress={navigateToAddPage}>
          Add new schedule
        </Button>
        <Text ml={4}>Current schedule:</Text>
        {finalShifts.length > 0 ? (
          finalShifts.map((f, index) => (
            <HStack key={index} space={3} justifyContent="center">
              <Text pt={3} fontSize={16}>{`${f.day.substring(0, 3)} : ${
                f.start_time
              } - ${f.end_time}`}</Text>
              <Text
                pt={3}
                fontSize={14}
                underline
                color="#3b5998"
                onPress={() => navigateToEditPage(f)}>
                Edit
              </Text>
              <Text
                pt={3}
                fontSize={14}
                underline
                color="#3b5998"
                onPress={() => deleteList(f)}>
                Delete
              </Text>
            </HStack>
          ))
        ) : (
          <Text>No schedule registered</Text>
        )}
        <HStack space={2} justifyContent="center">
          <Button
            w="40%"
            variant="subtle"
            mt={10}
            borderRadius={20}
            onPress={() => navigation.goBack()}>
            Back
          </Button>
          <Button
            w="40%"
            mt={10}
            borderRadius={20}
            onPress={navigateToReviewPage}>
            Review
          </Button>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default EditServiceProvider_2;
