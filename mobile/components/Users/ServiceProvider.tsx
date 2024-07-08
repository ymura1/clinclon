import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Text,
  HStack,
  VStack,
  Spacer,
  HamburgerIcon,
  AlertDialog,
  Button,
  Toast,
  Menu,
  Pressable,
} from 'native-base';
import axios from 'axios';
import {LOCAL_HOST_URL} from '../../config.js';

const ServiceProvider = (props: any) => {
  const {user, getServiceProviders, ownerEmail, setErrors} = props;
  const navigation = useNavigation();
  const cancelRef = React.useRef(null);
  const {first_name, last_name, email_address, rate, rate_type, status, shifts} = user;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const showToast = (description: string) => {
    return Toast.show({
      description: description,
      placement: 'top',
    });
  };

  const deleteServiceProvider = () => {
    axios
      .delete(`${LOCAL_HOST_URL}/user/${email_address}`)
      .then(() => {
        showToast('User has been deleted!');
        getServiceProviders();
      })
      .catch(() => {
        showToast('Failed to delete user.');
      })
      .finally(() => {
        setDeleteDialogOpen(false);
      });
  };

  return (
    <Box width="100%" borderBottomWidth="1" borderColor="muted.800" py="1.5">
      <HStack space={[2, 3]}>
        <VStack>
          <Text fontSize={16} bold>
            {first_name} {last_name}
          </Text>
          <Text fontSize={12}>
            {email_address}
          </Text>
        </VStack>
        <Spacer />
        <VStack>
          <Text
            fontSize="xs"
            color={status === 'active' ? '#3cb371' : '#FF8C00'}>
            {status}
          </Text>
        </VStack>
        <Menu
          w="190"
          trigger={triggerProps => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}>
                <HamburgerIcon size={6} />
              </Pressable>
            );
          }}>
          <Menu.Item
            onPress={() =>
              navigation.navigate('EditServiceProvider_1', {
                user,
                getServiceProviders,
                ownerEmail,
                setErrors,
              })
            }>
            Edit
          </Menu.Item>
          <Menu.Item onPress={() => setDeleteDialogOpen(true)}>
            Delete
          </Menu.Item>
          {/* <Menu.Item
            onPress={() =>
              navigation.navigate('Account_Admin', {user_name, rate, rate_type})
            }>
            Show record
          </Menu.Item> */}
        </Menu>
      </HStack>
      <HStack justifyContent="space-between">
        <VStack>
          {shifts.map((s, index) => {
            return s.day ? (
              <Text
                key={index}
                fontSize={12}
                color="coolGray.800">{`${s.day.substring(0, 3)}: ${
                s.start_time
              } - ${s.end_time}`}</Text>
            ) : (
              <Text fontSize={12} color="coolGray.800">
                Not registered
              </Text>
            );
          })}
        </VStack>
        <Text fontSize="xs">
          {`$${rate} / ${rate_type === 'hourly' ? 'hour' : 'day'}`}
        </Text>
      </HStack>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete</AlertDialog.Header>
          <AlertDialog.Body>{`Are you sure to delete ${first_name} ${last_name}? This will delete all the records of shifts of the nanny.`}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={() => deleteServiceProvider()}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
};

export default ServiceProvider;
