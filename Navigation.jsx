import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="nav-brand">
          <span>🚀</span>
          TaskMaster
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Inicio
          </Link>
          <Link to="/create" className="btn btn-primary">
            <span>+</span>
            Nueva Tarea
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;