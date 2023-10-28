import React, {useState} from 'react';
import TableColumn from './TableColumn.jsx';
import ScrollBar from './ScrollBar.jsx';
import TableHeader from './TableHeader.jsx'
import { useSelector } from 'react-redux';
import { useMoveTaskMutation} from '../utils/userApi.js';

// Drag and Drop
import { DndContext, DragOverlay, TouchSensor, useSensor, useSensors} from '@dnd-kit/core';
import MyPointerSensor from '../utils/PointerSensor.js';
import Droppable from './Droppable.jsx';

// Draggable ScrollBar 
import Bar from './ModifiedScrollBar.jsx';

/*
  This component renders the ScrollBar and TableColumn components.
*/

const TableDisplay = () => {
  // Drag and Drop hooks
  const [activeId, setActiveId] = useState(null);
  const pointerSensor = useSensor(MyPointerSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 10000,
      tolerence: 5,
    }
  }); 
  const sensors = useSensors(pointerSensor, touchSensor);

  // Redux hooks
  const [moveTask] =useMoveTaskMutation(); 

  const currentProject = useSelector((state) => state.user.projects[state.user.currentProject]);
  if (!currentProject) {
    return (
      <>
        <div id='tableDisplayOuter' className='container'>
        <ScrollBar currentProject={currentProject} />
          <Bar currentProject={currentProject} />
          <h1>Please Select A Project</h1>
        </div>
      </>
    );
  }
  return (
    <div id='tableDisplayOuter' className='container'>
      <ScrollBar currentProject={currentProject} />
      {/* <Bar/> */}
      <TableHeader {...currentProject} />
      <DndContext onDragStart={handleDragStart}  onDragEnd={handleDragEnd} sensors={sensors}>

        <div id='tableDisplayInner'>
          {currentProject.columns.map((column, index) => {
            // the column and columnName must exist to render each column -- or else will be undefined when trying to render the child component 
            if (column && column.columnName) {
              return(
                <Droppable id={column._id} key={index} {...column}>
                  <TableColumn key={index} column={column} currentProject={currentProject} />
                </Droppable>
              );
            }
          })}
        </div>

        <DragOverlay dropAnimation={{duration: 750, easing: 'cubic-bezier(0.18, 0.67,0.6,1.22)'}}>
          {activeId && (
            <p id={activeId}> Dummy </p>
          )
          }

        </DragOverlay>

      </DndContext>
      <p>I am  a test</p>
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