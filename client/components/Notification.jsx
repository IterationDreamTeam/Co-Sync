import React from 'react'
import { Avatar, AvatarBadge, Box, Button, Flex, Text, VStack} from '@chakra-ui/react'
import getTimeDifference from '../utils/getTime.js'

const Notification = ({ notification, NotifOnClick, message, createdAt, hasBadge, colorMode }) => {

  const displayTime = getTimeDifference(createdAt)

  return (
    <Box
      // bg={
      //   hasBadge
      //     ? colorMode === 'light'
      //       ? 'gray.100'
      //       : 'gray.700'
      //     : 'transparent'
      // }
      bg='white'
    >
      <Flex gap={3} p={2}
        justifyContent='space-between'
      >
        <Box>
          <Avatar size='sm' name={name} src='src' >
            {hasBadge && (
              <AvatarBadge
                placement='top-start'
                bg={colorMode === 'light ' ? 'blue.600' : 'blue.300'}
                borderWidth='2px'
                boxSizxe='12px'
              />
            )}
          </Avatar>
        </Box>
        <VStack>
          <Box> 
            <Text fontSize={'sm'} color='black'>
              {message}
            </Text>
          </Box>
          <Box alignSelf={'flex-start'} mt='0 !important'>
            <Text fontSize={'xs'} fontWeight='lighter' color='#154367'>
              {displayTime}
            </Text>
          </Box>
        </VStack>
        <Button
          color='red'
          onClick={() => NotifOnClick({ id: notification._id, patch: { isRead: !notification.isRead } })}
        >{notification.isRead ? 'Unread' : 'Read'}</Button>
      </Flex>
    </Box>
  )
};

export default Notification;