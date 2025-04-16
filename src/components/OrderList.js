function OrderList({ orders, updateOrder, removeOrder }) {
  return (
    <div className="card shadow p-3 mb-3">
      <h4 className="text-secondary mb-3">🧾 Current Order</h4>
      {orders.length === 0 && <p className="text-muted">No items added yet.</p>}
      {orders.map(item => (
        <div key={item.id} className="d-flex align-items-center mb-2 border-bottom pb-2">
          <img src={item.image} alt={item.name} width="50" height="50" className="rounded me-2" />
          <div className="flex-grow-1">
            <strong>{item.name}</strong><br />
            {/* Changed the price currency to INR (₹) */}
            <span className="text-muted">₹{item.price}</span>
          </div>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateOrder(item.id, parseInt(e.target.value))}
            min="1"
            className="form-control me-2"
            style={{ width: '60px' }}
          />
          <button className="btn btn-sm btn-outline-danger" onClick={() => removeOrder(item.id)}>✖</button>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
