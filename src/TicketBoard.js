import React, { useState, useEffect } from 'react';
import usersData from './users.json';
import AddTaskForm from './AddTaskForm';
import TicketCard from './TicketCard';

function TicketBoard() {
  const [tasks, setTasks] = useState([]); // Updated state to manage tasks
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
        setTasks(data.tickets);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function groupTasks(tasks, groupBy) {
    // Implement logic to group tasks by the chosen criterion (status, user, or priority)
    const grouped = {};
    tasks.forEach((task) => {
      const key = task[groupBy];
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(task);
    });

    const groups = [];
    for (const key in grouped) {
      groups.push({ key, tasks: grouped[key] });
    }

    return groups;
  }

  function sortGroupedTasks(groups, sortBy) {
    // Implement logic to sort the groups based on the chosen criterion (priority, user, or status)
    return groups.map((group) => ({
      ...group,
      tasks: group.tasks.slice().sort((a, b) => {
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

  const groupedTasks = groupTasks(tasks, groupBy); // Updated to use tasks
  const sortedGroupedTasks = sortGroupedTasks(groupedTasks, sortBy); // Updated to use tasks

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  
  
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
      <AddTaskForm onAddTask={addTask} /> {/* Render the AddTaskForm component */}
      {sortedGroupedTasks.map((group) => (
        <div className="TicketColumn" key={group.key}>
          <h2>{getColumnHeading(groupBy, group.key)}</h2>
          {group.tasks.map((task) => (
            <div className="TicketCard" key={task.id}>
            <TicketCard task={task} onDelete={deleteTask} />
            {/* <h3>{task.title}</h3>
            <p>Status: {task.status}</p>
            <p>Assigned To: {getUserDisplayName(task.userId)}</p>
            <p>Priority: {getPriorityStatus(task.priority)}</p> */}
          </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TicketBoard;
