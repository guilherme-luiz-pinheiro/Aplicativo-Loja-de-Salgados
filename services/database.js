// services/database.js
import * as SQLite from 'expo-sqlite';

export async function getDbConnection() {
    return await SQLite.openDatabaseAsync('dbDonnelloSalgados.db');
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
        codigo TEXT NOT NULL PRIMARY KEY,
        categoria TEXT NOT NULL
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
