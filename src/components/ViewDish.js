import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { MyContext } from "../context";
import { API } from "../api";

const ViewDish = () => {
  const { id } = useParams();
  const { user } = useContext(MyContext);
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    axios.get(`${API}/lookup.php?i=${id}`).then(({ data }) => {
      setRecipe(data.meals);
    });
  }, []);
  console.log(recipe, id);
  if (!recipe[0]) return <div>Loading...</div>;
  else console.log(recipe[0].strInstructions);
  return (
    <Container className="viewDish" maxWidth="xl">
      <Box sx={{ maxWidth: "auto", minHeight: "auto" }}>
        <Paper elevation={3}>
          <ReactPlayer width="100%" controls url={recipe[0].strYoutube} />
          <Box sx={{ width: "100%", borderBottom: 2, borderColor: "purple" }}>
            <Tab className="instcTitle" label="Instructions to be Followed" />
          </Box>
          <List className="Instructions">
            {recipe[0].strInstructions.split(".").map((line, i) => {
              const instruction = line.trimStart();

              return (
                <ListItemText key={i} primary={`${i + 1}: ${instruction}`} />
              );
            })}
          </List>
          {user && (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => console.log("Added")}
            >
              Add to Favorites
            </Button>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ViewDish;
