const Usuario = require('../models/Usuario');

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