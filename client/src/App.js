import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import AddBlog from "./Pages/AddBlog";
import AddCategory from "./Pages/AddCategory";
import SingleBlog from "./Pages/SingleBlog";
import AddEvent from "./Pages/AddEvent"; // Import AddEvent page
import PrivateRoute from "./Services/ProtectedRoutes";
import SingleEventPage from "./Pages/SingleEventPage";
import LandingPage from "./LandingPage";
import Events from "./Events"; // New Events page component
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
        <Route path="/home" element={<Home />} /> 
          <Route path="/" element={<Home />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/events" element={<Events />} /> {/* New Events Page Route */}
          <Route path="/add-event" element={<AddEvent />} /> {/* New Route */}
          <Route path="/event/:index" element={<SingleEventPage />} /> 
        </Route>
      </Routes>
    </>
  );
};

export default App;
