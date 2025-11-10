import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTaskById, updateTask } from '../data/tasks';
import Modal from '../components/Modal';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const foundTask = getTaskById(id);
    if (foundTask) {
      setTask(foundTask);
      setEditedTask(foundTask);
    }
  }, [id]);

  const handleSave = () => {
    updateTask(id, editedTask);
    setTask(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // En una aplicación real, aquí llamarías a una API para eliminar
    setShowDeleteModal(false);
    navigate('/');
  };

  if (!task) {
    return (
      <div className="detail-page">
        <div className="detail-container">
          <div className="error-state fade-in">
            <div className="error-icon">❌</div>
            <h3 className="error-title">Tarea no encontrada</h3>
            <p className="error-description">
              La tarea que buscas no existe o ha sido eliminada.
            </p>
            <Link to="/" className="btn btn-primary">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="detail-page">
        <div className="detail-container">
          <div className="detail-header">
            <Link to="/" className="back-link">
              <span>←</span>
              Volver a la lista
            </Link>
          </div>

          <div className="detail-card fade-in">
            {!isEditing ? (
              <>
                <div className="detail-card-header">
                  <div className="detail-title-container">
                    <h1 className="detail-title">{task.title}</h1>
                    <span className={`detail-status ${task.completed ? 'status-completed' : 'status-pending'}`}>
                      {task.completed ? '✅ Completada' : '⏳ Pendiente'}
                    </span>
                  </div>
                </div>

                <div className="detail-content">
                  <div className="detail-section">
                    <div className="detail-section-title">
                      <span>📝</span>
                      Descripción
                    </div>
                    <div className="detail-section-content">
                      <p>{task.description || 'Esta tarea no tiene descripción...'}</p>
                    </div>
                  </div>

                  <div className="detail-meta">
                    <div className="meta-item">
                      <span className="meta-icon">📅</span>
                      <div className="meta-content">
                        <span className="meta-label">Fecha de creación</span>
                        <span className="meta-value">{task.createdAt}</span>
                      </div>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">🆔</span>
                      <div className="meta-content">
                        <span className="meta-label">ID de tarea</span>
                        <span className="meta-value">#{task.id}</span>
                      </div>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">⚡</span>
                      <div className="meta-content">
                        <span className="meta-label">Estado</span>
                        <span className="meta-value">
                          {task.completed ? 'Completada' : 'En progreso'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-actions">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn btn-primary"
                    >
                      ✏️ Editar Tarea
                    </button>
                    <button
                      onClick={handleDelete}
                      className="btn btn-danger"
                    >
                      🗑️ Eliminar Tarea
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="detail-content">
                <div className="edit-form">
                  <div className="form-row">
                    <label className="form-label">Título de la tarea</label>
                    <input
                      type="text"
                      value={editedTask.title}
                      onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                      className="edit-input"
                      placeholder="Ingresa el título de la tarea"
                    />
                  </div>

                  <div className="form-row">
                    <label className="form-label">Descripción</label>
                    <textarea
                      value={editedTask.description}
                      onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                      className="edit-textarea"
                      placeholder="Describe los detalles de tu tarea..."
                    />
                  </div>

                  <div className="edit-checkbox">
                    <input
                      type="checkbox"
                      checked={editedTask.completed}
                      onChange={(e) => setEditedTask({...editedTask, completed: e.target.checked})}
                      className="checkbox-input"
                    />
                    <label className="checkbox-label">
                      Marcar como completada
                    </label>
                  </div>

                  <div className="form-actions">
                    <button
                      onClick={handleSave}
                      className="btn btn-success"
                    >
                      💾 Guardar Cambios
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn btn-secondary"
                    >
                      ❌ Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmar eliminación"
        type="danger"
      >
        <p>
          ¿Estás seguro de que quieres eliminar la tarea "<strong>{task.title}</strong>"?
        </p>
        <p style={{marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)'}}>
          Esta acción no se puede deshacer.
        </p>
        <div className="modal-actions">
          <button 
            onClick={confirmDelete}
            className="btn btn-danger"
          >
            🗑️ Sí, eliminar
          </button>
          <button 
            onClick={() => setShowDeleteModal(false)}
            className="btn btn-secondary"
          >
            ↩️ Cancelar
          </button>
        </div>
      </Modal>
    </>
  );
};

export default TaskDetail;