import React, { useState } from 'react';

function AddTaskForm({ onAddTask }) {
  const [newTask, setNewTask] = useState({ title: '', status: '', priority: '', userId: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(newTask);
    setNewTask({ title: '', status: '', priority: '', userId: '' });
  };

  return (
    <form className="AddTaskForm" onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        User:
        <input
          type="text"
          name="userId"
          value={newTask.userId}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Status:
        <select
          name="status"
          value={newTask.status}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Status</option>
          <option value="Todo">Todo</option>
          <option value="In progress">In Progress</option>
          <option value="Backlog">Backlog</option>
        </select>
      </label>
      
      <label>
        Priority:
        <select
          name="priority"
          value={newTask.priority}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Priority</option>
          <option value="0">No Priority</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
          <option value="4">Urgent</option>
        </select>
      </label>
      
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTaskForm;
