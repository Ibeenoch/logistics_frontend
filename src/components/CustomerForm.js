import React, { useState } from 'react';
import DnD from './DnD';

function CustomerForm({ onAddCustomer, setReload }) {
  const [name, setName] = useState('');
  const [pickUpLocation, setPickUpLocation] = useState('');
  const [dropOffLocation, setDropOffLocation] = useState('');

  const url = 'https://logistics-backend.onrender.com'

const handleSubmit = event => {
    event.preventDefault();
    const customer = { name, pick_up_location: pickUpLocation, drop_off_location: dropOffLocation };
    fetch(`${url}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer)
    })
      .then(res => res.text())
      .then(message => {
        console.log(message);
        onAddCustomer(customer);
        setName('');
        setPickUpLocation('');
        setDropOffLocation('');
        setReload(true)
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', }}>
      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit}  >
        <div style={{ fontSize: '1.2rem', fontWeight: 500,  }}>
          <label style={{ marginLeft: '75px'}}  htmlFor="name">Full Name:</label>
          <input placeholder='enter your name' style={{ width: '300px', height:'25px', padding: '5px', fontSize: '1rem', marginBottom: '1rem' }} type="text" id="name" value={name} onChange={event => setName(event.target.value)} />
        </div>
        <div style={{ fontSize: '1.2rem', fontWeight: 500,  }}>
          <label style={{ marginLeft: '20px'}} htmlFor="pick-up-location">Pick-up Location:</label>
          <input  placeholder='enter your pick up location' style={{ width: '300px', height:'25px', padding: '5px', fontSize: '1rem', marginBottom: '1rem' }} type="text" id="pick-up-location" value={pickUpLocation} onChange={event => setPickUpLocation(event.target.value)} />
        </div>
        <div style={{ fontSize: '1.2rem', fontWeight: 500,  }}>
          <label style={{ }} htmlFor="drop-off-location">Drop-off Location:</label>
          <input  placeholder='enter your drop off location' style={{ width: '300px', height:'25px', padding: '5px', fontSize: '1rem', marginBottom: '1rem' }} type="text" id="drop-off-location" value={dropOffLocation} onChange={event => setDropOffLocation(event.target.value)} />
        </div>
        <button style={{ width: '180px', height:'40px', background: 'purple', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '10px', cursor: 'pointer', fontSize: '1.1rem',  marginBottom: '1rem' }} type="submit">Add Customer</button>
      </form>
      <DnD />
    </div>
  );
  }

  export default CustomerForm;
