import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../slices/cartSlice";
import { fetchPlayerById } from "../../thunks/playerThunks";
import "./PlayerDetails.css";

const PlayerDetails = () => {
  const { id } = useParams(); // Fetching the player ID from the URL parameters
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItemCount = useSelector((state) => state.cart.items.length);
  const cartItems = useSelector((state) => state.cart.items);
  const player = useSelector((state) => state.players.playerDetails);
  const playerStatus = useSelector((state) => state.players.status);

  useEffect(() => {
    dispatch(fetchPlayerById(id)); // Dispatch the thunk to fetch player details by id
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addItemToCart(player));
    navigate("/auction-cart"); // Redirect to Auction Cart Page
  };

  if (playerStatus === "pending") {
    return <p>Loading player details...</p>;
  }

  if (playerStatus === "rejected") {
    return <p>Error loading player details.</p>;
  }

  // Check if the player is already in the cart
  const isPlayerInCart = cartItems.some(
    (cartItem) => cartItem.id === player?.id
  );

  return (
    <div>
      <header className="header">
        <Link to="/" className="home-icon">
          🏠
        </Link>
        <Link to="/auction-cart" className="cart-icon">
          🛒 {cartItemCount}
        </Link>
      </header>
      {isPlayerInCart && (
        <h1 className="already-selected">This player is already selected</h1>
      )}
      <div className="player-details-container">
        <div className="player-details">
          <img
            src={player?.image}
            alt={player?.name}
            className="player-image"
          />
          <h2>{player?.name}</h2>
          <p>Category: {player?.category}</p>
          <p>Auction Price: ₹{player?.auctionprice}</p>
          {!isPlayerInCart && (
            <button onClick={handleAddToCart} className="button-green">
              Add To Auction Cart
            </button>
          )}
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Cricket Auction Management</p>
      </footer>
    </div>
  );
};

export default PlayerDetails;
