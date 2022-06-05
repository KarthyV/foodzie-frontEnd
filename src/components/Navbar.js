import React, { useContext } from "react";
import ResponsiveAppBar from "./materialUI/ResponsiveAppBar";
import { MyContext } from "../context";

const Navbar = () => {
  const { user } = useContext(MyContext);

  const pages = !user
    ? ["Home", "Categories", "Login", "Sign Up"]
    : ["Home", "Categories", "Favorites", "Log Out"];
  const mode = ["Light mode", "Dark mode"];

  return <ResponsiveAppBar color={"secondary"} pages={pages} mode={mode} />;
};

export default Navbar;
