import React, { useState, useEffect } from 'react';
import usersData from './users.json';

function TicketBoard() {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState('status'); // Default grouping by status
  const [sortBy, setSortBy] = useState('title'); // Default sorting by title

  // Define the getUserDisplayName function to retrieve user names based on user IDs
  function getUserDisplayName(userId) {
    // Replace this logic with your actual user data from the JSON
    const users = usersData;

    return `${users[userId]} (${userId})` || "Unknown User";
  }

  function getPriorityStatus(priority) {
    const prio = {
      "0": "No Priority",
      "1": "Low",
      "2": "Medium",
      "3": "High",
      "4": "Urgent"
    };

    return `${prio[priority]}` || "Unknown Priority";
    // return `${prio[priority]} (${priority})` || "Unknown Priority";
  }

  useEffect(() => {
    // Simulating data fetching
    const fetchData = async () => {
      try {
        // Replace this with your actual API endpoint
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTickets(data.tickets);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function groupTickets(tickets, groupBy) {
    // Implement logic to group tickets by the chosen criterion (status, user, or priority)
    const grouped = {};
    tickets.forEach((ticket) => {
      const key = ticket[groupBy];
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(ticket);
    });

    const groups = [];
    for (const key in grouped) {
      groups.push({ key, tickets: grouped[key] });
    }

    return groups;
  }

  function sortGroupedTickets(groups, sortBy) {
    // Implement logic to sort the groups based on the chosen criterion (priority, user, or status)
    return groups.map((group) => ({
      ...group,
      tickets: group.tickets.slice().sort((a, b) => {
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        } else if (sortBy === 'priority') {
          return b.priority - a.priority;
        } else if (sortBy === 'user') {
          return a.userId.localeCompare(b.userId);
        } else if (sortBy === 'status') {
          return a.status.localeCompare(b.status);
        }
      }),
    }));
  }

  function getColumnHeading(groupBy, groupKey) {
    if (groupBy === 'user') {
      return getUserDisplayName(groupKey);
    } else if (groupBy === 'priority') {
      return getPriorityStatus(groupKey);
    }
    return groupKey; 
  }


  const groupedTickets = groupTickets(tickets, groupBy);
  const sortedGroupedTickets = sortGroupedTickets(groupedTickets, sortBy);

  return (
    <div className="TicketBoard">
      <header>
        <h1>Kanban Board</h1>
        <div>
          <button onClick={() => setGroupBy('status')}>Group by Status</button>
          <button onClick={() => setGroupBy('userId')}>Group by User</button>
          <button onClick={() => setGroupBy('priority')}>Group by Priority</button>
        </div>
      </header>
      {sortedGroupedTickets.map((group) => (
        <div className="TicketColumn" key={group.key}>
          {/* <h2>{groupBy === 'user' ? `${getUserDisplayName(group.key)} (${group.key})` : group.key}</h2> */}
          <h2>{getColumnHeading(groupBy, group.key)}</h2>
          {/* <h2>{groupBy === 'user' ? getUserDisplayName(group.key) : getPriorityStatus(group.key)}</h2> */}
          {/* <h2>{groupBy === 'user' ? getUserDisplayName(group.key) : group.key}</h2>
          <h2>{groupBy === 'priority' ? getPriorityStatus(group.key) : group.key}</h2> */}
          {group.tickets.map((ticket) => (
            <div className="TicketCard" key={ticket.id}>
              <h3>{ticket.title}</h3>
              <p>Status: {ticket.status}</p>
              {groupBy === 'user' ? (
                <p>Assigned To: {getUserDisplayName(ticket.userId)}</p>
              ) : (
                <p>Assigned To: {getUserDisplayName(ticket.userId)}</p>
              )}
              <p>Priority: {getPriorityStatus(ticket.priority)}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TicketBoard;
