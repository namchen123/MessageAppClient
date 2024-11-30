/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import React from "react";
import LoginPage from "./pages/LoginPage";
import AppPage from "./pages/AppPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Context from "./Context";
import Content from "./components/Content";
import { jwtDecode } from "jwt-decode";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  return (
    <Context.Provider value={{ isLoggedIn, setIsLoggedIn}}>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
