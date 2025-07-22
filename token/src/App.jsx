"use client"

import { useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import "./App.css"

// Importar los nuevos componentes
import Dashboard from "./components/dashboard"
import Students from "./components/students"
import Courses from "./components/courses"
import Grades from "./components/grades"
import Attendance from "./components/attendance"
import Reports from "./components/reports"
import Sidebar from "./components/sidebar"
import Header from "./components/header"

function App() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [protectedData, setProtectedData] = useState(null)
  const [loading, setLoading] = useState(true)

  async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refreshToken")
    if (!refreshToken) return null

    try {
      const res = await fetch("http://localhost:3001/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: refreshToken }),
      })
      const data = await res.json()

      if (res.ok) {
        localStorage.setItem("accessToken", data.accessToken)
        return data.accessToken
      } else {
        alert("Tu sesión expiró, por favor inicia sesión nuevamente.")
        return null
      }
    } catch (error) {
      console.error("Error al renovar token:", error)
      return null
    }
  }

  const fetchProtected = async () => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      console.log("No hay token, no se hace la petición protegida.")
      setLoading(false)
      return
    }

    let res = await fetch("http://localhost:3001/api/protegido", {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (res.status === 401 || res.status === 403) {
      const newToken = await refreshAccessToken()
      if (newToken) {
        res = await fetch("http://localhost:3001/api/protegido", {
          headers: { Authorization: `Bearer ${newToken}` },
        })
      } else {
        setLoading(false)
        return
      }
    }

    if (res.ok) {
      const data = await res.json()
      setProtectedData(data)
    } else {
      setProtectedData(null)
    }
    setLoading(false)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password }),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem("accessToken", data.accessToken)
        localStorage.setItem("refreshToken", data.refreshToken)
        console.log("Tokens recibidos:")
        console.log("Access Token:", data.accessToken)
        console.log("Refresh Token:", data.refreshToken)
        alert("Inicio de sesión exitoso")
        fetchProtected() // Recupera datos protegidos al iniciar sesión
      } else {
        alert(data.message || "Error en inicio de sesión")
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error)
      alert("Error de conexión")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    setProtectedData(null)
    alert("Sesión cerrada.")
  }

  // Renovación periódica del token cada 4 minutos
  useEffect(() => {
    const interval = setInterval(
      () => {
        refreshAccessToken()
      },
      2 * 60 * 1000,
    )

    return () => clearInterval(interval)
  }, [])

  // Cargar datos protegidos al iniciar si hay token
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      fetchProtected()
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <>
      {!protectedData ? (
        <div
          className="background"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
              <h2>Sistema de Gestión Estudiantil</h2>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Usuario"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Ingresar</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="app-container">
          <Sidebar />
          <div className="content-container">
            <Header user={protectedData.user} onLogout={handleLogout} />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard user={protectedData.user} />} />
                <Route path="/students" element={<Students />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/grades" element={<Grades />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </>
  )
}

export default App
