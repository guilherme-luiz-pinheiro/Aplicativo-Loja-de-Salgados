import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SaleScreen({ route, navigation }) {
    const [salesHistory, setSalesHistory] = useState([]);

    useEffect(() => {
        const loadSalesHistory = async () => {
            try {
                const storedSales = await AsyncStorage.getItem('historicoVendas');
                if (storedSales !== null) {
                    setSalesHistory(JSON.parse(storedSales));
                }
            } catch (error) {
                console.error('Erro ao carregar o histórico de vendas:', error);
            }
        };

        loadSalesHistory();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Histórico de Vendas</Text>
            {salesHistory.length === 0 ? (
                <Text style={styles.emptyText}>Nenhuma venda registrada.</Text>
            ) : (
                <FlatList
                    data={salesHistory}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>{item.nome} - R$ {item.preco.toFixed(2)}</Text>
                        </View>
                    )}
                />
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
});
