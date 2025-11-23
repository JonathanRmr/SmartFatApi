const pool = require('../config/database');

class Historial {
    static async obtenerPorEjercicio(id_usuario, id_ejercicio) {
        try {
            const [historial] = await pool.execute(
                `SELECT h.*, e.nombre as ejercicio_nombre 
                FROM historial_pesos h 
                JOIN ejercicios e ON h.id_ejercicio = e.id_ejercicio 
                WHERE h.id_usuario = ? AND h.id_ejercicio = ? 
                ORDER BY h.fecha_registro DESC`,
                [id_usuario, id_ejercicio]
            );
            return historial;
        } catch (error) {
            throw error;
        }
    }

    static async obtenerProgresoGeneral(id_usuario) {
        try {
            const [progreso] = await pool.execute(
                `SELECT e.nombre as ejercicio, 
                                e.id_ejercicio,
                                MAX(h.peso_usado) as peso_maximo,
                                MIN(h.peso_usado) as peso_minimo,
                                AVG(h.peso_usado) as peso_promedio,
                                COUNT(*) as veces_realizado,
                                MAX(h.fecha_registro) as ultima_vez
                 FROM historial_pesos h
                 JOIN ejercicios e ON h.id_ejercicio = e.id_ejercicio
                 WHERE h.id_usuario = ?
                 GROUP BY h.id_ejercicio, e.nombre
                 ORDER BY e.nombre`,
                [id_usuario]
            );
            return progreso;
        } catch (error) {
            throw error;
        }
    }

    static async obtenerEstadisticas(id_usuario) {
        try {
            const [stats] = await pool.execute(
                `SELECT 
                    COUNT(DISTINCT r.id_rutina) as total_rutinas,
                    COUNT(DISTINCT s.id_ejercicio) as ejercicios_diferentes,
                    COUNT(s.id_serie) as total_series,
                    SUM(s.repeticiones) as total_repeticiones,
                    MAX(s.fecha) as ultima_sesion
                 FROM rutinas r
                 LEFT JOIN series s ON r.id_rutina = s.id_rutina
                 WHERE r.id_usuario = ?`,
                [id_usuario]
            );
            return stats[0];
        } catch (error) {
            throw error;
        }
    }

    static async obtenerHistorialCompleto(id_usuario, limite = 50) {
        try {
            // Asegurarse de que limite sea un número entero
            const limiteInt = parseInt(limite, 10);
            
            // Usar query() en lugar de execute() para LIMIT con valor variable
            const [historial] = await pool.query(
                `SELECT h.*, e.nombre as ejercicio_nombre, e.grupo_muscular
                 FROM historial_pesos h
                 JOIN ejercicios e ON h.id_ejercicio = e.id_ejercicio
                 WHERE h.id_usuario = ?
                 ORDER BY h.fecha_registro DESC
                 LIMIT ?`,
                [id_usuario, limiteInt]
            );
            return historial;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Historial;