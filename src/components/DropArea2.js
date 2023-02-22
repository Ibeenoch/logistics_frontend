import axios from 'axios';
import React, { useState, useEffect, Children } from 'react'

function DropArea2({ getid, setMoved, customers }) {
  let getPlanner = JSON.parse(localStorage.getItem('planner2'));
  const [items, setItems] = useState( getPlanner ? getPlanner : []);
  const [id, setId] = useState(0) 
  const [isDrop, setIsDrop] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  


  const handleDelete = async () => {
    console.log(items)
    let id = items && items[0] && items[0].customer_id

    setIsDelete(true)
    localStorage.removeItem('planner2')   

 return  await axios.delete(`${url}/planner/${id}`)
    .then((res) => {
      console.log('sucessfully deleted', res)
   
    })
    .catch((err) => console.log(err))
    
  }
 



  // Set the date input value to be 7 days ahead of today's date
  const date = new Date();
  date.setDate(date.getDate() + 7);
  const dateString = date.toISOString().substr(0, 10);


  const url = 'https://logistics-backend.onrender.com'

  const getplanner = async () => {
    // fetch items from the database
   return await fetch(`${url}/planner/${getid}`)
      .then((response) => response.json())
      .then((data) => {
        setIsDrop(false);
        setIsDelete(false)
        console.log('new fetch =', data)
        
        localStorage.setItem('planner2', JSON.stringify(data));
        let getPlanner = JSON.parse(localStorage.getItem('planner2'));
 
       if(data){
        setItems(getPlanner); 
        setMoved(true);
       }else{
        setItems([])
       }
    
      })
      .catch((error) => console.log(error));
  }


        
  if(isDrop || isDelete ){
   getplanner()   
  }

  const handleDrop = (e) => {
    e.preventDefault(); 
   //check if an customer order is already in the slot
    if(items.length === 1){
      return;
    }

    // get the  customers details
    const props = e.dataTransfer.getData("text/plain");
    const source = document.getElementById(props);    

    var customer_id = getid

    setId(customer_id)

    setIsDrop(true);

    let getdata = customers.find((item) => item.id === getid)

    let data = {
      customer_id: getid,  
      date,
      name: getdata.name,
      pick_up_location: getdata.pick_up_location,
      drop_off_location: getdata.drop_off_location
      
    }

    //post the customers details to the database
    
    axios.post(`${url}/planner`, data)
    .then((response) => {
        setIsDrop(true)
    }, (error) => {
      console.log(error);
    })
      
  };

  return (
   <>
    <div>
    <div hidden>
    <label htmlFor="futureDate">Select a date:</label>
      <input type="date" id="futureDate" name="futureDate" value={dateString}  />
    </div>

     <div
     style={{ width: '90%', height: '100px', display: 'flex', alignItems:'center', border: '2px solid gray' , padding: '20px'}}
      droppable="true"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
     
      {items.map((item, index) => (
        <div key={index}>

          <div style={{ display: 'flex', justifyContent:'space-between'}}>
            <h4 style={{ textAlign: 'center' }}>Date Posted: {item.date.slice(0, 10)} </h4>
            <button onClick={handleDelete} style={{ width: '100px',height: '40px', cursor:'pointer', border: 'none', background: 'red' }} type="submit">Delete</button>
          </div>
         
        <table style={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'collapse', border: '3px solid gray', }} >
      <thead>
    <tr>
      <th>Customer Id</th>
      <th>Name</th>
      <th>Pick-up Location</th>
      <th>Drop-off Location</th>
    </tr>
  </thead>
  <tbody>
       <tr key={item.id}> 
       <td id='id' style={{ textAlign: 'center'}} >{item.customer_id}</td>  
        <td id='name' style={{ textAlign: 'center'}} >{item.name}</td>
        <td id='pickup' style={{ textAlign: 'center'}} >{item.pick_up_location}</td>
        <td id='dropoff' style={{ textAlign: 'center'}} >{item.drop_off_location}</td>
      </tr>
  </tbody>
  </table>
         
          
          </div>
      ))}
    </div>
    
    </div>
   
   </>
  );
}


export default DropArea2;
