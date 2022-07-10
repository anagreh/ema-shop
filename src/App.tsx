import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col } from "react-bootstrap";
import ItemCard from "./components/ItemCard";
import LogInForm from "./components/LogInForm";
import CreateItemForm from "./components/CreateItemForm";
import SignupForm from "./components/SignupForm";
import { NavBar } from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import MyItems from "./pages/MyItems";
import LogIn from "./pages/LogIn";
import CreateItem from "./pages/CreateItem";
import ItemPage from "./pages/Item";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route  path="/signup" element={<SignUp/>}/>
        <Route  path="/login" element={<LogIn/>}/>
        <Route  path="/my-items" element={<MyItems/>}/>
        <Route  path="/create-item" element={<CreateItem/>}/>
        <Route  path="items/:id" element={<ItemPage/>}/>

      </Routes>
    </>
  );
}

export default App;
