import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MyGigs.scss";

function MyGigs() {
  const [gigs, setGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = JSON.parse(localStorage.getItem("currentUser"))?._id;

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        console.log(`Fetching gigs for user ID: ${userId}`);

        const res = await axios.get(`http://localhost:8000/api/gigs?userId=${userId}`);
        
        console.log('API response:', res);

        if (res.status !== 200) {
          throw new Error(`Unexpected response status: ${res.status}`);
        }

        setGigs(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGigs();
  }, []);

  const handleDelete = async (id) => {
   
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading gigs: {error}</div>;
  }

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>Gigs</h1>
          <Link to="/add">
            <button>Add New Gig</button>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {gigs.map((gig) => (
              <tr key={gig._id}>
                <td>
                  <img className="image" src={gig.cover} alt={gig.title} />
                </td>
                <td>{gig.title}</td>
                <td>${gig.price}</td>
                <td>{gig.sales}</td>
                <td>
                  <img
                    className="delete"
                    src="./img/delete.png"
                    alt="Delete"
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyGigs;
