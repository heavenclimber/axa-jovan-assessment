import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "@pages/Home";
import User from "@pages/User";
import Comments from "@pages/Comments";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/user/:id" exact element={<User />} />
      <Route path="/post/:id" exact element={<Comments />} />
    </Routes>
  );
}

export default App;
