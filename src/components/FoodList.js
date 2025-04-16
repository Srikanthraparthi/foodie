import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FoodList({ addToOrder }) {
  const [foods, setFoods] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Fetch food data from TheMealDB
    axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=c')
      .then(response => {
        const meals = response.data.meals || [];

        // Classify as Veg or Non-Veg manually (basic keyword check)
        const processedMeals = meals.map(meal => {
          const lowerDesc = meal.strInstructions?.toLowerCase() || "";
          const isNonVeg = /chicken|meat|fish|beef|mutton/.test(lowerDesc);
          return {
            id: meal.idMeal,
            name: meal.strMeal,
            image: meal.strMealThumb,
            description: meal.strInstructions?.slice(0, 100) + '...',
            price: (Math.random() * 10 + 5).toFixed(2),
            category: isNonVeg ? 'Non-Veg' : 'Veg'
          };
        });

        setFoods(processedMeals);
      })
      .catch(error => {
        console.error("Failed to fetch meals:", error);
      });
  }, []);

  const handleQuantityChange = (id, change) => {
    setQuantities(prev => {
      const newQuantity = Math.max(1, (prev[id] || 1) + change);
      return { ...prev, [id]: newQuantity };
    });
  };

  const handleAddToOrder = (food) => {
    const quantity = quantities[food.id] || 1;
    addToOrder({ ...food, quantity });
    setQuantities(prev => ({ ...prev, [food.id]: 1 }));
  };

  const filteredFoods = selectedCategory === 'All'
    ? foods
    : foods.filter(food => food.category === selectedCategory);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary fw-bold">🍽️ Available Food</h2>

      {/* Category Filter Buttons */}
      <div className="d-flex justify-content-center mb-4">
        {['All', 'Veg', 'Non-Veg'].map(cat => (
          <button
            key={cat}
            className={`btn me-2 ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="row">
        {filteredFoods.length === 0 ? (
          <p className="text-center text-muted">No food items in this category.</p>
        ) : (
          filteredFoods.map(food => (
            <div key={food.id} className="col-md-4 mb-4">
              <div className="card shadow border-0 rounded-4">
                <img
                  src={food.image}
                  alt={food.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-semibold">{food.name}</h5>
                  <p className="text-muted small">{food.description}</p>
                  {/* Changed the price currency to INR (₹) */}
                  <p className="card-text fs-5 fw-bold text-success">₹{food.price}</p>

                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <button
                      className="btn btn-outline-danger btn-sm rounded-circle me-2 px-3"
                      onClick={() => handleQuantityChange(food.id, -1)}
                    >
                      <i className="bi bi-dash-lg"></i>
                    </button>
                    <span className="fs-5 fw-medium">{quantities[food.id] || 1}</span>
                    <button
                      className="btn btn-outline-primary btn-sm rounded-circle ms-2 px-3"
                      onClick={() => handleQuantityChange(food.id, 1)}
                    >
                      <i className="bi bi-plus-lg"></i>
                    </button>
                  </div>

                  <button
                    className="btn btn-success w-100 rounded-pill"
                    onClick={() => handleAddToOrder(food)}
                  >
                    <i className="bi bi-cart-plus me-2"></i>Add to Order
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FoodList;
