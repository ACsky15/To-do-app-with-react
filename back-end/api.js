const cors = require('cors'); 
const express = require('express');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tareas = [];
let idCounter = 0;

//Almacenamiento de tareas
app.get('/tareas', (req, res) => {
    res.json(tareas);
  });

  //Añadir tareas
app.post('/tareas', (req, res) => {
    const nuevaTarea= {id: idCounter++, ...req.body};
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
  }); 

  // Actualizar tarea
app.put('/tareas/:id', (req, res) => {
    const { id } = req.params;
    const index = tareas.findIndex(tarea => tarea.id == id);
    if (index !== -1) {
        tareas[index] = { ...tareas[index], ...req.body };
        res.json(tareas[index]);
    } 
});

//Eliminar tarea
app.delete('/tareas/:id', (req, res) => {
  const { id } = req.params;
  const index = tareas.findIndex(tarea => tarea.id == id);
  if (index !== -1) {
      const [tareaEliminada] = tareas.splice(index, 1);
      res.json(tareaEliminada);
  } 
});

/*Buscador */
app.get('/tareas', (req, res) => {
  const { query } = req.query; 
  if (!query) {
    return res.status(400).json({ message: 'Query no proporcionada' });
  }
  
  const tareasFiltradas = tareas.filter(tarea => 
    tarea.título.toLowerCase().includes(query.toLowerCase())
  );

  if (tareasFiltradas.length > 0) {
    res.json(tareasFiltradas);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
