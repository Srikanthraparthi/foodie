import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderList from '../components/OrderList';

function OrderListPage({ orders, updateOrder, removeOrder }) {
  const navigate = useNavigate();

  const goToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4 fw-bold">🧾 Order Summary</h1>
      <OrderList
        orders={orders}
        updateOrder={updateOrder}
        removeOrder={removeOrder}
      />
      <button className="btn btn-success mt-4" onClick={goToPayment}>Proceed to Payment</button>
    </div>
  );
}

export default OrderListPage;
