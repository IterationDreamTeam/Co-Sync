import React from 'react';
import {Box, Flex} from '@chakra-ui/react'
import { useGetAllCollaboratorsQuery } from '../utils/userApi';

const TableHeader = ({ projectName, _id:projectId }) => {
  
  const { data } = useGetAllCollaboratorsQuery({projectId});
  

  return (
    <Flex
      justifyContent='center'
      
      width='95vw'
      color='black'
      bg='white'
      mt={2}
    >  
      <Box
      display='inline-block'
      >{projectName}</Box>
      <Flex
      marginLeft='auto'
      display='inline-block'
      >
        {
          data && data.map(({status, userId : {username }}, index) => {
            console.log(username, status);
            return <Box key={index}
            display='inline-block'
            >{username}</Box>
          })
        }
      </Flex>
    </Flex>
  )
}; 

export default TableHeader; 