import React, {useState} from 'react';
import {Box, NativeBaseProvider} from 'native-base';
import Users from './Users/Users';
import AlertMsg from './AlertMsg';

const Home_admin = ({route}: any) => {
  const email = route.params.ownerEmail;
  const [errors, setErrors] = useState({status: '', msg: ''});

  setTimeout(() => {
    if (errors.status) {
      setErrors({status: '', msg: ''});
    }
  }, 5000);

  return (
    <NativeBaseProvider>
      {errors.status && <AlertMsg status={errors.status} msg={errors.msg} />}
      <Box m="5%">
        <Users email={email} setErrors={setErrors} />
      </Box>
    </NativeBaseProvider>
  );
};

export default Home_admin;
