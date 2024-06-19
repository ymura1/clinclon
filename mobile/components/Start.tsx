import React from 'react';
import {
  NativeBaseProvider,
  Heading,
  Button,
  Image,
  Center,
  VStack,
} from 'native-base';

const Starter = ({navigation}: any) => {
  const navigateToAdminSignIn = () => {
    navigation.navigate('SignIn_Employer');
  };

  const navigateToNannySignIn = () => {
    navigation.navigate('SignIn_Nanny');
  };

  return (
    <NativeBaseProvider>
      <Center position="relative">
        <Image
          source={{
            uri: 'https://wallpaperaccess.com/full/317501.jpg',
          }}
          alt="Alternate Text"
          size="100%"
          opacity="50"
        />
        <VStack alignItems="center" position="absolute" top="50">
          <Heading size="xl" my="10">Time Tracker</Heading>
          <Button onPress={navigateToAdminSignIn} w="150" borderRadius="40" my="5">Admin</Button>
          <Button onPress={navigateToNannySignIn} w="150" borderRadius="40" my="5">Nanny</Button>
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
};

export default Starter;
