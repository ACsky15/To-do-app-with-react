import logo from'./logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [tareas, setTareas] = useState([]);
  const [tareaInput, setTareaInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  //fectch API
  useEffect(() => {
    fetch('http://localhost:5000/tareas')
      .then((response) => response.json())
      .then((data) => setTareas(data));
  }, []);

//Función añadir o actualizar tarea
const añadirTarea = () => {
  const tarea = { título: tareaInput };
  const method = editingIndex !== null ? 'PUT' : 'POST';
  const url = editingIndex !== null ? `http://localhost:5000/tareas/${tareas[editingIndex].id}` : 'http://localhost:5000/tareas';

  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tarea),
  })
    .then((response) => response.json())
    .then((data) => {
      if (editingIndex !== null) {
        const tareasActualizadas = [...tareas];
        tareasActualizadas[editingIndex] = data;
        setTareas(tareasActualizadas);
        setEditingIndex(null);
      } else {
        setTareas([...tareas, data]);
      }
      setTareaInput('');
      setIsFormVisible(false);
    });
};


  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
        <p>
          To do list App
        </p>
      </header>
      <body>
      <div class="button-group">
        <button class="add-button" onClick={()=>{setTareaInput(''); setEditingIndex(null); setIsFormVisible(true); }}>
        {editingIndex !== null ? 'Actualizar tarea' : 'Añadir tarea'}
        </button>
        {isFormVisible && (
        <div className="form-container">
          <input
            type="text"
            value={tareaInput}
            onChange={(e) => setTareaInput(e.target.value)}
            placeholder="Añade tu tarea"
            required
          />
          <button onClick={añadirTarea}>
            {editingIndex !== null ? 'Actualizar' : 'Añadir'}
          </button>
          <button onClick={() => setIsFormVisible(false)}>Cancelar</button>
        </div>
      )}
    
        <button class="edit-button">Editar tarea</button>
        <button class="delete-button">Eliminar tarea</button>
      </div>
      <div className="To-do-section">
      <h1 className="Lista-Tareas">Lista de tareas</h1>
        <ul className="Tareas" ></ul>
      </div>
      
      </body>
      
    </div>
  );
}

export default App;

