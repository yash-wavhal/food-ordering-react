import React, { useState, useEffect } from "react";
import "../exploreSection/ExploreSectionStyles.css";
import { Link } from "react-router-dom";

const ExploreSection = () => {
  const [search, setSearch] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(12);

  const fetchFoodItems = async (pageNumber = 1) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/fooditems?page=${pageNumber}&limit=${limit}`
      );
      const data = await res.json();
      setFoodItems(data.items);
      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFoodItems(page);
  }, [page]);

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const filteredItems = foodItems.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-width explore-section">
      <div className="collection-title">
        <div className="collection-search">
          <h1>Search It, Eat It :- That's It!</h1>
          <div className="collection-icon">
            <input
              type="search"
              placeholder="Enter Your Food..."
              id="collection-input"
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="explore-grid">
          {filteredItems.map((restaurant) => (
            <div className="res-row" key={restaurant.id}>
              <div className="explore-card-cover">
                <Link to={`/item/${restaurant.id}`}>
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="explore-card-image"
                  />
                </Link>
                <div className="delivery-time">
                  {restaurant.deliveryTime + "min"}
                </div>
              </div>
              <div className="res-name">{restaurant.name}</div>
              <div className="res-foodType">{restaurant.foodType}</div>
              <div className="pir-rat">
                <div className="approx-price">{restaurant.price}₹</div>
                <div className="res-rating absolute-center">
                  {restaurant.rating}
                  <i className="fi fi-rr-star absolute-center"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="btn-container">
          <button className="prev-btn" onClick={handlePrev} disabled={page === 1}>
            Previous
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button className="next-btn" onClick={handleNext} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;