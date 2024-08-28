import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { emptyCart } from "../../slices/cartSlice";
import "./AuctionSuccessPage.css";

const AuctionSuccessPage = () => {
  const franchiseDetails = useSelector((state) => state?.franchise?.details);
  const cartItems = useSelector((state) => state.cart.items);
  const totalAuctionPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.auctionprice),
    0
  );
  const dispatch = useDispatch();

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  return (
    <div className="success-container">
      <h2>Your Auction has been completed Successfully</h2>

      <div className="franchise-details">
        <h3>Franchise Details</h3>
        <p>
          <strong>Name:</strong> {franchiseDetails?.franchiseName}
        </p>
        <p>
          <strong>Owner:</strong> {franchiseDetails?.ownerName}
        </p>
        <p>
          <strong>Email:</strong> {franchiseDetails?.email}
        </p>
        <p>
          <strong>Phone:</strong> {franchiseDetails?.phoneNumber}
        </p>
        <p>
          <strong>Location:</strong> {franchiseDetails?.franchiseLocation}
        </p>
      </div>

      <div className="player-details">
        <h3>Player Details</h3>
        {cartItems.map((player) => (
          <div key={player.id} className="player-item">
            <img
              src={player.image}
              alt={player.name}
              className="player-image1"
            />
            <p>
              <strong>Name:</strong> {player.name} &nbsp;&nbsp;
            </p>
            <p>
              <strong>Category:</strong> {player.category} &nbsp;&nbsp;
            </p>
            <p>
              <strong>Country:</strong> {player.country} &nbsp;&nbsp;
            </p>
            <p>
              <strong>Auction Price:</strong> ₹{player.auctionprice} &nbsp;&nbsp;
            </p>
          </div>
        ))}
      </div>

      <div className="total-price">
        <h3>Total Auction Price: ₹{totalAuctionPrice.toLocaleString()}</h3>
      </div>

      <Link to="/" className="button-green" onClick={handleEmptyCart}>
        Back to Home
      </Link>
    </div>
  );
};

export default AuctionSuccessPage;
