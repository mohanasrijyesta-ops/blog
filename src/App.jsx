import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import MyPosts from "./pages/MyPosts";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/create" element={<CreatePost />} />

        <Route path="/posts/:id" element={<PostDetails />} />

        <Route path="/my-posts" element={<MyPosts />} />
      </Routes>
    </>
  );
}

export default App;