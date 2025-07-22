"use client"

import { useState } from "react"

function Header({ user, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const handleLogout = () => {
    onLogout()
  }

  return (
    <header className="app-header">
      <div className="header-title">
        <h1>Sistema de Gestión Estudiantil</h1>
      </div>
      <div className="header-actions">
        <div className="notifications">
          <button className="notification-btn">
            🔔<span className="notification-badge">3</span>
          </button>
        </div>
        <div className="user-menu">
          <button className="user-btn" onClick={toggleDropdown}>
            <div className="user-avatar">{user.username.charAt(0).toUpperCase()}</div>
            <span className="user-name">{user.username}</span>
            <span className="dropdown-arrow">▼</span>
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <button className="dropdown-item">👤 Mi Perfil</button>
              <button className="dropdown-item">⚙️ Configuración</button>
              <button className="dropdown-item" onClick={handleLogout}>
                🚪 Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
