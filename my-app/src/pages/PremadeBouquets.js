import React, { useState } from "react";
import "./PremadeBouquets.css";
import BuyButton from "../components/BuyButton";

import red_rose_group from "../Pics/red_rose_group.jpg";
import yellow_rose_group from "../Pics/yellow_rose_group.jpg";
import pink_lily_group from "../Pics/pink_lily_group.jpg";
import white_rose_group from "../Pics/white_rose_group.jpg";
import pink_carnation_group from "../Pics/pink_carnation_group.jpg";
import pink_daisies_group from "../Pics/pink_daisies_group.jpg";
import purple_rose_group from "../Pics/purple_rose_group.jpg";
import sunflower_group from "../Pics/sunflower_group.jpg";
import white_lily_group from "../Pics/white_lily_group.jpg";
import blue_hydrangeas_group from "../Pics/blue_hydrangeas_group.jpg";
import sunflower_pink_rose_group from "../Pics/sunflower_pink_rose_group.jpg";

const premadeBouquets = [
  { id: 1, name: "Red Rose", price: 900, image: red_rose_group, description: "A bouquet of fresh red roses." },
  { id: 2, name: "Yellow Rose", price: 500, image: yellow_rose_group, description: "Bright and cheerful yellow roses." },
  { id: 3, name: "Pink Lily", price: 700, image: pink_lily_group, description: "Elegant pink lilies for any occasion." },
  { id: 4, name: "White Rose", price: 800, image: white_rose_group, description: "Pure and beautiful white roses." },
  { id: 5, name: "Pink Carnation", price: 800, image: pink_carnation_group, description: "Delicate pink carnations." },
  { id: 6, name: "Purple Rose", price: 900, image: purple_rose_group, description: "Unique purple roses."  },
  { id: 7, name: "Pink Daisies", price: 700, image: pink_daisies_group, description: "Charming pink daisies bouquet."},
  { id: 8, name: "Sunflower", price: 750, image: sunflower_group, description: "Bright sunflowers to lift spirits." },
  { id: 9, name: "White Lily", price: 900, image: white_lily_group, description: "Graceful white lilies." },
  { id: 10, name : "Blue Hydrangeas", price : 1000,image : blue_hydrangeas_group, description: "Dreamy blue hydrangeas."},
  { id: 11, name: "Sunflower Pink Rose", price: 800, image: sunflower_pink_rose_group, description: "Sunflowers mixed with pink roses." },
];

const PremadeBouquets = () => {
  const [selectedBouquet, setSelectedBouquet] = useState(null);//UseState - manage component state

  const handleSelect = (bouquet) => setSelectedBouquet(bouquet);
  const handleBack = () => setSelectedBouquet(null);

  // --- Detail View ---
  if (selectedBouquet) {
    return (
      <div className="bouquet-detail-container">
        <button className="back-button" onClick={handleBack}>← Back to Bouquets</button>
        <div className="image-box">
          <img src={selectedBouquet.image} alt={selectedBouquet.name} />
        </div>
        <h2 className="bouquet-detail-name">Name : {selectedBouquet.name}</h2>
        <p className="bouquet-detail-price">Price : {selectedBouquet.price}</p>
        <BuyButton bouquet={selectedBouquet} /> {/*dynamic button for buying the currently selected bouquet*/}
        <p className="bouquet-detail-description">Description : {selectedBouquet.description}</p>
      </div>
    );
  }

  // --- Grid View ---
  return (
    <div className="premade-container">
      <h1 className="premade-title">Premade Bouquets</h1>
      <div className="premade-grid">
        {premadeBouquets.map((bouquet) => (
          <div key={bouquet.id} className="bouquet-card">
            <img
              src={bouquet.image}
              alt={bouquet.name}
              className="bouquet-img" //set the image details
              onClick={() => handleSelect(bouquet)}
              //clicking the image opens the bouquet detail view by updating state
            />
            <div className="bouquet-info">{/* Section under image in grid view */}
              <h3 className="bouquet-name">Name : {bouquet.name}</h3>
              <p className="bouquet-price">Price : ₹{bouquet.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremadeBouquets;
