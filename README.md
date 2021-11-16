
███████╗██╗ ██████╗██╗  ██╗ █████╗      ██╗███████╗
██╔════╝██║██╔════╝██║  ██║██╔══██╗     ██║██╔════╝
█████╗  ██║██║     ███████║███████║     ██║█████╗  
██╔══╝  ██║██║     ██╔══██║██╔══██║██   ██║██╔══╝  
██║     ██║╚██████╗██║  ██║██║  ██║╚█████╔╝███████╗
╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝ ╚══════╝
                                                   
Requisitos:
Para que funcionen los scripts .bat, en el package.json deben aparecer dentro de scripts:
    "start": "node fichar.js"

Para fichar por las mañanas de forma automatica:
1. Hacer un run de "shell:startup"
2. Copiar dentro el fichero /scripts/start_up.bat. Después revisar des del Administrador de tareas, que en la pestaña Inicio se ha creado el start_up.bat y está habilitado
3. Explicación detallada: https://www.youtube.com/watch?v=nF9TiL34FT0
4. Cada vez que se inicie el PC deberia realizar el fichaje de forma automatica

Para fichar por las tardes de forma automatica:
1. Crear tarea programada para que se realize el fichaje todas las tareas, de lunes a jueves a las 18:00 y los viernes a las 15:00.
2. En la tarea programada, agregar el fichero /scripts/fichaje_end.bat
TODO: Probar si con la tarea programada arranca automaticamente el PC? En caso afirmativo, el start_up.bat se puede reemplazar y usar también para las mañanas el fichaje_end.bat


███████╗ ██████╗██████╗  █████╗ ██████╗ ██████╗ ███████╗██████╗ 
██╔════╝██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗
███████╗██║     ██████╔╝███████║██████╔╝██████╔╝█████╗  ██████╔╝
╚════██║██║     ██╔══██╗██╔══██║██╔═══╝ ██╔═══╝ ██╔══╝  ██╔══██╗
███████║╚██████╗██║  ██║██║  ██║██║     ██║     ███████╗██║  ██║
╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝     ╚══════╝╚═╝  ╚═╝
                                                                
                             
                             
                             
                             
                             
                             
                             
                             
                             
