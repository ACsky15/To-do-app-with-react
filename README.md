# To-do-app-with-react

Ejecución del proyecto

- Deben de tener Node.js instalado en su computadora.
- Todas las dependencias necesarias están en los archivos package.json y node_modules.
- Deben crear un folder a donde descargar el proyecto antes de copiar el repositorio a Visual Studio.
- Asegurese de que el backend este corriendo en el puerto 5000, escriba en la terminal del folder back-end el siguiente comando node api.js y le dirá en cual puerto está corriendo, corra npm start para iniciar el servidor.
- Esta es la única dirección en la que podrá encontrar funcionando la api: http://localhost:5000/tareas no funciona en  http://localhost:5000 sólo.
- Para iniciar la app del lado del front end deben de abir la terminal en el folder que contiene todo el front-end, se llama así mismo front-end, corra el siguiente comando npm run start, esto abrirá en su navegador predeterminado la siguiente url: http://localhost:3000/ , entonces podrá interactuar con la app.

Funcionamiento de la app

Al entrar a la aplicación web verán 3 botones y un buscador:
- Añadir tarea: al hacer clic en el botón añadir tarea aparecen dos botones Añadir y Cancelar:
  -De querer añadir una tarea deben colocar el nombre de la tarea en la entrada por teclado 'Añadir tarea'.
  -De querer cancelar la acción de añadir tarea debe hacer clic en el botón cancelar.
- Buscador:
  El buscador no busca al hacer clic a enter deben presionar el botón en forma de lupa para buscar:
    - Esta acción arroja dos resultados, el primero es un cuadro de diálogo diciendo que la tarea no se encontró si la tarea introducida en el buscador no está en el Json con la lista de tareas añadidas, el segundo     resultado es que la tarea ha sido encontrada; se mostrara toda la lista de tareas y se señalara con un hightlight gris la tarea encontrada, esto le permitira inmediatamente encontrarla y borrarla si sabe que        anotó muchas tareas y esa ya la completó.
- Mostrar/ ocultar tareas:
  Por default al abrir la aplicación las tareas están ocultas, si quiere ver su lista de tareas debe presionar el botón Mostrar Tareas, si las quiere volver a ocultar debe presionar el botón de nuevo, el botón ya no dira mostrar tarea después de haberlo presionado (no importa si hay o no tareas almacenadas, su estado cambiará a ocultar tareas) de modo que si te mostró tareas y las quieres volver a ocultar, las ocultes al presionar Ocultar Tareas.
  
