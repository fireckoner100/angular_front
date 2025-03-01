# 🚀 AngularApp

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 19.1.0.

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

- **Node.js** (Recomendado: v18 o superior) - [Descargar Node.js](https://nodejs.org/)
- **npm** (v9 o superior) - Se instala con Node.js
- **Angular CLI** (Recomendado: v19 o superior) - Instálalo globalmente con:
  ```sh
  npm install -g @angular/cli
  
## 📂 Instalación y Configuración

### 1️⃣ Clona el Repositorio

```
git clone https://github.com/fireckoner100/angular_front.git
cd angular_front
```

### 2️⃣ Instala las Dependencias

```
npm install
```

### 3️⃣ Configura la Ruta del API
Antes de ejecutar el proyecto, actualiza la URL del API en los servicios para que apunten al servidor correcto.<br>
📌 Ubicación: src/app/services/ <br>
Ejemplo en users.service.ts:
```
private API_URL = 'https://TU_API_URL_AQUI/api';
```

### 4️⃣ Ejecuta el Servidor de Desarrollo
```
ng serve
```

Listo con estos simples pasos, ya tienes tu aplicación en Angular corriendo  