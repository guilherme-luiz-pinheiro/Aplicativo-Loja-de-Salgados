import { getDbConnection } from './database';
import * as SQLite from "expo-sqlite";

export async function adicionarCliente(cliente) {
    const query = 'INSERT INTO tbClientes (codigo, nome, email, senha) VALUES (?,?,?,?)';
    const dbCx = await getDbConnection();
    try {
        const result = await dbCx.runAsync(query, [cliente.codigo, cliente.nome, cliente.email, cliente.senha]);
        return result.changes === 1;
    } catch (error) {
        console.error('Erro ao adicionar cliente:', error);
        return false;
    } finally {
        await dbCx.closeAsync();
    }
}

export async function obterTodosClientes() {
    const query = 'SELECT * FROM tbClientes';
    const dbCx = await getDbConnection();
    try {
        const clientes = await dbCx.getAllAsync(query);
        return clientes;
    } catch (error) {
        console.error('Erro ao obter clientes:', error);
        return [];
    } finally {
        await dbCx.closeAsync();
    }
}

export async function atualizarCliente(cliente) {
    const query = 'UPDATE tbClientes SET nome=?, email=?, senha=? WHERE codigo=?';
    const dbCx = await getDbConnection();
    try {
        const result = await dbCx.runAsync(query, [cliente.nome, cliente.email, cliente.senha, cliente.codigo]);
        return result.changes === 1;
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        return false;
    } finally {
        await dbCx.closeAsync();
    }
}

export async function excluirCliente(codigo) {
    const query = 'DELETE FROM tbClientes WHERE codigo=?';
    const dbCx = await getDbConnection();
    try {
        const result = await dbCx.runAsync(query, [codigo]);
        return result.changes === 1;
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        return false;
    } finally {
        await dbCx.closeAsync();
    }
}

// ------------------------------
// CRUD para Vendedores
// ------------------------------

export async function adicionarVendedor(vendedor) {
    const query = 'INSERT INTO tbVendedores (codigo, nome, email, senha, loja) VALUES (?,?,?,?,?)';
    const dbCx = await getDbConnection();
    try {
        const result = await dbCx.runAsync(query, [vendedor.codigo, vendedor.nome, vendedor.email, vendedor.senha, vendedor.loja]);
        return result.changes === 1;
    } catch (error) {
        console.error('Erro ao adicionar vendedor:', error);
        return false;
    } finally {
        await dbCx.closeAsync();
    }
}

export async function obterTodosVendedores() {
    const query = 'SELECT * FROM tbVendedores';
    const dbCx = await getDbConnection();
    try {
        const vendedores = await dbCx.getAllAsync(query);
        return vendedores;
    } catch (error) {
        console.error('Erro ao obter vendedores:', error);
        return [];
    } finally {
        await dbCx.closeAsync();
    }
}

export async function atualizarVendedor(vendedor) {
    const query = 'UPDATE tbVendedores SET nome=?, email=?, senha=?, loja=? WHERE codigo=?';
    const dbCx = await getDbConnection();
    try {
        const result = await dbCx.runAsync(query, [vendedor.nome, vendedor.email, vendedor.senha, vendedor.loja, vendedor.codigo]);
        return result.changes === 1;
    } catch (error) {
        console.error('Erro ao atualizar vendedor:', error);
        return false;
    } finally {
        await dbCx.closeAsync();
    }
}

export async function excluirVendedor(codigo) {
    const query = 'DELETE FROM tbVendedores WHERE codigo=?';
    const dbCx = await getDbConnection();
    try {
        const result = await dbCx.runAsync(query, [codigo]);
        return result.changes === 1;
    } catch (error) {
        console.error('Erro ao excluir vendedor:', error);
        return false;
    } finally {
        await dbCx.closeAsync();
    }
}