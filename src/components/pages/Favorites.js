import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../context";
import { useNavigate } from "react-router-dom";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Button from "@mui/material/Button";
import { DB_API } from "../../api";

const Favorites = () => {
  const { user, setUser } = useContext(MyContext);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("token");
      if (!token) return;
      const auth = `Bearer ${token}`;
      axios
        .post(`${DB_API}/auto-login`, {}, { headers: { Authorization: auth } })
        .then(({ data }) => {
          setUser(data);
          setFavorites(data.favorites);
        })
        .catch((err) => console.log(err));
    }
    if (user) setFavorites(user.favorites);
  }, []);

  if (!user) return <div>Loading...</div>;
  else {
    if (!favorites.length)
      return (
        <Container minWidth="md">
          <Typography component="h1" variant="h5">
            You Don't have any favorites'
          </Typography>
          <Typography component="h3" variant="h5">
            Please add favorites to your favorites
          </Typography>
        </Container>
      );

    return (
      <Container>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ width: "100%", borderBottom: 2, borderColor: "purple" }}>
            <Tab label="Here's your favorite recipes" />
          </Box>
          {favorites.map((each, i) => {
            return (
              <ListItemButton
                onClick={() => navigate(`/receipe/view/${each.recipeId}`)}
                key={i}
              >
                <ListItemIcon>
                  <FlagCircleIcon />
                </ListItemIcon>
                <ListItemText primary={`${each.recipeName}`} />
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    const token = localStorage.getItem("token");

                    if (!token) return;
                    const auth = `Bearer ${token}`;
                    axios
                      .post(
                        `${DB_API}/delete-favorites`,
                        {
                          recipeId: each.recipeId,
                        },
                        { headers: { Authorization: auth } }
                      )
                      .then(({ data }) => {
                        setUser(data);
                        setFavorites(data.favorites);
                        alert("Recipe Removed from Favorites");
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  <DeleteIcon />
                  DELETE
                </Button>
              </ListItemButton>
            );
          })}
        </Box>
      </Container>
    );
  }
};

export default Favorites;
