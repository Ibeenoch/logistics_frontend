import axios from 'axios';
import React, { useState } from 'react'

function DragAndDrop({ customers, getid, setGetId, moved, setReload }) {
  const [isDragging, setIsDragging] = useState(false);

  const url = 'https://logistics-backend.onrender.com'
  
  const handleDragStart = (event) => {
    setIsDragging(true);
    event.dataTransfer.setData("text/plain", event.target.id);
   
  }

  if(moved){
    axios.delete(`${url}/customers/${getid}`)
    .then((res) => {
      console.log('sucessfully deleted', res)
      setReload(true)
    })
    .catch((err) => console.log(err))
  }

  

return (

  
 !customers ? (<>Please Add a customer field</>) : (
  <>
  {customers.map((customer) => (
 <div draggable="true" id='drag' onDragStart={handleDragStart}  onDrag={() => { setGetId(customer.id)}}>
     
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
       <tr key={customer.id} >   
        <td id='id' >{ customer.id  }</td>
        <td id='name' >{customer.name}</td>
        <td id='pickup' >{customer.pick_up_location}</td>
        <td id='dropoff' >{customer.drop_off_location}</td>
      </tr>
  </tbody>
  </table>
  
      </div>
     
    ))}

</>
 )
)
}

export default DragAndDrop