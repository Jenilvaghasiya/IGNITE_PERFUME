// path: frontend/src/App.js

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import AddPerfume from "./pages/AddPerfume";
import CustomizePerfume from "./pages/CustomizePerfume";
import ShowProduct from "./pages/ShowProduct";
import ContactUs from "./pages/ContactUs";
import ViewPerfumeList from "./pages/ViewPerfumeList";
import Cart from './pages/Cart';
import EditPerfume from './pages/EditPerfume';
import CustomizePerfumeList from './pages/CustomizePerfumeList'; // Import new page

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({});
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard user={user} logout={logout} />
          </PrivateRoute>
        } />
        <Route path="/add-perfume" element={
          <PrivateRoute>
            <AddPerfume user={user} />
          </PrivateRoute>
        } />
        <Route path="/customize" element={
          <PrivateRoute>
            <CustomizePerfume user={user} />
          </PrivateRoute>
        } />
        <Route path="/show" element={
          <PrivateRoute>
            <ShowProduct user={user} />
          </PrivateRoute>
        } />
        <Route path="/view-perfume" element={
          <PrivateRoute>
            <ViewPerfumeList user={user} logout={logout} />
          </PrivateRoute>
        } />
        <Route path="/cart" element={<Cart user={user} logout={logout} />} />
        <Route path="/edit-perfume/:id" element={<EditPerfume />} />
        
        {/* Add the route for CustomizePerfumeList */}
        <Route path="/custom-perfume-list" element={
          <PrivateRoute>
            <CustomizePerfumeList user={user} logout={logout} />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
