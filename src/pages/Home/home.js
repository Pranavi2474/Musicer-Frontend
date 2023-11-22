import React, { useContext, useState, useEffect } from "react";
import Navbar from "./navbar";
import { MyToken } from "../ContextAPI/context";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import image from "../../images/silivan-munguarakarama-NrR9gn3lFKU-unsplash.jpg";

const Home = () => {
  const [loading, setLoading] = useState();
  const token = useContext(MyToken);
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, seterror] = useState("");
  const [modalShow, setModalShow] = useState(false);
  let username = location.state ? location.state.username : null;
  console.log(token);
  console.log(username);
  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    setLoading(true);
    if (token) {
      fetch(
        `https://api.spotify.com/v1/artists?ids=4zCH9qm4R2DADamUHMCa6O%2C2FgHPfRprDaylrSRVf1UlN%2C5sSzCxHtgL82pYDvx2QyEU%2C1mYsTxnqsietFxj1OgoGbG%2C12l1SqSNsg2mI2IcXpPWjR%2C2q1LRGJHpFxovU8Tz6OgRn`,
        parameters
      )
        .then((res) => res.json())
        .then((data) => setData(data.artists))
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(setLoading(false));
    }
  }, [token]); // Run the effect whenever token changes

  console.log(data);
  const loadingContainerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Set a higher z-index to appear above other elements
    color: "white",
  };

  const blurOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url(${image})`,
    backgroundSize: "100%", // Zoom out the background image
    filter: "blur(5px)", // Add blur effect
    zIndex: -1, // Behind the loading content
  };

  if (loading) {
    return (
      <div>
        <div style={blurOverlayStyle}></div>
        <div style={loadingContainerStyle}>
          <Spinner animation="border" role="status"></Spinner>
          <h1 className="sr-only">&nbsp;&nbsp;Loading...</h1>
        </div>
      </div>
    );
  }
  if (!loading) {
    return (
      <div>
        <Navbar />
        <h1>{username}</h1>
      </div>
    );
  }
};

export default Home;
