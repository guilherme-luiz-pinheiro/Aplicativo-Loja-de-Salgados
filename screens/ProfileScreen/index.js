import { Ionicons } from 'react-native-vector-icons';
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function ProfileScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleUpdateProfile = () => {
        alert(`Perfil atualizado: \nNome: ${name} \nEmail: ${email}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Você está no Perfil</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite seu nome"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.botao} onPress={handleUpdateProfile}>
                <Text style={styles.textoParametro}>Atualizar Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('CategoryScreen')}>
                <Text style={styles.textoParametro}>Ir para Categorias</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('ProductScreen')}>
                <Text style={styles.textoParametro}>Ir para Produtos</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

ProfileScreen.navigationOptions = ({ navigation }) => ({
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
    ),
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    texto: {
        fontSize: 30,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 55,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 15,
        fontSize: 18,
    },
    botao: {
        width: '100%',
        height: 55,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    textoParametro: {
        fontSize: 18,
        color: '#000',
    },
});
