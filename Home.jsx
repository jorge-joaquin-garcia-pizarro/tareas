import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import { getTasks } from '../data/tasks';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <div className="hero">
        <h1 className="hero-title">Gestiona Tus Tareas</h1>
        <p className="hero-subtitle">
          Organiza tu trabajo y mantén el control de todo lo importante en un solo lugar
        </p>
      </div>

      <div className="container">
        <section className="section">
          <div className="filters-container">
            <div className="filters">
              <button
                onClick={() => setFilter('all')}
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              >
                Todas las tareas
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              >
                Pendientes
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              >
                Completadas
              </button>
            </div>

            <Link to="/create" className="btn btn-success">
              <span>+</span>
              Crear Nueva Tarea
            </Link>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="empty-state fade-in">
              <div className="empty-icon">📝</div>
              <h3 className="empty-title">
                {filter === 'all' 
                  ? 'No hay tareas creadas' 
                  : `No hay tareas ${filter === 'completed' ? 'completadas' : 'pendientes'}`
                }
              </h3>
              <p className="empty-description">
                {filter === 'all' 
                  ? 'Comienza organizando tu trabajo creando tu primera tarea' 
                  : `Todas las tareas están ${filter === 'completed' ? 'pendientes' : 'completadas'}`
                }
              </p>
              {filter === 'all' && (
                <Link to="/create" className="btn btn-primary">
                  Crear mi primera tarea
                </Link>
              )}
            </div>
          ) : (
            <div className="tasks-grid">
              {filteredTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;