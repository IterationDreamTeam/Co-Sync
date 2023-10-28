import React, { useState } from 'react';
import TableColumn from './TableColumn.jsx';
import ScrollBar from './ScrollBar.jsx';
import TableHeader from './TableHeader.jsx'
import { useSelector } from 'react-redux';
import { useMoveTaskMutation } from '../utils/userApi.js';

// Drag and Drop
import { DndContext, DragOverlay, useSensor, useSensors } from '@dnd-kit/core';
import MyPointerSensor from '../utils/pointerSensor.js';
import Droppable from './Droppable.jsx';
import TableTask from './TableTask.jsx';

import PresentationalTableTask from './TableTaskPresentational.jsx';

/*
  This component renders the ScrollBar and TableColumn components.
*/

const TableDisplay = () => {
  // Drag and Drop hooks
  const [activeId, setActiveId] = useState(null);
  const pointerSensor = useSensor(MyPointerSensor);
  const sensors = useSensors(pointerSensor);

  // Redux hooks
  const [moveTask] = useMoveTaskMutation();

  const currentProject = useSelector((state) => state.user.projects[state.user.currentProject]);
  if (!currentProject) {
    return (
      <>
        <div id='tableDisplayOuter' className='container'>
          <ScrollBar currentProject={currentProject} />
          <h1>Please Select A Project</h1>
        </div>
      </>
    );
  }
  return (
    <div id='tableDisplayOuter' className='container'>
      <ScrollBar currentProject={currentProject} />
      <TableHeader {...currentProject} />
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>

        <div id='tableDisplayInner'>
          {currentProject.columns.map((column, index) => {
            // the column and columnName must exist to render each column -- or else will be undefined when trying to render the child component 
            if (column && column.columnName) {
              return (
                <Droppable id={column._id} key={index} {...column}>
                  <TableColumn key={index} column={column} currentProject={currentProject} />
                </Droppable>
              );
            }
          })}
        </div>

        {/* <DragOverlay >
          {activeId && (
            <PresentationalTableTask id={activeId}>  </PresentationalTableTask>
          )
          }

        </DragOverlay> */}

      </DndContext>
    </div>
  );

  function handleDragStart(event) {
    console.log('handleDragStart')
    setActiveId(event.active.id)
  }

  async function handleDragEnd(event) {
    console.log('handleDragEnd')

    if (event.over) {
      await moveTask({
        projectId: event.active.data.current.currentProjectId,
        oldColumnId: event.active.data.current.oldColumnId,
        taskId: event.active.data.current.taskId,
        newColumnId: event.over.data.current.newColumnId
      })
    }
  }
}

export default TableDisplay;