import React from 'react';
import { useDispatch } from 'react-redux';
import {SettingsIcon} from '@chakra-ui/icons';
import { Box, StackDivider, Flex, Popover, PopoverContent, PopoverArrow, PopoverHeader, Text, PopoverTrigger, VStack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { resetState } from '../slices/userSlice.js';
import { userApi, useLogoutUserMutation } from '../utils/userApi.js';

const ProfilePopover = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('isAuth');
      await logout().unwrap();
      console.log('Logout successful');
      userApi.util.resetApiState(undefined);
      dispatch(resetState(undefined));
      navigate('/login');
    } catch (error) {
      console.log('Logout failed with error: ', error);
    }
  }
  return (
    <Box
      display='inline-block'
    >
      <Popover>
        <PopoverTrigger>
          <SettingsIcon className='settingsIcon'  color={'white'}/>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>
            <Flex>
              <Box>
                <Text as='b'>Account</Text>
              </Box>
            </Flex>
          </PopoverHeader>
          <VStack
            justfiy='flex-start'
            divider={<StackDivider bg='gray.600' m={'0 !important'} />}
            align='stretch'
          >
            <Box>
              <Link to='/profile'>Profile</Link>
            </Box>
            <Box>
              <Link to='/settings'>Settings</Link> 
            </Box>
            <Box>
              <button className='routerLink' onClick={handleLogout} type='button' >Logout</button>
            </Box>
          </VStack>
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default ProfilePopover;