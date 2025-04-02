import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { obtemTodasCategorias } from '../../services/categorias';

export default function Home({ navigation }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        carregarCategorias();
    }, []);

    const carregarCategorias = async () => {
        try {
            const categoriasObtidas = await obtemTodasCategorias();
            console.log("Categorias carregadas:", categoriasObtidas);
    
            if (Array.isArray(categoriasObtidas) && categoriasObtidas.length > 0) {
                setCategories(categoriasObtidas.map(item => ({
                    id: item.codigo,
                    name: item.categoria,
                    image: getLocalImage(item.foto)
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
    
        const imageName = foto.split("/").pop(); 
    
        return imageMap[imageName] || require("../../assets/coxinha.png");
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Você está na Home</Text>

            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.categoriesContainer}
            >
                {categories.map((category) => (
                    <TouchableOpacity 
                        key={category.id} 
                        style={styles.categoryItem} 
                        onPress={() => navigation.navigate('ProductListScreen', { categoryId: category.id, categoryName: category.name })}
                    >
                        <View style={styles.categoryItemTop}>
                            <Image source={category.image} style={styles.categoryImage} />
                        </View>
                        <Text style={styles.categoryName}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 30,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontSize: 30,
        marginBottom: 20,
        fontFamily: 'Roboto',
    },
    categoriesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    categoryItem: {
        width: 120,
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#f8f8f8',
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    categoryItemTop: {
        alignItems: 'center',
        width: 100,
        backgroundColor: '#fff',
        padding: 10,
        overflow: 'hidden',
    },
    categoryImage: {
        width: '75%',
        height: 80,
        resizeMode: 'cover',
    },
    categoryName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#333',
    },
});
