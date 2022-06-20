import React, { createContext, useState, useEffect } from "react";

export const MyContext = createContext("");
const AppContext = ({ children }) => {
  const [dishes, setDishes] = useState([]);
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("light");

  return (
    <MyContext.Provider
      value={{
        dishes,
        setDishes,
        user,
        setUser,
        mode,
        setMode,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default AppContext;
