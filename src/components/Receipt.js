import React, { useEffect } from 'react';

function Receipt({ orders, table }) {
  const total = orders.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);

  useEffect(() => {
    setTimeout(() => {
      window.print();
    }, 1000);
  }, []);

  return (
    <div className="card shadow p-4 mt-5">
      <h3 className="text-center text-success mb-3">🧾 Payment Receipt</h3>
      <p><strong>Table:</strong> {table}</p>
      <ul className="list-group mb-3">
        {orders.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.name} × {item.quantity}
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <h5 className="text-end">Total: <strong>₹{total}</strong></h5>
      <p className="text-success">✅ Payment successful!</p>
    </div>
  );
}

export default Receipt;
