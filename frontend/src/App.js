import React from "react";
import "./App.css";
import Header from "./cotainers/Header";
import Footer from "./components/Footer";
import Movies from "./cotainers/Movies";
import SingleMovie from "./components/SingleMovie";
import AddMovie from "./components/AddMovie";


const App = () => {
  return (
    <div lang="en">
      <Header />
      <Movies />
      <AddMovie />
      <Footer />
    </div>
  );
};

export default App;
