"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2 className="logo">SGE</h2>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {collapsed ? "→" : "←"}
        </button>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} end>
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Dashboard</span>
        </NavLink>
        <NavLink to="/students" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <span className="nav-icon">👨‍🎓</span>
          <span className="nav-text">Estudiantes</span>
        </NavLink>
        <NavLink to="/courses" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <span className="nav-icon">📚</span>
          <span className="nav-text">Cursos</span>
        </NavLink>
        <NavLink to="/grades" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <span className="nav-icon">📝</span>
          <span className="nav-text">Calificaciones</span>
        </NavLink>
        <NavLink to="/attendance" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <span className="nav-icon">📅</span>
          <span className="nav-text">Asistencia</span>
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <span className="nav-icon">📊</span>
          <span className="nav-text">Reportes</span>
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <p className="version">v1.0.0</p>
      </div>
    </aside>
  )
}

export default Sidebar
