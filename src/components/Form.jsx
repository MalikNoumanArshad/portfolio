import React,{useEffect,useState} from 'react'

const Form = () => {
    const [semail,setemail] = useState("");
    const [task,settask] = useState("");

    const [todo, setTodo] = useState([]);
    function todocall(){

    }


  return (
    <>
    <div>Todo List</div>
    <div>
        <input  type='email'  value={semail} onChange={(e)=>setemail(e.target.value)} />
        <input type='task' value={task} onChange={(e)=> settask(e.target.value)} />
        <input type='submit' onClick={todocall} />
    </div>
    </>
  )
}

export default Form