import React from 'react';
import TicketCard from './TicketCard';

function TicketColumn({ group }) {
  return (
    <div className="TicketColumn">
      <h2>{group.key}</h2>
      {group.tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}

export default TicketColumn;
