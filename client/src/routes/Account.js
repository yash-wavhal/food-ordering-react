import React, { useEffect, useState } from "react";
import Navbar from "../components/header/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { removeWishlist } from "../components/redux/ShoppingCart";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import api from "../utils/axios";

const Account = () => {
  const { wish } = useSelector((item) => item.user);
  const { quantity, amount } = useSelector((carts) => carts.user);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        setName(res.data.user.name);
      } catch (err) {
        if (err.response?.status === 401) {
          console.warn("Unauthorized. User is not logged in.");
        } else {
          console.error("An unexpected error occurred:", err);
        }
      }
    };
    fetchUser();
  }, []);

  const dispatch = useDispatch();

  const handleRemoveWish = (cartItem) => {
    dispatch(removeWishlist(cartItem));
    toast.success("Item Removed!");
  };
  return (
    <>
      <Navbar />
      <div className="pp-container">
        <div className="pp-top">
            <div className="profile-color">
              <i className="fa-solid fa-user fa-2x"></i>
              <p className="item">Welcome, {name}</p>
            </div>
            <div className="item">
              <span>Order: {quantity}</span>
            </div>
            <div className="item">
              <span>Amount: {amount}</span>
            </div>
          </div>
        <div>
        {wish.length === 0 ? 
            <>
              <h1 className="no-itemm">No Item in cart!</h1>
            </>
          :
            <div>
              <div className="wishlist-title">Your Wishlist</div>
              <div className="explore-grid">
              {
                wish?.map((food_cart) => (
                  <div className="under-container"> 
                    <div className="explore-card-cover">
                      <Link to={`/item/${food_cart.id}`}>
                        <img src={food_cart.image} alt={food_cart.name} className="explore-card-image"/>
                      </Link>
                    </div>
                    <div className="wish">
                      <div className="food-nam">{food_cart.name}</div>
                      <div className="rate-pir">
                        <div className="approx-pric">{food_cart.price + "₹"}</div>
                      </div>
                      <button className="cart-bt" onClick={() => handleRemoveWish(food_cart)}><i className="fa-solid fa-trash"></i></button>
                    </div>
                  </div>
                ))
              }
            </div>
            </div>
        }
        </div>
      </div>
    </>
  );
};

export default Account;
