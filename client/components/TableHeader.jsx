import React from 'react';
import {Box, Flex, HStack} from '@chakra-ui/react'
import { useGetAllCollaboratorsQuery } from '../utils/userApi';

const TableHeader = ({ projectName, _id:projectId }) => {
  
  const { data } = useGetAllCollaboratorsQuery({projectId});
  

  return (
    <Flex
      bg='Interstellar.PalePink'
      justifyContent='center'
      alignContent='center'
      alignItems='center'
      p={2}
      rounded='sm'
      width='95vw'
      color='black'
      mt={2}
    >  
      <Box
        bg='white'
        p={2}
        rounded='sm'
        display='inline-block'

      >{projectName}
      </Box>
      <Flex
        flexDirection='row'
        columnGap={2}
        justifyContent={'space-around'}
        width='20%'
        marginLeft='auto'
        display='inline-block'
        gap={2}
      >
        <HStack
          justifyContent={'space-around'}
        >
          {
            data && data.map(({userId : {username }}, index) => {
              return <Box
                key={index}
                bg='white'
                p={1}
                borderRadius='999px'
              >
                {username
                }</Box>
            })
          }
        </HStack>
      </Flex>
    </Flex>
  )
}; 

export default TableHeader; 