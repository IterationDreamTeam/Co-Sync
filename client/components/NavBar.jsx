import React from 'react';
import { Link } from 'react-router-dom';
import NotifPopover from './NotifPopover.jsx';
import ProfilePopover from './ProfilePopover.jsx';
import { Box, Heading, HStack } from '@chakra-ui/react';
/*
  This component is the navbar. It contains the links to the home, profile, settings, and logout pages.
  And should exist everywhere except the login and signup pages.
*/

// const NavBar = () => {
  
//   return (
//     <nav className='NavBar'>
//       <h1><a href='https://github.com/Co-Sync/Co-Sync'>Co-Sync</a></h1>
//       <ul>
//         <li>
//           <Link className='routerLink' to='/'>Home</Link>
//         </li>
//       </ul>
//       <ul>
//         <li>
//           <NotifPopover  />
//           <ProfilePopover  />
//         </li>
//       </ul>
//     </nav>
//   )
// }

const NavBar = () => {
  return (
    <HStack
      bg={'#2D3748'}
      width={'97vw'}
      background='rgba(51, 51, 51, 0.2)'
      mt={1}
      py={2}
      px={2}
      rounded={'sm'}
      justifyContent={'space-between'}
    >
      <Heading
        color={'white'}
        size={'md'}
      >
        VOID
      </Heading>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        width={'5%'}
      >
        <Box>
          <NotifPopover/>
        </Box>
        <Box>
          <ProfilePopover/>
        </Box>
      </Box>
    </HStack>
  )
}

export default NavBar;
