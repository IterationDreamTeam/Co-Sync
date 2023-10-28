import React from 'react'; 
import { useDraggable } from '@dnd-kit/core';

const Draggable = (props) => { 
  const { attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props._id,
    data: {
      currentProjectId: props.children.props.currentProject._id,
      oldColumnId: props.children.props.column._id,
      taskId: props.children.props.task._id
    }, 
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div className='draggable' ref={setNodeRef} {...listeners} {...attributes} style={style} >
      {props.children}
    </div>
  )
}

export default Draggable; 