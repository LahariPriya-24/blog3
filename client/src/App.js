import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

import Header from "./Components/Header";


import PrivateRoute from "./Services/ProtectedRoutes";
import LandingPage from "./LandingPage";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<LandingPage />} /> {/* Default Landing Page Route */}
       

        </Route>
      </Routes>
    </>
  );
};

export default App;
