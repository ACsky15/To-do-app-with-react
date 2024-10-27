const cors = require('cors'); 
const express = require('express');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tareas = [];
let idCounter = 0;

//Lista de tareas almacenadas
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
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});

//Eliminar tarea
app.delete('/tareas/:id', (req, res) => {
  const { id } = req.params;
  const index = tareas.findIndex(tarea => tarea.id == id);
  if (index !== -1) {
      const [tareaEliminada] = tareas.splice(index, 1);
      res.json(tareaEliminada);
  } else {
      res.status(404).send('Tarea no encontrada');
  }
});

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
