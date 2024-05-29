import React, { useState, useEffect, useContext,useRef } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from '../api/task';
import AuthContext from '../context/AuthContext';
import './styles/TaskList.css';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';




const TaskList = () => {
  const { auth } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newStatus, setNewStatus] = useState('To Do');
  const [newDueDate, setNewDueDate] = useState('');
  const location = useLocation();


  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
        const authData = JSON.parse(localStorage.getItem('authData'));
      const getTask = await getTasks(authData.token,location.state.id);
      console.log(getTask,"cc")
      if(getTask.data.TaskById == null){
       console.log("check")
        setTasks([]);
      }else {
        setTasks(getTask.data.TaskById);
      }
      
      console.log(getTask);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateTask = (id, updatedTask) => {
    const authData = JSON.parse(localStorage.getItem('authData'));
    updateTask(id, updatedTask, authData.token)
      .then(() => fetchTasks())
      .catch(error => console.error('Error updating task: ', error));
  };

  const handleDeleteTask = id => {
    const authData = JSON.parse(localStorage.getItem('authData'));
    deleteTask(id, authData.token)
      .then(() => fetchTasks())
      .catch(error => console.error('Error deleting task: ', error));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newTask = {
      title: newTitle,
      description: newDescription,
      status: newStatus,
      dueDate: newDueDate,
      user_id: location.state.id
    };

    if (!newTask.title) {
      alert('Task title cannot be empty!');
      return;
    }

    const authData = JSON.parse(localStorage.getItem('authData'));

    addTask(newTask, authData.token)
      .then(() => {
        fetchTasks();
        setNewTitle('');
        setNewDescription('');
        setNewStatus('To Do');
        setNewDueDate('');
      })
      .catch(error => console.error('Error adding task: ', error));
  };


  const checkExpiredDueDates = () => {
    const currentDate = new Date();
    tasks.forEach(task => {
      const dueDate = new Date(task.dueDate);
      if (dueDate < currentDate && task.status !== 'Done') {
        alert(`Task '${task.title}' has an expired due date!`);
      }
    });
  };

  useEffect(() => {
    const intervalId = setInterval(checkExpiredDueDates, 1000 * 60); 
    return () => clearInterval(intervalId); 
  }, [tasks]);


  return (
    <div>
        <Navbar />
    <div className="task-list-container">
      <h2>Task List</h2>
      <form className="task-list-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
        />
        <select value={newStatus} onChange={e => setNewStatus(e.target.value)}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <input
          type="date"
          value={newDueDate}
          onChange={e => setNewDueDate(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {task.dueDate}</p>
            <div>
              <button onClick={() => handleUpdateTask(task._id, { ...task, status: 'Done' })}>Mark as Done</button>
              <button className="delete" onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default TaskList;
