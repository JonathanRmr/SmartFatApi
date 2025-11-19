const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./src/routes/authRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const ejercicioRoutes = require('./src/routes/ejercicioRoutes');
const rutinaRoutes = require('./src/routes/rutinaRoutes');
const serieRoutes = require('./src/routes/serieRoutes');
const historialRoutes = require('./src/routes/historialRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/ejercicios', ejercicioRoutes);
app.use('/api/rutinas', rutinaRoutes);
app.use('/api/series', serieRoutes);
app.use('/api/historial', historialRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        message: 'API de Gimnasio',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            ejercicios: '/api/ejercicios',
            rutinas: '/api/rutinas',
            series: '/api/series',
            historial: '/api/historial'
        }
    });
});

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'API funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Ruta no encontrada' 
    });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        message: err.message 
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════╗
║   🏋️  API GIMNASIO INICIADA 🏋️        ║
╠══════════════════════════════════════╣
║  Servidor: http://localhost:${PORT}    ║
║  Ambiente: ${process.env.NODE_ENV || 'development'}              ║
╠══════════════════════════════════════╣
║  Endpoints disponibles:              ║
║  • POST /api/auth/register           ║
║  • POST /api/auth/login              ║
║  • GET  /api/usuarios/perfil         ║
║  • GET  /api/ejercicios              ║
║  • GET  /api/rutinas                 ║
║  • POST /api/series                  ║
║  • GET  /api/historial/progreso      ║
╚══════════════════════════════════════╝
    `);
});