import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import UserForm from '@/components/UserForm';

interface UserModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserModalForm: React.FC<UserModalFormProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />

      <ModalContent
        style={{
          backgroundColor: 'rgba(13, 27, 42, 0.85)',
          border: '1px solid white',
        }}
      >
        <ModalHeader color="wheat" paddingX={10} paddingTop={10}>
          Update Your Details
        </ModalHeader>
        <ModalCloseButton color="wheat" paddingTop={10} />

        <ModalBody>
          <UserForm handleSubmit={onClose} renderingInModal={true}></UserForm>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserModalForm;
