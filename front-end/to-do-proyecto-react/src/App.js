import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCheckCircle, faEdit, faList, faList12, faListCheck, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [tareas, setTareas] = useState([]);
  const [tareaInput, setTareaInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/tareas')
      .then((response) => response.json())
      .then((data) => {
        const tareasConEstado = data.map(tarea => ({
          ...tarea,
          completada: tarea.completada || false 
        }));
        setTareas(tareasConEstado);
      });
  }, []);

  const CompletarTarea = (index, isSearchResult = false) => {
     const tareaId = isSearchResult ? searchResults[index].id : tareas[index].id; 
     const tareaActualizada = isSearchResult ? { ...searchResults[index], completada: !searchResults[index].completada } : { ...tareas[index], 
    completada: !tareas[index].completada }; 
    
    fetch(`http://localhost:5000/tareas/${tareaId}`, { 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json', 

      }, 
      body: JSON.stringify(tareaActualizada),
     }) .then((response) => response.json()) 
        .then((data) => { 
      if (isSearchResult) { const resultadosActualizados = searchResults.map((tarea, i) => i === index ? data : tarea ); 
        setSearchResults(resultadosActualizados); const tareasActualizadas = tareas.map((tarea) => tarea.id === tareaId ? data : tarea ); 
        setTareas(tareasActualizadas);
       } 
       else 
       { const tareasActualizadas = tareas.map((tarea, i) => i === index ? data : tarea ); 
          setTareas(tareasActualizadas);
        }
      }); 
    };

  const buscarTarea = () => {
    if (!searchTerm) {
      alert('Por favor ingresa un término de búsqueda.');
      return;
    }
  
    const resultados = tareas.filter(tarea => 
      tarea.título.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    if (resultados.length === 0) {
      alert('Tarea no encontrada');
    } else {
      setSearchResults(resultados);
    }
  };
  

  const añadirTarea = () => { 
    const tarea = { título: tareaInput }; 
    fetch('http://localhost:5000/tareas', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json', }, 
      body: JSON.stringify(tarea),
     }) 
      .then((response) => response.json()) 
      .then((data) => { 
        setTareas([...tareas, data]); 
        setTareaInput(''); 
        setIsFormVisible(false); 
      }); 
    };

  const [modalInput, setModalInput] = useState('');

  const editarTarea = (index) => {
     setEditingIndex(index); 
     setIsModalVisible(true); 
     setModalInput(tareas[index].título);
  };

  const actualizarTarea = () => { 
    const tarea = { título: modalInput };
    const url = `http://localhost:5000/tareas/${tareas[editingIndex].id}`;
     fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json', }, 
      body: JSON.stringify(tarea), }) 
     .then((response) => response.json()) 
     .then((data) => { const tareasActualizadas = tareas.map((tarea, i) => i === editingIndex ? data : tarea ); 
      setTareas(tareasActualizadas); 
      setEditingIndex(null); 
      setModalInput(''); 
      setIsModalVisible(false); 
    }); 
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

  
  const handleToggle = (e) => {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute('data-target');
  const targetElement = document.getElementById(targetId);

  if (targetElement.classList.contains('show')) {
    targetElement.classList.remove('show');
  } else {
    document.querySelectorAll('.show').forEach(el => el.classList.remove('show')); // Oculta todas las secciones abiertas
    targetElement.classList.add('show');
  }
};

const handleKeyPress = (event) => { if (event.key === 'Enter') { buscarTarea(); } };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>To do list App</p>
      </header>
      <body>
      <div className='menu'> 
        <nav> 
          <ul> 
            <li><a href="#" data-target="agregar" onClick={handleToggle}>
              <FontAwesomeIcon icon={faAdd} /> Crea tu lista tareas</a>
              </li> 
              <div id="agregar" className= {`Añadir-tareas ${isFormVisible ? 'show' : ''}`}> 
              <button className="add-button" onClick={() => { 
                setTareaInput(''); 
                setEditingIndex(null); 
                setIsFormVisible(true); }}
                style={{ display: isFormVisible ? 'none' : 'block' }}>
                  <FontAwesomeIcon icon={faAdd} />
                  </button> {isFormVisible && ( 
                    <div className="form-container"> 
                    <input type="text" value={tareaInput} onChange={(e) => 
                    setTareaInput(e.target.value)} placeholder="Añade tu tarea" required /> 
                    <button id='Añadir' onClick={añadirTarea}>Añadir</button> 
                    <button id='Cancelar' onClick={() =>
                    setIsFormVisible(false)}>Cancelar
                    </button> 
                    </div>
                  )} 
                </div>
              <li><a href="#" data-target="buscar" onClick={handleToggle}><FontAwesomeIcon icon={faCheckCircle} /> Comprueba si has completado tu tarea</a></li>
               <div id="buscar" className='buscar-tarea' > 
                <input 
                type="text" value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar tarea" 
                onKeyDown={(e) => handleKeyPress(e)}
                /> 
                <button id='buscador' onClick={buscarTarea}> 
                  <FontAwesomeIcon icon={faSearch} /> 
                  </button> {searchResults.length > 0 && ( 
                    <ul className="Lista-tareas"> 
                    {searchResults.map((tarea, index) => (
                       <li key={tarea.id} 
                       style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}> 
                       <input id='checkbox' type="checkbox" checked={tarea.completada} onChange={() => CompletarTarea(index, true)} /> 
                       {tarea.título} 
                        </li> ))}
                            </ul> )} 
                            </div>

              <li><a href="#" data-target="Tareas" onClick={handleToggle}>
                <FontAwesomeIcon icon={faListCheck} /> Elimina tareas completadas o editalas</a>
                </li> 
                <div id="Tareas" className="To-do-section show">
                   <h1>Lista de tareas</h1>
                 <ul className="Lista-tareas"> 
                  {tareas.map((tarea, index) => ( 
                  <li key={tarea.id} style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}> 
                  <input id='checkbox' type="checkbox" checked={tarea.completada} onChange={() => CompletarTarea(index)} />
                   {tarea.título} 
                   <button className="edit-button" onClick={() => editarTarea(index)} style={{ margin: '10px' }}> 
                    <FontAwesomeIcon icon={faEdit} /> </button>
                 <button className="delete-button" onClick={() => eliminarTarea(index)} style={{ margin: '10px' }}>
                          <FontAwesomeIcon icon={faTrash} />
                 </button>
                    </li>
                    ))}
                  </ul>
              </div>
            </ul>
          </nav>
        </div>

        {/* Modal para Editar Tarea */} 
        <div className={`modal ${isModalVisible ? 'show' : ''}`}> 
          <div className="modal-content"> 
            <span className="close" onClick={() => 
              setIsModalVisible(false)}>&times;
              </span> 
              <h2>Me puedes editar aquí</h2> 
              <input type="text" value={modalInput} onChange={(e) => 
                setModalInput(e.target.value)} placeholder="Cambia mi título" 
                required /> 
                <button onClick={actualizarTarea}>Actualizar</button> 
                </div> 
              </div> 
        </body>
    </div>
  );  
}

export default App;
