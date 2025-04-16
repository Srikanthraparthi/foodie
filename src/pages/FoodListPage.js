import React from 'react';
import { useNavigate } from 'react-router-dom';
import FoodList from '../components/FoodList';
import TableSelection from '../components/TableSelection'; // 👈 Import it

function FoodListPage({ addToOrder, setTable }) {
  const navigate = useNavigate();

  const goToOrderList = () => {
    navigate('/order-list');
  };

  return (
    <div className="container mt-4">
      {/* Header with Logo, Text, and Table Selection */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div className="d-flex align-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
            alt="Restaurant Logo"
            className="img-fluid me-3"
            style={{ maxHeight: '80px' }}
          />
          <div>
            <h1 className="fw-bold text-primary m-0">🍴 The Nouveau Table</h1>
            <small className="text-muted">"Good food is good mood!"</small>
          </div>
        </div>

        {/* Table Selection on the right side of header */}
        <div>
          <TableSelection setTable={setTable} />
        </div>
      </div>

      {/* Food List Component */}
      <FoodList addToOrder={addToOrder} />

      {/* Button at Bottom Right */}
      <div className="position-fixed bottom-0 end-0 p-4">
        <button className="btn btn-primary" onClick={goToOrderList}>
          Go to Order Summary
        </button>
      </div>
    </div>
  );
}

export default FoodListPage;
