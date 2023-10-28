import React from 'react';
import { BellIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Popover, PopoverBody, PopoverContent, PopoverArrow, PopoverHeader, Text, PopoverTrigger, VStack, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Notification from './Notification.jsx';
import { useGetNotificationsQuery } from '../utils/userApi.js';
import { useMarkAsReadMutation, useMarkAllAsReadMutation } from '../utils/userApi.js';


const NotifPopover = () => {
  const isAuth = localStorage.getItem('isAuth');
  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();

  const { data: notifications, isError: isNotificationsError, isLoading: isNotificationsLoading, isSuccess: isNotificationsSuccess, error: notificationsError } = useGetNotificationsQuery({ skip: !isAuth});
  console.log('notifications', notifications);
  const notifs = notifications ? notifications.reduce((acc, notification) => {
    notification.isRead ? acc.read.push(notification) : acc.unread.push(notification)
    return acc;
  }, { read: [], unread: [] }) : null;

  const isDisabled = notifs?.unread.length != 0  ? false : true;

  const handleNotifOnClick = async ({ id, patch }) => {
    console.log('handleNotifOnClick')
    console.log(id, patch); 
    await markAsRead({ id, patch })
  }

  const handleMarkAllAsRead = async () => { 
    console.log('handleMarkAllAsRead');
    const unreadIds = notifs.unread.map((notif) => notif._id);
    await markAllAsRead({ ids: unreadIds, patch: { isRead: true }  })
  }

  return (
    <Box id = 'notificationBox'
    display='inline-block'
    >
      <Popover size='md' >
        <PopoverTrigger>
          <BellIcon className='bellIcon'   color='white'/>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>
            <Flex justify='space-between' align='center' p={2}>
              <Box>
                <Text>Notifications</Text>
              </Box>
              <Box>
                <Button onClick={handleMarkAllAsRead} isDisabled={isDisabled}>Mark all as read</Button>
              </Box>
            </Flex>
          </PopoverHeader>
          <PopoverBody>
            <Tabs>
              <TabList>
                <Tab>Unread</Tab>
                <Tab>All</Tab>
              </TabList>
      
              <TabPanels p={0}>
                <TabPanel p={0}>
                  <VStack p={0}>
                    {notifs?.unread ? notifs.unread.map((notif) => (
                      <Notification id={notif.id}  key={notif._id} notification={notif} {...notif} NotifOnClick={handleNotifOnClick}></Notification>
                    )): null}
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack>
                    {notifs?.read ? notifs.read.map((notif) => (
                      <Notification id={notif.id}  key={notif._id} notification={notif} {...notif} NotifOnClick={handleNotifOnClick}></Notification>
                    )): null}
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </PopoverBody>
        </PopoverContent>

      </Popover>
    </Box>
  )

}

export default NotifPopover;