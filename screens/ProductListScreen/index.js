import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, BackHandler, Alert } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function ProductListScreen({ navigation, route }) {


    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Você está na Lista de produtos</Text>

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
    },
    texto: {
        fontSize: 30,
    },
    textoPequeno: {
        fontSize: 24,
    },
    botao: {
        width: "90%",
        height: 70,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    caixaTexto: {
        width: "80%",
        height: 50,
        borderColor: '#0AF',
        borderWidth: 2,
        borderRadius: 20,
        marginBottom: 30,
        paddingHorizontal: 10,
        fontSize: 24,

    }
});
