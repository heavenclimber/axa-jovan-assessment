import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "@pages/Home";
import User from "@pages/User";

function App() {
  console.log("banana1");

  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/user/:id" exact element={<User />} />
    </Routes>
  );
}

export default App;
