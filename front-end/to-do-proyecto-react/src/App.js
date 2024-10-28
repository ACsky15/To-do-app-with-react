import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [tareas, setTareas] = useState([]);
  const [tareaInput, setTareaInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isListVisible, setIsListVisible] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/tareas')
      .then((response) => response.json())
      .then((data) => {
        const tareasConEstado = data.map(tarea => ({
          ...tarea,
          completada: tarea.completada || false // Si no hay propiedad, asigna false
        }));
        setTareas(tareasConEstado);
      });
  }, []);

  const CompletarTarea = (index) => {
    const tareaId = tareas[index].id;
    const tareaActualizada = { ...tareas[index], completada: !tareas[index].completada };

    fetch(`http://localhost:5000/tareas/${tareaId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tareaActualizada),
    })
      .then((response) => response.json())
      .then((data) => {
        const tareasActualizadas = tareas.map((tarea, i) =>
          i === index ? data : tarea
        );
        setTareas(tareasActualizadas);
      });
  };

  const buscarTarea = () => {
    if (!searchTerm) {
      alert('Por favor ingresa un término de búsqueda.');
      return;
    }
  
    const index = tareas.findIndex(tarea => 
      tarea.título.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    if (index === -1) {
      alert('Tarea no encontrada');
    } else {
      setIsListVisible(true); 
      const tareasActualizadas = tareas.map((tarea, i) => ({
        ...tarea,
        isHighlighted: i === index,
      }));
      setTareas(tareasActualizadas);
    }
  };

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

  const editarTarea = (index) => {
    setTareaInput(tareas[index].título);
    setEditingIndex(index);
    setIsFormVisible(true);
  };

  const eliminarTarea = (index) => {
    const tareaId = tareas[index].id;
    fetch(`http://localhost:5000/tareas/${tareaId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        const tareasActualizadas = tareas.filter((_, i) => i !== index);
        setTareas(tareasActualizadas);
      });
  };

  const visibilidadTareas = () => {
    setIsListVisible(!isListVisible);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>To do list App</p>
      </header>
      <div className="Añadir-tareas">
        <button className="add-button" onClick={() => { setTareaInput(''); setEditingIndex(null); setIsFormVisible(true); }}>
          Añadir tarea
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

<div className='buscador'>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar tarea"
          />
          <button  onClick={buscarTarea}>
          <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      <div className="To-do-section">
        <h1 className="Titulo-seccion-tareas">Lista de tareas</h1>
          <button className='vistaTareas' onClick={visibilidadTareas}>
            {isListVisible ? 'Ocultar Tareas' : 'Mostrar Tareas'}
          </button>
                  
        { /* <Estas son las tareas mostadas por el botón mostrar/ocultar/ y la función resaltar la tarea hallada> */ } 
        {isListVisible && (
        <ul className="Tareas">
          {tareas.map((tarea, index) => (
            <li key={tarea.id} className={tarea.isHighlighted ? 'highlighted' : ''} style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
              <input
                type="checkbox"
                checked={tarea.completada}
                onChange={() => CompletarTarea(index)}
              />
              {tarea.título}
                <button className="edit-button" onClick={() => editarTarea(index)} style={{ margin: '10px' }}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="delete-button" onClick={() => eliminarTarea(index)} style={{ margin: '10px' }}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
