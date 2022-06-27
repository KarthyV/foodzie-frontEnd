import React, { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { DB_API } from "./api/index";

export const MyContext = createContext("");

const AppContext = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();

  const [dishes, setDishes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [mode, setMode] = useState("light");

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .post(`${DB_API}/users`, { email: user.email, name: user.name })
        .then(({ data }) => {
          setCurrentUser(data);
          localStorage.setItem("token", data.token);
        })
        .catch((error) => console.log(error));
    }
  }, [isAuthenticated]);

  return (
    <MyContext.Provider
      value={{
        dishes,
        setDishes,
        currentUser,
        setCurrentUser,
        mode,
        setMode,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default AppContext;
