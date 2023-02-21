import React, { useState } from 'react'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'

const DnD = () => {
  const [show, setShow] = useState(false);

  const handleshow = () => {
    setShow(!show)
  }

  return (
    <div >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'gray', cursor: 'pointer' }}>
        <h4 onClick={handleshow}>User Guide</h4>
        <div onClick={handleshow} style={{ display: ( show ? 'none' : 'block') }}> <KeyboardArrowUp /></div>
        <div onClick={handleshow} style={{ display: ( show ? 'block' : 'none') }}> <KeyboardArrowDown /></div>      
      </div>
   <div style={{ display: (show ? 'block' : 'none' ), border: '1px solid gray'}}>
    <p style={{ color: 'red' }}>
    Welcome to Avana Logistics Company, 
add a customer logistics plan by filling the 'Customers Form' on the Left side of the screen and hit the 'Add Customer' button.<br/>
The customers logistics plan would be add to the customers logistics queue, on the top of the 'Add Customer' form. <br />
To active the logistics process of those customers that are have their logistics pending on the 'Customers Pending Logistics queue', use your computer mouse and drag any of the specific customer on the 'Customers Pending Logistics queue' list into any of the 4 available slot. <br />
Please note that if a customer is already on the slot, another customer order cannot be added to it unless deleted. <br /> In order to delete the customer order on any of the slot, just click the delete button at the top right corner of that slot.
    </p>
   </div>
    </div>
  )
}

export default DnD
