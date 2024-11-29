import React, { useState, useEffect, createContext } from "react";

export const DataContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

const DataProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customers
        const customersRes = await fetch(`${API_URL}/customers`);
        const { _embedded: { customers } } = await customersRes.json();

        // Create a map of customer URLs to customer data
        const customerMap = new Map();
        customers.forEach(customer => {
          customerMap.set(customer._links.self.href, customer);
        });

        // Fetch trainings with customer data
        const trainingsRes = await fetch(`${API_URL}/gettrainings`);
        const trainingsData = await trainingsRes.json();

        // Structure the data for the children components
        const trainingsWithCustomerData = trainingsData.map(training => ({
          ...training,
          customer: customerMap.get(`${API_URL}/customers/${training.customer.id}`),
          id: training.id, // Use the training ID directly from the response
        }));

        setCustomers(customers);
        setTrainings(trainingsWithCustomerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <DataContext.Provider value={{ customers, setCustomers, trainings, setTrainings }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
