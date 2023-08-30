import React,{useState,useEffect} from 'react'
import './home.css'
const Home = () => {
  const [count,newCount] = useState(1);
  const colors = ['cyan','green','brown'];
  const colr = ['wheat','yellow'];
  const [backgroundColor,setBackgroundcolor] = useState(0);
  const [counter,newcounter] = useState(0);
  const [clr, newclr] = useState(0);
  
  function decCount(){
    if(count<1){
      alert("count is less than 0");
      newCount(0)
    }else{
      newCount(count-1);
    }
    

  }
  function IncCount(){
    
    newCount(count+1);

  }
  useEffect (()=>{
    
    const interval = setInterval(()=>{
         
        
        setBackgroundcolor(prevCOlor =>(prevCOlor+1)%colors.length);
    },5000);

  },[]);
  
  const changeclr=()=>{
    if(clr==0){
      newclr(prevCOlor =>(prevCOlor+1)%colors.length);
    newclr(clr+1);
    }else if(clr==1){
      newclr(clr-1);
    }
  }
  return (
    <>
    <div style={{backgroundColor:colors[backgroundColor]}}>
      <p> Nouman TExt</p>
    </div>
    <button style={{color:'white',padding:'10px'}} onClick={changeclr}>Change Color</button>
    <div className='clr' style={{backgroundColor:colr[clr]}}>
    <p> Nouman</p>
    </div>
    <div className='counter' >
    <button onClick={decCount}>-</button>
    <p>{count}</p>
    <button onClick={IncCount}>+</button>
    </div>
    </>
  )
}

export default Home