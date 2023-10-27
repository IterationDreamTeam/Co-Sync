import {PointerSensor} from '@dnd-kit/core';

/**
 * An extended "PointerSensor" that prevent some
 * interactive html element(button, input, textarea, select, option...) from dragging
 */
export default class MyPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: 'onPointerDown',
      handler: ({nativeEvent: event}) => {
        if (
          !event.isPrimary ||
          event.button !== 0 ||
          isInteractiveElement(event.target)
        ) {
          return false;
        }

        return true;
      },
    },
  ];
}

function isInteractiveElement(element) {
  const elementTagsAndClasses = [element.tagName]
  console.log(elementTagsAndClasses)
  
  const interactiveElements = [
    'button',
    'input',
    'textarea',
    'select',
    'option',
    'img'
  ];

  const notDraggableByClass = [
    'commentBox',
    'buttonBox',
    'commentButton',
    'chakra-accordion__icon',
    'imageSrc'
  ]

  const notDraggableById = [
    'innerTaskButton'
  ]



  if (interactiveElements.includes(element.tagName.toLowerCase())) {
    return true;
  }


  element.classList.forEach((item) => {
    if (notDraggableByClass.includes(item)) {
      return true; 
    }
  });



  return false;
}