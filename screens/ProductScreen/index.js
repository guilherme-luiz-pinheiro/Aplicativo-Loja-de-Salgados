import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { obtemTodosProdutos, adicionarProduto, alterarProduto, excluirProduto } from '../../services/produtos';
import { obtemTodasCategorias } from '../../services/categorias';

export default function TelaProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [produto, setProduto] = useState({ codigo: '', produto: '', descricao: '', categoria: '', precoUnitario: '' });
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const [produtoSelecionado, setProdutoSelecionado] = useState('');

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        carregarCategorias();
        carregarProdutos();
    }, []);

    const carregarCategorias = async () => {
        try {
            const categoriasObtidas = await obtemTodasCategorias();
            console.log("Categorias carregadas:", categoriasObtidas);

            if (Array.isArray(categoriasObtidas) && categoriasObtidas.length > 0) {
                setCategorias(categoriasObtidas.map(item => ({
                    id: item.codigo,
                    name: item.categoria,
                    image: getLocalImage(item.foto) // Função para carregar imagem corretamente
                })));
            }
        } catch (error) {
            console.error("Erro ao carregar categorias:", error);
        }
    };

    const getLocalImage = (foto) => {
        const imageMap = {
            "coxinha.png": require("../../assets/coxinha.png"),
            "empada.png": require("../../assets/empada.png"),
            "esfiha.png": require("../../assets/esfiha.png"),
        };

        // Extrai apenas o nome do arquivo da string (remove o caminho "../../assets/")
        const imageName = foto.split("/").pop();

        return imageMap[imageName] || require("../../assets/coxinha.png"); // Imagem padrão caso não encontre
    };

    async function carregarProdutos() {
        const lista = await obtemTodosProdutos();
        setProdutos(lista);
    }



    async function cadastrarProduto() {
        if (!produto.produto || !produto.descricao || !produto.categoria || !produto.precoUnitario) {
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
        }
        const sucesso = await adicionarProduto(produto);
        if (sucesso) Alert.alert('Produto adicionado com sucesso!');
        resetarFormulario();
        carregarProdutos();
    }

    async function atualizarProduto() { 
     
    
        try {
            const resultado = await alterarProduto({
                codigo: produto.codigo,
                produto: produto.produto,
                descricao: produto.descricao,
                categoria: produto.categoria,
                precoUnitario: produto.precoUnitario
            });
    
            if (resultado) {
                Alert.alert("Sucesso", "Produto alterado com sucesso!");
                resetarFormulario();
                carregarProdutos();
            } else {
                Alert.alert("Erro", "Erro ao alterar o produto.");
            }
        } catch (error) {
            console.error("Erro ao alterar produto:", error);
            Alert.alert("Erro", "Ocorreu um erro ao alterar o produto.");
        }
    }
    
    
    const removerProduto = async () => {
      
    
        try {
            const sucesso = await excluirProduto(produtoSelecionado);
            if (sucesso) {
                setProdutoSelecionado('');
                setProduto({ codigo: '', produto: '', descricao: '', categoria: '', precoUnitario: '' });
                await carregarProdutos();
                Alert.alert("Sucesso", "Produto removido com sucesso!");
            } else {
                Alert.alert("Erro", "Erro ao remover o produto.");
            }
        } catch (error) {
            console.error("Erro ao remover o produto:", error);
            Alert.alert("Erro", "Ocorreu um erro ao remover o produto.");
        }
    };
    

    function resetarFormulario() {
        setProduto({ codigo: '', produto: '', descricao: '', categoria: '', precoUnitario: '' });
        setProdutoSelecionado('');
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Gerenciar Produtos</Text>

            {/* Criar Produto */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Adicionar Produto</Text>
                <TextInput style={styles.input} placeholder="Nome do Produto" value={produto.produto} onChangeText={(text) => setProduto({ ...produto, produto: text })} />
                <TextInput style={styles.input} placeholder="Descrição" value={produto.descricao} onChangeText={(text) => setProduto({ ...produto, descricao: text })} />
                <Picker selectedValue={produto.categoria} onValueChange={(itemValue) => setProduto({ ...produto, categoria: itemValue })} style={styles.picker}>
                    <Picker.Item label="Selecione uma categoria" value="" />
                    {categorias.map((categoria) => (
                        <Picker.Item key={categoria.id} label={categoria.name} value={categoria.id} />
                    ))}
                </Picker>
                <TextInput style={styles.input} placeholder="Preço Unitário" keyboardType="numeric" value={produto.precoUnitario} onChangeText={(text) => setProduto({ ...produto, precoUnitario: text })} />
                <TouchableOpacity style={styles.button} onPress={cadastrarProduto}>
                    <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
            </View>

            {/* Alterar Produto */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Alterar Produto</Text>

                <Picker
                    selectedValue={produtoSelecionado}
                    onValueChange={(itemValue) => {
                        setProdutoSelecionado(itemValue);
                        const produtoEscolhido = produtos.find(p => p.codigo === itemValue);
                        if (produtoEscolhido) {
                            setProduto({ ...produtoEscolhido }); // Evita estado indefinido
                        }
                    }}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione um produto" value="" />
                    {produtos.map((p) => (
                        <Picker.Item key={p.codigo} label={p.produto} value={p.codigo} />
                    ))}
                </Picker>

                {produto && (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Novo Nome"
                            value={produto.produto}
                            onChangeText={(text) => setProduto({ ...produto, produto: text })}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Nova Descrição"
                            value={produto.descricao}
                            onChangeText={(text) => setProduto({ ...produto, descricao: text })}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Novo Preço"
                            keyboardType="numeric"
                            value={produto.precoUnitario.toString()}
                            onChangeText={(text) => setProduto({ ...produto, precoUnitario: parseFloat(text) || 0 })}
                        />
                    </>
                )}

                <TouchableOpacity style={styles.button} onPress={atualizarProduto}>
                    <Text style={styles.buttonText}>Alterar</Text>
                </TouchableOpacity>
            </View>


            {/* Excluir Produto */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Excluir Produto</Text>
                <Picker selectedValue={produtoSelecionado} onValueChange={setProdutoSelecionado} style={styles.picker}>
                    <Picker.Item label="Selecione um produto" value="" />
                    {produtos.map((p) => (
                        <Picker.Item key={p.codigo} label={p.produto} value={p.codigo} />
                    ))}
                </Picker>
                <TouchableOpacity style={[styles.button, styles.buttonDelete]} onPress={removerProduto}>
                    <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    section: { marginBottom: 30, padding: 15, backgroundColor: '#fff', borderRadius: 8, elevation: 3 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10, backgroundColor: '#fff' },
    picker: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10, backgroundColor: '#fff' },
    button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
    buttonDelete: { backgroundColor: '#dc3545' },
    buttonText: { color: '#fff', fontSize: 16 },
    scrollContent: { padding: 20 },

});
