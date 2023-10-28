import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const Droppable = (props) => {
  const { setNodeRef, isOver } = useDroppable({
    id: props._id,
    data: {
      newColumnId: props.children.props.column._id,
    }
  });

  const style = {
    color: isOver ? 'green' : undefined,
  }
  return (
    <div className='droppable' ref={setNodeRef} style={style}>
      {props.children}
    </div>
  )
}

export default Droppable; 