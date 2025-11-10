import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addTask } from '../data/tasks';
import Modal from '../components/Modal';

const CreateTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false
  });
  const [showValidationModal, setShowValidationModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setShowValidationModal(true);
      return;
    }

    addTask(formData);
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <>
      <div className="app-container">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="mb-8 fade-in">
            <Link 
              to="/" 
              className="back-link"
            >
              <span>←</span>
              Volver a la lista
            </Link>
            <h1 className="form-title">✨ Crear Nueva Tarea</h1>
            <p className="form-subtitle">
              Agrega una nueva tarea a tu lista de pendientes
            </p>
          </div>

          <form onSubmit={handleSubmit} className="form-card fade-in">
            <div className="form-group">
              <label className="form-label">Título de la tarea *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="¿Qué necesitas hacer?"
                className="form-input"
                required
              />
              <div className="form-hint">
                El título es obligatorio para crear la tarea
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Descripción</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe los detalles de tu tarea (opcional)..."
                className="form-textarea"
              />
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
                className="checkbox-input"
              />
              <label className="checkbox-label">
                Marcar como completada
              </label>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-success"
              >
                🚀 Crear Tarea
              </button>
              <Link
                to="/"
                className="btn btn-secondary"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de validación */}
      <Modal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        title="Falta información"
        type="warning"
      >
        <p>El título de la tarea es obligatorio. Por favor, ingresa un título para continuar.</p>
        <div className="modal-actions">
          <button 
            onClick={() => setShowValidationModal(false)}
            className="btn btn-primary"
          >
            Entendido
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CreateTask;