import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen({ route, navigation }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const storedCart = await AsyncStorage.getItem('carrinho');
                if (storedCart) {
                    const parsedCart = JSON.parse(storedCart);
                    setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
                }
            } catch (error) {
                console.error('Erro ao carregar o carrinho:', error);
            }
        };

        loadCartItems();
    }, []);

    const salvarHistoricoVendas = async (venda) => {
        try {
            const historico = await AsyncStorage.getItem('historicoVendas');
            const historicoVendas = historico ? JSON.parse(historico) : [];
            historicoVendas.push(venda);
            await AsyncStorage.setItem('historicoVendas', JSON.stringify(historicoVendas));
        } catch (error) {
            console.error('Erro ao salvar o histórico de vendas:', error);
        }
    };

    const finalizarCompra = async () => {
        try {
            const venda = {
                data: new Date().toISOString(),
                itens: cartItems,
            };
            await salvarHistoricoVendas(venda);
            await AsyncStorage.removeItem('carrinho');
            setCartItems([]);
            Alert.alert("Sucesso", "Venda finalizada!");
        } catch (error) {
            console.error('Erro ao finalizar a compra:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Itens no Carrinho</Text>
            {cartItems.length === 0 ? (
                <Text style={styles.emptyText}>O carrinho está vazio.</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>
                                {item.produto} - R$ {typeof item.precoUnitario === 'number' ? item.precoUnitario.toFixed(2) : '0.00'}
                            </Text>
                        </View>
                    )}
                />
            )}
            {cartItems.length > 0 && (
                <TouchableOpacity style={styles.button} onPress={finalizarCompra}>
                    <Text style={styles.buttonText}>Finalizar Compra</Text>
                </TouchableOpacity>
            )}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    texto: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 18,
        color: 'gray',
    },
    itemContainer: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
