# To-do-app-with-react

Ejecución del proyecto

- Deben de tener Node.js instalado en su computadora.
- Todas las dependencias necesarias están en los archivos package.json y node_modules.
- Deben crear un folder a donde descargar el proyecto antes de copiar el repositorio a Visual Studio.
- Asegurese de que el backend este corriendo en el puerto 5000, escriba en la terminal del folder back-end el siguiente comando node api.js y le dirá en cual puerto está corriendo, corra npm start para iniciar el servidor.
- Esta es la única dirección en la que podrá encontrar funcionando la api: http://localhost:5000/tareas sólo, no funciona en http://localhost:5000.
- Para iniciar la app del lado del front end deben de abir la terminal en el folder que contiene todo el front-end, se llama así mismo front-end, corra el siguiente comando npm run start, esto abrirá en su navegador predeterminado la siguiente url: http://localhost:3000/ , entonces podrá interactuar con la app.

Funcionamiento de la app

Al entrar a la aplicación web verá un menú de acordeón o menú desplegable con 3 enlaces:

El primer enlance contiene la función de crear una lista de tarea, al hacer clic en el botón con signo de más este desaparece y aparece lo siguiente:
- un input para ecribir el nombre de la tarea, un botón para concretar la opción de añadir y otro para cancelar la acción:
  
El segundo enlace te permite comprobar si has completado una tarea, tiene el input del buscador y una lupa como botón de buscar, también funciona al hacer clic en enter:
    - Esta acción arroja dos resultados, el primero es un cuadro de diálogo diciendo que la tarea no se encontró si la tarea introducida en el buscador no está en el Json con la lista de tareas añadidas, el segundo     resultado es que la tarea ha sido encontrada; se mostrará la tarea y podrás tacharla si ya la completaste o tambien puedes verificar si ya la completaste en este caso se verá tachada y marcada como realizada

El tercer enlace te permite después de un largo día de completar tareas ver todas las que marcaste como completadas y las que no para entonces eliminarlas o editar su título o desmarcarlas si por error la marcaste como completada.
  
