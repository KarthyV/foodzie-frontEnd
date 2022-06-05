import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DishCard from "../DishCard";
import Typography from "@mui/material/Typography";
import { API } from "../../api";

const CategoryView = () => {
  const [countryDishes, setCountryDishes] = useState([]);
  const { name } = useParams();
  useEffect(() => {
    axios
      .get(`${API}/filter.php?a=${name}`)
      .then(({ data }) => setCountryDishes(data.meals));
  });
  if (!countryDishes) return <div>Loading...</div>;
  return (
    <Container minWidth="md">
      <Typography
        style={{ padding: "10px" }}
        gutterBottom
        variant="h3"
        component="h1"
      >
        <u>{name} Dishes</u>
      </Typography>
      <Grid container spacing={2}>
        {countryDishes.map((dish) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={dish.idMeal}>
              <DishCard key={dish.idMeal} dish={dish} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default CategoryView;
