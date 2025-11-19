const pool = require('../config/database');

class Ejercicio {
    static async obtenerTodos(grupo_muscular = null) {
        try {
            let query = 'SELECT * FROM ejercicios';
            let params = [];

            if (grupo_muscular) {
                query += ' WHERE grupo_muscular = ?';
                params.push(grupo_muscular);
            }

            query += ' ORDER BY nombre';

            const [ejercicios] = await pool.execute(query, params);
            return ejercicios;
        } catch (error) {
            throw error;
        }
    }

    static async buscarPorId(id_ejercicio) {
        try {
            const [ejercicios] = await pool.execute(
                'SELECT * FROM ejercicios WHERE id_ejercicio = ?',
                [id_ejercicio]
            );
            return ejercicios[0];
        } catch (error) {
            throw error;
        }
    }

    static async crear(nombre, grupo_muscular, descripcion, imagen_url) {
        try {
            const [result] = await pool.execute(
                'INSERT INTO ejercicios (nombre, grupo_muscular, descripcion, imagen_url) VALUES (?, ?, ?, ?)',
                [nombre, grupo_muscular, descripcion, imagen_url]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async actualizar(id_ejercicio, nombre, grupo_muscular, descripcion, imagen_url) {
        try {
            const [result] = await pool.execute(
                'UPDATE ejercicios SET nombre = ?, grupo_muscular = ?, descripcion = ?, imagen_url = ? WHERE id_ejercicio = ?',
                [nombre, grupo_muscular, descripcion, imagen_url, id_ejercicio]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async eliminar(id_ejercicio) {
        try {
            const [result] = await pool.execute(
                'DELETE FROM ejercicios WHERE id_ejercicio = ?',
                [id_ejercicio]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Ejercicio;