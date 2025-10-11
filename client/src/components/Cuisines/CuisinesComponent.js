import React, { useEffect, useState } from "react";
import "../Cart/ParticularItemStyles.css";
import { useParams, Link } from "react-router-dom";
import Navbar from "../header/Navbar";
import { useDispatch } from "react-redux";
import { AddCart, AddWishlist } from "../redux/ShoppingCart";
import { toast } from "react-hot-toast";
import Slider from "react-slick";
import NextArrow from "../Carousal/nextArrow";
import PrevArrow from "../Carousal/prevArrow";

const ParticularCuisines = () => {
  const [currentItem, setCurrentItem] = useState(null);
  const [similarItems, setSimilarItems] = useState([]);
  const { id } = useParams();
  const val = parseInt(id);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        // Fetch selected item by ID
        const res = await fetch(`http://localhost:8080/api/fooditems/fooditem/${val}`);
        if (!res.ok) throw new Error("Item not found");
        const data = await res.json();
        setCurrentItem(data);

        // Fetch similar items by food type
        const resSimilar = await fetch(
          `http://localhost:8080/api/fooditems/foodtype/${data.foodtype}`
        );
        if (resSimilar.ok) {
          const similarData = await resSimilar.json();
          // Exclude current item from similar list
          setSimilarItems(similarData.filter((item) => item.id !== data.id));
        }
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      }
    };

    fetchItem();
  }, [val]);

  const addToCart = (item) => {
    dispatch(AddCart(item));
    toast.success("Item added to cart!");
  };

  const addToWish = (item) => {
    dispatch(AddWishlist(item));
    toast.success("Item added to wishlist!");
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (!currentItem) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />

      <div className="main-container">
        <div className="img-food-true">
          <img className="img" src={currentItem.image} alt={currentItem.name} />
          <div className="time-container">{currentItem.deliverytime + " min"}</div>
          <div className="img-desc">
            <p>
              <span>Description<br /></span>
              "{currentItem.description}"
            </p>
            <p><span>Ingredients:</span> {currentItem.ingredients}</p>
            <p><span>Category:</span> {currentItem.category}</p>
            <p><span>Address:</span> {currentItem.address}</p>
            <p>
              <span>Available:</span>{" "}
              {currentItem.isavailable ? `Yes (Quantity: ${currentItem.quantity})` : "No"}
            </p>
          </div>
        </div>

        <div className="true-container">
          <div className="detail-container">
            <h1>{currentItem.hotelname}</h1>
            <h2>{currentItem.name}</h2>
            <h4>
              Price: {currentItem.price}₹{" "}
              {currentItem.discount > 0 && (
                <span>(Discount: {currentItem.discount}%)</span>
              )}
            </h4>
            <div className="detail-container-1">
              <h5>{currentItem.foodtype}</h5>
              <div className="Rating-container">Rating: {currentItem.rating} ⭐</div>
            </div>
          </div>

          <div className="main-btn-container">
            <button className="main-btn" onClick={() => addToCart(currentItem)}>
              <i className="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>
            <button className="main-btn" onClick={() => addToWish(currentItem)}>
              <i className="fa-regular fa-heart"></i> Wishlist
            </button>
          </div>
        </div>
      </div>
      
      {similarItems.length > 0 && (
        <div className="delivery-collection">
          <div className="max-width">
            <div className="collection-title">
              <div className="collection">
                <h1>{"More " + currentItem.foodtype}</h1>
                <p>If Eat Feels You Happy, then why are you waiting for??</p>
              </div>
            </div>
            <div className="main-item">
              <Slider {...settings}>
                {similarItems.map((item) => (
                  <div className="delivery-item-cover" key={item.id}>
                    <Link to={`/item/${item.id}`}>
                      <img src={item.image} alt={item.name} className="delivery-item-image" />
                      <div className="delivery-item-title">{item.name}</div>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticularCuisines;