// services/database.js
import * as SQLite from 'expo-sqlite';

export async function getDbConnection() {
    return await SQLite.openDatabaseAsync('dbDonnelloSalgados.db');
}

export async function dropAllTables() {
    const queries = [
        'DROP TABLE IF EXISTS tbProdutos',
        'DROP TABLE IF EXISTS tbCategorias',
        'DROP TABLE IF EXISTS tbVendas',
        'DROP TABLE IF EXISTS tbClientes',
        'DROP TABLE IF EXISTS tbVendedores',
    ];

    let cx = await getDbConnection();

    try {
        for (let query of queries) {
            await cx.execAsync(query);
        }
        console.log('Tabelas deletadas com sucesso');
    } catch (error) {
        console.error('Erro ao deletar tabelas:', error);
    } finally {
        await cx.closeAsync();
    }
}

// Tabelas
export async function createProdutosTable() {
    const query = `CREATE TABLE IF NOT EXISTS tbProdutos (
        codigo TEXT NOT NULL PRIMARY KEY,
        produto TEXT NOT NULL,
        descricao TEXT NOT NULL,
        categoria TEXT NOT NULL,
        precoUnitario TEXT NOT NULL
    )`;
    let cx = await getDbConnection();
    await cx.execAsync(query);
    await cx.closeAsync();
}

export async function createCategoriasTable() {
    const query = `CREATE TABLE IF NOT EXISTS tbCategorias (
        codigo INTEGER PRIMARY KEY AUTOINCREMENT,
        categoria TEXT NOT NULL,
        foto TEXT
    )`;
    let cx = await getDbConnection();
    await cx.execAsync(query);
    await cx.closeAsync();
}

export async function createVendasTable() {
    const query = `CREATE TABLE IF NOT EXISTS tbVendas (
        codigo TEXT NOT NULL PRIMARY KEY,
        quantidade TEXT NOT NULL,
        produto TEXT NOT NULL
    )`;
    let cx = await getDbConnection();
    await cx.execAsync(query);
    await cx.closeAsync();
}

export async function createClientesTable() {
    const query = `CREATE TABLE IF NOT EXISTS tbClientes (
        codigo TEXT NOT NULL PRIMARY KEY,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
    )`;
    let cx = await getDbConnection();
    await cx.execAsync(query);
    await cx.closeAsync();
}

export async function createVendedoresTable() {
    const query = `CREATE TABLE IF NOT EXISTS tbVendedores (
        codigo TEXT NOT NULL PRIMARY KEY,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL,
        loja TEXT
    )`;
    let cx = await getDbConnection();
    await cx.execAsync(query);
    await cx.closeAsync();
}
