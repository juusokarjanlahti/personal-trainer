import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DataContext } from "../context/DataProvider";

const API_URL = import.meta.env.VITE_API_URL;

const AddTrainingForm = () => {
  const { customers, setTrainings } = useContext(DataContext);
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newTraining = {
      activity,
      duration: parseInt(duration),
      date: date.toISOString(),
      customer: `${API_URL}/customers/${selectedCustomerId}`,
    };

    try {
      const response = await fetch(`${API_URL}/trainings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTraining),
      });

      if (!response.ok) {
        throw new Error('Failed to create new training');
      }

      const createdTraining = await response.json();
      
      // Fetch the customer data for the newly added training session
      const customerRes = await fetch(createdTraining._links.customer.href);
      const customerData = await customerRes.json();

      // Combine the new training data with the customer data
      const newTrainingWithCustomerData = {
        ...createdTraining,
        customer: customerData,
        id: createdTraining._links.self.href.split('/').pop(), // Extract the training ID
      };

      setTrainings((prevTrainings) => [...prevTrainings, newTrainingWithCustomerData]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Activity:</label>
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Duration (minutes):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          showTimeSelect
          dateFormat="Pp"
        />
      </div>
      <div>
        <label>Customer:</label>
        <select
          value={selectedCustomerId}
          onChange={(e) => setSelectedCustomerId(e.target.value)}
          required
        >
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer._links.self.href} value={customer._links.self.href.split('/').pop()}>
              {customer.firstname} {customer.lastname}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add Training</button>
    </form>
  );
};

export default AddTrainingForm;