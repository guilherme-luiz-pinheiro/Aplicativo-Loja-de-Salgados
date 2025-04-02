import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { obtemTodosProdutos, excluirProduto } from '../../services/produtos';

export default function ProductListScreen({ navigation }) {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        carregarProdutos();
    }, []);

    const carregarProdutos = async () => {
        const lista = await obtemTodosProdutos();
        setProdutos(lista);
    };

    const handleExcluirProduto = async (codigo) => {
        Alert.alert(
            "Excluir Produto",
            "Tem certeza que deseja excluir este produto?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    onPress: async () => {
                        const sucesso = await excluirProduto(codigo);
                        if (sucesso) {
                            Alert.alert("Sucesso", "Produto excluído com sucesso!");
                            carregarProdutos();
                        } else {
                            Alert.alert("Erro", "Não foi possível excluir o produto.");
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Lista de Produtos</Text>

            <FlatList
                data={produtos}
                keyExtractor={(item) => item.codigo.toString()}
                renderItem={({ item }) => (
                    <View style={styles.produtoContainer}>
                        <Text style={styles.produtoTexto}>{item.produto} - R${item.precoUnitario}</Text>
                        <View style={styles.botoesContainer}>
                            <TouchableOpacity 
                                style={styles.botaoEditar} 
                                onPress={() => navigation.navigate('ProductForm', { produto: item })}
                            >
                                <Text style={styles.botaoTexto}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.botaoExcluir} 
                                onPress={() => handleExcluirProduto(item.codigo)}
                            >
                                <Text style={styles.botaoTexto}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.botaoAdicionar} onPress={() => navigation.navigate('ProductForm')}>
                <Text style={styles.botaoTexto}>Adicionar Produto</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    texto: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    produtoContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    produtoTexto: {
        fontSize: 18,
    },
    botoesContainer: {
        flexDirection: 'row',
    },
    botaoEditar: {
        backgroundColor: '#FFD700',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    botaoExcluir: {
        backgroundColor: '#FF6347',
        padding: 10,
        borderRadius: 5,
    },
    botaoTexto: {
        color: '#fff',
        fontWeight: 'bold',
    },
    botaoAdicionar: {
        marginTop: 20,
        backgroundColor: '#32CD32',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
});
