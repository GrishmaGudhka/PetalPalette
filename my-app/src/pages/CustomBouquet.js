import React, { useState } from "react";
import "./CustomBouquets.css";
import BuyButton from "../components/BuyButton";

// --- 2-flower bouquets ---
import carnation_daisy from "../Pics/Custom_flower/2_flowers/carnation_daisy.jpg";
import lily_carnation from "../Pics/Custom_flower/2_flowers/lily_carnation.jpg";
import lily_daisy from "../Pics/Custom_flower/2_flowers/lily_daisy.jpg";
import lily_sunflower from "../Pics/Custom_flower/2_flowers/lily_sunflower.jpg";
import lily_tulip from "../Pics/Custom_flower/2_flowers/lily_tulip.jpg";
import rose_carnation from "../Pics/Custom_flower/2_flowers/rose_carnation.jpg";
import rose_daisy from "../Pics/Custom_flower/2_flowers/rose_daisy.jpg";
import rose_lily from "../Pics/Custom_flower/2_flowers/rose_lily.jpg";
import rose_sunflower from "../Pics/Custom_flower/2_flowers/rose_sunflower.jpg";
import rose_tulip from "../Pics/Custom_flower/2_flowers/rose_tulip.jpg";
import sunflower_carnation from "../Pics/Custom_flower/2_flowers/sunflower_carnation.jpg";
import sunflower_daisy from "../Pics/Custom_flower/2_flowers/sunflower_daisy.jpg";
import sunflower_tulip from "../Pics/Custom_flower/2_flowers/sunflower_tulip.jpg";
import tulip_carnation from "../Pics/Custom_flower/2_flowers/tulip_carnation.jpg";
import tulip_daisy from "../Pics/Custom_flower/2_flowers/tulip_daisy.jpg";

// --- 3-flower bouquets ---
import lily_carnation_daisy from "../Pics/Custom_flower/3_flowers/lily_carnation_daisy.jpg";
import lily_sunflower_carnation from "../Pics/Custom_flower/3_flowers/lily_sunflower_carnation.jpg";
import lily_sunflower_daisy from "../Pics/Custom_flower/3_flowers/lily_sunflower_daisy.jpg";
import rose_carnation_daisy from "../Pics/Custom_flower/3_flowers/rose_carnation_daisy.jpg";
import rose_lily_carnation from "../Pics/Custom_flower/3_flowers/rose_lily_carnation.jpg";
import rose_lily_daisy from "../Pics/Custom_flower/3_flowers/rose_lily_daisy.jpg";
import rose_lily_sunflower from "../Pics/Custom_flower/3_flowers/rose_lily_sunflower.jpg";
import rose_sunflower_carnation from "../Pics/Custom_flower/3_flowers/rose_sunflower_carnation.jpg";
import rose_sunflower_daisy from "../Pics/Custom_flower/3_flowers/rose_sunflower_daisy.jpg";
import sunflower_carnation_daisy from "../Pics/Custom_flower/3_flowers/sunflower_carnation_daisy.jpg";

// --- 4-flower bouquets ---
import lily_sunflower_carnation_daisy from "../Pics/Custom_flower/4_flowers/lily_sunflower_carnation_daisy.jpg";
import rose_lily_carnation_daisy from "../Pics/Custom_flower/4_flowers/rose_lily_carnation_daisy.jpg";
import rose_lily_sunflower_daisy from "../Pics/Custom_flower/4_flowers/rose_lily_sunflower_daisy.jpg";
import rose_sunflower_carnation_daisy from "../Pics/Custom_flower/4_flowers/rose_sunflower_carnation_daisy.jpg";
import rose_lily_sunflower_carnation from "../Pics/Custom_flower/4_flowers/rose_lily_sunflower_carnation.jpg";

