import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const Droppable = (props) => {
  // object.children.props.column._id
  // console.log('Droppable', props)
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
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  )
}

export default Droppable; 