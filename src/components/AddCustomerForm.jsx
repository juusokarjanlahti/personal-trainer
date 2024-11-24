import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataProvider";

const API_URL = import.meta.env.VITE_API_URL;

const AddCustomerForm = () => {
  const { setCustomers } = useContext(DataContext);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [streetaddress, setStreetaddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCustomer = {
      firstname,
      lastname,
      streetaddress,
      city,
      postcode,
      email,
      phone,
    };

    try {
      const response = await fetch(`${API_URL}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
      });

      if (!response.ok) {
        throw new Error('Failed to create new customer');
      }

      const createdCustomer = await response.json();

      setCustomers((prevCustomers) => [...prevCustomers, createdCustomer]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Street Address:</label>
        <input
          type="text"
          value={streetaddress}
          onChange={(e) => setStreetaddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Postcode:</label>
        <input
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Customer</button>
    </form>
  );
};

export default AddCustomerForm;