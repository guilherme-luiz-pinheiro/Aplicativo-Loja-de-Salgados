// services/produtos.js
import { getDbConnection } from './database';

export async function obtemTodosProdutos() {
    let dbCx = await getDbConnection();
    try {
        const registros = await dbCx.getAllAsync(
            'SELECT codigo, produto, descricao, precoUnitario FROM tbProdutos'
        );
        return registros;
    } catch (error) {
        console.error(error);
        return [];
    } finally {
        await dbCx.closeAsync();
    }
}


export async function adicionarProduto(produto) {
    let dbCx = await getDbConnection();
    try {
        const query = 'INSERT INTO tbProdutos (codigo, produto, descricao, categoria, precoUnitario) VALUES (?,?,?,?,?)';
        const result = await dbCx.runAsync(query, [produto.codigo, produto.produto, produto.descricao, produto.categoria, produto.precoUnitario]);
        return result.changes === 1;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await dbCx.closeAsync();
    }
}

export async function alterarProduto({ codigo, produto, descricao, categoria, precoUnitario }) {
    let dbCx = await getDbConnection();
    try {
        const query = 'UPDATE tbProdutos SET produto=?, descricao=?, categoria=?, precoUnitario=? WHERE codigo=?';
        const result = await dbCx.runAsync(query, [produto, descricao, categoria, precoUnitario, codigo]);
        return result.changes === 1; // Verifica se a atualização foi bem-sucedida
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        return false;
    } finally {
        await dbCx.closeAsync();
    }
}


export async function excluirProduto(codigo) {
    let dbCx = await getDbConnection();
    try {
        const query = 'DELETE FROM tbProdutos WHERE codigo=?';
        const result = await dbCx.runAsync(query, [codigo]);
        return result.changes === 1;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await dbCx.closeAsync();
    }
}

