import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function Home({ navigation, route }) {
    const categories = [
        { id: 1, name: 'Frito', image: require('../../assets/coxinha.png') },
        { id: 2, name: 'Congelado', image: require('../../assets/coxinha_congelada.png') },
        { id: 3, name: 'Assado', image: require('../../assets/coxinha.png') },
        { id: 4, name: 'Cru', image: require('../../assets/coxinha.png') },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Você está na Home</Text>

            {/* Scroll horizontal para categorias */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
                {categories.map((category) => (
                    <TouchableOpacity key={category.id} style={styles.categoryItem} onPress={() => alert(`Selecionado: ${category.name}`)}>
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
        marginTop: 30,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontSize: 30,
        marginBottom: 20,
    },
    categoriesContainer: {
        flexDirection: 'row', // Garante que fique em linha
        alignItems: 'flex-start',
        paddingHorizontal: 10,
    },
    categoryItem: {
        width: 90,
        alignItems: 'center',
        marginHorizontal: 10, // Espaço entre os itens
    },
    categoryItemTop: {
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        alignItems: 'center',
        width: 90,
        backgroundColor: '#ffcc50',
    },
    categoryImage: {
        resizeMode: 'cover',
        marginBottom: 10,
    },
    categoryName: {
        fontSize: 14,
    },
});
