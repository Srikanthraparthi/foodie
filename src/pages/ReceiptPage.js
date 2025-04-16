import React from 'react';
import Receipt from '../components/Receipt';

function ReceiptPage({ orders, table }) {
  return (
    <div className="container mt-5">
      <Receipt orders={orders} table={table} />
    </div>
  );
}

export default ReceiptPage;
