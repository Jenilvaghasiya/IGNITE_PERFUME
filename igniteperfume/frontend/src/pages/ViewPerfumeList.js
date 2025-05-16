import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const ViewPerfumeList = ({ user, logout }) => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPerfumes();
  }, []);

  const fetchPerfumes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/perfume/list");
      setPerfumes(res.data);
    } catch (err) {
      console.error("Error fetching perfumes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this perfume?")) {
      try {
        await axios.delete(`http://localhost:5000/api/perfume/delete/${id}`);
        fetchPerfumes();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-perfume/${id}`);
  };

  const handleAddNew = () => {
    navigate("/add-perfume");
  };

  return (
    <div className="perfume-list-container">
      <Navbar user={user} logout={logout} />

      <div className="perfume-list-content">
        <div className="header-section">
          <h1>Perfume Collection</h1>
          <button onClick={handleAddNew} className="add-button">
            + Add New Perfume
          </button>
        </div>

        {loading ? (
          <div className="loading-spinner"></div>
        ) : perfumes.length > 0 ? (
          <div className="table-wrapper">
            <table className="perfume-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {perfumes.map((p, index) => (
                  <tr key={p._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="image-container">
                        <img
                          src={`http://localhost:5000/uploads/${p.image}`}
                          alt={p.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/100?text=No+Image";
                          }}
                        />
                      </div>
                    </td>
                    <td>{p.name}</td>
                    <td className="description-cell">{p.description}</td>
                    <td className="price-cell">${p.price}</td>
                    <td>
                      <div className="action-buttons">
                        <button onClick={() => handleEdit(p._id)} className="edit-button">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(p._id)} className="delete-button">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">!</div>
            <h3>No perfumes found</h3>
            <p>Add your first perfume to start building your collection</p>
            <button onClick={handleAddNew} className="add-button">
              + Add Perfume
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .perfume-list-container {
          min-height: 100vh;
          background-color: #f8f9fa;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .perfume-list-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        h1 {
          font-size: 2rem;
          color: #2c3e50;
          margin: 0;
        }

        .add-button {
          background-color: #4a6bff;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .add-button:hover {
          background-color: #3a5bef;
          transform: translateY(-2px);
        }

        .loading-spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid #4a6bff;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin: 2rem auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .table-wrapper {
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .perfume-table {
          width: 100%;
          border-collapse: collapse;
        }

        .perfume-table th {
          background-color: #f1f3f9;
          color: #4a5568;
          text-align: left;
          padding: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 0.5px;
        }

        .perfume-table td {
          padding: 1rem;
          border-bottom: 1px solid #edf2f7;
          color: #4a5568;
        }

        .perfume-table tr:last-child td {
          border-bottom: none;
        }

        .perfume-table tr:hover {
          background-color: #f8fafc;
        }

        .image-container {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .description-cell {
          max-width: 300px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .price-cell {
          font-weight: 600;
          color: #4a6bff;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .edit-button {
          background-color: #f0f4ff;
          color: #4a6bff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .edit-button:hover {
          background-color: #e0e8ff;
        }

        .delete-button {
          background-color: #fff0f0;
          color: #ff4a4a;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .delete-button:hover {
          background-color: #ffe0e0;
        }

        .empty-state {
          background-color: white;
          border-radius: 10px;
          padding: 3rem;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .empty-icon {
          width: 60px;
          height: 60px;
          background-color: #f0f4ff;
          color: #4a6bff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          margin: 0 auto 1.5rem;
        }

        .empty-state h3 {
          color: #2d3748;
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          color: #718096;
          margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
          .perfume-list-content {
            padding: 1rem;
          }

          .header-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .table-wrapper {
            overflow-x: auto;
          }

          .perfume-table {
            min-width: 700px;
          }
        }
      `}</style>
    </div>
  );
};

export default ViewPerfumeList;
