## Requisitos

- Node.js (versión 14 o superior)
- MySQL
- Redis

## Instalación

1. Instala las dependencias:

```sh
npm install
```

2. Crea un archivo .env en la raíz del proyecto y llena las variables de entorno según el archivo example.env

```
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=ludik_todo_db
CORS_ORIGIN='http://localhost:3000'
REDIS_URL=redis://localhost:6379
```

3. Ejecuta el script SQL ubicado en scripts/1.sql

## Ejecución

Para ejecutar el proyecto en modo de desarrollo, utiliza el siguiente comando:

```
npx ts-node src/app.ts
```

Si sale exitoso, mostrará un mensaje en la consola indicando que el server esta escuchando el puerto 4000.

## Decisiones Técnicas

### Estructura del Proyecto

El proyecto sigue una estructura modular para mantener el código organizado y fácil de mantener. Los módulos están organizados en carpetas bajo `src/modules`, y cada módulo contiene sus propios controladores, servicios, repositorios, entidades, DTOs y validadores. Se ha intentado seguir una estructura similar a la propuesto por NestJS.

### Uso de TypeORM

TypeORM se utiliza como ORM para interactuar con la base de datos MySQL. Se eligió TypeORM por su compatibilidad con TypeScript y su capacidad para trabajar con diferentes bases de datos.

### Almacenamiento en Caché con Redis

Redis se utiliza para almacenar en caché las respuestas de las solicitudes GET a `/tasks`. Esto mejora el rendimiento al reducir la carga en la base de datos. El caché se invalida cada vez que se crea, actualiza o elimina una tarea.

### Implementación de Patron Proxy

Se ha implementado el patron proxy en `src/modules/tasks/repositories/task.repository.proxy.ts` debido al uso de cache.

### Validación de Solicitudes

Se utiliza `express-validator` para validar las solicitudes entrantes. Los validadores están definidos en `src/modules/tasks/validators/task.validators.ts` y se aplican en las rutas correspondientes.

### Seguridad

Se utiliza `helmet` para configurar encabezados HTTP seguros, incluyendo Content Security Policy (CSP), para proteger la aplicación contra ataques comunes como Cross-Site Scripting (XSS) y Clickjacking.

### Manejo de Errores

Se utiliza un middleware de manejo de errores (`src/middlewares/error.middleware.ts`) para capturar y manejar errores de manera centralizada. Esto asegura que los errores se manejen de manera consistente en toda la aplicación.