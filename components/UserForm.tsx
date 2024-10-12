'use client';

import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import {
  Button,
  Input,
  FormControl,
  Select,
  FormErrorMessage,
  Box,
  Heading,
} from '@chakra-ui/react';

interface Props {
  handleSubmit: () => void;
  renderingInModal?: boolean;
}

const UserForm = ({ handleSubmit, renderingInModal }: Props) => {
  const { setUser, userName, jobTitle } = useUser();
  const [newUsername, setNewUsername] = useState<string>(userName || '');
  const [newJobTitle, setNewJobTitle] = useState<string>(jobTitle || '');

  const [usernameError, setUsernameError] = useState<string | null>(null);

  const validateUsername = (value: string) => {
    let error;
    const isValid = /^[a-zA-Z0-9_-]{5,10}$/.test(value);

    if (value.trim() == '') {
      error = 'Username is required';
    } else if (!isValid) {
      error =
        'Username must be 5-10 characters and can only include letters, numbers, underscores and hyphens';
    }

    if (error) {
      setUsernameError(error);
    } else {
      setUsernameError(null);
    }
    setNewUsername(value);
  };

  const isFormValid =
    newUsername.trim() !== '' && newJobTitle.trim() !== '' && !usernameError;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      setUser(newUsername, newJobTitle);

      handleSubmit();
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      borderRadius="lg"
      paddingY={`${renderingInModal ? 10 : 50}`}
      paddingX={`${renderingInModal ? 5 : 50}`}
      display="flex"
      flexDirection="column"
    >
      {!renderingInModal && (
        <Heading mb={10} color="white">
          Sign In
        </Heading>
      )}

      <form onSubmit={onSubmit} id="userForm">
        <FormControl
          isRequired
          mb={12}
          isInvalid={!!usernameError}
          position="relative"
        >
          <Input
            placeholder="Enter username"
            value={newUsername}
            onChange={(e) => validateUsername(e.target.value)}
            aria-label="User name"
            required
            _placeholder={{ color: 'lightGray.400' }}
            color="lightGray.400"
          />
          {usernameError && (
            <FormErrorMessage
              position="absolute"
              fontSize={12}
              color="goldenYellow.500"
            >
              {usernameError}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl isRequired mb={12}>
          <Select
            placeholder="Select job title"
            aria-label="Job title"
            value={newJobTitle}
            onChange={(e) => setNewJobTitle(e.target.value)}
            color="lightGray.400"
          >
            <option value="Software Engineer">Software Engineer</option>
            <option value="Product Manager">Product Manager</option>
            <option value="Designer">Designer</option>
            <option value="QA Engineer">QA Engineer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
          </Select>
          {!newJobTitle && (
            <FormErrorMessage position="absolute" fontSize={12}>
              Job title is required
            </FormErrorMessage>
          )}
        </FormControl>
      </form>

      <Button
        type="submit"
        isDisabled={!isFormValid}
        form="userForm"
        onClick={onSubmit}
        color="black"
        bg="burntOrange.500"
        _hover={{ bg: 'burntOrange.600' }}
        alignSelf="flex-end"
      >
        {renderingInModal ? 'Update' : 'Sign In'}
      </Button>
    </Box>
  );
};

export default UserForm;
