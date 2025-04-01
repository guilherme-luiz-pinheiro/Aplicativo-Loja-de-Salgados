// services/categorias.js
import { getDbConnection } from './database';

export async function obtemTodasCategorias() {
    let dbCx = await getDbConnection();
    try {
        return await dbCx.getAllAsync('SELECT * FROM tbCategorias');
    } catch (error) {
        console.error(error);
        return [];
    } finally {
        await dbCx.closeAsync();
    }
}

export async function adicionarCategoria(categoria) {
    let dbCx = await getDbConnection();
    try {
        const query = 'INSERT INTO tbCategorias (codigo, categoria) VALUES (?,?)';
        const result = await dbCx.runAsync(query, [categoria.codigo, categoria.categoria]);
        return result.changes === 1;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await dbCx.closeAsync();
    }
}

export async function alterarCategoria(categoria) {
    let dbCx = await getDbConnection();
    try {
        const query = 'UPDATE tbCategorias SET categoria=? WHERE codigo=?';
        // Corrigido: o segundo parâmetro deve ser categoria.codigo
        const result = await dbCx.runAsync(query, [categoria.categoria, categoria.codigo]);
        return result.changes === 1;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await dbCx.closeAsync();
    }
}

export async function excluirCategoria(codigo) {
    let dbCx = await getDbConnection();
    try {
        const query = 'DELETE FROM tbCategorias WHERE codigo=?';
        const result = await dbCx.runAsync(query, [codigo]);
        return result.changes === 1;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await dbCx.closeAsync();
    }
}
