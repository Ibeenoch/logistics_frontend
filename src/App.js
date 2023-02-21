import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CustomerForm from './components/CustomerForm';
import DragAndDrop from './components/DragAndDrop';
import DropArea1 from './components/DropArea1';
import DropArea2 from './components/DropArea2';
import DropArea3 from './components/DropArea3';
import DropArea4 from './components/DropArea4';


const url = 'https://logistics-backend.onrender.com'

function App() {
  const [customers, setCustomers] = useState([]);
  const [getid, setGetId] = useState(0)
  const [reload,setReload] = useState(false);
  const [moved, setMoved] = useState(false);
 
  const [futureDate, setFutureDate] = useState(new Date());


  // Set the date input value to be 7 days ahead of today's date
  const date = new Date();
  date.setDate(date.getDate() + 7);
  const dateString = date.toISOString().substr(0, 10);


  // Fetch the list of customers from the server
  useEffect(() => {
 
    fetch(`${url}/customers`)
    .then(res => res.json())
    .then(data => {
      setCustomers(data);
      console.log(data)
    })
    .catch(err => console.error(err));

  }, []);


  if(reload){

    setReload(false)
    setMoved(false)

    fetch(`${url}/customers`)
    .then(res => res.json())
    .then(data => {
      setCustomers(data);
      console.log(data)
    })
    .catch(err => console.error(err));

  }

  return (
    <div className="App" style={{ display: 'flex', gap: '4rem' , width: '100vw', padding: '20px'}}>
      <div style={{ width: '50vw', textAlign: 'center', fontFamily: 'cursive', }}>
        <h1>Avana Logistics Company</h1>
        <h2>Customers Pending Logistics queue</h2>
        <DragAndDrop moved={moved} setReload={setReload} getid={getid} setGetId={setGetId} customers={customers}/>
      <CustomerForm setReload={setReload} onAddCustomer={customer => setCustomers([...customers, customer])} />
      </div>

      <div style={{ width: '50vw', padding: '20px', fontFamily: 'cursive' }}>
      <h1 style={{ textAlign: 'center'}}>Planner</h1>
    <div style={{ textAlign: 'center', fontSize:'1.2rem'}}>
    <label htmlFor="futureDate">Scheduled Date:</label>
      <input style={{ cursor: 'pointer' }} type="date" id="futureDate" name="futureDate" value={dateString}  />
     </div>
        <h2 style={{ textAlign: 'center'}}>Slot 1  </h2>
        <DropArea1 setMoved={setMoved} getid={getid} customers={customers} />
        <h2 style={{ textAlign: 'center'}}>Slot 2</h2>
        <DropArea2 setMoved={setMoved}  getid={getid} customers={customers} />
        <h2 style={{ textAlign: 'center'}}>Slot 3 </h2>
        <DropArea3 setMoved={setMoved} getid={getid} customers={customers} />
        <h2 style={{ textAlign: 'center'}}>Slot 4 </h2>
        <DropArea4 setMoved={setMoved}  getid={getid} customers={customers} />
        
      </div>
      
    </div>
  );
}



  
  export default App;

