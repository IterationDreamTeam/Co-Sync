import React from 'react';
import { Box, VStack } from '@chakra-ui/react'
import ScrollBarItem from './ScrollBarItem.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

const Bar = ({ children }) => {

  const horizontal = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: 'rgba(51, 51, 51, 0.7)',
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    margin: '10px',
  }

  const setInvite = () => {
    console.log('setInvite')
  }

  const handleInviteUser = () => {
    console.log('inviteUser')
  }
  return (
    <Box
      
      display='flex'
      flexDirection='column'
      justifyContent='space-around'
      width='2.5vw'
      height='70vh'
      position='fixed'
      top='40'
      bottom='10'
      left='10'
      background='rgba(51, 51, 51, 0.2)'
      padding='20px'
      overflow-y='auto'
      rounded='md'
    >
      <VStack
        spacing={4}
      >

        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          background='rgba(51, 51, 51, 0.7)'
          height='40px'
          width='40px'
          borderRadius='50%'
          onClick={() => console.log('clicked')}
        >
          <FontAwesomeIcon icon={faFolder} className='faUserPlus' />
          </Box>

          <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          background='rgba(51, 51, 51, 0.7)'
          height='40px'
          width='40px'
          borderRadius='50%'
        >
          <FontAwesomeIcon icon={faUserPlus} className='faUserPlus' />
          </Box>
          
      </VStack>
    </Box>
  );
}

export default Bar; 