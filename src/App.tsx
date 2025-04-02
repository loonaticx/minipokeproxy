import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

const PokemonCard = ({ data }) => {
  const cardRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  if (!data) return <p>Loading...</p>;

  const { name, hp, types, attacks } = data;

  const generateImage = () => {
    if (!cardRef.current) return;
    setTimeout(() => { // Ensures fonts and styles are fully loaded
      html2canvas(cardRef.current, {
        backgroundColor: "#ffffff", // Ensure background is not transparent
        useCORS: true,
        scale: 2, // Improves quality
      }).then((canvas) => {
        setImageSrc(canvas.toDataURL("image/png"));
      });
    }, 500); // Delay to let styles render
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        ref={cardRef}
        style={{
          border: "2px solid #333",
          padding: "16px",
          maxWidth: "300px",
          borderRadius: "10px",
          boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)",
          backgroundColor: "white",
          color: "black",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>{name} - HP {hp}</h1>
        <p style={{ fontSize: "14px", color: "#555" }}>Type: {types.join(", ")}</p>
        <div style={{ marginTop: "10px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "bold" }}>Attacks:</h2>
          {attacks.map((attack, index) => (
            <div key={index} style={{ marginTop: "8px", padding: "8px", border: "1px solid #ccc", borderRadius: "6px", backgroundColor: "#f9f9f9" }}>
              <p style={{ fontWeight: "bold" }}>{attack.name}</p>
              <p>Cost: {attack.cost.join(", ")}</p>
              <p>Damage: {attack.damage}</p>
              <p style={{ fontSize: "12px", color: "#666" }}>{attack.text}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={generateImage}
        style={{ marginTop: "12px", padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
      >
        Generate Image
      </button>
      {imageSrc && (
        <div style={{ marginTop: "16px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "bold" }}>Generated Image:</h2>
          <img src={imageSrc} alt="Generated Pokemon Card" style={{ marginTop: "10px", border: "1px solid #ccc", borderRadius: "6px", boxShadow: "2px 2px 8px rgba(0,0,0,0.1)" }} />
        </div>
      )}
    </div>
  );
};

const sampleData = {
  name: "Venusaur-EX",
  hp: "180",
  types: ["Grass"],
  attacks: [
    {
      name: "Poison Powder",
      cost: ["Grass", "Colorless", "Colorless"],
      damage: "60",
      text: "Your opponent's Active Pokémon is now Poisoned."
    },
    {
      name: "Jungle Hammer",
      cost: ["Grass", "Grass", "Colorless", "Colorless"],
      damage: "90",
      text: "Heal 30 damage from this Pokémon."
    }
  ]
};

export default function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f0f0" }}>
      <PokemonCard data={sampleData} />
    </div>
  );
}
