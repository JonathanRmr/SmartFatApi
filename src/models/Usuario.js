const pool = require('../config/database');

class Usuario {
    static async crear(nombre, correo, contraseña, edad, peso_actual, altura) {
        try {
            const [result] = await pool.execute(
                'INSERT INTO usuarios (nombre, correo, contraseña, edad, peso_actual, altura) VALUES (?, ?, ?, ?, ?, ?)',
                [nombre, correo, contraseña, edad, peso_actual, altura]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async buscarPorCorreo(correo) {
        try {
            const [users] = await pool.execute(
                'SELECT * FROM usuarios WHERE correo = ?',
                [correo]
            );
            return users[0];
        } catch (error) {
            throw error;
        }
    }

    static async buscarPorId(id_usuario) {
        try {
            const [users] = await pool.execute(
                'SELECT id_usuario, nombre, correo, edad, peso_actual, altura FROM usuarios WHERE id_usuario = ?',
                [id_usuario]
            );
            return users[0];
        } catch (error) {
            throw error;
        }
    }

    static async actualizar(id_usuario, nombre, edad, peso_actual, altura) {
        try {
            const [result] = await pool.execute(
                'UPDATE usuarios SET nombre = ?, edad = ?, peso_actual = ?, altura = ? WHERE id_usuario = ?',
                [nombre, edad, peso_actual, altura, id_usuario]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Nuevo método para actualizar contraseña
    static async actualizarContraseña(id_usuario, contraseña_hash) {
        try {
            const [result] = await pool.execute(
                'UPDATE usuarios SET contraseña = ? WHERE id_usuario = ?',
                [contraseña_hash, id_usuario]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async eliminar(id_usuario) {
        try {
            const [result] = await pool.execute(
                'DELETE FROM usuarios WHERE id_usuario = ?',
                [id_usuario]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Usuario;