import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/home.css";

const Home = () => {
  const [userCount, setUserCount] = useState(0);
  const [shopCount, setShopCount] = useState(0);

  useEffect(() => {
    // Fetch user count
    axios
      .get("https://igtestbackend-5ab2183ee5ee.herokuapp.com/api/user/getall")
      .then((response) => {
        const cusData = response.data.users.filter((users)=> users.role === "customer")
        setUserCount(cusData.length);
        console.log("response.data.users.length", response.data.users.length);
      })
      .catch((error) => {
        console.error("Error fetching user count:", error);
      });

    // Fetch shop count
    axios
      .get("https://igtestbackend-5ab2183ee5ee.herokuapp.com/api/location/getAll")
      .then((response) => {
        setShopCount(response.data.length);
        console.log("response.data.length", response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching shop count:", error);
      });
  }, []);

  return (
    <div className="home-container">
      <div className="row">
        <div className="col-4">
        <div className="card">
        <div className="card-body">
          <h5 className="card-title">User Count</h5>
          <p className="card-text">{userCount}</p>
        </div>
      </div>
        </div>
        <div className="col-4">
        <div className="card">
        <div className="card-body">
          <h5 className="card-title">Shop Count</h5>
          <p className="card-text">{shopCount}</p>
        </div>
      </div>
        </div>
      </div>
      
     
    </div>
  );
};

export default Home;
