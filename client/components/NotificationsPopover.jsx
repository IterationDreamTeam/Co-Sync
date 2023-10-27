// import React from 'react';
// import {BellIcon} from '@chakra-ui/icons';
// import { Box, StackDivider, Button, Flex, Popover, PopoverCloseButton, PopoverBody, PopoverContent, PopoverArrow, PopoverHeader, Text, PopoverTrigger, VStack } from '@chakra-ui/react';
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
// import Notification from './Notification.jsx';

// const NotificationPopover = ({  }) => { 
  
//   const { data: notifications, isError: isNotificationsError, isLoading: isNotificationsLoading, isSuccess: isNotificationsSuccess, error: notificationsError } = useGetNotificationsQuery({ skip: !isAuth });

//   const notifs = notifications.reduce((acc, notification) => {
//     notification.isRead ? acc.read.push(notification) : acc.unread.push(notification)
//     return acc; 
//   }, { read: [], unread: [] })

  
//   return (
//     <Box
//       display='inline-block'
//     >
//       <Popover size='md' >
//         <PopoverTrigger>
//           <BellIcon className='bellIcon' />
//         </PopoverTrigger>
//         <PopoverContent>
//           <PopoverArrow />
//           <PopoverHeader>
//             <Flex justify='space-between' align='center' p={2}>
//               <Box>
//                 <Text as='b'>Notifications</Text>
//               </Box>
//               <Box>
//                 <Button size='xs'variant='ghost'>
//                 Mark all as read
//                 </Button>
//               </Box>
//             </Flex>
//             <Flex gap={4}>
//             </Flex>
//           </PopoverHeader>
//           <PopoverBody>
//             <Tabs>
//               <TabList>
//                 <Tab>Unread</Tab>
//                 <Tab>All</Tab>
//               </TabList>

//               <TabPanels>
//                 <TabPanel>
                  
//                 </TabPanel>
//               </TabPanels>
//             </Tabs>
//             <VStack
//               justify='flex-start'
//               divider={<StackDivider bg='gray.600' m={'0 !important'} />}
//               align='stretch'
//             >
//               {unreadNotifications ? unreadNotifications.map((notification) => (
//                 <Notification key={notification._id} notification={notification} {...notification}  />
//               )) : null}
//             </VStack>
//           </PopoverBody>
//         </PopoverContent>
//       </Popover>
//     </Box>
//   )
// }

// export default NotificationPopover;