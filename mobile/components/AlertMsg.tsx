import React, { useState } from 'react';
import { Box, Alert, VStack, HStack, Text, useToast } from 'native-base';

const AlertMsg = ({ msg, status }) => {
  return (
    <Alert w='100%' variant='subtle' colorScheme={status} status={status}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text>{msg}</Text>
          </HStack>
        </HStack>
      </VStack>
    </Alert>
  );
};

export default AlertMsg;
