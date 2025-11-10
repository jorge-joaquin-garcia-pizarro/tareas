import { Link } from 'react-router-dom';

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`task-status ${task.completed ? 'status-completed' : 'status-pending'}`}>
          {task.completed ? 'Completada' : 'Pendiente'}
        </span>
      </div>
      
      <p className="task-description">
        {task.description}
      </p>
      
      <div className="task-footer">
        <span className="task-date">
          Creada: {task.createdAt}
        </span>
        <Link to={`/task/${task.id}`} className="btn-primary">
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;