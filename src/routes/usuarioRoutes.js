const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { authenticateToken } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// GET /api/usuarios/perfil - Obtener perfil del usuario
router.get('/perfil', usuarioController.obtenerPerfil);

// PUT /api/usuarios/perfil - Actualizar perfil del usuario
router.put('/perfil', usuarioController.actualizarPerfil);

// DELETE /api/usuarios/cuenta - Eliminar cuenta del usuario
router.delete('/cuenta', usuarioController.eliminarCuenta);

module.exports = router;