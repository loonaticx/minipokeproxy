import React, {useRef, useState, useEffect} from "react";
import html2canvas from "html2canvas";

const apiKey = import.meta.env.VITE_POKEMON_API_KEY;


function countIdenticalElements<T>(arr: T[]): Map<T, number> {
    const counts: Map<T, number> = {};
    for (const element of arr) {
        counts[element] = (counts[element] || 0) + 1;
    }
    return counts;
}

const PokemonCard = ({data}) => {
    const cardRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);

    if (!data) return <p>Loading...</p>;

    console.log(data)
    const retreatElements = countIdenticalElements(data.retreatCost);
    const isPokemon = data.supertype && data.supertype == "Pokémon"

    const generateImage = () => {
        if (!cardRef.current) return;
        setTimeout(() => { // Ensures fonts and styles are fully loaded
            html2canvas(cardRef.current, {
                backgroundColor: "#ffffff", // Ensure background is not transparent
                useCORS: true,
                scale: 1,
            }).then((canvas) => {
                setImageSrc(canvas.toDataURL("image/png"));
            });
        }, 500); // Delay to let styles render
    };

    return (
        <div style={{display: "flex", alignItems: "center"}}>
            <div
                ref={cardRef}
                style={{
                    width: "736px",
                    height: "1024px",
                    backgroundColor: "white",
                    color: "black",
                    textAlign: "center",
                    fontFamily: "Arial, sans-serif",
                }}
            >
                {/*<h1 style={{margin: "0.1em", padding:"0em", fontSize: "4em", fontWeight: "bold"}}>{data.name} - HP {data.hp}</h1>*/}

                {/* Pokemon Type Frame */}
                {/*<p style={{margin: "0em", fontSize: "3em", color: "#555"}}>Type: {data.types.join(", ")}</p>*/}

                <div style={{
                    display: "inline-flex",
                    flexWrap: "wrap",
                    flexShrink: "1",
                    justifyContent: "flex-start",
                    padding: "0em",
                }}>
                    <div style={{
                        fontSize: "1.25em",
                        margin: "1em",
                        padding: "0em",
                        display: "flex",

                    }}>
                        <p><strong>HP:</strong> {data.hp}</p>
                        <div style={{
                            padding: "0em",
                            borderRadius: "1em",
                            margin: "0em",
                        }}>
                            <h2 style={{
                                fontSize: "2em",
                                padding: "0em",
                                margin: "0em",
                                fontWeight: "bold"
                            }}>{data.name}</h2>
                        </div>
                        <p><strong>Type:</strong> {data.types.join(", ")}</p>
                    </div>

                </div>

                {/*  Subtypes frame  */}
                {data.subtypes && data.subtypes.length > 0 && (
                    <div style={{
                        padding: "0em",
                        // border: "1px solid #ccc",
                        borderRadius: "1em",
                        backgroundColor: "#e0e0e0",
                        display: "block",

                    }}>
                        <h2 style={{fontSize: "1.5em", fontWeight: "bold", margin: "0em"}}>Subtypes</h2>
                        {data.subtypes.map((subtype, index) => (
                            <div key={index} style={{
                                marginTop: "0.2em",
                                padding: "0.1em",
                                border: "1px solid #ccc",
                                borderRadius: "1em",
                                backgroundColor: "#f9f9f9",
                                display: "inline-flex",
                                flexWrap: "wrap",
                                flexShrink: "1",
                                justifyContent: "flex-start"
                            }}>
                                <p>{subtype}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Rulebox Frame */}
                {data.rules && data.rules.length > 0 && (
                    <div style={{
                        padding: "0em",
                        border: "1px solid #ccc",
                        borderRadius: "1em",
                        margin: "0em",
                        backgroundColor: "#e0e0e0"
                    }}>
                        <h2 style={{fontSize: "2em", padding: "0em", margin: "0em", fontWeight: "bold"}}>Rules</h2>
                        {data.rules.map((rule, index) => (
                            <div key={index} style={{
                                marginTop: "0em",
                                border: "1px solid #ccc",
                                borderRadius: "1em",
                                backgroundColor: "#f9f9f9"
                            }}>
                                <p style={{fontSize: "1.5em"}}>{rule}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Ability Frame */}
                {data.abilities && data.abilities.length > 0 && (
                    <div style={{
                        padding: "0em",
                        border: "1px solid #ccc",
                        borderRadius: "1em",
                        margin: "0em",
                        backgroundColor: "#e0e0e0"
                    }}>
                        <h2 style={{fontSize: "2em", padding: "0em", margin: "0em", fontWeight: "bold"}}>Abilities</h2>
                        {data.abilities.map((ability, index) => (
                            <div key={index} style={{
                                padding: "0em",
                                border: "1px solid #ccc",
                                borderRadius: "1em",
                                backgroundColor: "#f9f9f9"
                            }}>
                                <p style={{fontSize: "1.25em", margin: "1em", fontWeight: "bold"}}>
                                    <strong>{ability.type}:</strong> {ability.name}
                                </p>
                                <p>{ability.text}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Attack Frame */}
                {data.attacks && data.attacks.length > 0 && (
                    <div style={{
                        padding: "0em",
                        border: "1px solid #ccc",
                        borderRadius: "1em",
                        margin: "0em",
                        backgroundColor: "#e0e0e0"
                    }}>
                        <h2 style={{fontSize: "2em", padding: "0em", margin: "0em", fontWeight: "bold"}}>Attacks</h2>
                        {data.attacks.map((attack, index) => (
                            <div key={index} style={{
                                padding: "0em",
                                border: "1px solid #ccc",
                                borderRadius: "1em",
                                backgroundColor: "#f9f9f9"
                            }}>
                                <p style={{fontSize: "1.25em", margin: "1em", fontWeight: "bold"}}>{attack.name}</p>
                                <p><strong>Cost:</strong> {attack.cost.join(", ")}</p>
                                <p><strong>Damage:</strong> {attack.damage}</p>
                                <p style={{fontSize: "1em", color: "#666"}}>{attack.text}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div id="Weakness/Resistance Container" style={{
                    padding: "0em",
                    border: "1px solid #ccc",
                    borderRadius: "1em",
                    margin: "0em",
                    // backgroundColor: "#bb2323",
                    display: "inline-flex",
                    flexWrap: "wrap",
                    flexShrink: "1",
                    justifyContent: "flex-start"
                }}>
                    {/* Weakness Frame */}
                    {data.weaknesses && data.weaknesses.length > 0 && (
                        <div style={{
                            padding: "0em",
                            border: "1px solid #ccc",
                            borderRadius: "1em",
                            backgroundColor: "#e0e0e0"
                        }}>
                            <h2 style={{fontSize: "1.5em", fontWeight: "bold", margin: "0em"}}>Weakness</h2>
                            {data.weaknesses.map((weakness, index) => (
                                <div key={index} style={{
                                    marginTop: "0.2em",
                                    padding: "0.1em",
                                    border: "1px solid #ccc",
                                    borderRadius: "1em",
                                    backgroundColor: "#f9f9f9"
                                }}>
                                    <p>{weakness.type} {weakness.value}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Resistance Frame */}
                    {/* TODO: If no resistance, still include box, but say NONE. */}
                    {data.resistances && data.resistances.length > 0 && (
                        <div style={{
                            padding: "0em",
                            border: "1px solid #ccc",
                            borderRadius: "1em",
                            backgroundColor: "#e0e0e0"
                        }}>
                            <h2 style={{fontSize: "1.5em", fontWeight: "bold", margin: "0em"}}>Resistance</h2>
                            {data.resistances.map((resistance, index) => (
                                <div key={index} style={{
                                    marginTop: "0.2em",
                                    padding: "0.1em",
                                    border: "1px solid #ccc",
                                    borderRadius: "1em",
                                    backgroundColor: "#f9f9f9"
                                }}>
                                    <p>{resistance.type} {resistance.value}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Retreat Cost Frame */}
                {Object.entries(retreatElements).map(([type, count]) => (
                    <p key={type} style={{fontSize: "1.25em", color: "#555"}}>
                        <strong>Retreat Cost:</strong> {count} {type}
                    </p>
                ))}

                {/* Card/Set ID Frame */}
                <div>
                    <p style={{fontSize: "2em", padding: "0em", margin: "0em"}}>ID: {data.id}</p>
                </div>

            </div>
            <button
                onClick={generateImage}
                style={{
                    marginTop: "12px",
                    padding: "10px 16px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                }}
            >
                Generate Image
            </button>
            {imageSrc && (
                <div style={{marginTop: "16px"}}>
                    <h2 style={{fontSize: "16px", fontWeight: "bold"}}>Generated Image:</h2>
                    <img src={imageSrc} alt="Generated Pokemon Card" style={{
                        marginTop: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        boxShadow: "2px 2px 8px rgba(0,0,0,0.1)"
                    }}/>
                </div>
            )}
        </div>
    );
};

export default function App() {
    const [cardData, setCardData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.pokemontcg.io/v2/cards/sv7-1", {
                    headers: {
                        "Authorization": `Bearer ${apiKey}`
                    }
                });
                const json = await response.json();
                setCardData(json.data);
            } catch (error) {
                console.error("Error fetching card data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#6e6e6e"
        }}>
            <PokemonCard data={cardData}/>
        </div>
    );
}