// Map all flower combinations to images
const combinationMap = {
  // 2-flower
  "rose_lily": rose_lily, "lily_rose": rose_lily,
  "rose_carnation": rose_carnation, "carnation_rose": rose_carnation,
  "rose_sunflower": rose_sunflower, "sunflower_rose": rose_sunflower,
  "rose_daisy": rose_daisy, "daisy_rose": rose_daisy,
  "rose_tulip": rose_tulip, "tulip_rose": rose_tulip,
  "lily_carnation": lily_carnation, "carnation_lily": lily_carnation,
  "lily_sunflower": lily_sunflower, "sunflower_lily": lily_sunflower,
  "lily_daisy": lily_daisy, "daisy_lily": lily_daisy,
  "lily_tulip": lily_tulip, "tulip_lily": lily_tulip,
  "sunflower_carnation": sunflower_carnation, "carnation_sunflower": sunflower_carnation,
  "sunflower_daisy": sunflower_daisy, "daisy_sunflower": sunflower_daisy,
  "sunflower_tulip": sunflower_tulip, "tulip_sunflower": sunflower_tulip,
  "carnation_daisy": carnation_daisy, "daisy_carnation": carnation_daisy,
  "tulip_carnation": tulip_carnation, "carnation_tulip": tulip_carnation,
  "tulip_daisy": tulip_daisy, "daisy_tulip": tulip_daisy,

  // 3-flower
  // lily_carnation_daisy
  "lily_carnation_daisy": lily_carnation_daisy, "lily_daisy_carnation": lily_carnation_daisy,
  "carnation_lily_daisy": lily_carnation_daisy, "carnation_daisy_lily": lily_carnation_daisy,
  "daisy_lily_carnation": lily_carnation_daisy, "daisy_carnation_lily": lily_carnation_daisy,

  // lily_sunflower_carnation
  "lily_sunflower_carnation": lily_sunflower_carnation, "lily_carnation_sunflower": lily_sunflower_carnation,
  "sunflower_lily_carnation": lily_sunflower_carnation, "sunflower_carnation_lily": lily_sunflower_carnation,
  "carnation_lily_sunflower": lily_sunflower_carnation, "carnation_sunflower_lily": lily_sunflower_carnation,

  // lily_sunflower_daisy
  "lily_sunflower_daisy": lily_sunflower_daisy, "lily_daisy_sunflower": lily_sunflower_daisy,
  "sunflower_lily_daisy": lily_sunflower_daisy, "sunflower_daisy_lily": lily_sunflower_daisy,
  "daisy_lily_sunflower": lily_sunflower_daisy, "daisy_sunflower_lily": lily_sunflower_daisy,

  // rose_carnation_daisy
  "rose_carnation_daisy": rose_carnation_daisy, "rose_daisy_carnation": rose_carnation_daisy,
  "carnation_rose_daisy": rose_carnation_daisy, "carnation_daisy_rose": rose_carnation_daisy,
  "daisy_rose_carnation": rose_carnation_daisy, "daisy_carnation_rose": rose_carnation_daisy,

  // rose_lily_carnation
  "rose_lily_carnation": rose_lily_carnation, "rose_carnation_lily": rose_lily_carnation,
  "lily_rose_carnation": rose_lily_carnation, "lily_carnation_rose": rose_lily_carnation,
  "carnation_rose_lily": rose_lily_carnation, "carnation_lily_rose": rose_lily_carnation,

  // rose_lily_daisy
  "rose_lily_daisy": rose_lily_daisy, "rose_daisy_lily": rose_lily_daisy,
  "lily_rose_daisy": rose_lily_daisy, "lily_daisy_rose": rose_lily_daisy,
  "daisy_rose_lily": rose_lily_daisy, "daisy_lily_rose": rose_lily_daisy,

  // rose_lily_sunflower
  "rose_lily_sunflower": rose_lily_sunflower, "rose_sunflower_lily": rose_lily_sunflower,
  "lily_rose_sunflower": rose_lily_sunflower, "lily_sunflower_rose": rose_lily_sunflower,
  "sunflower_rose_lily": rose_lily_sunflower, "sunflower_lily_rose": rose_lily_sunflower,

  // rose_sunflower_carnation
  "rose_sunflower_carnation": rose_sunflower_carnation, "rose_carnation_sunflower": rose_sunflower_carnation,
  "sunflower_rose_carnation": rose_sunflower_carnation, "sunflower_carnation_rose": rose_sunflower_carnation,
  "carnation_rose_sunflower": rose_sunflower_carnation, "carnation_sunflower_rose": rose_sunflower_carnation,

  // rose_sunflower_daisy
  "rose_sunflower_daisy": rose_sunflower_daisy, "rose_daisy_sunflower": rose_sunflower_daisy,
  "sunflower_rose_daisy": rose_sunflower_daisy, "sunflower_daisy_rose": rose_sunflower_daisy,
  "daisy_rose_sunflower": rose_sunflower_daisy, "daisy_sunflower_rose": rose_sunflower_daisy,

  // sunflower_carnation_daisy
  "sunflower_carnation_daisy": sunflower_carnation_daisy, "sunflower_daisy_carnation": sunflower_carnation_daisy,
  "carnation_sunflower_daisy": sunflower_carnation_daisy, "carnation_daisy_sunflower": sunflower_carnation_daisy,
  "daisy_sunflower_carnation": sunflower_carnation_daisy, "daisy_carnation_sunflower": sunflower_carnation_daisy,


  // 4-flower
  // lily_sunflower_carnation_daisy
  "lily_sunflower_carnation_daisy": lily_sunflower_carnation_daisy, "lily_sunflower_daisy_carnation": lily_sunflower_carnation_daisy,
  "lily_carnation_sunflower_daisy": lily_sunflower_carnation_daisy, "lily_carnation_daisy_sunflower": lily_sunflower_carnation_daisy,
  "lily_daisy_sunflower_carnation": lily_sunflower_carnation_daisy, "lily_daisy_carnation_sunflower": lily_sunflower_carnation_daisy,
  "sunflower_lily_carnation_daisy": lily_sunflower_carnation_daisy, "sunflower_lily_daisy_carnation": lily_sunflower_carnation_daisy,
  "sunflower_carnation_lily_daisy": lily_sunflower_carnation_daisy, "sunflower_carnation_daisy_lily": lily_sunflower_carnation_daisy,
  "sunflower_daisy_lily_carnation": lily_sunflower_carnation_daisy, "sunflower_daisy_carnation_lily": lily_sunflower_carnation_daisy,
  "carnation_lily_sunflower_daisy": lily_sunflower_carnation_daisy, "carnation_lily_daisy_sunflower": lily_sunflower_carnation_daisy,
  "carnation_sunflower_lily_daisy": lily_sunflower_carnation_daisy, "carnation_sunflower_daisy_lily": lily_sunflower_carnation_daisy,
  "carnation_daisy_lily_sunflower": lily_sunflower_carnation_daisy, "carnation_daisy_sunflower_lily": lily_sunflower_carnation_daisy,
  "daisy_lily_sunflower_carnation": lily_sunflower_carnation_daisy, "daisy_lily_carnation_sunflower": lily_sunflower_carnation_daisy,
  "daisy_sunflower_lily_carnation": lily_sunflower_carnation_daisy, "daisy_sunflower_carnation_lily": lily_sunflower_carnation_daisy,
  "daisy_carnation_lily_sunflower": lily_sunflower_carnation_daisy, "daisy_carnation_sunflower_lily": lily_sunflower_carnation_daisy,

  // rose_lily_carnation_daisy
  "rose_lily_carnation_daisy": rose_lily_carnation_daisy, "rose_lily_daisy_carnation": rose_lily_carnation_daisy,
  "rose_carnation_lily_daisy": rose_lily_carnation_daisy, "rose_carnation_daisy_lily": rose_lily_carnation_daisy,
  "rose_daisy_lily_carnation": rose_lily_carnation_daisy, "rose_daisy_carnation_lily": rose_lily_carnation_daisy,
  "lily_rose_carnation_daisy": rose_lily_carnation_daisy, "lily_rose_daisy_carnation": rose_lily_carnation_daisy,
  "lily_carnation_rose_daisy": rose_lily_carnation_daisy, "lily_carnation_daisy_rose": rose_lily_carnation_daisy,
  "lily_daisy_rose_carnation": rose_lily_carnation_daisy, "lily_daisy_carnation_rose": rose_lily_carnation_daisy,
  "carnation_rose_lily_daisy": rose_lily_carnation_daisy, "carnation_rose_daisy_lily": rose_lily_carnation_daisy,
  "carnation_lily_rose_daisy": rose_lily_carnation_daisy, "carnation_lily_daisy_rose": rose_lily_carnation_daisy,
  "carnation_daisy_rose_lily": rose_lily_carnation_daisy, "carnation_daisy_lily_rose": rose_lily_carnation_daisy,
  "daisy_rose_lily_carnation": rose_lily_carnation_daisy, "daisy_rose_carnation_lily": rose_lily_carnation_daisy,
  "daisy_lily_rose_carnation": rose_lily_carnation_daisy, "daisy_lily_carnation_rose": rose_lily_carnation_daisy,
  "daisy_carnation_rose_lily": rose_lily_carnation_daisy, "daisy_carnation_lily_rose": rose_lily_carnation_daisy,

  // rose_lily_sunflower_daisy
  "rose_lily_sunflower_daisy": rose_lily_sunflower_daisy, "rose_lily_daisy_sunflower": rose_lily_sunflower_daisy,
  "rose_sunflower_lily_daisy": rose_lily_sunflower_daisy, "rose_sunflower_daisy_lily": rose_lily_sunflower_daisy,
  "rose_daisy_lily_sunflower": rose_lily_sunflower_daisy, "rose_daisy_sunflower_lily": rose_lily_sunflower_daisy,
  "lily_rose_sunflower_daisy": rose_lily_sunflower_daisy, "lily_rose_daisy_sunflower": rose_lily_sunflower_daisy,
  "lily_sunflower_rose_daisy": rose_lily_sunflower_daisy, "lily_sunflower_daisy_rose": rose_lily_sunflower_daisy,
  "lily_daisy_rose_sunflower": rose_lily_sunflower_daisy, "lily_daisy_sunflower_rose": rose_lily_sunflower_daisy,
  "sunflower_rose_lily_daisy": rose_lily_sunflower_daisy, "sunflower_rose_daisy_lily": rose_lily_sunflower_daisy,
  "sunflower_lily_rose_daisy": rose_lily_sunflower_daisy, "sunflower_lily_daisy_rose": rose_lily_sunflower_daisy,
  "sunflower_daisy_rose_lily": rose_lily_sunflower_daisy, "sunflower_daisy_lily_rose": rose_lily_sunflower_daisy,
  "daisy_rose_lily_sunflower": rose_lily_sunflower_daisy, "daisy_rose_sunflower_lily": rose_lily_sunflower_daisy,
  "daisy_lily_rose_sunflower": rose_lily_sunflower_daisy, "daisy_lily_sunflower_rose": rose_lily_sunflower_daisy,
  "daisy_sunflower_rose_lily": rose_lily_sunflower_daisy, "daisy_sunflower_lily_rose": rose_lily_sunflower_daisy,

  // rose_sunflower_carnation_daisy
  "rose_sunflower_carnation_daisy": rose_sunflower_carnation_daisy, "rose_sunflower_daisy_carnation": rose_sunflower_carnation_daisy,
  "rose_carnation_sunflower_daisy": rose_sunflower_carnation_daisy, "rose_carnation_daisy_sunflower": rose_sunflower_carnation_daisy,
  "rose_daisy_sunflower_carnation": rose_sunflower_carnation_daisy, "rose_daisy_carnation_sunflower": rose_sunflower_carnation_daisy,
  "sunflower_rose_carnation_daisy": rose_sunflower_carnation_daisy, "sunflower_rose_daisy_carnation": rose_sunflower_carnation_daisy,
  "sunflower_carnation_rose_daisy": rose_sunflower_carnation_daisy, "sunflower_carnation_daisy_rose": rose_sunflower_carnation_daisy,
  "sunflower_daisy_rose_carnation": rose_sunflower_carnation_daisy, "sunflower_daisy_carnation_rose": rose_sunflower_carnation_daisy,
  "carnation_rose_sunflower_daisy": rose_sunflower_carnation_daisy, "carnation_rose_daisy_sunflower": rose_sunflower_carnation_daisy,
  "carnation_sunflower_rose_daisy": rose_sunflower_carnation_daisy, "carnation_sunflower_daisy_rose": rose_sunflower_carnation_daisy,
  "carnation_daisy_rose_sunflower": rose_sunflower_carnation_daisy, "carnation_daisy_sunflower_rose": rose_sunflower_carnation_daisy,
  "daisy_rose_sunflower_carnation": rose_sunflower_carnation_daisy, "daisy_rose_carnation_sunflower": rose_sunflower_carnation_daisy,
  "daisy_sunflower_rose_carnation": rose_sunflower_carnation_daisy, "daisy_sunflower_carnation_rose": rose_sunflower_carnation_daisy,
  "daisy_carnation_rose_sunflower": rose_sunflower_carnation_daisy, "daisy_carnation_sunflower_rose": rose_sunflower_carnation_daisy,

  // rose_lily_sunflower_carnation
  "rose_lily_sunflower_carnation": rose_lily_sunflower_carnation, "rose_lily_carnation_sunflower": rose_lily_sunflower_carnation,
  "rose_sunflower_lily_carnation": rose_lily_sunflower_carnation, "rose_sunflower_carnation_lily": rose_lily_sunflower_carnation,
  "rose_carnation_lily_sunflower": rose_lily_sunflower_carnation, "rose_carnation_sunflower_lily": rose_lily_sunflower_carnation,
  "lily_rose_sunflower_carnation": rose_lily_sunflower_carnation, "lily_rose_carnation_sunflower": rose_lily_sunflower_carnation,
  "lily_sunflower_rose_carnation": rose_lily_sunflower_carnation, "lily_sunflower_carnation_rose": rose_lily_sunflower_carnation,
  "lily_carnation_rose_sunflower": rose_lily_sunflower_carnation, "lily_carnation_sunflower_rose": rose_lily_sunflower_carnation,
  "sunflower_rose_lily_carnation": rose_lily_sunflower_carnation, "sunflower_rose_carnation_lily": rose_lily_sunflower_carnation,
  "sunflower_lily_rose_carnation": rose_lily_sunflower_carnation, "sunflower_lily_carnation_rose": rose_lily_sunflower_carnation,
  "sunflower_carnation_rose_lily": rose_lily_sunflower_carnation, "sunflower_carnation_lily_rose": rose_lily_sunflower_carnation,
  "carnation_rose_lily_sunflower": rose_lily_sunflower_carnation, "carnation_rose_sunflower_lily": rose_lily_sunflower_carnation,
  "carnation_lily_rose_sunflower": rose_lily_sunflower_carnation, "carnation_lily_sunflower_rose": rose_lily_sunflower_carnation,
  "carnation_sunflower_rose_lily": rose_lily_sunflower_carnation, "carnation_sunflower_lily_rose": rose_lily_sunflower_carnation

};

