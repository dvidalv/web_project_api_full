# Tripleten web_project_around_express

# Proyecto Web Express

# Aplicación de Tarjetas y Usuarios

Esta es una aplicación de backend que permite a los usuarios crear, leer, actualizar y eliminar tarjetas y usuarios. La aplicación está construida con Node.js, Express y MongoDB.

## Instalación

Para instalar y ejecutar esta aplicación, necesitarás tener Node.js y MongoDB instalados en tu máquina.

1. Clona este repositorio en tu máquina local.
2. Navega hasta el directorio del proyecto.
3. Ejecuta `npm install` para instalar todas las dependencias del proyecto.
4. Inicia el servidor MongoDB en tu máquina.
5. Ejecuta `npm start` para iniciar la aplicación.

## Uso

La aplicación expone las siguientes rutas:

### Usuarios

- `GET /users`: Devuelve todos los usuarios.
- `GET /users/:id`: Devuelve información sobre un usuario específico.
- `POST /users`: Crea un nuevo usuario.
- `DELETE /users/:id`: Elimina un usuario.
- `PATCH /users/me`: Actualiza el perfil del usuario.
- `PATCH /users/me/avatar`: Actualiza el avatar del usuario.

### Tarjetas

- `GET /cards`: Devuelve todas las tarjetas.
- `POST /cards`: Crea una nueva tarjeta.
- `GET /cards/:cardId`: Devuelve una tarjeta por su id.
- `DELETE /cards/:cardId`: Elimina una tarjeta.
- `PUT /cards/:cardId/likes`: Da "like" a una tarjeta.
- `DELETE /cards/:cardId/likes`: Quita el "like" a una tarjeta.

## Modelos de Datos

La aplicación utiliza dos modelos de datos principales: `User` y `Card`.

### User

Un usuario tiene los siguientes campos:

- `name`: Nombre del usuario (cadena de texto, requerido, entre 2 y 30 caracteres).
- `about`: Información sobre el usuario (cadena de texto, requerido, entre 2 y 30 caracteres).
- `avatar`: URL del avatar del usuario (cadena de texto, requerido, debe ser una URL válida).

### Card

Una tarjeta tiene los siguientes campos:

- `name`: Nombre de la tarjeta (cadena de texto, requerido, entre 2 y 30 caracteres).
- `link`: URL de la tarjeta (cadena de texto, requerido, debe ser una URL válida).
- `owner`: ID del usuario que creó la tarjeta (ObjectId, requerido).
- `likes`: Array de IDs de usuarios que han dado "like" a la tarjeta (array, por defecto vacío).
- `createdAt`: Fecha de creación de la tarjeta (fecha, por defecto la fecha actual).

## Contribución

Si deseas contribuir a este proyecto, por favor, haz un fork del repositorio y envía un pull request con tus cambios. Todos los pull requests serán revisados y considerados.

## Licencia

Esta aplicación está bajo la licencia MIT.

## Nota

Este proyecto está en desarrollo. Para fines de depuración, se han dejado algunas declaraciones de `console.log` y `console.error` en el código. Estas pueden ser ignoradas por ESLint utilizando la directiva `// eslint-disable-next-line no-console`.

## Imagenes

![GetAllCards]('https://private-user-images.githubusercontent.com/78663408/292791435-9e0ad15c-16ef-495b-ba76-19fa608e21f0.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDM1NTczMDIsIm5iZiI6MTcwMzU1NzAwMiwicGF0aCI6Ii83ODY2MzQwOC8yOTI3OTE0MzUtOWUwYWQxNWMtMTZlZi00OTViLWJhNzYtMTlmYTYwOGUyMWYwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzEyMjYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMjI2VDAyMTY0MlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTg2MjZhYmUzY2M4OTc5M2VlYjQwZjBmNDBmNTA2YTVkNjE4NjVlMGQ1OGZlYmZjYjgyMDM1ODczNGU5MmE5YjEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.HND66T4UFLTV5feZQpE7oG5X0auRYjI2MnZXUPZjohk')
