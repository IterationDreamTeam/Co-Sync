import React, { useState } from 'react';

const DeadlineInputModal = ({ onSave, onCancel, initialDeadline }) => {
  const [deadline, setDeadline] = useState(initialDeadline || ''); 
  const handleSave = () => {
    onSave(deadline);
  };

  return (
    <div className="deadline-modal">
      <h3>Set Deadline</h3>
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button style={{marginLeft: '3px', border: '1px #2F4759 solid', borderRadius: '4px', backgroundColor: '#2F4759', paddingLeft: '1px', paddingRight: '1px'}} onClick={handleSave}>Save</button>
      <button style={{marginLeft: '4px', border: '1px #2F4759 solid', borderRadius: '4px', backgroundColor: '#2F4759', paddingLeft: '1px'}} onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default DeadlineInputModal;
