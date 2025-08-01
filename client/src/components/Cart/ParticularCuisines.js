import React, {useEffect, useState} from "react";
import "../Cart/ParticularItemStyles.css";
import { useParams, Link } from "react-router-dom";
import { restaurant } from "../Lists";
import Navbar from "../header/Navbar";
import { useDispatch } from "react-redux";
import { AddCart, AddWishlist } from "../redux/ShoppingCart";
import { toast } from "react-hot-toast";
import Slider from "react-slick";
import NextArrow from "../Carousal/nextArrow";
import PrevArrow from "../Carousal/prevArrow";


const ParticularCuisines = () => {
  const [current, setCurrent] = useState("");

  const { id } = useParams();
  const val = parseInt(id);

  useEffect(() => {
    restaurant.map((item)=>{
      if(item.id === val){ 
        setCurrent(item.foodType)
      }
    })
    
  }, [val])

  const filterFoodType = current === ""? restaurant : restaurant.filter(item => item.foodType === current);
 
  const dispatch = useDispatch();
  
  const addToCart = (item) => {
    dispatch(AddCart(item));
    toast.success("Item added in cart!");
  };
  const addToWish = (item) => {
    dispatch(AddWishlist(item));
    toast.success("Item added in Wishlist!");
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
};
 

  return (
    <div>
      <Navbar />
      {restaurant.map((item) => {
        return (
          <div key={item.id} className="main-container">
            {item.id === val ? (
              <>
             
                <div className="img-food-true">
                  <img className="img" src={item.image} alt={item.name} />
                  <div className="time-container">
                    {item.deliveryTime + " min"}
                  </div>
                  <div className="img-desc">
                    <p><span>Description<br></br></span>"{item.description}"</p>
                  </div>
                </div>
                <div className="true-container">
                  <div className="detail-container">
                    <h1>{item.name}</h1>
                    <h4>{"Price: " + item.price + "₹"}</h4>
                    <div className="detail-container-1">
                      <h5>{item.foodType}</h5>
                      <div className="Rating-container">
                        {"Rating: " + item.rating + "+"}
                      </div>
                    </div>
                  </div>
                  <div className="main-btn-container">
                    <button
                      className="main-btn"
                      onClick={() => addToCart(item)}
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                      Add to Cart
                    </button>
                    <button
                      className="main-btn"
                      onClick={() => addToWish(item)}
                    >
                      <i class="fa-regular fa-heart"></i>
                      Wishlist
                    </button>
                  </div>
                </div>
              
              </>
            ) : (
              ""
            )}
          </div>
        );
      })}
      
      <div className="delivery-collection">
        <div className="max-width">
          <div className="collection-title">
            <div className="collection">
            <h1>{"More "+ current}</h1>
            <p>If Eat Feels You Happy So why are you waiting for??</p>
            </div>
            <br></br>
          </div>
          <div className="main-item">
            <Slider {...settings}>
              {filterFoodType.map((type)=>{
                return(
                  <>
                  <div className='delivery-item-cover'>
                    <Link to={`/item/${type.id}`}>
                      <img src={type.image} alt={type.name} className='delivery-item-image'/>
                      <div className='delivery-item-title'>{type.name}</div>
                    </Link>
                  </div>
                  </>
                )
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticularCuisines;
