import React, { useState } from 'react';
import ScrollBarItem from './ScrollBarItem.jsx';
import { useDispatch } from 'react-redux';
import { Box , HStack, } from '@chakra-ui/react';
import { useAddColumnMutation, useAddProjectMutation, useInviteUserMutation } from '../utils/userApi.js';
import { createColumn, createProject, setCurrentProjectName } from '../slices/userSlice.js';

/*
  This component is the bar below the navbar. It contains the input fields for adding a column, creating a project, and inviting a user.
  It also contains the dropdown menu for selecting a project.
  It's also responsible for dispatching ScrollBar actions to the redux store.
*/

const ScrollBar = ({ currentProject }) => {
  const [project, setProject] = useState('');
  const [column, setColumn] = useState('');
  const [invite, setInvite] = useState('');
  const [addColumnMutation] = useAddColumnMutation();
  const [addProjectMutation] = useAddProjectMutation();
  const [inviteUserMutation] = useInviteUserMutation();
  const dispatch = useDispatch();

  const handleAddColumnClick = async (e) => {
    e.preventDefault();
    const body = {
      columnName: column,
      projectId: currentProject._id
    }
    setColumn('');
    try {
      const res = await addColumnMutation(body);
      if (res.error) throw new Error(res.error.message);
      // console.log(`res is ${res}`);
      dispatch(createColumn(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetProjectName = (e) => {
    e.preventDefault();
    dispatch(setCurrentProjectName(e.target.value));
  }

  const handleSetProject = async (e) => {
    e.preventDefault();
    const body = {
      projectName: project, // Corrected the property name to projectName
    };
    setProject('');
    try {
      const res = await addProjectMutation(body);
      if (res.error) throw new Error(res.error.message);
      dispatch(createProject(res.data));
      setCurrentProjectName(res.data.projectName);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInviteUser = async (e) => {
    e.preventDefault();
    if (!currentProject) return console.log('No current project');
    const body = {
      username: invite,
      projectId: currentProject?._id,
    };
    setInvite('');
    try {
      await inviteUserMutation(body).unwrap()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box
      bg='Interstellar.PalePink'
      rounded='sm'
      // boxShadow='md'
      width='95%'
      mt='.5rem'
      ml='3rem'
      mr='3rem'
    >
      <HStack className='scrollBarInner'
        justify='center'
      >
        <ScrollBarItem
          setterFunction={setInvite}
          saveFunc={handleInviteUser}
          placeholder='Invite User'
          type='text'
          title='Invite a User'
        />
        <ScrollBarItem
          setterFunction={setColumn}
          saveFunc={handleAddColumnClick}
          placeholder='Add Column'
          type='text'
          title='Column Name'
        />
        <ScrollBarItem
          placeholder='Create'
          type='text'
          title='Project Name'
          setterFunction={setProject}
          saveFunc={handleSetProject}
        />
        <ScrollBarItem
          placeholder='Projects'
          type='view'
          title='Projects'
          saveFunc={handleSetProjectName}
        />
      </HStack>
    </Box>
    
  )
}

export default ScrollBar;