function Payment({ orders, handlePayment }) {
  const total = orders.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);

  return (
    <div className="card shadow p-3">
      <h4 className="text-success">💵 Payment Summary</h4>
      {/* Changed the currency symbol to INR (₹) */}
      <p className="mb-2">Total Amount: <strong>₹{total}</strong></p>
      <button className="btn btn-primary w-100" onClick={handlePayment}>
        Pay & Print Receipt
      </button>
    </div>
  );
}

export default Payment;
