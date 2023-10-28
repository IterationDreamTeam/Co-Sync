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
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default DeadlineInputModal;
