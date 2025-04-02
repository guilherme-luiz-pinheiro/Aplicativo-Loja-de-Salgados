import React, { useEffect, useState } from "react";
import { 
    View, 
    Text, 
    ActivityIndicator, 
    StyleSheet, 
    TouchableOpacity, 
    Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { obtemTodosProdutos } from "../../services/produtos";

const ProductListScreen = () => {
    const route = useRoute();
    const { categoryId, categoryName } = route.params || {};
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarProdutos() {
            try {
                const lista = await obtemTodosProdutos();
                console.log(lista);
                setProdutos(lista);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            } finally {
                setLoading(false);
            }
        }
        carregarProdutos();
    }, []);

    const adicionarAoCarrinho = async (produto) => {
        try {
            console.log("Produto adicionado:", produto); // <-- Adiciona log para depuração
            
            const carrinhoAtual = await AsyncStorage.getItem("carrinho");
            const carrinho = carrinhoAtual ? JSON.parse(carrinhoAtual) : [];
            
            carrinho.push(produto);
            await AsyncStorage.setItem("carrinho", JSON.stringify(carrinho));
            Alert.alert("Sucesso", "Produto adicionado ao carrinho!");
        } catch (error) {
            console.error("Erro ao adicionar ao carrinho:", error);
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.categoryTitle}>{categoryName}</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                produtos.map((item) => (
                    <TouchableOpacity 
                        key={item.codigo} 
                        style={styles.productItem} 
                        onPress={() => adicionarAoCarrinho(item)}
                    >
                        <Text>{item.produto} - R${item.precoUnitario}</Text>
                    </TouchableOpacity>
                ))
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    categoryTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "#333",
    },
    productItem: {
        fontSize: 18,
        padding: 15,
        backgroundColor: "#fff",
        marginVertical: 5,
        borderRadius: 8,
        elevation: 2,
        textAlign: "center",
        alignItems: "center",
    },
});

export default ProductListScreen;
