import React from "react";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { Content } from "./components/layout/Content";

export const App = () => (
  <div className="App">
    <Header />
    <Sidebar />
    <Content />
  </div>
);

export default App;
