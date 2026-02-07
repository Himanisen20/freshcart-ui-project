import React from "react";
import "../css/dashboard.css";

import DashNav from "./Dashnav";
import { Bell, User} from "lucide-react";
import Dashhome from "./Dashhome";


function Dashboard() {
  return (
    <div className="dashboard-layout">

      {/* ========== SIDEBAR ========== */}
     <DashNav/>
      {/* ========== MAIN CONTENT ========== */}
      <main className="main">

        {/* ---- Top Bar ---- */}
       <nav className="navbar">
        <h2 className="logo">MyStore</h2>

        <input
          type="text"
          placeholder="Search Product..."
          className="search-input"
        />

        <div className="nav-icons">
          <Bell />
          <User />
        </div>
      </nav>

        <Dashhome/>
           
      </main>
    </div>
  );
}

export default Dashboard;
