import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPlayers } from "../../thunks/playerThunks";
import "./playerListingPage.css";

const PlayerListingPage = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.data);
  const cartItemCount = useSelector((state) => state.cart.items.length);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(maxPrice);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSliderChange = (event) => {
    setSelectedPrice(event.target.value);
  };
  const playerDataFiltered = players.filter(
    (player) =>
      player.name.toLocaleLowerCase().includes(searchTerm.toLowerCase()) && player.auctionprice <= selectedPrice
  );

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  useEffect(() => {
    if (players.length > 0) {
      const priceFilter = players.map((player) => player.auctionprice);
      const maxNum = priceFilter.reduce((initialVal, currentValue) => Math.max(initialVal, currentValue),0);
      setMaxPrice(maxNum);
      setSelectedPrice(maxNum);
    }
  }, [players]);

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

      <div className="searchbox">
        <input
          type="text"
          placeholder="Search here..."
          onChange={handleInputChange}
        />
      </div>

      <div className="searchbox">
        Price {selectedPrice}
        <input
          type="range"
          name="priceFilter"
          min={minPrice}
          max={maxPrice}
          value={selectedPrice}
          onChange={handleSliderChange}
        />
      </div>
      <div className="player-listing">
        {playerDataFiltered.map((player) => (
          <div key={player.id} className="player-card">
            <Link to={`/players/${player.id}`}>
              <img
                src={player.image}
                alt={player.name}
                className="player-image"
              />
              <h3>{player.name}</h3>
              <p>{player.category}</p>
              <p>Auction Price: Rs.{player.auctionprice}</p>
            </Link>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>&copy; 2024 Cricket Auction Management</p>
      </footer>
    </div>
  );
};

export default PlayerListingPage;
