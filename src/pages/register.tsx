import React from 'react';
import { Form, Formik } from 'formik';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField ';
import { Box } from '@chakra-ui/core';
import { Button } from '@chakra-ui/core';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMAp';
import { useRouter } from 'next/dist/client/router';

interface registerProps {}

export const Register: React.FC<registerProps> = () => {
  const router  = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <>
      <Wrapper variant='small'>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register(values);
            if (response.data?.register?.errors) {
              console.log(response.data.register.errors);
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register?.user){
router.push('/')
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name='username'
                placeholder='username'
                label='Username'
              />
              <Box mt={4}>
                <InputField
                  name='password'
                  placeholder='password'
                  label='Password'
                  type='password'
                />
              </Box>
              <Button
                type='submit'
                isLoading={isSubmitting}
                mt={4}
                variantColor='teal'
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default Register;
