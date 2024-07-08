import React, {useEffect, useState} from 'react';
import {LOCAL_HOST_URL} from '../../config.js';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {Box, Text, Heading, ScrollView, VStack, Button} from 'native-base';
import ServiceProvider from './ServiceProvider';
import {UserInterface, RawUserInterface} from '../../interfaces/UserInterface.js';

const ServiceProviders = ({employerEmail, setErrors}: any) => {
  const {navigate} = useNavigation();
  const [users, setUsers] = useState<UserInterface[] | []>([]);

  useEffect(() => {
    getServiceProviders();
  }, []);

  const getServiceProviders = () => {
    axios
      .get(`${LOCAL_HOST_URL}/getServiceProviders/${employerEmail}`)
      .then(res => {
        const data = processUserData(res.data);
        setUsers(data);
      })
      .catch(() => {
        setUsers([]);
      });
  };

  const processUserData = (users: RawUserInterface[]): UserInterface[] => {
    const data = users.reduce((a, b) => {
      const found = a.find((e: RawUserInterface) => e.email_address == b.email_address);
      const item = {day: b.day, start_time: b.start_time, end_time: b.end_time};
      return (
        found ? found.shifts.push(item) : a.push({...b, shifts: [item]}), a
      );
    }, []);
    for (let i = 0; i < data.length; i++) {
      sortDays(data[i]);
    }
    return data;
  };

  const sortDays = (data: UserInterface) => {
    if (data.shifts == undefined || data.shifts[0].day === null) return;
    const sorter = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 7,
    };
    return data.shifts.sort((a, b) => {
      return sorter[a.day] - sorter[b.day];
    });
  };

  return (
    <Box m="5%">
      <Heading size="lg">Nannies</Heading>
      <Box mt="4">
        {users && users.length < 1 ? (
          <Box>
            <Text>No nannies registered</Text>
          </Box>
        ) : (
          <ScrollView h="380">
            <VStack flex="1">
              {users.map((user, index) => (
                <ServiceProvider
                  key={index}
                  user={user}
                  getServiceProviders={getServiceProviders}
                  employerEmail={employerEmail}
                  setErrors={setErrors}
                />
              ))}
            </VStack>
          </ScrollView>
        )}
      </Box>
      <Button
        onPress={() =>
          navigate('AddServiceProvider_1', {
            employerEmail: employerEmail,
            setErrors: setErrors,
            getServiceProviders: getServiceProviders,
          })
        }
        size="md"
        mt={10}
        borderRadius="40">
        Add a Nanny
      </Button>
    </Box>
  );
};

export default ServiceProviders;
