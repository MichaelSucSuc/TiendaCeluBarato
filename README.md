# Celubarato (Fullstack)

Aplicación web para tienda de iPhones y MacBooks usados/refurbished verificados.

## Estructura

```text
celubarato/
├── backend/
│   ├── config/
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Admin.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── products.js
│   ├── scripts/
│   │   └── initDb.js
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── AdminLogin.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── App.jsx
    │   └── index.js
    ├── tailwind.config.js
    └── package.json
```

## Credenciales de administrador

- **Email:** `admin@celubarato.com`
- **Contraseña:** `N9$kQ2!vLm@7`
- **Hash bcrypt:** `$2b$12$YXxrBy2Kc/8nhaWbDTe2tOJKhav.MH4ruBuaXXs04KZWQ39gXLFgy`

> No existe registro público. Solo este usuario admin puede iniciar sesión.

## Backend (Node.js + Express + MongoDB)

### Endpoints

- `POST /api/auth/login` (admin)
- `GET /api/products` (público)
- `GET /api/products/:id` (público)
- `POST /api/products` (solo admin, JWT)
- `PUT /api/products/:id` (solo admin, JWT)
- `DELETE /api/products/:id` (solo admin, JWT)

### Variables de entorno

Crear archivo `celubarato/backend/.env` basado en `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/celubarato
JWT_SECRET=REEMPLAZA_CON_UN_SECRETO_LARGO_Y_SEGURO
ADMIN_PASSWORD_HASH=$2b$12$YXxrBy2Kc/8nhaWbDTe2tOJKhav.MH4ruBuaXXs04KZWQ39gXLFgy
```

### Instalación y ejecución backend

```bash
cd celubarato/backend
npm install
npm run init-db
npm run dev
```

### Comando para insertar hash bcrypt manualmente (MongoDB)

```bash
mongosh "mongodb://127.0.0.1:27017/celubarato" --eval 'db.admins.updateOne({email:"admin@celubarato.com"},{$set:{email:"admin@celubarato.com",passwordHash:"$2b$12$YXxrBy2Kc/8nhaWbDTe2tOJKhav.MH4ruBuaXXs04KZWQ39gXLFgy"}},{upsert:true})'
```

## Frontend (React + TailwindCSS)

Paleta implementada:

- Primario `#0A66C2`
- Secundario `#00E676`
- Acento `#FF6B00`
- Fondo oscuro `#1E1E1E`
- Gris claro `#E0E0E0`
- Texto principal `#333333`
- Texto secundario `#666666`

### Variables de entorno frontend

Crear archivo `celubarato/frontend/.env` basado en `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

### Instalación y ejecución frontend

```bash
cd celubarato/frontend
npm install
npm run dev
```

## Flujo recomendado

1. Levanta MongoDB local.
2. Ejecuta backend (`npm run init-db` y `npm run dev`).
3. Ejecuta frontend (`npm run dev`).
4. Abrir `http://localhost:5173`.
5. Login admin en `http://localhost:5173/admin/login` con las credenciales anteriores.

## Seguridad implementada

- JWT obligatorio para crear/editar/eliminar productos.
- Middleware de autorización para rutas admin.
- Rate limiting en API y login para mitigar abuso y fuerza bruta.
- Logout elimina token del `localStorage`.
- El usuario admin está fijado en backend (`admin@celubarato.com`) y sin endpoint de registro.
