import React, { useState, useEffect } from 'react';
import { getJobOrders } from '../data/dbCalls';
import JobOrder from '../components/JobOrder';

export default function JobOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getJobOrders().then(setOrders);
  }, []);

  return (
    <div className="job-orders-container">{orders.map((order) => <JobOrder key={order} jobNumber={order} />)}</div>
  );
}
