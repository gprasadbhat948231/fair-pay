import React from 'react';
import "./App.css";
import NavBar from "./Components/Navbar";
import AllRoutes from './Pages/AllRoutes';

function App() {
  return (
    <div className='container'>
        <NavBar />
        <AllRoutes/>
    </div>
  );
}

export default App;