const CustomBouquets = () => {
  const [varietyCount, setVarietyCount] = useState(0); //Flower variety count - 2,3,4
  const [selectedFlowers, setSelectedFlowers] = useState([]); //array storing the selected flower names
  const [bouquetImage, setBouquetImage] = useState(null); //image that matches the selected combination
  const [hasSubmitted, setHasSubmitted] = useState(false); //show error if image is not found
  const [bouquetName, setBouquetName] = useState(""); //name of the bouquet build
  const [bouquetPrice, setBouquetPrice] = useState(0); //price of the bouquet build

  const flowerOptions = {
    2: ["Rose", "Lily", "Sunflower", "Tulip", "Carnation", "Daisy"],
    3: ["Rose", "Lily", "Sunflower", "Carnation", "Daisy"],
    4: ["Rose", "Lily", "Sunflower", "Carnation", "Daisy"],
  };// all flowers in different groups

  const availableFlowers = flowerOptions[varietyCount] || [];
  //type of flower displayed according to the number choosen

  const handleVarietySelect = (num) => {//Resets everything when user selects 2, 3, or 4 varieties.
    setVarietyCount(num);
    setSelectedFlowers([]);
    setBouquetImage(null);
    setHasSubmitted(false);
    setBouquetName("");
    setBouquetPrice(0);
  };

  const handleFlowerSelect = (e, index) => {//saves the select flower in new flower 
    const newSelection = [...selectedFlowers];
    newSelection[index] = e.target.value;
    setSelectedFlowers(newSelection);
  };

  const handleSubmit = () => {
    if (selectedFlowers.length !== varietyCount || selectedFlowers.includes("") || selectedFlowers.includes(undefined)) {
      alert("Please select all flower varieties!");//checks if all flowers are selected
      return;
    }

    setHasSubmitted(true);//user has submitted the selection
    const key = selectedFlowers.map(f => f.toLowerCase()).sort().join("_");
    const image = combinationMap[key] || null;//find the bouquet if bouquet not found image is set to null
    setBouquetImage(image);

    if (image) {//if image is there generate name and price 
      setBouquetName(selectedFlowers.join(" & ") + " Bouquet");//Name
      setBouquetPrice(varietyCount === 2 ? 700 : varietyCount === 3 ? 1000 : 1200);//Price
    } else {//if no image reset the price and name
      setBouquetName("");
      setBouquetPrice(0);
    }
  };

  return (
    <div className="custom-bouquet-container">
      <h1>Create Your Custom Bouquet </h1>

      {/* Step 1: Select number of varieties */}
      <p className="step-label">Select number of flower varieties:</p>
      <div className="variety-boxes">
        {[2, 3, 4].map(num => (
          <div
            key={num}
            className={`variety-box ${varietyCount === num ? "active" : ""}`}
            onClick={() => handleVarietySelect(num)}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Step 2: Select flowers READ N REMEBER AGAIN*/}
      {varietyCount > 0 && (
        <div className="flower-selects">
          {[...Array(varietyCount)].map((_, idx) => {
            const used = selectedFlowers.filter((f, i) => i !== idx && f);
            //stores all flowers the user has already selected
            const options = availableFlowers.filter(f => !used.includes(f));
            //removes those used flowers from the dropdown list

            return (
              <select key={idx} value={selectedFlowers[idx] || ""} onChange={(e) => handleFlowerSelect(e, idx)}>
                <option value="">-- Choose a Flower --</option>
                {options.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            );
          })}
        </div>
      )}

      {/* Step 3: Build bouquet */}
      {varietyCount > 0 && (
        <button className="submit-btn" onClick={handleSubmit}>Build Bouquet</button>
      )}

      {/* Step 4: Show result */}
      {bouquetImage && (//if bouquet image exists it gives the show its information
        <>
          <div className="image-box">
            <img src={bouquetImage} alt="Custom Bouquet" />
          </div>
          <div className="bouquet-info">
            <p className="bouquet-name">Name : {bouquetName}</p>
            <p className="bouquet-price">Price : ₹{bouquetPrice}</p>
          </div>
          <BuyButton bouquet={{ name: bouquetName, price: bouquetPrice, image: bouquetImage }} />
          {/*Code recived by BuyButton */}
        </>
      )}

      {/* Step 5: Error if no image */}
      {!bouquetImage && hasSubmitted && (
        <p style={{ color: "red", marginTop: "10px" }}> No bouquet image found for this combination.</p>
      )}
    </div>
  );
};

export default CustomBouquets;
