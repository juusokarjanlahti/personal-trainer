import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function CustomerList() {
    const [customer, setCustomer] = useState([]);

    const getCustomers = () => {
        fetch(`${API_URL}customers`, {
               method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(customer => setCustomer(customer._embedded.customers))
        .catch(error => console.error('Error fetching customers:', error));
    };

    useEffect(() => getCustomers(), [])

    return (
        <>
            <h1>Customers</h1>
            <ul>
                {customer.map(customer => (
                    <li key={customer._links.self.href}>
                        <p>First Name: {customer.firstname}</p>
                        <p>Last Name: {customer.lastname}</p>
                        <p>Address: {customer.streetaddress}, {customer.city}, {customer.postcode}</p>
                        <p>Email: {customer.email}</p>
                        <p>Phone: {customer.phone}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default CustomerList;