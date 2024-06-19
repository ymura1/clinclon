import React, {useState} from 'react';
import {Box, NativeBaseProvider} from 'native-base';
import ServiceProviders from './Users/ServiceProviders';
import AlertMsg from './AlertMsg';

const Home_Employer = ({route}: any) => {
  const employerEmail = route.params.employerEmail;
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
        <ServiceProviders employerEmail={employerEmail} setErrors={setErrors} />
      </Box>
    </NativeBaseProvider>
  );
};

export default Home_Employer;
