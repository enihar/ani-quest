'use client';

import Link from 'next/link';
import {
  Button,
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
} from '@chakra-ui/react';
import { SettingsIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserModal from '@/components/UserModal';
import { useUser } from '@/context/UserContext';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const router = useRouter();

  const { userName, jobTitle, clearUser } = useUser();

  useEffect(() => {
    setIsLoadingUser(false);
  }, [userName]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSignOut = () => {
    clearUser();

    router.push('/sign-in');
  };

  return (
    <nav className="flex justify-between items-center py-4">
      <Link
        href="/"
        className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-red-400 to-purple-400"
      >
        AniQuest
      </Link>

      {isLoadingUser ? (
        <></>
      ) : userName ? (
        <Menu aria-label="User Profile Menu">
          <MenuButton
            as={IconButton}
            icon={<Avatar name={userName} />}
            variant="ghost"
            _hover={{ bg: '#2F2F2F' }}
            _active={{ bg: '#2F2F2F' }}
            aria-label="User Profile"
            id="actions-menu"
          ></MenuButton>

          <MenuList
            bg="rgba(13, 27, 42)"
            color="white"
            p="4"
            borderRadius={15}
            aria-labelledby="actions-menu"
            aria-label="Actions Menu"
          >
            <Box px="3" py="2" textAlign="center">
              <Box fontWeight="bold">{userName}</Box>
              <Box fontSize="xs">{jobTitle}</Box>
            </Box>
            <MenuDivider sx={{ borderColor: 'orange.500' }} />

            <MenuItem
              icon={<SettingsIcon />}
              bg="none"
              onClick={handleOpenModal}
              _hover={{ bg: 'burntOrange.500', borderRadius: '10' }}
            >
              Edit Profile
            </MenuItem>

            <MenuDivider sx={{ borderColor: 'orange.500' }} />
            <MenuItem
              icon={<ArrowForwardIcon />}
              bg="none"
              onClick={handleSignOut}
              _hover={{
                bg: 'burntOrange.500',
                borderRadius: '10',
              }}
            >
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <>
          <Button
            as="a"
            href="/information"
            colorScheme="orange"
            size="lg"
            bg="burntOrange.500"
            _hover={{ bg: 'burntOrange.600' }}
            alignSelf="center"
            color="black"
          >
            Sign In
          </Button>
        </>
      )}

      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onClose={() => {
            if (isModalOpen) {
              setIsModalOpen(false);
            }
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
