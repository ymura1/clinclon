import React, {useState} from 'react';
import {
  Box,
  NativeBaseProvider,
  Heading,
  HamburgerIcon,
  HStack,
  Text,
  CloseIcon,
  IconButton,
  Icon,
} from 'native-base';
import { AntDesign } from "react-native-vector-icons";

const Home = ({route}: any) => {
  const {firstName, lastName, email} = route.params;
  const [menuOpen, setMenuOpen] = useState(false);

  const getEmployers = () => {
    // when the page is loaded, get the all employers
  };

  return (
    <NativeBaseProvider>
      <Box m="5%">
        {menuOpen && (
          <Box w="250px" position="absolute" top="0" right="25px">
            {/* <Text onPress={() => console.log('hello')}>&times;</Text> */}
            <IconButton
              icon={<Icon as={Entypo} name="emoji-happy" />}
              borderRadius="full"
              _icon={{
                color: 'orange.500',
                size: 'md',
              }}
              _hover={{
                bg: 'orange.600:alpha.20',
              }}
              _pressed={{
                bg: 'orange.600:alpha.20',
                _icon: {
                  name: 'emoji-flirt',
                },
                _ios: {
                  _icon: {
                    size: '2xl',
                  },
                },
              }}
              _ios={{
                _icon: {
                  size: '2xl',
                },
              }}
            />
            <Text>See working records</Text>
            <Text>See working conditions</Text>
            <Text>Service Providers</Text>
          </Box>
        )}

        <HStack space={2}>
          <Box w="60%">
            <Heading size="2xl">Hi {firstName}!</Heading>
          </Box>
          <HamburgerIcon
            w="30%"
            size="8"
            position="relative"
            top="0"
            left="24"
            onPress={() => setMenuOpen(true)}
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
