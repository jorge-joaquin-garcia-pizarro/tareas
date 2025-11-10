export const initialTasks = [
  {
    id: 1,
    title: "Completar el proyecto React",
    description: "Terminar la aplicación de lista de tareas con React Router",
    createdAt: "2023-10-15",
    completed: false
  },
  {
    id: 2,
    title: "Estudiar para el examen",
    description: "Repasar los conceptos de JavaScript y React",
    createdAt: "2023-10-16",
    completed: true
  },
  {
    id: 3,
    title: "Hacer ejercicio",
    description: "Ir al gimnasio por 1 hora",
    createdAt: "2023-10-17",
    completed: false
  }
];

let tasks = [...initialTasks];
let nextId = 4;

export const getTasks = () => [...tasks];

export const getTaskById = (id) => tasks.find(task => task.id === parseInt(id));

export const addTask = (task) => {
  const newTask = {
    ...task,
    id: nextId++,
    createdAt: new Date().toISOString().split('T')[0]
  };
  tasks.push(newTask);
  return newTask;
};

export const updateTask = (id, updatedTask) => {
  const index = tasks.findIndex(task => task.id === parseInt(id));
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    return tasks[index];
  }
  return null;
};