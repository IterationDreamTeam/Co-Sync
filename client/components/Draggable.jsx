import React from 'react'; 
import { useDraggable } from '@dnd-kit/core';

const Draggable = (props) => { 
  // object -> children -> props -< column -> _id
  // object -> children -> props -> currentProject -> _id
  // object -> children -> props -> task -> _id
  // console.log('Draggable', props);
  // const { children: { props: childProps } } = props;

  const { attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props._id,
    data: {
      // ...childProps,
      currentProjectId: props.children.props.currentProject._id,
      oldColumnId: props.children.props.column._id,
      taskId: props.children.props.task._id
    }, 
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div id='Draggable' ref={setNodeRef} {...listeners} {...attributes} style={style} >
      {props.children}
    </div>
  )
}

export default Draggable; 