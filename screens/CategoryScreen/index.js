import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { obtemTodasCategorias, adicionarCategoria, alterarCategoria, excluirCategoria } from '../../services/categorias';
import { Picker } from '@react-native-picker/picker';

const images = {
    coxinha: require('../../assets/coxinha.png'),
    esfiha: require('../../assets/esfiha.png'),
    empada: require('../../assets/empada.png'),
    enroladinho: require('../../assets/enroladinho.png')
};

const imagePaths = {
    coxinha: '../../assets/coxinha.png',
    esfiha: '../../assets/esfiha.png',
    empada: '../../assets/empada.png',
    enroladinho: '../../assets/enroladinho.png'
};

const CategoryScreen = () => {
    const [categorias, setCategorias] = useState([]);
    const [nomeCategoria, setNomeCategoria] = useState('');
    const [idCategoria, setIdCategoria] = useState('');
    const [novoNomeCategoria, setNovoNomeCategoria] = useState('');
    const [imagemSelecionada, setImagemSelecionada] = useState(imagePaths.coxinha);

    useEffect(() => {
        carregarCategorias();
    }, []);

    const carregarCategorias = async () => {
        try {
            const categoriasObtidas = await obtemTodasCategorias();
            if (Array.isArray(categoriasObtidas)) {
                setCategorias(
                    categoriasObtidas.map(item => ({
                        id: item.codigo,
                        nome: item.categoria,
                        imagem: item.foto
                    }))
                );
            } else {
                setCategorias([]);
            }
        } catch (error) {
            console.error("Erro ao carregar categorias:", error);
            setCategorias([]);
        }
    };

    const handleAdicionar = async () => {
        if (nomeCategoria.trim()) {
            console.error(imagemSelecionada);

            const resultado = await adicionarCategoria({ categoria: nomeCategoria, foto: imagemSelecionada });
            if (resultado !== false) {
                setNomeCategoria('');
                setImagemSelecionada(imagePaths.coxinha);
                await carregarCategorias();
                Alert.alert("Sucesso", "Categoria adicionada com sucesso!");
            } else {
                Alert.alert("Erro", "Erro ao adicionar categoria.");
            }
        } else {
            Alert.alert("Erro", "O campo 'categoria' não pode estar vazio.");
        }
    };

    const handleAlterar = async () => {
        if (!idCategoria || novoNomeCategoria.trim() === '') {
            Alert.alert("Erro", "Selecione uma categoria e informe um novo nome.");
            return;
        }

        try {
            const resultado = await alterarCategoria({
                codigo: idCategoria,
                categoria: novoNomeCategoria,
                foto: imagemSelecionada
            });

            if (resultado !== false) {
                setIdCategoria('');
                setNovoNomeCategoria('');
                setImagemSelecionada(imagePaths.coxinha);
                await carregarCategorias();
                Alert.alert("Sucesso", "Categoria alterada com sucesso!");
            } else {
                Alert.alert("Erro", "Erro ao alterar categoria.");
            }
        } catch (error) {
            console.error("Erro ao alterar categoria:", error);
            Alert.alert("Erro", "Ocorreu um erro ao alterar a categoria.");
        }
    };

    const handleExcluir = async () => {
        if (!idCategoria) {
            Alert.alert("Erro", "Selecione uma categoria para excluir.");
            return;
        }

        try {
            const resultado = await excluirCategoria(idCategoria);
            if (resultado) {
                setIdCategoria('');
                setNovoNomeCategoria('');
                setImagemSelecionada(imagePaths.coxinha);
                await carregarCategorias();
                Alert.alert("Sucesso", "Categoria excluída com sucesso!");
            } else {
                Alert.alert("Erro", "Erro ao excluir categoria.");
            }
        } catch (error) {
            console.error("Erro ao excluir categoria:", error);
            Alert.alert("Erro", "Ocorreu um erro ao excluir a categoria.");
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Gerenciar Categorias</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Adicionar Categoria</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome da Categoria"
                    value={nomeCategoria}
                    onChangeText={setNomeCategoria}
                />
                <Picker
                    selectedValue={imagemSelecionada}
                    onValueChange={(itemValue) => setImagemSelecionada(imagePaths[itemValue])}
                    style={styles.picker}
                >
                    {Object.keys(imagePaths).map((key) => (
                        <Picker.Item key={key} label={key} value={key} />
                    ))}
                </Picker>
                <TouchableOpacity style={styles.button} onPress={handleAdicionar}>
                    <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
            </View>

            {/* Alterar Categoria */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Alterar Categoria</Text>
                <Picker
                    selectedValue={idCategoria}
                    onValueChange={(itemValue) => {
                        const categoriaSelecionada = categorias.find(c => c.id === itemValue);
                        if (categoriaSelecionada) {
                            setIdCategoria(categoriaSelecionada.id);
                            setNovoNomeCategoria(categoriaSelecionada.nome);
                            setImagemSelecionada(imagePaths.coxinha);
                        }
                    }}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione uma categoria" value="" />
                    {categorias.map((categoria) => (
                        <Picker.Item key={categoria.id} label={categoria.nome} value={categoria.id} />
                    ))}
                </Picker>
                <TextInput
                    style={styles.input}
                    placeholder="Novo Nome"
                    value={novoNomeCategoria}
                    onChangeText={setNovoNomeCategoria}
                />
                <Picker
                    selectedValue={imagemSelecionada}
                    onValueChange={(itemValue) => setImagemSelecionada(itemValue)}
                    style={styles.picker}
                >
                    {Object.keys(images).map((key) => (
                        <Picker.Item key={key} label={key} value={key} />
                    ))}
                </Picker>
                <TouchableOpacity style={styles.button} onPress={handleAlterar}>
                    <Text style={styles.buttonText}>Alterar</Text>
                </TouchableOpacity>
            </View>

            {/* Excluir Categoria */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Excluir Categoria</Text>

                <Picker
                    selectedValue={idCategoria}
                    onValueChange={(itemValue) => {
                        const categoriaSelecionada = categorias.find(c => c.id === itemValue);
                        if (categoriaSelecionada) {
                            setIdCategoria(categoriaSelecionada.id);
                            setNovoNomeCategoria(categoriaSelecionada.nome);
                            setImagemSelecionada(categoriaSelecionada.imagem);
                        }
                    }}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione uma categoria" value="" />
                    {categorias.map((categoria) => (
                        <Picker.Item key={categoria.id} label={categoria.nome} value={categoria.id} />
                    ))}
                </Picker>
                <TouchableOpacity style={[styles.button, styles.buttonDelete]} onPress={handleExcluir}>
                    <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        marginBottom: 30,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    picker: {
        height: 60,
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    scrollContent: { padding: 20 },
    buttonDelete: { backgroundColor: '#dc3545' },

});

export default CategoryScreen;