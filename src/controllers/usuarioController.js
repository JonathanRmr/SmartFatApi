const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

const usuarioController = {
    async obtenerPerfil(req, res) {
        try {
            const usuario = await Usuario.buscarPorId(req.user.id_usuario);

            if (!usuario) {
                return res.status(404).json({ 
                    error: 'Usuario no encontrado' 
                });
            }

            res.json(usuario);
        } catch (error) {
            console.error('Error en obtenerPerfil:', error);
            res.status(500).json({ 
                error: 'Error al obtener perfil' 
            });
        }
    },

    async actualizarPerfil(req, res) {
        try {
            const { nombre, edad, peso_actual, altura } = req.body;

            // Validaciones
            if (!nombre) {
                return res.status(400).json({ 
                    error: 'El nombre es obligatorio' 
                });
            }

            if (edad && (edad < 0 || edad > 150)) {
                return res.status(400).json({ 
                    error: 'Edad inválida' 
                });
            }

            if (peso_actual && (peso_actual < 0 || peso_actual > 500)) {
                return res.status(400).json({ 
                    error: 'Peso inválido' 
                });
            }

            if (altura && (altura < 0 || altura > 3)) {
                return res.status(400).json({ 
                    error: 'Altura inválida' 
                });
            }

            await Usuario.actualizar(
                req.user.id_usuario, 
                nombre, 
                edad, 
                peso_actual, 
                altura
            );

            res.json({ 
                message: 'Perfil actualizado exitosamente' 
            });
        } catch (error) {
            console.error('Error en actualizarPerfil:', error);
            res.status(500).json({ 
                error: 'Error al actualizar perfil' 
            });
        }
    },

    async cambiarContrasena(req, res) {
        try {
            const { contraseña_actual, contraseña_nueva } = req.body;

            // Validaciones
            if (!contraseña_actual || !contraseña_nueva) {
                return res.status(400).json({ 
                    error: 'Contraseña actual y nueva son obligatorias' 
                });
            }

            if (contraseña_nueva.length < 6) {
                return res.status(400).json({ 
                    error: 'La nueva contraseña debe tener al menos 6 caracteres' 
                });
            }

            // Obtener usuario con contraseña
            const pool = require('../config/database');
            const [users] = await pool.execute(
                'SELECT contraseña FROM usuarios WHERE id_usuario = ?',
                [req.user.id_usuario]
            );

            if (users.length === 0) {
                return res.status(404).json({ 
                    error: 'Usuario no encontrado' 
                });
            }

            // Verificar contraseña actual
            const isValidPassword = await bcrypt.compare(contraseña_actual, users[0].contraseña);
            if (!isValidPassword) {
                return res.status(401).json({ 
                    error: 'La contraseña actual es incorrecta' 
                });
            }

            // Encriptar nueva contraseña
            const hashedPassword = await bcrypt.hash(contraseña_nueva, 10);

            // Actualizar contraseña
            await Usuario.actualizarContraseña(req.user.id_usuario, hashedPassword);

            res.json({ 
                message: 'Contraseña actualizada exitosamente' 
            });
        } catch (error) {
            console.error('Error en cambiarContrasena:', error);
            res.status(500).json({ 
                error: 'Error al cambiar contraseña' 
            });
        }
    },

    async eliminarCuenta(req, res) {
        try {
            await Usuario.eliminar(req.user.id_usuario);

            res.json({ 
                message: 'Cuenta eliminada exitosamente' 
            });
        } catch (error) {
            console.error('Error en eliminarCuenta:', error);
            res.status(500).json({ 
                error: 'Error al eliminar cuenta' 
            });
        }
    }
};

module.exports = usuarioController;