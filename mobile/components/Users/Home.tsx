import React, {useState} from 'react';
import {
  Box,
  NativeBaseProvider,
  Heading,
  HamburgerIcon,
  HStack,
} from 'native-base';

const Home = ({route}: any) => {
  const {firstName, lastName, email} = route.params;
  const [menuOpen, setMenuOpen] = useState(false);

  const getEmployers = () => {
    // when the page is loaded, get the all employers
  }

  const press = () => {
    console.log('press')
  }

  return (
    <NativeBaseProvider>
      <Box m="5%">
        <HStack space={2}>
          <Box w="60%">
            <Heading size="2xl">
              Hi {firstName}!
            </Heading>
          </Box>
          <HamburgerIcon
            w="30%"
            size="8"
            position="relative"
            top="0"
            left="24"
            onPress={press}
          />
        </HStack>
        <Box my={10}>
            <Heading size="xs">Employer List</Heading>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default Home;
