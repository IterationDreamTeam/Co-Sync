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
    setIsPriorityOpen,
    currentProject,
    title,
    priority
   }) => {

  return (
<div id='modal' className='textModalVisible'>
      <form className='textModalInner'>
        <div className='textModalHeader'>
          <p>{title}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsPriorityOpen(prev => !prev);
            }}
            className='closeModalButton'>
            x
          </button>
        </div>
        <select value={priority}>
          <option onClick={saveFunc} value={'Low'}>
            Low
          </option>
          <option onClick={saveFunc} value={'Medium'}>
            Medium
          </option>
          <option onClick={saveFunc} value={'High'}>
            High
          </option>
          <option onClick={saveFunc} value={'Highest'}>
            Highest
          </option>
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
