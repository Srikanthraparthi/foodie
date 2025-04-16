import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FoodListPage from './pages/FoodListPage';
import OrderListPage from './pages/OrderListPage';
import PaymentPage from './pages/PaymentPage';
import ReceiptPage from './pages/ReceiptPage';
import './App.css';

function App() {
  const [orders, setOrders] = useState([]);
  const [table, setTable] = useState('');
  const [paymentDone, setPaymentDone] = useState(false);

  const addToOrder = (food) => {
    const existing = orders.find(item => item.id === food.id);
    if (existing) {
      setOrders(orders.map(item =>
        item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setOrders([...orders, food]);
    }
  };

  const updateOrder = (id, quantity) => {
    setOrders(orders.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeOrder = (id) => {
    setOrders(orders.filter(item => item.id !== id));
  };

  const handlePayment = () => {
    setPaymentDone(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* ✅ Include setTable here */}
          <Route path="/" element={<FoodListPage addToOrder={addToOrder} setTable={setTable} />} />

          <Route path="/order-list" element={<OrderListPage orders={orders} updateOrder={updateOrder} removeOrder={removeOrder} />} />

          <Route path="/payment" element={<PaymentPage orders={orders} handlePayment={handlePayment} />} />

          <Route path="/paymentdone" element={<PaymentPage orders={orders} handlePayment={paymentDone} />} />

          <Route path="/receipt" element={<ReceiptPage orders={orders} table={table} />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
