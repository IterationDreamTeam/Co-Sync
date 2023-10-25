import React, { useState } from 'react';
import { deleteTask, updateTask, moveTask } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import TaskButton from './TaskButton.jsx';
import TextModal from './TextModal.jsx';
import ColumnViewModal from './ColumnViewModal.jsx';
import { useDeleteTaskMutation, useUpdateTaskMutation, useMoveTaskMutation, useDeleteCommentMutation, useEditCommentMutation } from '../utils/userApi.js';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
/*
  This component renders the individual tasks in the table columns.
  It also renders the TaskButton, TextModal, and ColumnViewModal components.
*/

const TableTask = ({ task, column, currentProject, index }) => {
  // had to set multiple states for different functionality but similiar purpose of state
  const [incomingData, setIncomingData] = useState('');
  const [comment, setComment] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);



  // must call mutations in a destructered array to then call later 
  const [deleteTaskMutation] = useDeleteTaskMutation();
  const [updateTaskMutation] = useUpdateTaskMutation();
  const [moveTaskMutation] = useMoveTaskMutation();
  const [editCommentMutation] = useEditCommentMutation();
  const [deleteCommentMutation] = useDeleteCommentMutation();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    setIsOpen(prev => !prev);
  };

  const handleInputCommentChange = (e) => {
    e.preventDefault();
    setIsCommentOpen(prev => !prev);
  };

  const handleEditClick = async (e) => {
    e.preventDefault();
    const body = {
      projectId: currentProject._id,
      columnId: column._id,
      taskId: task._id,
      taskName: incomingData,
      taskComments: task.taskComments,
    };
    try {
      const res = await updateTaskMutation(body);
      if (res.error) throw new Error(res.error.message);
      // Update state in redux store.
      dispatch(updateTask({ updatedTask: res.data, columnId: column._id }));
      // Update isOpen state to close the "edit task" window.
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  /* create a task - comments
   req.body: a json object with the following fields:
   - projectId
   - columnId
   - taskName
*/

  const handleAddComment = async (e) => {
    e.preventDefault();
    const body = {
      projectId: currentProject._id,
      columnId: column._id,
      taskId: task._id,
      taskName: task.taskName,
      taskComments: comment,
    };
    try {
      // along with calling the fetch mutation on the passed in req.body, we will call the dispatch on the specified action, passing in their parameters based in userSlice.js
      const res = await updateTaskMutation(body);
      if (res.error) throw new Error(res.error.message);
      dispatch(updateTask({ updatedTask: res.data, columnId: column._id }));
      setIsCommentOpen(false);
      console.log(task.taskComments)
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditComment = async (e) => {
    console.log(e)
    const body = {
      projectId: currentProject._id,
      columnId: column._id,
      taskId: task._id,
      taskName: task.taskName,
      taskComments: comment,
      taskCommentID: e,
    };
    try {
      const res = await editCommentMutation(body);
      if (res.error) throw new Error(res.error.message);
      dispatch(updateTask({ updatedTask: res.data, columnId: column._id }));
      setIsCommentOpen(false);

    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteComment = async (e) => {
    console.log(e)
    const body = {
      projectId: currentProject._id,
      columnId: column._id,
      taskId: task._id,
      taskName: task.taskName,
      taskCommentID: e,
    };
    try {
      const res = await deleteCommentMutation(body);
      if (res.error) throw new Error(res.error.message);
      dispatch(updateTask({ updatedTask: res.data, columnId: column._id }));
      setIsCommentOpen(false);

    } catch (error) {
      console.log(error);
    }
  }

  const handleMoveTask = async (e) => {
    e.preventDefault();
    console.log('new id is: ', e.target.value);
    const body = {
      projectId: currentProject._id,
      oldColumnId: column._id,
      newColumnId: e.target.value,
      taskId: task._id,
    };
    console.log('body is: ', body);

    try {
      const res = await moveTaskMutation(body);
      if (res.error) throw new Error(res.error.message);
      dispatch(moveTask(body));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async () => {
    const body = {
      taskId: task._id,
      columnId: column._id,
      projectId: currentProject._id,
    };

    console.log('proj', body);
    try {
      if (!currentProject._id || !column._id || !task._id) {
        console.error('Invalid project, column, or task id');
        return;
      }

      const res = await deleteTaskMutation(body);
      console.log('res', res);
      if (res.error) throw new Error(res.error.message);
      dispatch(deleteTask({ columnId: column._id, taskId: task._id, projectId: currentProject._id }));
    } catch (error) {
      console.log('Error in handleDeleteClick: ', error);
    }
  };

  // in the return rendering statement, we have multiple conditional statements to render the modals specified to their action
  // the taskbuttons corresponds with their textmodal for some functionality 
  // each of the textmodals parameters is passed down from textmodal.jsx and passed in their action created in this component 

  return (

    <div style={{ zIndex: -index }} className="container" id="tableTaskMain">{ /* zIndex is used to make sure the task buttons are always on top of the task and the tasks below in the list */}
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <p className='taskText'>{task.taskName}</p>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>

            {Object.entries(task.taskComments).filter((value) => !"").map(function ([key, value], i) {
              return (
                <div className="commentBox">
                  <p>
                    {key} : {value}
                  </p>
                  <div className="buttonBox">
                    <button className="commentButton" onClick={() => handleEditComment(key)}> Edit </button>
                    <button className="commentButton" onClick={() => handleDeleteComment(key)}> Delete </button>
                  </div>
                </div>

              )
            })}
          </AccordionPanel>
        </AccordionItem>

        <div id='tableTaskButtons'>
          <TaskButton
            onClick={() => handleDeleteTask(task.taskName, column.columnName)}
            text='Delete'
            idOverride='innerTaskButton' />
          <TaskButton
            onClick={(e) => handleInputChange(e)}
            text='Edit'
            idOverride='innerTaskButton'
          />
          <TaskButton
            onClick={(e) => handleInputCommentChange(e)}
            imgSrc='../assets/messages.svg'
            alt='comment'
            idOverride='innerTaskButton'
          />
          <TaskButton
            onClick={() => { setIsMoveOpen(!isMoveOpen); }}
            text='Move'
            idOverride='innerTaskButton'
          />
          {isOpen ? <TextModal
            placeholder={'Task Name'}
            setterFunction={setIncomingData}
            saveFunc={(e) => handleEditClick(e)}
            setIsOpen={setIsOpen}
            title='Edit Task'
          /> : null}
          {isMoveOpen ? <ColumnViewModal
            setIsOpen={setIsMoveOpen}
            title='Select Column to Move to'
            saveFunc={handleMoveTask}
            currentProject={currentProject}
          /> : null}
          {isCommentOpen ? <TextModal
            placeholder={'Task Comment'}
            setterFunction={setComment}
            saveFunc={(e) => handleAddComment(e)}
            setIsOpen={setIsCommentOpen}
            title='Add Comment'
          /> : null}
        </div>
      </Accordion>
    </div>

  );
};

export default TableTask;
