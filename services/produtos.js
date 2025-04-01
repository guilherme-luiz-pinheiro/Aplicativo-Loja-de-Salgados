// services/produtos.js
import { getDbConnection } from './database';

export async function obtemTodosProdutos() {
    let dbCx = await getDbConnection();
    try {
        const registros = await dbCx.getAllAsync(
            'SELECT tbProdutos.codigo, tbProdutos.produto, tbProdutos.descricao, tbProdutos.precoUnitario, tbCategorias.categoria FROM tbProdutos INNER JOIN tbCategorias ON tbProdutos.categoria = tbCategorias.codigo'
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

export async function alterarProduto(produto) {
    let dbCx = await getDbConnection();
    try {
        const query = 'UPDATE tbProdutos SET produto=?, descricao=?, categoria=?, precoUnitario=? WHERE codigo=?';
        const result = await dbCx.runAsync(query, [produto.produto, produto.descricao, produto.categoria, produto.precoUnitario, produto.codigo]);
        return result.changes === 1;
    } catch (error) {
        console.error(error);
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
