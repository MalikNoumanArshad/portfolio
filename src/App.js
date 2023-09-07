import React,{useState} from 'react'
import Header from './Header/Header'
import Todo from './components/Todo'
import Paper from '@mui/material/Paper';

import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
const App = () => {
  const [task,settask] = useState("");
  const [startdate,setstartdate] = useState("");
  const [enddate,setenddate] = useState("");

  const [todo, setTodo] = useState([]);
  function deleteTodo(index) {
    const updatedTodo = todo.filter((_, i) => i !== index);
    setTodo(updatedTodo);
  }
  function todocall() {
    if (task !== '' && startdate !== '' && enddate !== '') {
      const newStartDate = new Date(startdate);
      const newEndDate = new Date(enddate);
  
      const hasConflict = todo.some((item) => {
        const itemStartDate = new Date(item.Liststartdate);
        const itemEndDate = new Date(item.Listenddate);
  
        return (
          (newStartDate >= itemStartDate && newStartDate <= itemEndDate) ||
          (newEndDate >= itemStartDate && newEndDate <= itemEndDate) ||
          (newStartDate <= itemStartDate && newEndDate >= itemEndDate)
        );
      });
  
      if (hasConflict) {
        alert("Task conflicts with an existing task. Please choose different dates.");
      } else {
        let listitem = {
          Listtask: task,
          Liststartdate: startdate,
          Listenddate: enddate,
        };
        let updatetodo = [...todo, listitem];
        setTodo(updatetodo);
        settask("");
        setenddate("");
        setstartdate("");
      }
    } else {
      alert("Fields cannot be empty");
    }
  }
  
  
  


return (
  <>
<center>  
  <div style={{padding:'30px',}}>

  <p style={{fontSize:'26px'}}>Todo List</p>



      
      <form style={{width:'300px'}}>
      <label>Task Name</label>
      <br />
      <TextField fullWidth type='text' value={task} onChange={(e)=> settask(e.target.value)} required />
      <br />
      <br />
      <label>Start Date</label>
      <br />
      <TextField fullWidth type='date' value={startdate} onChange={(e)=> setstartdate(e.target.value)} required />
      <br />
      <br />
      <label>End Date</label>
      <br />
      <TextField fullWidth type='date' value={enddate} onChange={(e)=> setenddate(e.target.value)} required />
      <br />
      <br />

      <Button fullWidth type='submit' onClick={todocall} >Submit</Button>
      <br />
  <br />
  </form>

  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Task Name</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todo.map((item,index) =>{
          const currentDate = new Date();
          const endDate = new Date(item.Listenddate);
          let status = "Due";
          if (currentDate > endDate) {
            status = "Overdue";
          } else if (currentDate.toDateString() === endDate.toDateString()) {
            status = "Due Today";
          }
          return(

            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="right">{index+1}</TableCell>
              <TableCell align="right">{item.Listtask}</TableCell>
              <TableCell align="right">{item.Liststartdate}</TableCell>
              <TableCell align="right">{item.Listenddate}</TableCell>
              <TableCell align="right">{status}</TableCell>
              <TableCell align="right">  
                    <button onClick={() => deleteTodo(index)}>Delete</button>
</TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  
  </div>
  </center>
  </>
)
}

export default App