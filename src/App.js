import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  Button,IconButton,Table,TableBody,TableCell,TableContainer, TableHead,TableRow,TextField,} from '@mui/material';
import { Delete } from '@mui/icons-material';

const App = () => {
  const [task, setTask] = useState('');
  const [startdate, setStartDate] = useState('');
  const [enddate, setEndDate] = useState('');
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);

  const [todo, setTodo] = useState([]);

  const isEditMode = selectedTaskIndex !== null;

  const handleFormSubmit = () => {
    if (task.trim() === '' || startdate === '' || enddate === '') {
      alert('Fields cannot be empty');
      return;
    }

    const newStartDate = new Date(startdate);
    const newEndDate = new Date(enddate);

    const hasConflict = todo.some((item, index) => {
      if (index === selectedTaskIndex) return false;

      const itemStartDate = new Date(item.Liststartdate);
      const itemEndDate = new Date(item.Listenddate);

      return (
        (newStartDate >= itemStartDate && newStartDate <= itemEndDate) ||
        (newEndDate >= itemStartDate && newEndDate <= itemEndDate) ||
        (newStartDate <= itemStartDate && newEndDate >= itemEndDate)
      );
    });

    if (hasConflict) {
      alert('Event already added. Please choose different dates.');
      return;
    }

    if (isEditMode) {
      const updatedTodo = [...todo];
      updatedTodo[selectedTaskIndex] = {
        ...updatedTodo[selectedTaskIndex],
        Listtask: task,
        Liststartdate: startdate,
        Listenddate: enddate,
      };
      setTodo(updatedTodo);
      clearForm();
    } else {
      const listitem = {
        Listtask: task,
        Liststartdate: startdate,
        Listenddate: enddate,
      };
      const updatedTodo = [...todo, listitem];
      setTodo(updatedTodo);
      clearForm();
    }
  };

  const clearForm = () => {
    setTask('');
    setStartDate('');
    setEndDate('');
    setSelectedTaskIndex(null);
  };

  const editTask = (index) => {
    const selectedTask = todo[index];
    setTask(selectedTask.Listtask);
    setStartDate(selectedTask.Liststartdate);
    setEndDate(selectedTask.Listenddate);
    setSelectedTaskIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTodo = [...todo];
    updatedTodo.splice(index, 1);
    setTodo(updatedTodo);
  };

  return (
    <center>
      <div style={{ padding: '30px' }}>
        <p style={{ fontSize: '26px' }}>Todo List</p>
        <form style={{ width: '300px' }}>
          <label>Event Name</label>
          <br />
          <TextField
            fullWidth
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
          <br />
          <br />
          <label>Start Date</label>
          <br />
          <TextField
            fullWidth
            type="datetime-local"
            value={startdate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <br />
          <br />
          <label>End Date</label>
          <br />
          <TextField
            fullWidth
            type="datetime-local"
            value={enddate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <br />
          <br />

          <Button variant="contained" fullWidth type="button" onClick={handleFormSubmit}>
            {isEditMode ? 'Update' : 'Submit'}
          </Button>
          <br />
          <br />
        </form>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Event Name</TableCell>
                <TableCell align="right">Start Date</TableCell>
                <TableCell align="right">Start Time</TableCell>
                <TableCell align="right">End Date</TableCell>
                <TableCell align="right">End Time</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todo.map((item, index) => {
                const currentDate = new Date();
                const endDate = new Date(item.Listenddate);
                let status = 'Due';
                if (currentDate > endDate) {
                  status = 'Overdue';
                } else if (currentDate.toDateString() === endDate.toDateString()) {
                  status = 'Due Today';
                }

                const startDateObj = new Date(item.Liststartdate);
                const startDateDate = startDateObj.toLocaleDateString();
                const startTime = startDateObj.toLocaleTimeString();
                const endDateObj = new Date(item.Listenddate);
                const endDateDate = endDateObj.toLocaleDateString();
                const endTime = endDateObj.toLocaleTimeString();

                return (
                  <TableRow
                    key={index}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell align="right">{index + 1}</TableCell>
                    <TableCell align="right">{item.Listtask}</TableCell>
                    <TableCell align="right">{startDateDate}</TableCell>
                    <TableCell align="right">{startTime}</TableCell>
                    <TableCell align="right">{endDateDate}</TableCell>
                    <TableCell align="right">{endTime}</TableCell>
                    <TableCell align="right">{status}</TableCell>
                    <TableCell align="right">
                 
                      <Button onClick={() => editTask(index)}>Edit</Button>
                      <Button onClick={() => deleteTask(index)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </center>
  );
};

export default App;
