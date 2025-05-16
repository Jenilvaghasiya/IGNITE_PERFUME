// path: frontend/src/pages/CustomizePerfumeList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import './CustomizePerfumeList.css'; // Optional, for custom styling

const CustomizePerfumeList = ({ user, logout }) => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/perfume/custom-list');
        setPerfumes(res.data);
      } catch (err) {
        console.error("Error fetching custom perfumes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPerfumes();
  }, []);

  return (
    <div className="custom-perfume-list-page">
      <Navbar user={user} logout={logout} />

      <div className="container my-5">
        <h2 className="text-center mb-4">Your Customized Perfumes</h2>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : perfumes.length > 0 ? (
          <div className="row">
            {perfumes.map((perfume, index) => (
              <div className="col-lg-4 col-md-6 mb-4" key={index}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{perfume.customName || 'Custom Perfume'}</h5>
                    <p className="card-text">
                      <strong>Base Note:</strong> {perfume.baseNote} <br />
                      <strong>Middle Note:</strong> {perfume.middleNote} <br />
                      <strong>Top Note:</strong> {perfume.topNote} <br />
                      <strong>Bottle Size:</strong> {perfume.bottleSize}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p>No custom perfumes found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizePerfumeList;
