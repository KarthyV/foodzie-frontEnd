import React, { useContext, useEffect } from "react";
import SearchBox from "../SearchBox";
import Typography from "@mui/material/Typography";
import axios from "axios";
import DisplayDishes from "../DisplayDishes";
import { MyContext } from "../../context";
import { API } from "../../api";

const Home = () => {
  const { dishes, setDishes } = useContext(MyContext);

  useEffect(() => {
    axios
      .get(`${API}/search.php?f=p`)
      .then(({ data }) => setDishes(data.meals))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="jumbotron">
        <Typography color="white" variant="h2" component="div" gutterBottom>
          Welcome !
        </Typography>
        <Typography color="white" variant="h3" gutterBottom component="div">
          Search for your favorite recipes here...
        </Typography>
        <SearchBox />
      </div>
      {dishes !== undefined ? <DisplayDishes dishes={dishes} /> : "Loading..."}
    </div>
  );
};

export default Home;
