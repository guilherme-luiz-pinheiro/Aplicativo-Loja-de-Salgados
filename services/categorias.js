import { getDbConnection } from './database';

// Função para garantir que a tabela existe com a configuração correta
async function criarTabelaSeNaoExiste() {
    let dbCx = await getDbConnection();
    try {
        await dbCx.runAsync(`
            CREATE TABLE IF NOT EXISTS tbCategorias (
                codigo INTEGER PRIMARY KEY AUTOINCREMENT,
                categoria TEXT NOT NULL,
                foto TEXT
            )
        `);
        console.log("Tabela criada/verificada com sucesso!");
    } catch (error) {
        console.error('Erro ao criar/verificar tabela:', error);
    } finally {
        await dbCx.closeAsync();
    }
}


export async function obtemTodasCategorias() {
    let dbCx;
    try {
        dbCx = await getDbConnection();
        if (!dbCx) throw new Error("Falha ao obter conexão com o banco de dados.");

        return await dbCx.getAllAsync('SELECT * FROM tbCategorias');
    } catch (error) {
        console.error("Erro ao obter categorias:", error);
        return [];
    } finally {
        if (dbCx) {
            try {
                await dbCx.closeAsync();
            } catch (closeError) {
                console.error("Erro ao fechar a conexão com o banco:", closeError);
            }
        }
    }
}


export async function adicionarCategoria({ categoria, foto }) {
    if (!categoria) {
        console.error("Erro: O campo 'categoria' é obrigatório.");
        return false;
    }

    await criarTabelaSeNaoExiste(); // Garante que a tabela existe

    let dbCx = await getDbConnection();
    try {
        const query = 'INSERT INTO tbCategorias (categoria, foto) VALUES (?, ?)';
        const result = await dbCx.runAsync(query, [categoria, foto || null]);

        console.log("Resultado da inserção:", result); // 🔹 Verifique no console

        return result.changes === 1 ? result.lastID : false;
    } catch (error) {
        console.error('Erro ao adicionar categoria:', error);
        return false;
    } finally {
        await dbCx.closeAsync();
    }
}



export async function alterarCategoria({ codigo, categoria, foto }) {
    let dbCx = await getDbConnection();
    try {
        const query = 'UPDATE tbCategorias SET categoria=?, foto=? WHERE codigo=?';
        const result = await dbCx.runAsync(query, [categoria, foto, codigo]);
        return result.changes === 1; // Verifica se a atualização foi bem-sucedida
    } catch (error) {
        console.error('Erro ao alterar categoria:', error);
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