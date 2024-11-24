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

        // Fetch trainings
        const trainingsRes = await fetch(`${API_URL}/trainings`);
        const { _embedded: { trainings } } = await trainingsRes.json();

        // Combine training data with corresponding customer data
        const combinedData = trainings.map(training => {
          const customer = customerMap.get(training._links.customer.href);
          return {
            ...training,
            customer,
            id: training._links.self.href.split('/').pop(), // Extract the training ID
          };
        });

        setCustomers(customers);
        setTrainings(combinedData);
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
    <DataContext.Provider value={{ customers, trainings, setTrainings }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
