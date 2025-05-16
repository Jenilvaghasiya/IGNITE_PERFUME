import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Adjust the path as needed
import './EditPerfume.css'; // Import the custom CSS file

const EditPerfume = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);  // Example user state, replace with your actual logic
  const logout = () => {
    setUser(null);
    navigate("/login"); // Redirect to login page after logout
  };

  const [perfume, setPerfume] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState("");

  const fetchPerfume = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/perfume/${id}`);
      const data = res.data;

      if (data) {
        setPerfume({
          name: data.name,
          description: data.description,
          price: data.price,
          image: null,
        });
        setPreviewImage(`http://localhost:5000/uploads/${data.image}`);
      } else {
        console.error("Perfume data not found.");
      }
    } catch (err) {
      console.error("Error fetching perfume details:", err);
    }
  };

  useEffect(() => {
    fetchPerfume();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfume({ ...perfume, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPerfume({ ...perfume, image: file });
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", perfume.name);
      formData.append("description", perfume.description);
      formData.append("price", perfume.price);
      if (perfume.image) {
        formData.append("image", perfume.image);
      }

      await axios.put(`http://localhost:5000/api/perfume/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/view-perfume");
    } catch (err) {
      console.error("Error updating perfume:", err);
    }
  };

  return (
    <div className="edit-perfume-page">
      <Navbar user={user} logout={logout} />

      <div className="form-hero">
        <div className="hero-content">
          <h1 className="hero-title">Edit Perfume</h1>
          <p className="hero-subtitle">Update the details of your perfume</p>
        </div>
      </div>

      <div className="form-container">
        <div className="perfume-form-card">
          <form onSubmit={handleSubmit}>
            <div className="image-upload-container">
              {previewImage ? (
                <div className="image-preview">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="preview-image"
                  />
                  <button
                    type="button"
                    className="change-image-btn"
                    onClick={() => document.getElementById("image-upload").click()}
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div
                  className="upload-placeholder"
                  onClick={() => document.getElementById("image-upload").click()}
                >
                  <span className="upload-icon">+</span>
                  <p>Click to upload perfume image</p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={perfume.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="name" className={perfume.name ? "filled" : ""}>
                Perfume Name
              </label>
            </div>

            <div className="form-group">
              <textarea
                id="description"
                name="description"
                rows="3"
                value={perfume.description}
                onChange={handleChange}
                required
              ></textarea>
              <label htmlFor="description" className={perfume.description ? "filled" : ""}>
                Description
              </label>
            </div>

            <div className="form-group">
              <input
                type="number"
                id="price"
                name="price"
                value={perfume.price}
                onChange={handleChange}
                required
              />
              <label htmlFor="price" className={perfume.price ? "filled" : ""}>
                Price ($)
              </label>
            </div>

            <button type="submit" className="submit-btn">
              Update Perfume
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPerfume;
