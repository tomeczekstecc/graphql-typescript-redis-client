import { Box, Button, Flex, Link } from '@chakra-ui/core';
import NextLink from 'next/link';
import React from 'react';
import {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
} from '../generated/graphql';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  let body = null;

  //data is logging
  if (fetching) {
    body = null;

    //user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href='/login'>
          <Link mr={2} fontWeight={'bold'}>
            Login
          </Link>
        </NextLink>
        <NextLink href='/register'>
          <Link fontWeight={'bold'}> Register</Link>
        </NextLink>
      </>
    );
    // user is logged in
  } else {
    body = (
      <>
        Witaj {data?.me?.username}
        <Button
          isLoading={logoutFetching}
          onClick={() => logout()}
          variant={'link'}
          ml={5}
          mb={1}
          p={2}
          variantColor={'black'}
          opacity={0.9}
        >
          Logout
        </Button>
      </>
    );
  }

  return (
    <Flex
      bg='tomato'
      p={4}
      justifyContent={'center'}
      alignContent={'center'}
      alignItems={'center'}
    >
      <Box ml={'auto'}> {body} </Box>
    </Flex>
  );
};
