import React from 'react';

function TicketCard({ task, onDelete }) {
  return (
    <div className="TicketCard">
      <h3 className="ticket-title">{task.title}</h3>
      <p className="ticket-status">Status: {task.status}</p>
      <p className="ticket-assigned-to">Assigned To: {task.assigned_to}</p>
      <p className="ticket-priority">Priority: {task.priority}</p>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}

export default TicketCard;
