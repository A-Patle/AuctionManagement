import React from "react";
import { Route, Routes } from "react-router-dom";
import PlayerListingPage from "./components/Player Listing/PlayerListingPage.jsx";
import PlayerDetailsPage from "./components/player details/playerDetails.jsx";
import AuctionCartPage from "./components/auction cart/auctionCartPage.jsx";
import CheckoutPage from "./components/checkout page/CheckoutPage.jsx";
import AuctionSuccessPage from "./components/auction success/AuctionSuccessPage.jsx";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<PlayerListingPage />} />
        <Route path="/players/:id" element={<PlayerDetailsPage />} />
        <Route path="/auction-cart" element={<AuctionCartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/auction-success" element={<AuctionSuccessPage />} />
      </Routes>
    </div>
  );
};

export default App;
