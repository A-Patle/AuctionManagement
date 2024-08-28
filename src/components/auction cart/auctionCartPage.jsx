import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { removeItemFromCart, emptyCart } from "../../slices/cartSlice";
import "./AuctionCartPage.css";

const AuctionCartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItemCount = useSelector((state) => state.cart.items.length);

  const cart = useSelector((state) => state.cart.items);
  const totalPlayers = cart.length;
  const totalPrice = cart.reduce((total, player) => total + parseFloat(player.auctionprice),0);

  // Categories for the auction
  const batsmen = cart.filter((player) => player.category === "Batsman");
  const bowlers = cart.filter((player) => player.category === "Bowler");
  const wicketkeepers = cart.filter((player) => player.category === "Keeper Batsman");
  const allrounders = cart.filter((player) => player.category === "All-rounder");

  // Check category limits
  const maxPlayersLimit = totalPlayers > 15;
  const maxBatsmenLimit = batsmen.length > 7;
  const maxBowlersLimit = bowlers.length > 4;
  const maxWicketkeepersLimit = wicketkeepers.length > 2;
  const maxAllroundersLimit = allrounders.length > 2;

  const handleRemovePlayer = (playerId) => {
    dispatch(removeItemFromCart(playerId));
  };

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

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

      {totalPlayers === 0 ? (
        <div className="no-players">No players are added to the cart</div>
      ) : (
        <div>
          <h2>Auction Cart</h2>
          {maxPlayersLimit && (
            <div className="limit-alert">You cannot add more than 15 players to the auction cart. Please remove {totalPlayers-15} player from team to continue.</div>
          )}
          {maxBatsmenLimit && <div className="limit-alert">You cannot add more than 7 Batsmen. Please remove {batsmen.length-7} Batsmen from team.</div>}
          {maxBowlersLimit && <div className="limit-alert">You cannot add more than 4 Bowlers. Please remove {bowlers.length-4} Bowler from team.</div>}
          {maxWicketkeepersLimit && (
            <div className="limit-alert">You cannot add more than 2 Wicketkeepers. Please remove {wicketkeepers.length-2} Wicketkeeper from team.</div>
          )}
          {maxAllroundersLimit && (
            <div className="limit-alert">You cannot add more than 2 Allrounders. Please remove {allrounders.length-2} Allrounder from team.</div>
          )}
          <ul>
            {cart.map((player) => (
              <li key={player.id}>
                <img src={player.image} alt={player.name} />
                <div>{player.name}</div>
                <div>{player.category}</div>
                <div>Rs {player.auctionprice}</div>
                <button onClick={() => handleRemovePlayer(player.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <div className="cart-total">
              Subtotal ({totalPlayers} players): Rs {totalPrice.toFixed(2)}/-
            </div>
            <button onClick={handleEmptyCart}>Empty Cart</button>
            {console.log(maxBowlersLimit, maxBatsmenLimit, maxWicketkeepersLimit , maxAllroundersLimit)
            }
            {(totalPlayers === 15 && !maxBowlersLimit && !maxBatsmenLimit && !maxWicketkeepersLimit && !maxAllroundersLimit)? (
              <button onClick={handleProceedToCheckout}>
                Proceed to Close Auction
              </button>
            ) : (
              <button disabled={true} onClick={handleProceedToCheckout}>
                Proceed to Close Auction
              </button>
            )}
          </div>
        </div>
      )}

      {/* <footer className="footer">
        <p>&copy; 2024 Cricket Auction Management</p>
      </footer> */}
    </div>
  );
};

export default AuctionCartPage;
