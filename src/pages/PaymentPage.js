import React from 'react';
import { useNavigate } from 'react-router-dom';
import Payment from '../components/Payment';

function PaymentPage({ orders, handlePayment }) {
  const navigate = useNavigate();

  const goToReceipt = () => {
    handlePayment();
    navigate('/receipt');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-success mb-4 fw-bold">💳 Payment</h1>
      <Payment orders={orders} handlePayment={goToReceipt} />
    </div>
  );
}

export default PaymentPage;
