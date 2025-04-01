// services/vendas.js
import { getDbConnection } from './database';

export async function obtemTodasVendas() {
    let dbCx = await getDbConnection();
    try {
        const registros = await dbCx.getAllAsync(
            'SELECT tbVendas.codigo, tbVendas.quantidade, tbProdutos.produto FROM tbVendas INNER JOIN tbProdutos ON tbVendas.produto = tbProdutos.codigo'
        );
        return registros;
    } catch (error) {
        console.error(error);
        return [];
    } finally {
        await dbCx.closeAsync();
    }
}

export async function adicionarVenda(venda) {
    let dbCx = await getDbConnection();
    try {
        const query = 'INSERT INTO tbVendas (codigo, quantidade, produto) VALUES (?,?,?)';
        const result = await dbCx.runAsync(query, [venda.codigo, venda.quantidade, venda.produto]);
        return result.changes === 1;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await dbCx.closeAsync();
    }
}
