import React, { useContext, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import ViewDish from "./components/ViewDish";
import Categories from "./components/Category/Categories";
import CategoryView from "./components/Category/CategoryCard";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import NotFound from "./components/pages/pageNotFound";
import Favorites from "./components/pages/Favorites";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MyContext } from "./context";
import axios from "axios";
import { DB_API } from "./api";

const App = () => {
  const { mode, setUser } = useContext(MyContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const auth = `Bearer ${token}`;
    axios
      .post(`${DB_API}/auto-login`, {}, { headers: { Authorization: auth } })
      .then(({ data }) => setUser(data))
      .catch((err) => console.log(err));
  }, []);
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={`${mode === "dark" ? "App dark" : "App"}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/receipe/view/:id" element={<ViewDish />} />
          <Route path="/receipe/category/:name" element={<CategoryView />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
