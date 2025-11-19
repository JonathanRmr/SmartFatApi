const Historial = require('../models/Historial');

const historialController = {
    async obtenerPorEjercicio(req, res) {
        try {
            const historial = await Historial.obtenerPorEjercicio(
                req.user.id_usuario, 
                req.params.id_ejercicio
            );

            res.json(historial);
        } catch (error) {
            console.error('Error en obtenerPorEjercicio:', error);
            res.status(500).json({ 
                error: 'Error al obtener historial' 
            });
        }
    },

    async obtenerProgresoGeneral(req, res) {
        try {
            const progreso = await Historial.obtenerProgresoGeneral(req.user.id_usuario);
            res.json(progreso);
        } catch (error) {
            console.error('Error en obtenerProgresoGeneral:', error);
            res.status(500).json({ 
                error: 'Error al obtener progreso' 
            });
        }
    },

    async obtenerEstadisticas(req, res) {
        try {
            const estadisticas = await Historial.obtenerEstadisticas(req.user.id_usuario);
            res.json(estadisticas);
        } catch (error) {
            console.error('Error en obtenerEstadisticas:', error);
            res.status(500).json({ 
                error: 'Error al obtener estadísticas' 
            });
        }
    },

    async obtenerHistorialCompleto(req, res) {
        try {
            const limite = parseInt(req.query.limite) || 50;
            
            if (limite > 200) {
                return res.status(400).json({ 
                    error: 'El límite máximo es 200 registros' 
                });
            }

            const historial = await Historial.obtenerHistorialCompleto(
                req.user.id_usuario, 
                limite
            );
            
            res.json(historial);
        } catch (error) {
            console.error('Error en obtenerHistorialCompleto:', error);
            res.status(500).json({ 
                error: 'Error al obtener historial completo' 
            });
        }
    }
};

module.exports = historialController;