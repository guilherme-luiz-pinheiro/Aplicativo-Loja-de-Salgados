// services/produtos.js
import { getDbConnection } from './database';


export async function obtemTodosProdutos() {
    let dbCx;
    try {
        dbCx = await getDbConnection();
        if (!dbCx) throw new Error("Falha ao obter conexão com o banco de dados.");

        const categorias = await dbCx.getAllAsync('SELECT * FROM tbProdutos');
        
        // Retorna os dados e mantém a conexão aberta para futuras operações
        return categorias;
    } catch (error) {
        console.error("Erro ao obter Produtos:", error);
        return [];
    }
}
export async function adicionarProduto(produto) {
    let dbCx = await getDbConnection();
    try {
        const query = 'INSERT INTO tbProdutos (produto, descricao, categoria, precoUnitario) VALUES (?,?,?,?)';
        const result = await dbCx.runAsync(query, [produto.produto, produto.descricao, produto.categoria, produto.precoUnitario]);
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

