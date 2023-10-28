import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TableTask from './TableTask.jsx';
import TaskButton from './TaskButton.jsx';
import TextModal from './TextModal.jsx';
import { deleteColumn, createTask } from '../slices/userSlice.js';
import { useDeleteColumnMutation, useAddTaskMutation } from '../utils/userApi.js';

// Drag and Drop
import Draggable from './Draggable.jsx';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  // AlertDialogCloseButton, didn't use just commenting out incase we need it down the line
  Button,
  useDisclosure
} from '@chakra-ui/react'


/*
  This component renders the individual columns in the table.
  It also renders the TableTask components, and is responsible for dispatching the actions column actions
  to the redux store.
*/

// the functionality heres operates similarly to TableTask.jsx of using mutations from userApi.jsx, textmodals, and taskbuttons
const TableColumn = ({ column, currentProject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState('');
  // must call mutations in a destructered array to then call later 
  const [deleteColumnMutation] = useDeleteColumnMutation();
  const [addTaskMutation] = useAddTaskMutation();
  const dispatch = useDispatch();

  // for Alert Dialog
  const { isOpen: disclosureIsOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const deleteColumnButtonRef = React.useRef();

  
  
  // console.log(currentProject)
  const handleInputChange = (e) => {
    e.preventDefault();
    setIsOpen(prev => !prev);
  }

  const handleAddTask = async (e) => {
    e.preventDefault();
    const body = {
      taskName: task,
      taskComments: '',
      columnId: column._id,
      projectId: currentProject._id
    };

    try {
      if (!task) {
        console.error('No task provided');
        return;
      }
      const res = await addTaskMutation(body);
      console.log('res', res);
      dispatch(createTask({ taskName: res.data, columnId: column._id }));
    } catch (error) {
      console.log('Error in handleAddTask: ', error);
    }
  };

  const handleDeleteColumn = () => {
    onOpen(); // this displays the Alert Dialog box to the user 
  };

  const confirmDelete = async () => { // after user confirms they want to delete the column, this function is called
    const body = {
      columnId: column._id,
      projectId: currentProject._id,
    };

    try {
      if (!column._id || !currentProject._id) {
        console.error('Invalid project or column id');
        return;
      }

      const res = await deleteColumnMutation(body);
      if (res.error) throw new Error(res.error.message);
      dispatch(deleteColumn({ columnId: column._id, projectId: currentProject._id }));
    } catch (error) {
      console.log('Error in handleDeleteColumn: ', error);
    }

    onClose();
  };
  

  // for return statement, we use conditional rendering for the components and pass in their actions created in this component for textmodal and taskbutton
  return (
    <div className="container" id="tableColumnMain">
      {isOpen ? <TextModal
        placeholder={'Task Name'}
        setterFunction={setTask}
        saveFunc={(e) => handleAddTask(e)}
        setIsOpen={setIsOpen}
        title='Add Task'
        column={column._id}
        currentProject={currentProject._id}
      /> : null}

      <div id="tableColumnHeader">
        <h2>{column.columnName}</h2>
        <TaskButton
          onClick={(e) => handleInputChange(e)}
          text='Add Task'
        />
        <TaskButton
          onClick={() => handleDeleteColumn()}
          text='Delete'
          hasRef={true}
          ref={deleteColumnButtonRef}
        />
      </div>
      {column.tasks.length ? column.tasks.map((task, index) => {
        return (
          <Draggable key={`Draggable${index}`} {...task} >
            <TableTask index={index} key={index} task={task} column={column} currentProject={currentProject} />
          </Draggable>)
      }) : <h1>No Tasks Yet</h1>}
      {/* // TODO: Alert Dialog starts here------------------------------- */}
      <AlertDialog
        isOpen={disclosureIsOpen}
        leastDestructiveRef={deleteColumnButtonRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Column
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this column?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={() => {confirmDelete(column.columnName)}} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>


  );
};

export default TableColumn;