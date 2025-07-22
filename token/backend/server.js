// server.js
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "./db.js"; // recuerda la extensión si usas módulos ES
import { authenticateToken } from "./authMiddleware.js";
import dotenv from 'dotenv';


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const refreshTokens = [];

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'secreto123';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'secretoRefresh123';

const PORT = process.env.PORT || 3001;

// Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "3m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    refreshTokens.push(refreshToken); // Guarda el refresh token

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Error en /api/login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Ruta para renovar el accessToken usando un refreshToken válido
app.post("/api/token", (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(401).json({ message: "Token requerido" });
  if (!refreshTokens.includes(token))
    return res.status(403).json({ message: "Refresh token no válido" });

  try {
    // Verifica el refresh token con la clave correcta
    const user = jwt.verify(token, REFRESH_TOKEN_SECRET);

    // Genera nuevo access token con la clave del access token
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (error) {
    console.error("Error al verificar refresh token:", error);
    res.status(403).json({ message: "Refresh token inválido o expirado" });
  }
});

app.post("/api/logout", (req, res) => {
  const { token } = req.body;

  const index = refreshTokens.indexOf(token);
  if (index !== -1) {
    refreshTokens.splice(index, 1); // ✅ Eliminamos sin reasignar el array
  }

  res.status(204).send();
});

app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});

app.get("/api/protegido", authenticateToken, (req, res) => {
  res.json({ message: "Acceso autorizado", user: req.user });
});
