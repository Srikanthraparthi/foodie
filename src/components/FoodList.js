import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodList.css';

function FoodList({ addToOrder }) {
  const [foods, setFoods] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedItems, setAddedItems] = useState({});

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=c')
      .then(response => {
        const meals = response.data.meals || [];

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
    
    setAddedItems(prev => ({ ...prev, [food.id]: true }));

    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [food.id]: false }));
    }, 2000); // Reset after 2 seconds
  };

  const filteredFoods = selectedCategory === 'All'
    ? foods
    : foods.filter(food => food.category === selectedCategory);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-dark fw-bold display-5 gradient-text">
        🍽️ Choose Your Favorite Meals
      </h2>

      <div className="d-flex justify-content-center mb-4 gap-3 flex-wrap">
        {['All', 'Veg', 'Non-Veg'].map(cat => (
          <button
            key={cat}
            className={`btn px-4 py-2 rounded-pill fw-medium shadow-sm ${selectedCategory === cat ? 'btn-dark' : 'btn-outline-dark'}`}
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
            <div key={food.id} className="col-lg-4 col-md-6 mb-4">
              <div className="card food-card shadow border-0 rounded-4 h-100 animate-card">
                <img
                  src={food.image}
                  alt={food.name}
                  className="card-img-top food-img"
                />
                <div className="card-body d-flex flex-column justify-content-between text-center">
                  <h5 className="fw-bold mb-1">{food.name}</h5>
                  <span className={`badge px-3 py-2 mb-2 rounded-pill ${food.category === 'Veg' ? 'bg-success' : 'bg-danger'}`}>
                    {food.category}
                  </span>
                  <p className="text-muted small">{food.description}</p>
                  <p className="fs-5 fw-bold text-success mb-3">₹{food.price}</p>

                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-danger btn-sm rounded-circle"
                        onClick={() => handleQuantityChange(food.id, -1)}
                      >
                        <i className="bi bi-dash-lg"></i>
                      </button>
                      <span className="fs-5">{quantities[food.id] || 1}</span>
                      <button
                        className="btn btn-outline-primary btn-sm rounded-circle"
                        onClick={() => handleQuantityChange(food.id, 1)}
                      >
                        <i className="bi bi-plus-lg"></i>
                      </button>
                    </div>
                    <button
                      className={`btn fw-bold px-4 rounded-pill ${addedItems[food.id] ? 'btn-success' : 'btn-warning'}`}
                      onClick={() => handleAddToOrder(food)}
                      disabled={addedItems[food.id]}
                    >
                      {addedItems[food.id] ? (
                        <><i className="bi bi-check-circle me-1"></i> Added</>
                      ) : (
                        <><i className="bi bi-cart-plus me-1"></i> Order</>
                      )}
                    </button>
                  </div>
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
