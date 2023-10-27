import React from 'react';
import TextInput from './TextInput.jsx';
import Button from './Button.jsx';


/*
  This component renders the modal for a general purpose text based modal.
  It uses the custom TextInput and Button components.
*/
// a component that renders a modal upon clicking and its designated setter func - this is exported in multiple files to render a pop-up modal throughout our project

const EditTaskViewModal = ({   placeholder,
    setterFunction,
    saveFunc,
    setIsEditModalOpen,
    title,
   }) => {

  return (
<div id='modal' className='textModalVisible'>
      <form className='textModalInner'>
        <div className='textModalHeader'>
          <p>{title}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsEditModalOpen(prev => !prev);
            }}
            className='closeModalButton'>
            x
          </button>
        </div>
        <label>Priority:</label>

        <select
          value={setterFunction}
          onChange={saveFunc}
        >
          <option value={1}>Low</option>
          <option value={2}>Medium</option>
          <option value={3}>High</option>
          <option value={4}>Highest</option>
        </select>
        {/* <Button
          saveFunc={saveFunc}
          text='Save'
          type='submit'
          setIsEditModalOpen={setIsEditModalOpen}
        /> */}
      </form>
    </div>
  );
};

export default EditTaskViewModal;
