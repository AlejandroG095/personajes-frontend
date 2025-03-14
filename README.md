# Frontend - Gestión de Personajes

Este es el frontend de la aplicación de gestión de personajes, desarrollado con React.

## Tecnologías Utilizadas
- React
- JavaScript (ES6+)
- HTML / CSS
- Axios (para peticiones HTTP)
- React Router (navegación)

## Estructura del Proyecto
```
/frontend
  ├── src
  │     ├── assets
  │     ├── components
  │     ├── pages
  │     ├── services
  │     ├── utils
  ├── public
  ├── package.json
```

## Instalación y Configuración
### Prerrequisitos
1. Tener instalado **Node.js** (recomendado v16 o superior).

### Instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/AlejandroG095/personajes-frontend.git
   ```
2. Ir al directorio del frontend:
   ```bash
   cd personajes-frontend
   ```
3. Instalar las dependencias:
   ```bash
   npm install
   ```


### Ejecución
Para iniciar el servidor de desarrollo:
```bash
npm start
```
El frontend estará disponible en `http://localhost:3000`.

## Conexión con el Backend
El frontend se comunica con el backend a través de Axios. Se debe configurar la URL base de la API en el archivo de servicios.

## Mejoras Futuras
- Implementar autenticación con JWT.
- Mejorar la interfaz gráfica con un diseño más atractivo.
- Agregar validaciones avanzadas en los formularios.

