import React,{useState} from 'react'
import Home from './components/Home'
import Header from './Header/Header'
import Todo from './components/Todo'
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
    if ( task !== '' && startdate != '' && enddate !='') {
      let listitem = {
        Listtask: task,
        Liststartdate:startdate,
        Listenddate:enddate,
      };
      let updatetodo = [...todo, listitem];
      setTodo(updatetodo);
      settask("");
      setenddate("");
      setstartdate("");
    } else {
      alert("Fields cannot be empty");
    }
  }
  
  


return (
  <>
<center>  
  <div style={{padding:'30px',}}>

  <p style={{fontSize:'26px'}}>Todo List</p>



      <br />
      <br />
      <label>Task Name</label>
      <br />
      <input type='text' value={task} onChange={(e)=> settask(e.target.value)} required />
      <br />
      <br />
      <label>Start Date</label>
      <br />
      <input type='date' value={startdate} onChange={(e)=> setstartdate(e.target.value)} required />
      <br />
      <br />
      <label>End Date</label>
      <br />
      <input type='date' value={enddate} onChange={(e)=> setenddate(e.target.value)} required />
      <br />
      <br />

      <button type='submit' onClick={todocall} >Submit</button>
      <br />
  <br />
  <table border={"1px"}>
    <thead>
      <th>ID</th>
      <th>Task Name</th>
      <th>Start Date</th>
      <th>End Date</th>
      <th>Status</th>
      <th>Action</th>
    </thead>
    <tbody>
    {todo.map((item, index) => {
       const currentDate = new Date();
       const endDate = new Date(item.Listenddate);
       let status = "Due";
       if (currentDate > endDate) {
         status = "Overdue";
       } else if (currentDate.toDateString() === endDate.toDateString()) {
         status = "Due Today";
       }
  return (
    <tr key={index}>
      <td>{index+1}</td>
      <td>{item.Listtask}</td>
      <td>{item.Liststartdate}</td>
      <td>{item.Listenddate}</td>
      <td>{status}</td>
      <td>
        <button onClick={() => deleteTodo(index)}>Delete</button>
      </td>
    </tr>
  );
})}
      
    </tbody>
  </table>
  </div>
  </center>
  </>
)
}

export default App