'use client';

import React, { Suspense } from 'react';
import { Flex, Container } from '@chakra-ui/react';
import { useSearchParams, useRouter } from 'next/navigation';
import UserForm from '@/components/UserForm';

const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = () => {
    // Redirect to the intended destination URL
    const returnUrl = searchParams.get('returnUrl');
    router.push(returnUrl || '/information');
  };

  return (
    <Flex
      minHeight="calc(100vh - 200px)"
      alignItems="center"
      justifyContent="center"
    >
      <Container
        px={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        style={{
          backgroundColor: 'rgba(13, 27, 42, 0.85)',
        }}
      >
        <UserForm handleSubmit={handleSubmit}></UserForm>
      </Container>
    </Flex>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignIn />
    </Suspense>
  );
};

export default Page;
