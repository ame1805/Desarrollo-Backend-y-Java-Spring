import { Link } from "react-router-dom"

function Dashboard({ user }) {
  const modules = [
    {
      id: "students",
      title: "Estudiantes",
      icon: "👨‍🎓",
      description: "Gestión de estudiantes, inscripciones y datos personales",
      color: "bg-gradient-purple",
    },
    {
      id: "courses",
      title: "Cursos",
      icon: "📚",
      description: "Administración de cursos, materias y programas académicos",
      color: "bg-gradient-blue",
    },
    {
      id: "grades",
      title: "Calificaciones",
      icon: "📝",
      description: "Registro y consulta de calificaciones por estudiante y curso",
      color: "bg-gradient-green",
    },
    {
      id: "attendance",
      title: "Asistencia",
      icon: "📅",
      description: "Control de asistencia y registro de participación",
      color: "bg-gradient-orange",
    },
    {
      id: "reports",
      title: "Reportes",
      icon: "📊",
      description: "Generación de informes y estadísticas académicas",
      color: "bg-gradient-red",
    },
  ]

  return (
    <div className="dashboard">
      <div className="welcome-banner">
        <div className="welcome-content">
          <h1>¡Bienvenido, {user.username}!</h1>
          <p>Sistema de Gestión Estudiantil - Panel de Control</p>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">👨‍🎓</div>
          <div className="stat-info">
            <h3>1,245</h3>
            <p>Estudiantes</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>48</h3>
            <p>Cursos</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-info">
            <h3>32</h3>
            <p>Profesores</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏫</div>
          <div className="stat-info">
            <h3>5</h3>
            <p>Facultades</p>
          </div>
        </div>
      </div>

      <h2 className="section-title">Módulos del Sistema</h2>
      <div className="modules-grid">
        {modules.map((module) => (
          <Link to={`/${module.id}`} key={module.id} className={`module-card ${module.color}`}>
            <div className="module-icon">{module.icon}</div>
            <h3>{module.title}</h3>
            <p>{module.description}</p>
          </Link>
        ))}
      </div>

      <div className="quick-actions">
        <h2 className="section-title">Acciones Rápidas</h2>
        <div className="actions-container">
          <button className="action-button">
            <span>➕</span> Nuevo Estudiante
          </button>
          <button className="action-button">
            <span>📝</span> Registrar Calificaciones
          </button>
          <button className="action-button">
            <span>📊</span> Generar Reporte
          </button>
          <button className="action-button">
            <span>📅</span> Tomar Asistencia
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
