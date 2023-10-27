import React, {useState} from 'react';
import TableColumn from './TableColumn.jsx';
import ScrollBar from './ScrollBar.jsx';
import TableHeader from './TableHeader.jsx'
import { useSelector } from 'react-redux';

// Drag and Drop
import { DndContext } from '@dnd-kit/core';

/*
  This component renders the ScrollBar and TableColumn components.
*/

const TableDisplay = () => {
  // Drag and Drop hooks
  const [isDropped, setIsDropped] = useState(false);

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
      <DndContext onDragEnd={handleDragEnd}>
        <div id='tableDisplayInner'>
          {currentProject.columns.map((column, index) => {
            // the column and columnName must exist to render each column -- or else will be undefined when trying to render the child component 
            if (column && column.columnName) {
              return <TableColumn key={index} column={column} currentProject={currentProject} />;
            }
          })}
        </div>
      </DndContext>
    </div>
  );

  function handleDragEnd(event) {
    console.log('handleDragEvent')
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }
}

export default TableDisplay;